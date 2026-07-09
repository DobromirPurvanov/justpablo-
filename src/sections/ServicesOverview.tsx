import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const servicesRing = [
  'Комуникационна стратегия',
  'Инсайти',
  'Брандинг',
  'Визуална идентичност',
  'Постинг план',
  'SMS',
  'Viber маркетинг',
  'E-mail маркетинг',
  'Business intelligence',
  'Анализ на ефективността',
  'Прогнози за развитие',
  'Видео за социални мрежи',
  'Фотография',
  'Дизайн и брандинг',
  'Маркетинг автоматизация',
  'Криейтив',
  'Ключови предимства',
  'Google ads',
  'Планинг',
  'SEO оптимизация',
  'Рекламни кампании',
  'Омниканален маркетинг',
]

export default function ServicesOverview() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLDivElement>(null)
  const bgTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Giant "УСЛУГИ" text with parallax
      gsap.fromTo(titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      )

      // Background "УСЛУГИ" text parallax - moves slower
      if (bgTextRef.current) {
        gsap.fromTo(bgTextRef.current,
          { y: 80 },
          {
            y: -80,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            },
          }
        )
      }

      // Circle with services - parallax rotation
      gsap.fromTo(circleRef.current,
        { scale: 0.85, opacity: 0, rotation: -15 },
        {
          scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: circleRef.current, start: 'top 80%' },
        }
      )

      // Continuous parallax rotation on circle while scrolling
      gsap.to(circleRef.current, {
        rotation: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      // Description columns with parallax stagger
      if (descRef.current) {
        const cols = descRef.current.querySelectorAll('.desc-col')
        gsap.from(cols, {
          scrollTrigger: { trigger: descRef.current, start: 'top 85%' },
          y: 50, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power2.out',
        })

        // Parallax: each column moves at different speed
        cols.forEach((col, i) => {
          gsap.fromTo(col,
            { y: 30 + i * 15 },
            {
              y: -30 - i * 15,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5 + i * 0.3,
              },
            }
          )
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-white py-20 lg:py-32 relative overflow-hidden">
      {/* Giant "УСЛУГИ" scattered background text with parallax */}
      <div ref={bgTextRef} className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <span className="font-ultra-thin text-[clamp(60px,12vw,180px)] text-[#1A1A1A]/[0.04] tracking-[0.4em] whitespace-nowrap">
          УСЛУГИ
        </span>
      </div>

      <div className="section-padding relative z-10">
        <div className="container-max">
          {/* Main title */}
          <div ref={titleRef} className="mb-16 lg:mb-24 max-w-xl">
            <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-[#1A1A1A] leading-tight">
              Поемаме дигиталната трансформация на вашия бизнес
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            {/* Left: Semi-circle with services */}
            <div className="lg:col-span-5" ref={circleRef}>
              <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] lg:w-[460px] lg:h-[460px] mx-auto hover:scale-[1.02] transition-transform duration-500">
                {/* Semi-circle arc with service names */}
                <svg viewBox="0 0 460 460" className="absolute inset-0 w-full h-full">
                  <defs>
                    <path
                      id="serviceArc"
                      d="M 40,230 A 190,190 0 1,1 420,230 A 190,190 0 1,1 40,230"
                      fill="none"
                    />
                  </defs>
                  <text fill="#DC2626" fontSize="11" fontFamily="Montserrat, sans-serif" fontWeight="500" letterSpacing="0.8">
                    <textPath href="#serviceArc" startOffset="2%">
                      {servicesRing.join('  /  ')}
                    </textPath>
                  </text>
                </svg>

                {/* Center CTA */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Link
                    to="/uslugi"
                    className="flex flex-col items-center text-center group"
                  >
                    <span className="text-xs font-medium text-[#1A1A1A]/50 tracking-wider mb-2">
                      Пътят към успешния бранд
                    </span>
                    <span className="text-lg font-semibold text-[#1A1A1A] group-hover:text-[#DC2626] transition-colors">
                      Стъпка по стъпка
                    </span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mt-2 text-[#DC2626]">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Description columns */}
            <div ref={descRef} className="lg:col-span-7 flex flex-col gap-8 lg:pt-12">
              <div className="desc-col">
                <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                  Полагаме основите за онлайн успеха на бизнеса ви с изготвяне на цялостна маркетинг стратегия. Определяме конкретни целеви сегменти и потребителски профили. Създаваме дългосрочна комуникационна стратегия за успешно позициониране на бранда онлайн.
                </p>
              </div>
              <div className="desc-col">
                <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                  Създаваме съдържание, което откроява дигиталното ви присъствие и е съобразено със спецификите на вашия бранд. Изготвяме планинг за регулярните кампании, като следим резултатите в реално време, за да адаптираме прецизно комуникацията.
                </p>
              </div>
              <div className="desc-col">
                <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                  Затваряме кръга на потребителското изживяване и оптимизираме възвръщаемостта на инвестициите чрез пълна гама от дигитални услуги. Максимална ефективност, която показва, че вашият бранд е в добри ръце.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
