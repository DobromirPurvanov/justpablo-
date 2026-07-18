import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import SmoothScroll from './components/SmoothScroll'
import CustomCursor from './components/CustomCursor'
import { applyRouteMeta } from './lib/meta'

// Началната страница (LCP) се зарежда веднага; останалите се разделят на
// отделни chunk-ове и се зареждат при нужда, за да олекне първоначалният JS.
const AboutPage = lazy(() => import('./pages/AboutPage'))
const Services = lazy(() => import('./pages/Services'))
const Results = lazy(() => import('./pages/Results'))
const Strategy = lazy(() => import('./pages/Strategy'))
const DigitalAnalysis = lazy(() => import('./pages/DigitalAnalysis'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Contact = lazy(() => import('./pages/Contact'))
const CookiesPage = lazy(() => import('./pages/CookiesPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

gsap.registerPlugin(ScrollTrigger)

/**
 * Преходи между страници (almero): тъмна завеса се вдига отдолу,
 * страницата се сменя под нея, завесата излита нагоре.
 * Старата страница стои видима, докато завесата не я покрие.
 */
function AnimatedRoutes() {
  const location = useLocation()
  const [displayLoc, setDisplayLoc] = useState(location)
  const curtainRef = useRef<HTMLDivElement>(null)
  const animating = useRef(false)

  useEffect(() => {
    if (location.pathname === displayLoc.pathname) return
    const c = curtainRef.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!c || reduced) {
      window.scrollTo(0, 0)
      setDisplayLoc(location)
      requestAnimationFrame(() => ScrollTrigger.refresh())
      return
    }
    if (animating.current) {
      // при бърза втора навигация: смени директно под завесата
      window.scrollTo(0, 0)
      setDisplayLoc(location)
      return
    }
    animating.current = true
    const tl = gsap.timeline({ onComplete: () => { animating.current = false } })
    tl.set(c, { yPercent: 100, autoAlpha: 1 })
      .to(c, { yPercent: 0, duration: 0.45, ease: 'power3.in' })
      .add(() => {
        window.scrollTo(0, 0)
        setDisplayLoc(location)
        requestAnimationFrame(() => ScrollTrigger.refresh())
      })
      .to(c, { yPercent: -100, duration: 0.6, ease: 'power3.out', delay: 0.12 })
      .set(c, { autoAlpha: 0 })
  }, [location, displayLoc])

  // SEO мета за текущия маршрут (SPA — index.html носи само началната страница).
  useEffect(() => {
    applyRouteMeta(location.pathname)
  }, [location.pathname])

  return (
    <>
      <div
        ref={curtainRef}
        aria-hidden="true"
        className="fixed inset-0 z-[80] bg-[#1A1A1A] invisible flex items-center justify-center pointer-events-none"
      >
        <img src="/images/logo-mark-white.png" alt="" className="w-14 h-14 opacity-70" />
      </div>
      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <Routes location={displayLoc}>
          <Route path="/" element={<Home />} />
          <Route path="/za-nas" element={<AboutPage />} />
          <Route path="/uslugi" element={<Services />} />
          <Route path="/rezultati" element={<Results />} />
          <Route path="/strategiya" element={<Strategy />} />
          <Route path="/analiz" element={<DigitalAnalysis />} />
          <Route path="/ceni" element={<Pricing />} />
          <Route path="/zapitvane" element={<Contact />} />
          <Route path="/biskvitki" element={<CookiesPage />} />
          <Route path="/poveritelnost" element={<PrivacyPage />} />
          <Route path="/usloviya" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default function App() {
  return (
    <SmoothScroll>
    <div className="min-h-screen bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-[#1A1A1A] focus:text-white focus:px-4 focus:py-2 focus:rounded-full focus:text-sm"
      >
        Към съдържанието
      </a>
      <Navbar />
      <main id="main-content">
        <AnimatedRoutes />
      </main>
      <Footer />
      <CookieBanner />
    </div>
    <CustomCursor />
    </SmoothScroll>
  )
}
