import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reveal } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

const phases = [
  {
    number: '01',
    title: 'Получавате яснота за вашето дигитално позициониране',
    description: 'Запознаваме се с бизнеса ви, проучваме аудиторията и конкуренцията.',
    services: [
      { name: 'Маркетинг стратегия', icon: './icons/marketing-strategy.png' },
      { name: 'Дизайн и брандинг', icon: './icons/design-branding.png' },
    ],
    months: ['01', '02', '03'],
    period: 'начало',
    stats: [],
  },
  {
    number: '02',
    title: 'Съдържание и структура, съобразени с потребителското преживяване',
    description: 'Професионално заснети и обработени снимки, видеа и структурирано съдържание.',
    services: [
      { name: 'Уеб дизайн', icon: './icons/web-design.png' },
      { name: 'Фотография', icon: './icons/photography.png' },
      { name: 'Видео и анимации', icon: './icons/video-animation.png' },
      { name: 'Копирайт', icon: './icons/copywriting.png' },
    ],
    months: ['01', '02', '03', '04', '05'],
    period: '3 м.',
    stats: [
      { value: '28%', label: 'Криейтив' },
      { value: '5%', label: 'Съдържание' },
      { value: '15%', label: 'Разработка' },
      { value: '5%', label: 'Реклама' },
      { value: '35%', label: 'Анализи' },
    ],
  },
  {
    number: '03',
    title: 'Свеж поглед към вашия бизнес',
    description: 'Време е да помогнем на потребителите да ви запомнят с рекламни кампании.',
    services: [
      { name: 'Social ads', icon: './icons/social-ads.png' },
      { name: 'Google ads', icon: './icons/google-ads.png' },
      { name: 'SEO', icon: './icons/seo.png' },
      { name: 'E-mail', icon: './icons/email-marketing.png' },
    ],
    months: ['03', '04', '05', '06', '07', '08', '09'],
    period: '6 м.',
    stats: [
      { value: '16%', label: 'Криейтив' },
      { value: '32%', label: 'Съдържание' },
      { value: '38%', label: 'Разработка' },
      { value: '3%', label: 'Реклама' },
      { value: '11%', label: 'Анализи' },
    ],
  },
  {
    number: '04',
    title: 'Подобрена механика, която генерира печалби',
    description: 'Вече разполагате с качествено работещ цикъл от маркетинг услуги.',
    services: [
      { name: 'Планинг', icon: './icons/planning.png' },
      { name: 'Social ads', icon: './icons/social-ads.png' },
      { name: 'E-mail', icon: './icons/email-marketing.png' },
      { name: 'BI', icon: './icons/business-intelligence.png' },
    ],
    months: ['10', '11', '12', '13', '14'],
    period: '9 м.',
    stats: [
      { value: '34%', label: 'Криейтив' },
      { value: '25%', label: 'Съдържание' },
      { value: '13%', label: 'Разработка' },
      { value: '23%', label: 'Реклама' },
      { value: '5%', label: 'Анализи' },
    ],
  },
  {
    number: '05',
    title: 'Управляеми резултати',
    description: 'Фаза на висока ефективност. Работим с напълно развита инфраструктура.',
    services: [
      { name: 'BI', icon: './icons/business-intelligence.png' },
      { name: 'Планинг', icon: './icons/planning.png' },
      { name: 'Дизайн', icon: './icons/design-branding.png' },
      { name: 'Фото', icon: './icons/photography.png' },
    ],
    months: ['15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
    period: '1 г.',
    stats: [
      { value: '27%', label: 'Криейтив' },
      { value: '4%', label: 'Съдържание' },
      { value: '4%', label: 'Разработка' },
      { value: '23%', label: 'Реклама' },
      { value: '29%', label: 'Анализи' },
    ],
  },
]

/* ───────────────  Phase Circle (чист, без scrub)  ─────────────── */
function PhaseCircle({ months, period, stats }: {
  months: string[]; period: string; stats: { value: string; label: string }[]
}) {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      const st = { trigger: el, start: 'top 80%', once: true as const }
      gsap.from('.pc-disc', { scale: 0.92, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: st })
      gsap.from('.pc-period', { scale: 0.8, opacity: 0, duration: 0.7, delay: 0.2, ease: 'back.out(1.6)', scrollTrigger: st })
      gsap.from('.pc-month', { opacity: 0, scale: 0.5, duration: 0.45, stagger: 0.05, delay: 0.3, ease: 'power2.out', scrollTrigger: st })
      gsap.from('.pc-stat', { y: 14, opacity: 0, duration: 0.6, stagger: 0.07, delay: 0.45, ease: 'power3.out', clearProps: 'transform', scrollTrigger: st })
    }, el)
    return () => ctx.revert()
  }, [])

  const sizeClasses = months.length > 9
    ? 'w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[440px] lg:h-[440px]'
    : months.length > 5
      ? 'w-[280px] h-[280px] md:w-[360px] md:h-[360px] lg:w-[400px] lg:h-[400px]'
      : 'w-[260px] h-[260px] md:w-[320px] md:h-[320px] lg:w-[360px] lg:h-[360px]'

  return (
    <div ref={wrapRef} className="flex flex-col items-center">
      <div className={`relative ${sizeClasses}`}>
        <div className="pc-disc absolute inset-0">
          {/* Диск с градиент */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#DC2626] to-[#B91C1C] shadow-xl shadow-[#DC2626]/20" />
          <div className="absolute inset-[10%] rounded-full border border-white/10" />
          <div className="absolute inset-[20%] rounded-full border border-white/5" />

          {/* Декоративни точки — бавно въртене (само точки, без текст) */}
          <div className="absolute inset-0 animate-spin-slow">
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i / 12) * Math.PI * 2
              return (
                <div key={`dot-${i}`}
                  className="absolute w-1 h-1 rounded-full bg-white/25"
                  style={{
                    left: `${50 + 47 * Math.cos(a)}%`,
                    top: `${50 + 47 * Math.sin(a)}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              )
            })}
          </div>
        </div>

        {/* Централен период */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <span className="pc-period text-white text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-md">{period}</span>
        </div>

        {/* Месеци около кръга — изправени, равномерно разпределени */}
        {months.map((m, i) => {
          const angle = -Math.PI / 2 + (i / months.length) * Math.PI * 2
          return (
            <div key={m}
              className="absolute z-10"
              style={{
                left: `${50 + 40 * Math.cos(angle)}%`,
                top: `${50 + 40 * Math.sin(angle)}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <span className="pc-month flex flex-col items-center">
                <span className="text-sm lg:text-base font-bold text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{m}</span>
                <span className="text-[8px] lg:text-[9px] uppercase tracking-wider font-medium text-white/90" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>месец</span>
              </span>
            </div>
          )
        })}
      </div>

      {/* Статистики — подреден ред под кръга, еднакво на всички екрани */}
      {stats.length > 0 && (
        <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 max-w-md">
          {stats.map(s => (
            <div key={s.label} className="pc-stat flex items-center gap-2">
              <svg width="24" height="18" viewBox="0 0 24 18" className="overflow-visible shrink-0">
                <line x1="0" y1="9" x2="20" y2="9" stroke="#E5E5E5" strokeWidth="1" />
                <circle cx="20" cy="9" r="3" fill="#DC2626" />
              </svg>
              <div className="text-left">
                <div className="text-lg lg:text-xl font-extralight text-[#1A1A1A] leading-none">{s.value}</div>
                <div className="text-[10px] font-medium text-[#1A1A1A]/60 mt-0.5">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Services() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = pageRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      // Hero
      reveal('.svc-hero-title', el.querySelector('.svc-hero'), { y: 40, duration: 1 })
      reveal('.svc-hero-sub', el.querySelector('.svc-hero'), { y: 28, delay: 0.2 })

      // Всяка фаза: заглавие -> описание -> икони, с еднакъв ритъм
      gsap.utils.toArray<HTMLElement>('.phase-section').forEach(section => {
        reveal(section.querySelectorAll('.ph-title, .ph-desc'), section, { stagger: 0.12 })
        reveal(section.querySelectorAll('.ph-icon'), section, { y: 20, stagger: 0.08, delay: 0.25, duration: 0.6 })
      })

      // Цитат + CTA
      const quote = el.querySelector('.svc-quote')
      if (quote) reveal(quote.querySelectorAll('.q-item'), quote, { stagger: 0.15 })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="pt-20 overflow-hidden">
      {/* Hero */}
      <section className="svc-hero relative bg-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] rounded-full bg-[#DC2626]/[0.03] blur-3xl pointer-events-none" />
        <div className="section-padding relative z-10">
          <div className="container-max">
            <div className="svc-hero-title max-w-3xl">
              <span className="text-[10px] uppercase tracking-[0.2em] font-light text-[#DC2626] mb-4 block">Нашият процес</span>
              <h1 className="font-thin-display text-[clamp(36px,5.5vw,72px)] text-[#1A1A1A] leading-[1.05] mb-8">
                Как изглежда следващата 1 година за вашия бранд
              </h1>
            </div>
            <p className="svc-hero-sub text-base lg:text-lg font-light text-[#1A1A1A]/50 leading-relaxed max-w-xl">
              Смелите ви мечти се превръщат в планове и действия, разпределени по етапи във времето.
            </p>
          </div>
        </div>
      </section>

      {/* Фази със свързваща линия */}
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#DC2626]/20 via-[#DC2626]/10 to-transparent hidden lg:block" />

        {phases.map((phase, idx) => (
          <section key={phase.number} className="phase-section relative bg-white py-16 lg:py-24 overflow-hidden">
            <div className="absolute top-8 left-1/2 -translate-x-1/2 hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-[#DC2626] text-white text-xs font-bold z-10">
              {phase.number}
            </div>

            <div className="section-padding relative z-10">
              <div className="container-max">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
                  {/* Текст */}
                  <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="ph-title flex items-center gap-4 mb-6">
                      <span className="lg:hidden w-8 h-8 rounded-full bg-[#DC2626] text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {phase.number}
                      </span>
                      <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-[#1A1A1A] leading-tight">{phase.title}</h2>
                    </div>
                    <p className="ph-desc text-sm lg:text-base font-light text-[#1A1A1A]/60 leading-relaxed mb-8">{phase.description}</p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                      {phase.services.map((svc) => (
                        <div key={svc.name} className="ph-icon flex flex-col items-start group">
                          <div className="w-12 h-12 rounded-xl bg-[#F5F5F5] group-hover:bg-[#DC2626]/10 flex items-center justify-center mb-2 transition-colors duration-300">
                            <img src={svc.icon} alt={svc.name} className="w-6 h-6 object-contain" />
                          </div>
                          <span className="text-xs lg:text-sm font-semibold text-[#1A1A1A] leading-tight">{svc.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Кръг */}
                  <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <PhaseCircle months={phase.months} period={phase.period} stats={phase.stats} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Цитат + CTA */}
      <section className="svc-quote relative bg-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] rounded-full bg-[#DC2626]/[0.03] blur-3xl pointer-events-none" />
        <div className="section-padding relative z-10">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="q-item lg:col-span-8">
                <p className="text-xl lg:text-2xl xl:text-3xl font-light text-[#1A1A1A] leading-relaxed italic">
                  &ldquo;Онлайн пазарът е толкова динамичен, че постоянно трябва да правите крачки напред, за да се задържите на върха.&rdquo;
                </p>
              </div>
              <div className="q-item lg:col-span-4 flex justify-center lg:justify-end">
                <Link to="/zapitvane" className="group relative w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 flex items-center justify-center">
                  <svg viewBox="0 0 180 180" className="absolute inset-0 w-full h-full animate-spin-slow">
                    <defs>
                      <path id="ctaCircleSvc" d="M 90, 90 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" />
                    </defs>
                    <text className="fill-[#DC2626] text-[9px] font-medium tracking-[0.15em] uppercase">
                      <textPath href="#ctaCircleSvc">Направи запитване &bull; JustPablo &bull; </textPath>
                    </text>
                  </svg>
                  <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-[#DC2626] rounded-full flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#DC2626]/30 transition-all duration-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
