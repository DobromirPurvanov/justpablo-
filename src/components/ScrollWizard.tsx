import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { maskReveal } from '../lib/motion'

const questions = [
  { id: 'brandName', title: 'Кой е вашият бранд?', subtitle: 'Нека се запознаем.', type: 'text', placeholder: 'име на бранда' },
  { id: 'focus', title: 'Какъв е фокусът на вашия бизнес?', subtitle: 'Можете да маркирате повече от един отговор.', type: 'checkbox', options: ['Услуга/и', 'Продукт/и собствено производство', 'Търговия или дистрибуция'] },
  { id: 'goals', title: 'Какви са вашите цели за онлайн развитие?', type: 'radio', options: ['Разпознаваемост', 'Продажби', 'Абонаменти', 'Подготовка за експанзия'] },
  { id: 'period', title: 'За какъв период очаквате резултати?', type: 'radio', options: ['3 месеца', '6 месеца', '1 година', '2+ години'] },
  { id: 'needs', title: 'От какви услуги имате нужда?', type: 'checkbox', options: ['Нов уебсайт', 'SEO оптимизация', 'Онлайн реклама', 'Брандинг и дизайн', 'Социални мрежи'] },
  { id: 'budget', title: 'Какъв е предвиденият бюджет?', type: 'radio', options: ['До 500 €', '500 – 1500 €', '1500 – 2500 €', '2500 – 5000 €', 'Над 5000 €'] },
  { id: 'name', title: 'Вашето име', type: 'text', placeholder: 'Име и фамилия' },
  { id: 'email', title: 'E-mail адрес', type: 'email', placeholder: 'email@company.bg' },
  { id: 'phone', title: 'Телефон', type: 'tel', placeholder: '0888 123 456' },
]

const isAnswered = (data: Record<string, unknown>, id: string) => {
  const v = data[id]
  return Array.isArray(v) ? v.length > 0 : Boolean(v && String(v).trim())
}

