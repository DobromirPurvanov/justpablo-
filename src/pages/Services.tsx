import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { drift, reveal } from '../lib/motion'
import MagneticCta from '../components/MagneticCta'

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

/* ───────────────  Phase Circle — almero стил: плосък кръг,
   вертикална ос с месеци, статистики със swoosh комети  ─────────────── */
function PhaseCircle({ months, period, stats }: {
  months: string[]; period: string; stats: { value: string; label: string }[]
}) {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      const st = { trigger: el, start: 'top 80%', once: true as const }
      gsap.from('.pc-disc', { scale: 0.9, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: st })
      gsap.from('.pc-period', { scale: 0.8, opacity: 0, duration: 0.7, delay: 0.2, ease: 'back.out(1.6)', scrollTrigger: st })
      gsap.from('.pc-month', { opacity: 0, y: 12, duration: 0.45, stagger: 0.06, delay: 0.25, ease: 'power2.out', scrollTrigger: st })
      gsap.from('.pc-swoosh', { scaleX: 0, transformOrigin: 'left center', duration: 0.7, stagger: 0.08, delay: 0.3, ease: 'power3.out', scrollTrigger: st })
      gsap.from('.pc-stat-val', { x: 36, opacity: 0, duration: 0.6, stagger: 0.08, delay: 0.4, ease: 'power3.out', clearProps: 'transform', scrollTrigger: st })
      const circle = el.querySelector('.pc-circle')
      if (circle) drift(circle, el, { from: 18, to: -18, scrub: 1.2 })
    }, el)
    return () => ctx.revert()
  }, [])

  // хоризонтални отмествания на статистиките отдясно (органичното "разбъркано" подреждане)
  const offsets = [8, 120, 64, 104, 0]

  return (
    <div ref={wrapRef} className="relative w-full flex flex-col items-center lg:items-start">
      {/* Кръг + вертикална ос на месеците */}
      <div className="pc-circle relative lg:ml-[4%] py-24">
        {/* месеци по вертикалната ос — средните се скриват зад кръга */}
        <div className="absolute inset-0 z-0">
          {months.map((m, i) => (
            <div
              key={m}
              className="absolute left-1/2"
              style={{
                top: `${(i / Math.max(months.length - 1, 1)) * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <span className="pc-month flex flex-col items-center">
                <span className="text-base lg:text-lg font-bold text-[#1A1A1A] leading-none">{m}</span>
                <span className="text-[10px] font-medium text-[#1A1A1A]/60 mt-0.5">месец</span>
              </span>
            </div>
          ))}
        </div>

        {/* Плосък червен диск */}
        <div className="pc-disc relative z-10 rounded-full bg-[#DC2626] flex items-center justify-center w-[280px] h-[280px] md:w-[340px] md:h-[340px] lg:w-[380px] lg:h-[380px]">
          <span className="pc-period text-white text-4xl md:text-5xl lg:text-6xl font-bold">{period}</span>
        </div>
      </div>

      {/* Статистики — desktop: swoosh комети от десния ръб на екрана */}
      {stats.length > 0 && (
        <div className="hidden lg:flex flex-col justify-center gap-7 absolute right-0 top-1/2 -translate-y-1/2 w-[48%] z-20">
          {stats.map((s, i) => (
            <div key={s.label} className="relative flex items-center justify-end" style={{ paddingRight: offsets[i % offsets.length] }}>
              <svg
                className="pc-swoosh absolute h-16 pointer-events-none"
                style={{ top: '50%', marginTop: '-32px', left: `calc(100% - ${offsets[i % offsets.length]}px - 10px)`, width: '42vw' }}
                viewBox="0 0 400 64"
                preserveAspectRatio="none"
                fill="none"
              >
                <path d="M0,32 C 120,24 250,8 400,0 L400,64 C 250,56 120,40 0,32 Z" fill="#F2F2F2" />
              </svg>
              <div className="pc-stat-val relative z-10 text-right">
                <div className="flex items-center justify-end gap-2">
                  <span className="text-[clamp(30px,3vw,52px)] font-extralight text-[#1A1A1A] leading-none tracking-tight">{s.value}</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] shrink-0" />
                </div>
                <div className="text-xs font-medium text-[#1A1A1A]/60 mt-1.5 mr-4">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Статистики — мобилно: подреден ред под кръга */}
      {stats.length > 0 && (
        <div className="lg:hidden mt-6 flex flex-wrap justify-center gap-x-8 gap-y-4 max-w-md">
          {stats.map(s => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#DC2626] shrink-0" />
              <div>
                <span className="text-lg font-extralight text-[#1A1A1A] leading-none">{s.value}</span>
                <span className="text-[10px] font-medium text-[#1A1A1A]/60 ml-1.5">{s.label}</span>
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

      const mmSteps = gsap.matchMedia()

      // Desktop: закачена сцена — скролът превърта фазите на място (almero стил)
      mmSteps.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const scene = el.querySelector('.phases-scene') as HTMLElement | null
        if (!scene) return
        const steps = gsap.utils.toArray<HTMLElement>('.phase-step', scene)
        const nums = gsap.utils.toArray<HTMLElement>('.rail-num', scene)
        const railLine = scene.querySelector('.rail-line')
        if (steps.length < 2) return

        gsap.set(steps.slice(1), { autoAlpha: 0 })
        gsap.set(nums, { color: 'rgba(26,26,26,0.25)' })
        if (nums[0]) gsap.set(nums[0], { color: '#DC2626' })

        const total = steps.length - 1
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: scene,
            start: 'top top',
            end: () => '+=' + total * window.innerHeight,
            pin: true,
            scrub: 0.6,
            snap: { snapTo: 1 / total, duration: 0.4, ease: 'power2.inOut' },
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })

        steps.forEach((step, i) => {
          if (i === 0) return
          const prev = steps[i - 1]
          const t0 = i - 1
          tl.to(prev.querySelectorAll('.ph-anim'), { y: -40, autoAlpha: 0, duration: 0.35, stagger: 0.03, ease: 'power2.in' }, t0 + 0.05)
            .set(prev, { autoAlpha: 0 }, t0 + 0.5)
            .set(step, { autoAlpha: 1 }, t0 + 0.5)
            .fromTo(step.querySelectorAll('.ph-anim'),
              { y: 46, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.02 }, t0 + 0.52)
          if (nums[i]) tl.to(nums[i], { color: '#DC2626', duration: 0.1 }, t0 + 0.5)
          if (nums[i - 1]) tl.to(nums[i - 1], { color: 'rgba(26,26,26,0.25)', duration: 0.1 }, t0 + 0.5)
        })

        // допълване до точна дължина, за да пасне snap-ът на стъпките
        tl.to({}, { duration: Math.max(0.001, total - tl.duration()) })

        if (railLine) {
          gsap.fromTo(railLine, { scaleY: 0 }, {
            scaleY: 1, ease: 'none', transformOrigin: 'top center',
            scrollTrigger: { trigger: scene, start: 'top top', end: () => '+=' + total * window.innerHeight, scrub: 0.6 },
          })
        }
      })

      // Мобилно / reduced-motion: обикновени каскади
      mmSteps.add('(max-width: 1023px), (prefers-reduced-motion: reduce)', () => {
        gsap.utils.toArray<HTMLElement>('.phase-step').forEach(section => {
          reveal(section.querySelectorAll('.ph-anim'), section, { stagger: 0.1 })
        })
      })

      // Цитат + CTA
      const quote = el.querySelector('.svc-quote')
      if (quote) reveal(quote.querySelectorAll('.q-item'), quote, { stagger: 0.15 })

      // Фонови петна — бавен дрифт за дълбочина
      gsap.utils.toArray<HTMLElement>('.svc-blob').forEach(blob => {
        const sec = blob.closest('section')
        if (sec) drift(blob, sec, { from: 40, to: -40, scrub: 1.5 })
      })

    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="pt-20 overflow-hidden">
      {/* Hero */}
      <section className="svc-hero relative bg-white py-20 lg:py-32 overflow-hidden">
        <div className="svc-blob absolute top-[20%] right-[-10%] w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] rounded-full bg-[#DC2626]/[0.03] blur-3xl pointer-events-none" />
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

      {/* Фази — закачена сцена със стъпки (desktop) / стакнати секции (мобилно) */}
      <section className="phases-scene relative bg-white">
        {/* Прогрес рейл */}
        <div className="hidden lg:flex flex-col items-center gap-5 absolute left-6 xl:left-10 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
          <div className="relative flex flex-col items-center gap-5">
            <div className="rail-line absolute left-1/2 -translate-x-1/2 top-2 bottom-2 w-px bg-[#DC2626]/30" />
            {phases.map(p => (
              <span key={p.number} className="rail-num relative z-10 bg-white py-1 text-xs font-semibold tracking-wider">
                {p.number}
              </span>
            ))}
          </div>
        </div>

        <div className="relative lg:h-screen">
          {phases.map(phase => (
            <div key={phase.number} className="phase-step relative lg:absolute lg:inset-0 py-16 lg:py-0 lg:flex lg:items-center bg-white overflow-hidden">
              <div className="section-padding w-full relative z-10">
                <div className="container-max">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
                    {/* Текст */}
                    <div className="lg:col-span-5">
                      <div className="ph-anim flex items-center gap-4 mb-6">
                        <span className="w-8 h-8 rounded-full bg-[#DC2626] text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {phase.number}
                        </span>
                        <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-[#1A1A1A] leading-tight">{phase.title}</h2>
                      </div>
                      <p className="ph-anim text-sm lg:text-base font-light text-[#1A1A1A]/60 leading-relaxed mb-8">{phase.description}</p>
                      <div className="ph-anim grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                        {phase.services.map((svc) => (
                          <div key={svc.name} className="flex flex-col items-start group">
                            <img src={svc.icon} alt={svc.name} className="w-9 h-9 object-contain mb-3 group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-xs lg:text-sm font-bold text-[#1A1A1A] leading-tight">{svc.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Кръг */}
                    <div className="ph-anim lg:col-span-7">
                      <PhaseCircle months={phase.months} period={phase.period} stats={phase.stats} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Цитат + CTA */}
      <section className="svc-quote relative bg-white py-20 lg:py-32 overflow-hidden">
        <div className="svc-blob absolute top-[20%] left-[-10%] w-[300px] h-[300px] rounded-full bg-[#DC2626]/[0.03] blur-3xl pointer-events-none" />
        <div className="section-padding relative z-10">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="q-item lg:col-span-8">
                <p className="text-xl lg:text-2xl xl:text-3xl font-light text-[#1A1A1A] leading-relaxed italic">
                  &ldquo;Онлайн пазарът е толкова динамичен, че постоянно трябва да правите крачки напред, за да се задържите на върха.&rdquo;
                </p>
              </div>
              <div className="q-item lg:col-span-4 flex justify-center lg:justify-end">
                <MagneticCta className="w-36 h-36 md:w-44 md:h-44 lg:w-48 lg:h-48" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
