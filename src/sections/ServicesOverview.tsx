import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { reveal } from '../lib/motion'

const pillars = [
  {
    number: '01',
    title: 'Стратегия и позициониране',
    text: 'Полагаме основите за онлайн успеха на бизнеса ви с изготвяне на цялостна маркетинг стратегия. Определяме конкретни целеви сегменти и потребителски профили. Създаваме дългосрочна комуникационна стратегия за успешно позициониране на бранда онлайн.',
  },
  {
    number: '02',
    title: 'Съдържание и кампании',
    text: 'Създаваме съдържание, което откроява дигиталното ви присъствие и е съобразено със спецификите на вашия бранд. Изготвяме планинг за регулярните кампании, като следим резултатите в реално време, за да адаптираме прецизно комуникацията.',
  },
  {
    number: '03',
    title: 'Резултати и възвръщаемост',
    text: 'Затваряме кръга на потребителското изживяване и оптимизираме възвръщаемостта на инвестициите чрез пълна гама от дигитални услуги. Максимална ефективност, която показва, че вашият бранд е в добри ръце.',
  },
]

// Три концентрични пръстена с услуги (almero стил) — въртят се
// с различни скорости и в различни посоки
const rings = [
  {
    id: 'ring-outer', r: 267.5, spin: 'ring-a',
    text: 'Комуникационна стратегия   /   Целеви аудитории   /   Позициониране   /   Брандинг   /   Инсайти   /   Визуална идентичност   /',
  },
  {
    id: 'ring-mid', r: 239, spin: 'ring-b',
    text: 'Уеб дизайн   /   Фотография   /   Видео   /   Копирайт   /   Google Ads   /   SEO   /   Рекламни кампании   /   Постинг план   /',
  },
  {
    id: 'ring-inner', r: 210.55, spin: 'ring-c',
    text: 'Business Intelligence   /   Автоматизация   /   Криейтив   /   Планинг   /   SMS   /   Viber   /',
  },
]

const circlePath = (r: number) =>
  `M ${280 - r},280 A ${r},${r} 0 1,1 ${280 + r},280 A ${r},${r} 0 1,1 ${280 - r},280`

export default function ServicesOverview() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      reveal('.so-title', el, { y: 40 })
      reveal('.so-circle', el, { scale: 0.94, y: 0, duration: 1 })
      reveal('.so-pillar', el, { stagger: 0.15, delay: 0.15 })

      // Гигантското заглавие се плъзга хоризонтално (almero title-content)
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('.so-bigtitle',
          { x: '6vw' },
          { x: '-12vw', ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 } }
        )
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-white py-20 lg:py-32 relative overflow-hidden">
      {/* Гигантско плъзгащо се секционно заглавие (almero) */}
      <div className="mb-12 lg:mb-20 pointer-events-none select-none">
        <span className="so-bigtitle block font-ultra-thin whitespace-nowrap text-[clamp(72px,15vw,210px)] leading-none text-[#1A1A1A] will-change-transform">
          &nbsp;Услуги
        </span>
      </div>

      <div className="section-padding relative z-10">
        <div className="container-max">
          <div className="so-title mb-16 lg:mb-24 max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.2em] font-light text-[#DC2626]">Как работим</span>
            <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-[#1A1A1A] leading-tight mt-3">
              Поемаме дигиталната трансформация на вашия бизнес
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8 items-start">
            {/* Ляво: три концентрични въртящи се пръстена + централен CTA */}
            <div className="lg:col-span-5">
              <div className="so-circle relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[440px] lg:h-[440px] mx-auto lg:sticky lg:top-32">
                {rings.map(ring => (
                  <div key={ring.id} className={`absolute inset-0 ${ring.spin}`}>
                    <svg viewBox="0 0 560 560" className="w-full h-full">
                      <defs>
                        <path id={ring.id} d={circlePath(ring.r)} fill="none" />
                      </defs>
                      <text fill="#1A1A1A" opacity="0.5" fontSize="16" fontFamily="Montserrat, sans-serif" fontWeight="500" letterSpacing="1.5">
                        <textPath href={`#${ring.id}`}>{ring.text}</textPath>
                      </text>
                    </svg>
                  </div>
                ))}

                {/* Централен CTA */}
                <div className="absolute inset-[27%] rounded-full bg-white/80 backdrop-blur-[2px] flex items-center justify-center">
                  <Link to="/uslugi" data-cursor="Виж повече" className="flex flex-col items-center text-center group px-6">
                    <span className="text-[11px] font-medium text-[#1A1A1A]/50 tracking-wider mb-2">
                      Пътят към успешния бранд
                    </span>
                    <span className="text-base lg:text-lg font-semibold text-[#1A1A1A] group-hover:text-[#DC2626] transition-colors duration-300">
                      Стъпка по стъпка
                    </span>
                    <span className="mt-4 w-10 h-10 rounded-full bg-[#DC2626] flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#DC2626]/30 transition-all duration-300">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Дясно: три номерирани стълба */}
            <div className="lg:col-span-7 flex flex-col">
              {pillars.map(p => (
                <div key={p.number} className="so-pillar grid grid-cols-[auto_1fr] gap-6 lg:gap-10 py-8 lg:py-10 border-t border-[#1A1A1A]/[0.08] first:border-t-0 first:pt-0">
                  <span className="text-3xl lg:text-4xl font-extralight text-[#DC2626]/25 leading-none">{p.number}</span>
                  <div>
                    <h3 className="text-lg lg:text-xl font-semibold text-[#1A1A1A] mb-3">{p.title}</h3>
                    <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed">{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
