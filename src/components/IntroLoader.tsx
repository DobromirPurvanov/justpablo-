import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { markIntroDone } from '../lib/intro'

const SEEN_KEY = 'jp-intro-seen'

/**
 * Интро на цял екран: анимираното лого върху бяло, ~3 секунди,
 * после завесата се вдига и разкрива сайта. Веднъж на сесия,
 * прескача се с клик, не се показва при reduced-motion.
 */
export default function IntroLoader() {
  const [active, setActive] = useState(() => {
    if (typeof window === 'undefined') return false
    const seen = sessionStorage.getItem(SEEN_KEY)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return !seen && !reduced
  })
  const overlayRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const exitRef = useRef<() => void>(() => {})
  const exiting = useRef(false)

  useEffect(() => {
    if (!active) {
      markIntroDone()
      return
    }
    document.documentElement.style.overflow = 'hidden'

    const exit = () => {
      if (exiting.current) return
      exiting.current = true
      sessionStorage.setItem(SEEN_KEY, '1')
      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = ''
          setActive(false)
        },
      })
      tl.to(videoRef.current, { yPercent: -16, duration: 0.9, ease: 'power4.inOut' }, 0)
        .to(overlayRef.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, 0)
        .call(markIntroDone, [], 0.35)
    }
    exitRef.current = exit

    const t1 = window.setTimeout(exit, 2900)
    const t2 = window.setTimeout(exit, 4800) // предпазен таван
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      document.documentElement.style.overflow = ''
    }
  }, [active])

  if (!active) return null

  return (
    <div
      ref={overlayRef}
      onClick={() => exitRef.current()}
      className="fixed inset-0 z-[90] bg-white flex items-center justify-center cursor-pointer"
    >
      <video
        ref={videoRef}
        src="/videos/logo-loop.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onError={() => exitRef.current()}
        className="w-[min(88vw,78vh)] max-w-[640px]"
      />
      <span className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-[#1A1A1A]/30 whitespace-nowrap">
        Just Pablo Digital
      </span>
    </div>
  )
}