export default function ScrollWizard() {
  const [current, setCurrent] = useState(0)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [isSuccess, setIsSuccess] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const animating = useRef(false)

  useEffect(() => {
    if (heroRef.current) maskReveal(heroRef.current.querySelector('.wz-h1'), null, { delay: 0.1 })
  }, [])

  const setValue = (id: string, value: any) => setFormData(prev => ({ ...prev, [id]: value }))
  const toggleCheckbox = (id: string, option: string) => {
    const arr = (formData[id] as string[]) || []
    setValue(id, arr.includes(option) ? arr.filter(o => o !== option) : [...arr, option])
  }

  // Преход между въпросите с посока
  const go = (target: number) => {
    if (target < 0 || target > questions.length - 1 || target === current || animating.current) return
    const panel = panelRef.current
    const dir = target > current ? 1 : -1
    if (!panel || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrent(target)
      return
    }
    animating.current = true
    gsap.to(panel, {
      y: -26 * dir, opacity: 0, duration: 0.22, ease: 'power2.in',
      onComplete: () => {
        setCurrent(target)
        gsap.fromTo(panel,
          { y: 30 * dir, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', clearProps: 'transform', onComplete: () => { animating.current = false } }
        )
      },
    })
  }
  const next = () => go(current + 1)
  const prev = () => go(current - 1)

  const q = questions[current]
  const isLast = current === questions.length - 1
  const isFirst = current === 0
  const canSubmit = isAnswered(formData, 'email') && isAnswered(formData, 'name')
  const progress = ((current + 1) / questions.length) * 100

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center bg-white section-padding">
        <div className="w-24 h-24 bg-[#DC2626] rounded-full flex items-center justify-center mb-10">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h1 className="font-thin-display text-[clamp(40px,7vw,84px)] text-[#1A1A1A] leading-none mb-6">Благодарим!</h1>
        <p className="text-base font-light text-[#1A1A1A]/60 max-w-md mb-10">
          Получихме запитването ви. Ще се запознаем с детайлите и ще се свържем с вас в рамките на 24 часа.
        </p>
        <a href="#/" className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.14em] font-medium text-[#DC2626] hover:gap-3 transition-all duration-300">
          Обратно към началото
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </div>
    )
  }

  return (
    <div className="bg-white pb-20">
      {/* Хедър + прогрес */}
      <div ref={heroRef} className="section-padding pt-10 lg:pt-16 pb-8 lg:pb-12">
        <div className="container-max">
          <span className="text-[10px] uppercase tracking-[0.2em] font-light text-[#DC2626] mb-4 block">Запитване</span>
          <h1 className="wz-h1 font-thin-display text-[clamp(34px,5.5vw,68px)] text-[#1A1A1A] leading-[1.05] max-w-3xl">
            Разкажете ни за бизнеса си
          </h1>
          <div className="flex items-center gap-5 mt-8 max-w-xl">
            <div className="flex-1 h-px bg-[#1A1A1A]/10 relative overflow-visible">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] bg-[#DC2626] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <div className="text-sm font-light text-[#1A1A1A]/60 tabular-nums shrink-0">
              <span className="text-[#DC2626] font-medium">{String(current + 1).padStart(2, '0')}</span> / {String(questions.length).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>

      <div className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Ляво: списък с въпросите */}
            <div className="lg:col-span-3 hidden lg:block">
              <div className="lg:sticky lg:top-28 flex flex-col gap-3">
                {questions.map((question, i) => {
                  const done = isAnswered(formData, question.id)
                  return (
                    <button
                      key={question.id}
                      onClick={() => go(i)}
                      className={`flex items-start gap-2.5 text-left text-sm leading-snug transition-colors duration-300 ${
                        i === current ? 'text-[#1A1A1A] font-semibold' : done ? 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]' : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70'
                      }`}
                    >
                      <span className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-300 ${
                        done ? 'bg-[#DC2626] border-[#DC2626]' : i === current ? 'border-[#DC2626]' : 'border-[#1A1A1A]/20'
                      }`}>
                        {done && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5"><polyline points="20 6 9 17 4 12" /></svg>}
                      </span>
                      {question.title}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Център: активният въпрос */}
            <div className="lg:col-span-6">
              <div ref={panelRef}>
                <h2 className="text-2xl lg:text-4xl font-bold text-[#1A1A1A] leading-tight mb-3">{q.title}</h2>
                {q.subtitle && <p className="text-base font-light text-[#1A1A1A]/60 mb-8">{q.subtitle}</p>}
                {!q.subtitle && <div className="mb-8" />}

                <div className="max-w-md">
                  {q.type === 'radio' && q.options && (
                    <div className="flex flex-col gap-3">
                      {q.options.map(opt => (
                        <button key={opt} onClick={() => { setValue(q.id, opt); window.setTimeout(next, 280) }}
                          className={`w-full text-left px-5 py-3.5 rounded-xl border text-base font-light transition-all duration-300 hover:-translate-y-0.5 ${formData[q.id] === opt ? 'bg-[#DC2626]/5 border-[#DC2626] text-[#1A1A1A] shadow-sm shadow-[#DC2626]/10' : 'bg-white border-[#E0E0E0] text-[#1A1A1A]/70 hover:border-[#DC2626]/40'}`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${formData[q.id] === opt ? 'border-[#DC2626] bg-[#DC2626]' : 'border-[#D0D0D0]'}`}>
                              {formData[q.id] === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                            {opt}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {q.type === 'checkbox' && q.options && (
                    <div className="flex flex-col gap-3">
                      {q.options.map(opt => {
                        const selected = (formData[q.id] as string[]) || []
                        return (
                          <button key={opt} onClick={() => toggleCheckbox(q.id, opt)}
                            className={`w-full text-left px-5 py-3.5 rounded-xl border text-base font-light transition-all duration-300 hover:-translate-y-0.5 ${selected.includes(opt) ? 'bg-[#DC2626]/5 border-[#DC2626] text-[#1A1A1A] shadow-sm shadow-[#DC2626]/10' : 'bg-white border-[#E0E0E0] text-[#1A1A1A]/70 hover:border-[#DC2626]/40'}`}>
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${selected.includes(opt) ? 'bg-[#DC2626] border-[#DC2626]' : 'border-[#D0D0D0]'}`}>
                                {selected.includes(opt) && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
                              </div>
                              {opt}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )}

                  {(q.type === 'text' || q.type === 'email' || q.type === 'tel') && (
                    <input
                      type={q.type}
                      value={formData[q.id] || ''}
                      onChange={e => setValue(q.id, e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter' && !isLast) next() }}
                      placeholder={q.placeholder}
                      autoFocus
                      className="w-full bg-transparent border-b-2 border-[#DC2626] px-0 py-4 text-xl font-light text-[#1A1A1A] outline-none placeholder:text-[#1A1A1A]/45"
                    />
                  )}
                </div>

                <div className="flex items-center gap-4 mt-10">
                  {!isFirst && (
                    <button onClick={prev} className="flex items-center gap-2 text-sm font-light text-[#1A1A1A]/55 hover:text-[#1A1A1A] transition-colors py-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      Назад
                    </button>
                  )}
                  {!isLast ? (
                    <button onClick={next} className="flex items-center gap-2 bg-[#DC2626] text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-[#B91C1C] hover:scale-[1.03] transition-all duration-300">
                      Следващ
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                  ) : (
                    <button
                      onClick={() => canSubmit && setIsSuccess(true)}
                      disabled={!canSubmit}
                      className={`flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium transition-all duration-300 ${canSubmit ? 'bg-[#DC2626] text-white hover:bg-[#B91C1C] hover:scale-[1.03]' : 'bg-[#1A1A1A]/10 text-[#1A1A1A]/40 cursor-not-allowed'}`}
                    >
                      Изпрати запитване
                    </button>
                  )}
                </div>
                {isLast && !canSubmit && (
                  <p className="text-xs font-light text-[#1A1A1A]/50 mt-3">Попълнете име и e-mail, за да изпратите.</p>
                )}
              </div>
            </div>

            {/* Дясно: директен контакт + какво следва */}
            <div className="lg:col-span-3 hidden lg:block">
              <div className="lg:sticky lg:top-28 flex flex-col gap-8">
                <div className="border border-[#1A1A1A]/[0.08] rounded-2xl p-6">
                  <div className="text-[10px] uppercase tracking-[0.18em] font-medium text-[#1A1A1A]/50 mb-4">Предпочитате директно?</div>
                  <a href="mailto:info@justpablo.bg" className="block text-sm font-medium text-[#DC2626] hover:underline mb-2">info@justpablo.bg</a>
                  <a href="tel:0887654321" className="block text-sm font-light text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors">0887 654 321</a>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] font-medium text-[#1A1A1A]/50 mb-5">Какво следва</div>
                  <div className="flex flex-col gap-5">
                    {[
                      ['01', 'Отговор до 24 часа'],
                      ['02', 'Кратък разговор за целите ви'],
                      ['03', 'Конкретно предложение'],
                    ].map(([n, t]) => (
                      <div key={n} className="flex items-start gap-3">
                        <span className="text-xs font-medium text-[#DC2626] mt-0.5">{n}</span>
                        <span className="text-sm font-light text-[#1A1A1A]/75 leading-snug">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
