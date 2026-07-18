import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { registerLenis } from '../lib/scroll'

gsap.registerPlugin(ScrollTrigger)

/**
 * Инерционен smooth scroll (Lenis) + синхронизация с GSAP ScrollTrigger.
 * Това е основата на "premium" усещането — всички паралакс ефекти стъпват върху него.
 * При prefers-reduced-motion не се включва изобщо.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    lenisRef.current = lenis
    registerLenis(lenis)

    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisRef.current = null
      registerLenis(null)
    }
  }, [])


  return <>{children}</>
}
