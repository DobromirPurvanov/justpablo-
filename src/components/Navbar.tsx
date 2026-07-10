import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router'
import gsap from 'gsap'

const navLinks = [
  { path: '/', label: 'Начало' },
  { path: '/za-nas', label: 'За нас' },
  { path: '/uslugi', label: 'Услуги' },
  { path: '/rezultati', label: 'Резултати' },
  { path: '/ceni', label: 'Цени' },
  { path: '/zapitvane', label: 'Запитване' },
]

/**
 * Almero модел: на екрана стоят само лого + бургер (+ малък CTA на desktop).
 * Менюто е събитие — тъмен цял екран с големи номерирани линкове.
 */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const overlayRef = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Escape затваря менюто
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const ov = overlayRef.current
    if (!ov) return
    if (firstRender.current) {
      gsap.set(ov, { yPercent: -100, autoAlpha: 0 })
      firstRender.current = false
      if (!menuOpen) return
    }
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      gsap.set(ov, { autoAlpha: 1 })
      gsap.to(ov, { yPercent: 0, duration: 0.7, ease: 'power4.inOut' })
      gsap.fromTo('.menu-item',
        { y: 44, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: 'power3.out', delay: 0.3 }
      )
      gsap.fromTo('.menu-foot',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.65 }
      )
    } else {
      document.body.style.overflow = ''
      gsap.to(ov, { yPercent: -100, duration: 0.6, ease: 'power4.inOut', onComplete: () => gsap.set(ov, { autoAlpha: 0 }) })
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      {/* Лого — горе вляво */}
      <Link to="/" className="fixed top-5 left-5 lg:left-8 z-50 flex items-center gap-3" onClick={() => setMenuOpen(false)}>
        <img src="/images/logo-mark.png" alt="Just Pablo Digital" className="w-10 h-10 lg:w-11 lg:h-11 object-contain" />
        <span className="flex flex-col leading-none">
          <span className="text-lg font-semibold tracking-tight text-[#1A1A1A]">Just Pablo</span>
          <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#DC2626] mt-1" style={{ fontSize: 9 }}>Digital</span>
        </span>
      </Link>

      {/* Горе вдясно: CTA (desktop) + бургер */}
      <div className="fixed top-5 right-5 lg:right-8 z-50 flex items-center gap-3">
        <Link
          to="/zapitvane"
          className={`hidden lg:inline-flex items-center bg-[#DC2626] text-white text-[11px] uppercase tracking-[0.14em] font-medium px-5 py-3 rounded-full shadow-lg shadow-[#DC2626]/20 hover:bg-[#B91C1C] hover:scale-[1.03] transition-all duration-300 ${
            menuOpen || location.pathname === '/zapitvane' ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          Запитване
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Затвори менюто' : 'Отвори менюто'}
          className="group flex items-center gap-3"
        >
          <span
            className="relative w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 shadow-lg bg-[#1A1A1A] text-white group-hover:bg-[#DC2626]"

          >
            <span className={`absolute h-[2px] w-5 bg-current rounded transition-all duration-300 ${menuOpen ? 'rotate-45' : '-translate-y-[4px]'}`} />
            <span className={`absolute h-[2px] w-5 bg-current rounded transition-all duration-300 ${menuOpen ? '-rotate-45' : 'translate-y-[4px]'}`} />
          </span>
        </button>
      </div>

      {/* Меню — цял екран, спуска се отгоре */}
      <div ref={overlayRef} aria-hidden={!menuOpen} className="fixed inset-0 z-40 bg-white flex flex-col will-change-transform">
        <div className="flex-1 flex items-center">
          <div className="section-padding w-full">
            <div className="container-max">
              <nav className="flex flex-col items-end gap-6 lg:gap-7">
                {navLinks.map(link => {
                  const active = location.pathname === link.path
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`menu-item text-lg lg:text-[21px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                        active
                          ? 'text-[#1A1A1A] underline underline-offset-[10px] decoration-[1.5px]'
                          : 'text-[#1A1A1A]/75 hover:text-[#DC2626]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Контакти в основата на менюто */}
        <div className="menu-foot border-t border-[#1A1A1A]/10">
          <div className="section-padding py-6">
            <div className="container-max flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm font-light">
              <div className="flex items-center gap-6">
                <a href="mailto:info@justpablo.bg" className="text-[#DC2626] hover:text-white transition-colors">info@justpablo.bg</a>
                <a href="tel:0887654321" className="text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors">0887 654 321</a>
              </div>
              <div className="text-[#1A1A1A]/55 text-xs uppercase tracking-[0.15em]">Варна — ул. Мария Луиза 47</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
