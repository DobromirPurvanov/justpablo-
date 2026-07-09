import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router'
import gsap from 'gsap'

const navLinks = [
  { path: '/', label: 'Начало' },
  { path: '/uslugi', label: 'Услуги' },
  { path: '/rezultati', label: 'Резултати' },
  { path: '/strategiya', label: 'Стратегия' },
  { path: '/ceni', label: 'Цени' },
  { path: '/zapitvane', label: 'Запитване' },
]

export default function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // Hide when scrolling down past hero (about 100px), show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScrollY.current = currentScrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // GSAP animate menu items on open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      gsap.fromTo('.menu-item',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.4, ease: 'power2.out', delay: 0.15 }
      )
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      {/* Fixed Logo - always visible */}
      <Link to="/" className="fixed top-6 left-6 z-50 flex items-center gap-3">
        <div className="w-10 h-10 relative">
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
            <path d="M20 2C20 2 8 8 8 20C8 32 20 38 20 38C20 38 32 32 32 20C32 8 20 2 20 2Z" fill="#DC2626" />
            <circle cx="20" cy="18" r="6" fill="white"/>
            <circle cx="20" cy="26" r="3" fill="white"/>
          </svg>
        </div>
        <span className="text-xl font-semibold tracking-tight text-[#1A1A1A]">JustPablo</span>
      </Link>

      {/* Desktop Vertical Navigation - Right Side - hides on scroll down */}
      <nav
        className={`fixed top-1/2 -translate-y-1/2 right-6 lg:right-10 z-40 hidden md:flex flex-col items-end gap-3 transition-all duration-500 ${
          hidden ? 'opacity-0 translate-x-8 pointer-events-none' : 'opacity-100 translate-x-0'
        }`}
      >
        {navLinks.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-[12px] uppercase tracking-[0.18em] font-light transition-colors duration-300 ${
              location.pathname === link.path
                ? 'text-[#DC2626] font-normal'
                : 'text-[#1A1A1A]/80 hover:text-[#1A1A1A]'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Mobile: Hamburger button - bottom right, always visible */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#1A1A1A] text-white rounded-full flex md:hidden items-center justify-center hover:bg-[#DC2626] transition-colors duration-300"
      >
        {menuOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="6" y1="18" x2="18" y2="6" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="8" x2="20" y2="8" />
            <line x1="4" y1="16" x2="20" y2="16" />
          </svg>
        )}
      </button>

      {/* Mobile Fullscreen menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#1A1A1A] flex items-center justify-center md:hidden">
          <nav className="flex flex-col items-center gap-5">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`menu-item text-2xl font-extralight tracking-wide transition-colors duration-300 ${
                  location.pathname === link.path ? 'text-[#DC2626]' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
