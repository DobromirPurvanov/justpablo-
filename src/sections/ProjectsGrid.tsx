import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { clipReveal, countUp, imageParallax, reveal } from '../lib/motion'

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
    tagline: 'Изградихме устойчива SEO стратегия за лидер в автомобилните части, която увеличи органичния трафик с над 400%.',
    category: 'Автомобилни части',
    services: ['SEO', 'Уеб дизайн', 'Реклама', 'Анализи'],
    years: '2021 – до сега',
    image: '../images/case-ecommerce.jpg',
    growth: '+420%',
  },
  {
    name: 'Astrafolio',
    tagline: 'От стартиращ проект до разпознаваем бранд в инвестиционния сектор за по-малко от 2 години.',
    category: 'Инвестиции',
    services: ['Брандинг', 'Уеб дизайн', 'SEO', 'Съдържание'],
    years: '2022 – до сега',
    image: './images/case-b2b.jpg',
    growth: '+315%',
  },
  {
    name: 'Arcanum Group',
    tagline: 'Комплексна дигитална стратегия, която утрои онлайн присъствието и утвърди бранда като лидер в нишата.',
    category: 'Консултации',
    services: ['Стратегия', 'SEO', 'Реклама', 'Socials'],
    years: '2020 – до сега',
    image: './images/case-local.jpg',
    growth: 'x3',
  },
  {
    name: 'Dinkovi',
    tagline: 'Семейната строителна фирма се превърна в дигитален лидер в региона с дългосрочна SEO стратегия.',
    category: 'Строителство',
    services: ['SEO', 'Уеб дизайн', 'Фотография', 'Реклама'],
    years: '2019 – до сега',
    image: './images/case-content.jpg',
    growth: '+580%',
  },
  {
    name: 'CC78',
    tagline: 'Постигнахме доминиращи позиции в нишата за електронна търговия чрез комплексна дигитална стратегия.',
    category: 'E-commerce',
    services: ['SEO', 'Реклама', 'Дизайн', 'Анализи'],
    years: '2021 – до сега',
    image: './images/hero-mockup.jpg',
    growth: '100%',
  },
]

/* Almero модел: голяма медия + залепени детайли, които стоят,
   докато медията минава покрай тях */
function PortfolioItem({ project }: { project: Project }) {
  const itemRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = itemRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      const frame = el.querySelector('.pc-frame')
      const wrap = el.querySelector('.pc-imgwrap')
      clipReveal(frame, wrap, el)
      reveal(el.querySelectorAll('.pi-detail'), el, { y: 28, stagger: 0.1, delay: 0.25 })
      const growth = el.querySelector('.pi-growth')
      if (growth) countUp(growth, { trigger: el, delay: 0.45 })
      if (frame && wrap) imageParallax(wrap, frame)

      // Активен проект в центъра на екрана — останалите се приглушават (almero)
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
    <article ref={itemRef} className="section-padding">
      <div className="container-max">
        {/* Име над медията (almero) */}
        <h3 className="pi-detail text-2xl lg:text-4xl font-bold text-[#1A1A1A] mb-5 lg:mb-7">
          {project.name}
        </h3>

        {/* Медия — пълна ширина, кинематографичен формат */}
        <div className="pi-media group cursor-pointer" data-cursor="Виж проекта">
          <div className="pc-frame relative overflow-hidden rounded-xl bg-[#F5F5F5] aspect-[16/10] lg:aspect-[21/10] shadow-sm group-hover:shadow-2xl transition-shadow duration-500">
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Години — вертикално вляво */}
            <div className="absolute left-3 bottom-6">
              <span
                className="text-[10px] font-light text-white/85 tracking-wider whitespace-nowrap drop-shadow"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
              >
                {project.years}
              </span>
            </div>

            {/* Услуги — вертикално вдясно */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <span
                className="text-[9px] font-light text-white/75 tracking-wider whitespace-nowrap drop-shadow"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
              >
                {project.services.join(' / ')}
              </span>
            </div>
          </div>
        </div>

        {/* Детайли под медията: описание вляво, резултатът голям вдясно */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end mt-6 lg:mt-8">
          <div className="pi-detail lg:col-span-7">
            <div className="text-[10px] uppercase tracking-[0.2em] font-light text-[#1A1A1A]/50 mb-3">
              {project.category}
            </div>
            <p className="text-base lg:text-lg font-light text-[#1A1A1A]/75 leading-relaxed max-w-2xl">
              {project.tagline}
            </p>
          </div>
          <div className="pi-detail lg:col-span-5 flex lg:justify-end">
            <div className="lg:text-right">
              <div className="text-xs font-light text-[#1A1A1A]/50 mb-1">Резултат</div>
              <div className="pi-growth text-[clamp(44px,5.5vw,84px)] font-extralight text-[#DC2626] leading-none tracking-tight">
                {project.growth}
              </div>
            </div>
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
      // Гигантското заглавие се плъзга хоризонтално със скрола (almero title-content)
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('.pg-bigtitle',
          { x: '6vw' },
          {
            x: '-12vw',
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
          }
        )
      })
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

      <div className="flex flex-col gap-20 lg:gap-36">
        {projects.map(project => (
          <PortfolioItem key={project.name} project={project} />
        ))}
      </div>
    </section>
  )
}
