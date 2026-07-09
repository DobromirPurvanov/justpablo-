import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

export default function DigitalBanner() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const digitalTextRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax: big "digital" text moves horizontally with scroll
      if (digitalTextRef.current) {
        gsap.fromTo(digitalTextRef.current,
          { x: -150 },
          {
            x: 100,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        )
      }

      // Parallax: results row moves up with different speeds
      if (resultsRef.current) {
        const items = resultsRef.current.querySelectorAll('.result-card')
        items.forEach((item, i) => {
          gsap.fromTo(item,
            { y: 60 + i * 20 },
            {
              y: -60 - i * 20,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
              },
            }
          )
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-white py-20 lg:py-32 overflow-hidden">
      <div className="section-padding">
        <div className="container-max">
          {/* Giant "digital" text with parallax */}
          <div ref={digitalTextRef} className="mb-16 lg:mb-24">
            <span className="font-ultra-thin text-[clamp(80px,18vw,280px)] text-[#1A1A1A] leading-none tracking-tight">
              digital
            </span>
          </div>

          {/* Horizontal results row */}
          <div
            ref={resultsRef}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-6"
          >
            {clientResults.map((client) => (
              <div key={client.domain} className="result-card group cursor-pointer">
                {/* Big result number */}
                <div className="text-[clamp(36px,5vw,64px)] font-extralight text-[#DC2626] leading-none mb-3 group-hover:scale-105 transition-transform duration-300">
                  {client.result}
                </div>
                {/* Domain */}
                <div className="text-xs font-semibold text-[#1A1A1A] mb-2 group-hover:text-[#DC2626] transition-colors duration-300">
                  {client.domain}
                </div>
                {/* Description */}
                <p className="text-xs font-light text-[#1A1A1A]/60 leading-relaxed">
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
