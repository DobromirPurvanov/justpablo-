import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { X } from 'lucide-react'

type CookieConsent = {
  essential: boolean
  analytics: boolean
  functional: boolean
  accepted: boolean
  timestamp: string
}

const STORAGE_KEY = 'justpablo_cookie_consent'

function getConsent(): CookieConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveConsent(c: CookieConsent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(c))
}

export default function CookieBanner() {
  // Показваме банера само ако още няма записано съгласие (изчислено веднъж).
  const [visible, setVisible] = useState(() => !getConsent())
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [functional, setFunctional] = useState(false)

  // Отваряне на настройките отвън (напр. линк във футъра), с презареждане
  // на записания избор в toggle-ите.
  useEffect(() => {
    const onOpen = () => {
      const c = getConsent()
      if (c) { setAnalytics(c.analytics); setFunctional(c.functional) }
      setSettingsOpen(true)
    }
    window.addEventListener('open-cookie-settings', onOpen)
    return () => window.removeEventListener('open-cookie-settings', onOpen)
  }, [])

  // Escape затваря модала с настройки
  useEffect(() => {
    if (!settingsOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSettingsOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [settingsOpen])

  const acceptAll = () => {
    const consent: CookieConsent = {
      essential: true,
      analytics: true,
      functional: true,
      accepted: true,
      timestamp: new Date().toISOString(),
    }
    saveConsent(consent)
    setVisible(false)
    setSettingsOpen(false)
    // Trigger analytics if needed
    window.dispatchEvent(new CustomEvent('cookie-consent', { detail: consent }))
  }

  const rejectAll = () => {
    const consent: CookieConsent = {
      essential: true,
      analytics: false,
      functional: false,
      accepted: true,
      timestamp: new Date().toISOString(),
    }
    saveConsent(consent)
    setVisible(false)
    setSettingsOpen(false)
    window.dispatchEvent(new CustomEvent('cookie-consent', { detail: consent }))
  }

  const savePreferences = () => {
    const consent: CookieConsent = {
      essential: true,
      analytics,
      functional,
      accepted: true,
      timestamp: new Date().toISOString(),
    }
    saveConsent(consent)
    setVisible(false)
    setSettingsOpen(false)
    window.dispatchEvent(new CustomEvent('cookie-consent', { detail: consent }))
  }

  if (!visible && !settingsOpen) return null

  return (
    <>
      {/* Bottom banner */}
      {visible && (
        <div className="fixed bottom-0 left-0 right-0 z-[100] bg-[#1A1A1A] text-white">
          <div className="section-padding py-3 md:py-4 lg:py-5">
            <div className="container-max flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4">
              <div className="flex-1">
                <p className="text-[11px] md:text-xs lg:text-sm font-light text-white/80 leading-relaxed max-w-2xl">
                  Този уебсайт използва бисквитки. Можете да приемете всички или да управлявате предпочитанията си.
                </p>
              </div>
              <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 w-full md:w-auto">
                <button
                  onClick={() => setSettingsOpen(true)}
                  className="text-[10px] md:text-[11px] uppercase tracking-[0.12em] font-light text-white/60 hover:text-white transition-colors px-2 md:px-3 py-2"
                >
                  Настройки
                </button>
                <button
                  onClick={rejectAll}
                  className="text-[10px] md:text-[11px] uppercase tracking-[0.12em] font-light text-white/60 hover:text-white transition-colors px-2 md:px-3 py-2"
                >
                  Отхвърлям
                </button>
                <button
                  onClick={acceptAll}
                  className="bg-[#DC2626] hover:bg-[#B91C1C] text-white text-[11px] md:text-[12px] uppercase tracking-[0.12em] font-medium px-4 md:px-5 py-2 md:py-2.5 rounded-full transition-colors duration-300 ml-auto"
                >
                  Приемам всички
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings modal */}
      {settingsOpen && (
        <div
          className="fixed inset-0 z-[101] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSettingsOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-settings-title"
            data-lenis-prevent
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 lg:p-8 relative"
          >
            <button
              onClick={() => setSettingsOpen(false)}
              aria-label="Затвори настройките"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#1A1A1A]/10 transition-colors"
            >
              <X size={18} className="text-[#1A1A1A]" />
            </button>

            <h3 id="cookie-settings-title" className="font-thin-display text-2xl lg:text-3xl text-[#1A1A1A] mb-2">
              Предпочитания за бисквитки
            </h3>
            <p className="text-sm font-light text-[#1A1A1A]/60 mb-6 leading-relaxed">
              Управлявайте кои бисквитки искате да позволите. Задължителните бисквитки са необходими за функционирането на сайта и не могат да бъдат изключени.
            </p>

            <div className="space-y-4 mb-8">
              {/* Essential */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#F5F5F5]">
                <div>
                  <div className="text-sm font-semibold text-[#1A1A1A]">Задължителни</div>
                  <div className="text-xs font-light text-[#1A1A1A]/50 mt-1">
                    Необходими за правилното функциониране на уебсайта.
                  </div>
                </div>
                <div role="switch" aria-checked="true" aria-disabled="true" aria-label="Задължителни бисквитки — винаги включени" className="w-10 h-5 bg-[#DC2626] rounded-full flex items-center justify-end px-1 cursor-not-allowed opacity-60">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#F5F5F5]">
                <div>
                  <div className="text-sm font-semibold text-[#1A1A1A]">Аналитични</div>
                  <div className="text-xs font-light text-[#1A1A1A]/50 mt-1">
                    Помагат ни да разберем как използвате сайта.
                  </div>
                </div>
                <button
                  onClick={() => setAnalytics(!analytics)}
                  role="switch"
                  aria-checked={analytics}
                  aria-label="Аналитични бисквитки"
                  className={`w-10 h-5 rounded-full flex items-center px-1 transition-colors duration-300 ${
                    analytics ? 'bg-[#DC2626] justify-end' : 'bg-[#1A1A1A]/20 justify-start'
                  }`}
                >
                  <div className="w-3 h-3 bg-white rounded-full" />
                </button>
              </div>

              {/* Functional */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#F5F5F5]">
                <div>
                  <div className="text-sm font-semibold text-[#1A1A1A]">Функционални</div>
                  <div className="text-xs font-light text-[#1A1A1A]/50 mt-1">
                    Запомнят предпочитанията ви за персонализация.
                  </div>
                </div>
                <button
                  onClick={() => setFunctional(!functional)}
                  role="switch"
                  aria-checked={functional}
                  aria-label="Функционални бисквитки"
                  className={`w-10 h-5 rounded-full flex items-center px-1 transition-colors duration-300 ${
                    functional ? 'bg-[#DC2626] justify-end' : 'bg-[#1A1A1A]/20 justify-start'
                  }`}
                >
                  <div className="w-3 h-3 bg-white rounded-full" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={savePreferences}
                className="flex-1 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-sm font-medium py-3 rounded-full transition-colors duration-300"
              >
                Запази предпочитанията
              </button>
              <button
                onClick={rejectAll}
                className="text-sm font-light text-[#1A1A1A]/60 hover:text-[#1A1A1A] px-4 py-3 transition-colors"
              >
                Отхвърлям всички
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-[#1A1A1A]/10 text-center">
              <Link to="/biskvitki" className="text-xs font-light text-[#1A1A1A]/50 hover:text-[#DC2626] transition-colors">
                Виж пълната политика за бисквитки
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
