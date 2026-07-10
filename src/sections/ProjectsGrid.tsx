import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { clipReveal, countUp, drift, imageParallax, reveal } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  name: string
  tagline: string
  category: string
  services: string[]
  years: string
  image: string
  video?: string
  growth: string
}

const projects: Project[] = [
  {
    name: 'Alpha Motors',
    tagline: 'Лидерът в авточастите, който Google вече не може да подмине',
    category: 'Авточасти / E-commerce',
    services: ['SEO', 'Уеб дизайн', 'Реклама', 'Анализи'],
    years: '2021 – до сега',
    image: './images/case-ecommerce.jpg',
    growth: '+420%',
  },
  {
    name: 'Astrafolio',
    tagline: 'От нулата до разпознаваем инвестиционен бранд за 2 години',
    category: 'Инвестиции',
    services: ['Брандинг', 'Уеб дизайн', 'SEO', 'Съдържание'],
    years: '2022 – до сега',
    image: './images/case-b2b.jpg',
    growth: '+315%',
  },
  {
    name: 'Arcanum Group',
    tagline: 'Консултантите, които клиентите намират първи',
    category: 'Бизнес консултации',
    services: ['Стратегия', 'SEO', 'Реклама', 'Socials'],
    years: '2020 – до сега',
    image: './images/case-local.jpg',
    growth: 'x3',
  },
  {
    name: 'Dinkovi',
    tagline: 'Семейната фирма, станала дигитален лидер в региона',
    category: 'Строителство',
    services: ['SEO', 'Уеб дизайн', 'Фотография', 'Реклама'],
    years: '2019 – до сега',
    image: './images/case-content.jpg',
    growth: '+580%',
  },
  {
    name: 'CC78',
    tagline: 'Топ позициите в нишата — завзети дума по дума',
    category: 'E-commerce',
    services: ['SEO', 'Реклама', 'Дизайн', 'Анализи'],
    years: '2021 – до сега',
    image: './images/hero-mockup.jpg',
    growth: '100%',
  },
]

/* Almero анатомия: малко име отгоре, медия с вертикали,
   голямо получерно изречение + резултат отдолу */
function PortfolioItem({ project }: { project: Project }) {
  const itemRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = itemRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      const frame = el.querySelector('.pc-frame')
      const wrap = el.querySelector('.pc-imgwrap')
      clipReveal(frame, wrap, el)
      reveal(el.querySelectorAll('.pi-detail'), el, { y: 26, stagger: 0.1, delay: 0.2 })
      if (frame && wrap) imageParallax(wrap, frame)

      const growth = el.querySelector('.pi-growth')
      if (growth) countUp(growth, { trigger: el, delay: 0.4 })

      // Активен проект в центъра — останалите се приглушават
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(el, { opacity: 0.45 })
        ScrollTrigger.create({
          trigger: el,
          start: 'top 62%',
          end: 'bottom 38%',
          onToggle: self => gsap.to(el, { opacity: self.isActive ? 1 : 0.45, duration: 0.5, ease: 'power2.out' }),
        })
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <article ref={itemRef}>
      {/* Малко име над медията */}
      <div className="pi-detail text-sm lg:text-base font-bold text-[#1A1A1A] mb-3">
        {project.name}
      </div>

      {/* Медия */}
      <div className="pi-media group cursor-pointer" data-cursor="Виж проекта">
        <div className="pc-frame relative overflow-hidden rounded-lg bg-[#F5F5F5] aspect-video shadow-sm group-hover:shadow-2xl transition-shadow duration-500">
          <div className="pc-imgwrap absolute inset-0 scale-[1.15] will-change-transform">
            {project.video ? (
              <video
                src={project.video}
                poster={project.image}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={project.image}
                alt={project.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Години — вертикално вляво */}
          <div className="absolute left-2.5 bottom-5">
            <span
              className="text-[10px] font-light text-white/85 tracking-wider whitespace-nowrap drop-shadow"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
            >
              {project.years}
            </span>
          </div>

          {/* Услуги — вертикално вдясно */}
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
            <span
              className="text-[9px] font-light text-white/75 tracking-wider whitespace-nowrap drop-shadow"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              {project.services.join(' / ')}
            </span>
          </div>
        </div>
      </div>

      {/* Голямото изречение + резултатът */}
      <div className="flex items-end justify-between gap-6 mt-5">
        <div className="pi-detail">
          <div className="text-[10px] uppercase tracking-[0.18em] font-light text-[#1A1A1A]/50 mb-2">
            {project.category}
          </div>
          <h3 className="text-lg lg:text-[22px] font-bold text-[#1A1A1A] leading-snug max-w-md">
            {project.tagline}
          </h3>
        </div>
        <div className="pi-detail shrink-0 text-right">
          <div className="pi-growth text-3xl lg:text-4xl font-extralight text-[#DC2626] leading-none tracking-tight">
            {project.growth}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function ProjectsGrid() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        // Гигантското заглавие се плъзга хоризонтално
        gsap.fromTo('.pg-bigtitle',
          { x: '6vw' },
          { x: '-12vw', ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 } }
        )
      })
      // Колоните дишат в противоположни посоки (almero)
      const left = el.querySelector('.pg-col-left')
      const right = el.querySelector('.pg-col-right')
      if (left) drift(left, el, { from: 36, to: -36, scrub: 1.2 })
      if (right) drift(right, el, { from: -26, to: 26, scrub: 1.2 })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-white py-16 lg:py-28 overflow-hidden">
      {/* Гигантско плъзгащо се секционно заглавие */}
      <div className="mb-12 lg:mb-20 pointer-events-none select-none">
        <span className="pg-bigtitle block font-ultra-thin whitespace-nowrap text-[clamp(72px,15vw,210px)] leading-none text-[#1A1A1A] will-change-transform">
          &nbsp;Проекти
        </span>
      </div>

      {/* Асиметрична разместена решетка (almero) */}
      <div className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-16">
            <div className="pg-col-left lg:col-span-5 flex flex-col gap-16 lg:gap-28">
              {projects.filter((_, i) => i % 2 === 0).map(p => (
                <PortfolioItem key={p.name} project={p} />
              ))}
            </div>
            <div className="pg-col-right lg:col-span-6 lg:col-start-7 flex flex-col gap-16 lg:gap-28 lg:mt-40">
              {projects.filter((_, i) => i % 2 === 1).map(p => (
                <PortfolioItem key={p.name} project={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
