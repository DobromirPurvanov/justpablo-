import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import LogoFace from '../components/LogoFace'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 })
    const lines = titleRef.current?.querySelectorAll('.hero-line')
    if (lines) {
      tl.from(lines, {
        y: 60, opacity: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out',
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
      <div className="hidden md:block absolute right-[4%] lg:right-[7%] top-1/2 -translate-y-1/2 w-[clamp(220px,26vw,400px)] z-[5]">
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
            <span className="hero-line block">Дигитален</span>
            <span className="hero-line block">маркетинг и</span>
            <span className="hero-line block">бизнес развитие</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-sub mt-8 text-base lg:text-lg font-light text-[#1A1A1A]/40 max-w-md leading-relaxed pr-16 md:pr-0">
            JustPablo помага на бизнеса да растете онлайн с ясна стратегия и измерими резултати.
          </p>

          {/* Orange circle CTA - right side on desktop, below text on mobile */}
          <div
            ref={circleRef}
            className="relative md:absolute md:bottom-0 md:right-0 lg:right-12 w-24 h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 mt-8 md:mt-0 md:translate-y-[30%]"
          >
            <Link to="/zapitvane" data-cursor="Запитване" className="relative w-full h-full block group">
              {/* Rotating text */}
              <svg viewBox="0 0 144 144" className="absolute inset-0 w-full h-full animate-spin-slow">
                <defs>
                  <path id="heroRing" d="M72,72 m-56,0 a56,56 0 1,1 112,0 a56,56 0 1,1 -112,0" />
                </defs>
                <text fill="#DC2626" fontSize="9" fontFamily="Montserrat, sans-serif" fontWeight="500" letterSpacing="2">
                  <textPath href="#heroRing">
                    ЗАПИТВАНЕ ЗА СЪТРУДНИЧЕСТВО • JUST PABLO •
                  </textPath>
                </text>
              </svg>
              {/* Arrow center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-[#DC2626] rounded-full flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#DC2626]/30 transition-all duration-300">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
