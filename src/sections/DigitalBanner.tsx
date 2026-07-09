import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { driftX, reveal } from '../lib/motion'

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

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      // Голямото "digital" — леко плъзгане отляво, веднъж
      gsap.from('.db-digital', {
        x: -60, opacity: 0, duration: 1.1, ease: 'power3.out', clearProps: 'transform',
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      })
      // Резултатите — подреден stagger, всички в една равнина
      reveal('.result-card', el, { y: 32, stagger: 0.08, delay: 0.2, start: 'top 75%' })
      // Дрифт на обвивката — дълбочина без конфликт с entrance-а
      driftX('.db-drift', el, { from: -40, to: 40 })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-white py-20 lg:py-32 overflow-hidden">
      <div className="section-padding">
        <div className="container-max">
          <div className="db-drift mb-16 lg:mb-24">
            <span className="db-digital block font-ultra-thin text-[clamp(80px,18vw,280px)] text-[#1A1A1A] leading-none tracking-tight">
              digital
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
            {clientResults.map((client) => (
              <div key={client.domain} className="result-card group cursor-pointer border-t border-[#1A1A1A]/10 pt-5">
                <div className="text-[clamp(36px,5vw,64px)] font-extralight text-[#DC2626] leading-none mb-3 group-hover:scale-105 origin-left transition-transform duration-300">
                  {client.result}
                </div>
                <div className="text-xs font-semibold text-[#1A1A1A] mb-2 group-hover:text-[#DC2626] transition-colors duration-300">
                  {client.domain}
                </div>
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
