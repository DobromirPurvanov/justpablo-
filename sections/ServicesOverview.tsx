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

export default function ServicesOverview() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      reveal('.so-title', el, { y: 40 })
      reveal('.so-circle', el, { scale: 0.94, y: 0, duration: 1 })
      reveal('.so-pillar', el, { stagger: 0.15, delay: 0.15 })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-white py-20 lg:py-32 relative overflow-hidden">
      {/* Статичен фонов текст — фин, без движение */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <span className="font-ultra-thin text-[clamp(60px,12vw,180px)] text-[#1A1A1A]/[0.03] tracking-[0.4em] whitespace-nowrap">
          УСЛУГИ
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
            {/* Ляво: чист кръгов CTA елемент — без текст по дъга */}
            <div className="lg:col-span-5">
              <div className="so-circle relative w-[280px] h-[280px] md:w-[360px] md:h-[360px] lg:w-[400px] lg:h-[400px] mx-auto lg:sticky lg:top-32">
                <div className="absolute inset-0 rounded-full border border-[#1A1A1A]/[0.08]" />
                <div className="absolute inset-[11%] rounded-full border border-[#DC2626]/15 border-dashed" />
                <div className="absolute inset-[22%] rounded-full bg-[#DC2626]/[0.03]" />

                {/* Бавно въртящи се точки — декорация без текст */}
                <div className="absolute inset-0 animate-spin-slow">
                  {Array.from({ length: 8 }).map((_, i) => {
                    const a = (i / 8) * Math.PI * 2
                    return (
                      <div key={i}
                        className="absolute w-1.5 h-1.5 rounded-full bg-[#DC2626]/40"
                        style={{
                          left: `${50 + 48 * Math.cos(a)}%`,
                          top: `${50 + 48 * Math.sin(a)}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                    )
                  })}
                </div>

                {/* Централен CTA */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Link to="/uslugi" className="flex flex-col items-center text-center group px-8">
                    <span className="text-xs font-medium text-[#1A1A1A]/50 tracking-wider mb-2">
                      Пътят към успешния бранд
                    </span>
                    <span className="text-lg lg:text-xl font-semibold text-[#1A1A1A] group-hover:text-[#DC2626] transition-colors duration-300">
                      Стъпка по стъпка
                    </span>
                    <span className="mt-4 w-11 h-11 rounded-full bg-[#DC2626] flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#DC2626]/30 transition-all duration-300">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Дясно: три номерирани стълба с ясна структура */}
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
