import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reveal } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

const clientResults = [
  {
    domain: 'alphamotors.bg',
    text: 'Изградихме устойчива SEO стратегия за лидер в автомобилните части, която увеличи органичния трафик с над 400%.',
    result: '+420%',
  },
  {
    domain: 'astrafolio.com',
    text: 'От стартиращ проект до разпознаваем бранд в инвестиционния сектор за по-малко от 2 години.',
    result: '+315%',
  },
  {
    domain: 'arcanumgroup.bg',
    text: 'Комплексна дигитална стратегия, която утрои онлайн присъствието и утвърди бранда като лидер в нишата.',
    result: 'x3',
  },
  {
    domain: 'dinkovi.com',
    text: 'Семейната строителна фирма се превърна в дигитален лидер в региона с дългосрочна SEO стратегия.',
    result: '+580%',
  },
  {
    domain: 'cc78.bg',
    text: 'Постигнахме доминиращи позиции в нишата за електронна търговия чрез комплексна дигитална стратегия.',
    result: '100%',
  },
]

/**
 * Almero-стил секция: на desktop се закача (pin) и резултатите
 * се движат хоризонтално, докато потребителят скролва вертикално.
 * На мобилно остава нормална решетка.
 */
export default function DigitalBanner() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.from('.db-digital', {
        x: -60, opacity: 0, duration: 1.1, ease: 'power3.out', clearProps: 'transform',
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      })

      const mm = gsap.matchMedia()

      // Desktop: pin + хоризонтален скрол
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const track = trackRef.current
        if (!track) return
        const distance = () => track.scrollWidth - (track.parentElement?.clientWidth ?? 0)
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: () => '+=' + distance(),
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      })

      // Мобилно / reduced-motion: обикновен stagger
      mm.add('(max-width: 1023px), (prefers-reduced-motion: reduce)', () => {
        reveal('.result-card', el, { y: 32, stagger: 0.08, start: 'top 80%' })
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-white overflow-hidden">
      <div className="py-20 lg:py-0 lg:h-screen lg:flex lg:flex-col lg:justify-center">
        <div className="section-padding">
          <div className="container-max">
            <div className="mb-12 lg:mb-16">
              <span className="db-digital block font-ultra-thin text-[clamp(80px,15vw,220px)] text-[#1A1A1A] leading-none tracking-tight">
                digital
              </span>
            </div>
          </div>
        </div>

        <div className="lg:overflow-hidden">
          <div
            ref={trackRef}
            className="section-padding grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-10 lg:flex lg:flex-nowrap lg:w-max lg:items-stretch lg:gap-16"
          >
            {clientResults.map((client) => (
              <div key={client.domain} className="result-card group cursor-pointer border-t border-[#1A1A1A]/10 pt-5 lg:w-[400px] lg:shrink-0">
                <div className="text-[clamp(36px,5vw,72px)] font-extralight text-[#DC2626] leading-none mb-4 group-hover:scale-105 origin-left transition-transform duration-300">
                  {client.result}
                </div>
                <div className="text-sm font-semibold text-[#1A1A1A] mb-2 group-hover:text-[#DC2626] transition-colors duration-300">
                  {client.domain}
                </div>
                <p className="text-sm font-light text-[#1A1A1A]/60 leading-relaxed">
                  {client.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
