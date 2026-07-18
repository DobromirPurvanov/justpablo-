import { Resend } from 'resend'
import { buildInquiryEmail } from './email-template.js'

function parseBody(req) {
  if (Buffer.isBuffer(req.body)) return JSON.parse(req.body.toString())
  if (typeof req.body === 'string') return JSON.parse(req.body)
  return req.body || {}
}

/* Google reCAPTCHA v3 — по избор. Оценяваме, но НЕ блокираме: целта е да
   не губим реални клиенти, а само да маркираме съмнителните заявки с бележка
   в имейла. Без зададен secret или token функцията е no-op (не се вика Google). */
async function assessRecaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  const minScore = Number(process.env.RECAPTCHA_MIN_SCORE || '0.5')
  if (!secret || !token) return { suspicious: false, note: null }
  try {
    const params = new URLSearchParams({ secret, response: String(token) })
    const resp = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    })
    const data = await resp.json()
    if (!data.success) {
      const codes = (data['error-codes'] || []).join(', ') || 'unknown'
      return { suspicious: true, note: `reCAPTCHA не премина (${codes})` }
    }
    if (typeof data.score === 'number' && data.score < minScore) {
      return { suspicious: true, note: `нисък reCAPTCHA score (${data.score})` }
    }
    return { suspicious: false, note: null, score: data.score }
  } catch (err) {
    console.error('reCAPTCHA verify error:', err)
    return { suspicious: false, note: null }
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('Missing RESEND_API_KEY environment variable')
    return res.status(500).json({ success: false, error: 'Услугата за имейл не е конфигурирана.' })
  }

  try {
    const body = parseBody(req)
    const { name, email } = body

    // Honeypot: скрито поле, което истинските хора не виждат. Ако е попълнено,
    // заявката е ботска — приемаме я тихо (200), без да изпращаме имейл.
    if (body.company_website && String(body.company_website).trim()) {
      return res.status(200).json({ success: true, data: 'ok' })
    }

    if (!name || !String(name).trim() || !email || !String(email).trim()) {
      return res.status(400).json({ success: false, error: 'Име и имейл са задължителни.' })
    }

    const rc = await assessRecaptcha(body.recaptchaToken)
    if (rc.suspicious) console.warn('reCAPTCHA маркира заявка като съмнителна:', rc.note)

    const { html: htmlContent, text: textContent, subject } = buildInquiryEmail(body, { spamNote: rc.note })

    const recipients = [
      process.env.TO_EMAIL_PRIMARY,
      process.env.TO_EMAIL_SECONDARY,
    ].filter(Boolean)

    if (!recipients.length) {
      return res.status(500).json({ success: false, error: 'Няма конфигуриран получател.' })
    }

    const fromAddress = process.env.FROM_EMAIL || 'Just Pablo <zapitvane@justpablo.bg>'
    const resend = new Resend(apiKey)

    const results = await Promise.allSettled(
      recipients.map((to) =>
        resend.emails.send({
          from: fromAddress,
          to,
          subject,
          html: htmlContent,
          text: textContent,
          reply_to: email || undefined,
        })
      )
    )

    const failures = results.filter((r) => r.status === 'rejected')
    if (failures.length === results.length) {
      const messages = failures.map((f) => (f.reason instanceof Error ? f.reason.message : String(f.reason)))
      console.error('Resend send failed:', messages)
      return res.status(500).json({ success: false, error: 'Неуспешно изпращане на имейла.' })
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Resend error:', error)
    return res.status(500).json({ success: false, error: 'Възникна неочаквана грешка.' })
  }
}
