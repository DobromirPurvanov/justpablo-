import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import LogoFace from '../components/LogoFace'
import MagneticCta from '../components/MagneticCta'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // При намалено движение показваме hero-то веднага (без entrance),
    // за да не стои заглавието скрито под маската — важно и за LCP.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const tl = gsap.timeline({ delay: 0.2 })
    const lines = titleRef.current?.querySelectorAll('.hero-line')
    if (lines) {
      tl.from(lines, {
        yPercent: 112, duration: 1.1, stagger: 0.12, ease: 'power3.out',
      })
    }
    tl.from('.hero-sub', {
      y: 24, opacity: 0, duration: 0.8, ease: 'power3.out',
    }, '-=0.7')
    tl.from('.face-inner', {
      opacity: 0, scale: 0.94, duration: 1.1, ease: 'power3.out',
    }, '-=0.8')
    tl.from(circleRef.current, {
      scale: 0, opacity: 0, duration: 0.8, ease: 'back.out(1.7)',
    }, '-=0.6')
    return () => { tl.kill() }
  }, [])

  // Паралакс при излизане от hero-то — дълбочина без да пипа entrance-а
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const st = { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1 }
        gsap.to(titleRef.current, { y: -90, ease: 'none', scrollTrigger: st })
        gsap.to(circleRef.current, { y: 70, ease: 'none', scrollTrigger: st })
        gsap.to('.face-inner', { y: 45, ease: 'none', scrollTrigger: st })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen bg-white relative overflow-hidden flex items-center pt-20">
      {/* Elegant background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-[#DC2626]/[0.03] pointer-events-none" />
      
      {/* Decorative floating shapes */}
      <div className="absolute top-[15%] right-[8%] w-[300px] h-[300px] lg:w-[450px] lg:h-[450px] rounded-full bg-[#DC2626]/[0.04] blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[200px] h-[200px] lg:w-[350px] lg:h-[350px] rounded-full bg-[#DC2626]/[0.03] blur-3xl pointer-events-none" />
      
      {/* Интерактивно лого — очите следват мишката */}
      <div className="hidden md:block absolute right-[3%] lg:right-[5%] top-[56%] -translate-y-1/2 w-[clamp(280px,34vw,540px)] z-[5]">
        <div className="face-inner">
          <LogoFace />
        </div>
      </div>

      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="section-padding w-full py-16 lg:py-24 relative z-10">
        <div className="container-max relative">
          {/* Main title - left aligned, ultra thin, large */}
          <h1
            ref={titleRef}
            className="font-ultra-thin text-[clamp(42px,8vw,120px)] text-[#1A1A1A] leading-[1.05] max-w-3xl"
          >
            <span className="block overflow-hidden"><span className="hero-line block">Дигитален</span></span>
            <span className="block overflow-hidden"><span className="hero-line block">маркетинг и</span></span>
            <span className="block overflow-hidden"><span className="hero-line block">бизнес развитие</span></span>
          </h1>

          {/* Subtitle */}
          <p className="hero-sub mt-8 text-base lg:text-lg font-light text-[#1A1A1A]/55 max-w-md leading-relaxed pr-16 md:pr-0">
            JustPablo помага на бизнеса да растете онлайн с ясна стратегия и измерими резултати.
          </p>

          {/* Orange circle CTA - right side on desktop, below text on mobile */}
          <div
            ref={circleRef}
            className="relative md:absolute md:bottom-0 md:right-0 lg:right-12 w-24 h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 mt-8 md:mt-0 md:translate-y-[30%]"
          >
            <MagneticCta className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
