import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  name: string
  tagline: string
  category: string
  services: string[]
  years: string
  image: string
  logo?: string
}

const projects: Project[] = [
  {
    name: 'Alpha Motors',
    tagline: 'Лидер в автомобилните части с устойчива SEO стратегия и 420% ръст в трафика.',
    category: 'Автомобилни части',
    services: ['SEO', 'Уеб дизайн', 'Реклама', 'Анализи'],
    years: '2021 – до сега',
    image: '../images/case-ecommerce.jpg',
    logo: 'AM',
  },
  {
    name: 'Astrafolio',
    tagline: 'От стартиращ проект до разпознаваем бранд в инвестиционния сектор.',
    category: 'Инвестиции',
    services: ['Брандинг', 'Уеб дизайн', 'SEO', 'Съдържание'],
    years: '2022 – до сега',
    image: './images/case-b2b.jpg',
    logo: 'AF',
  },
  {
    name: 'Arcanum Group',
    tagline: 'Комплексна дигитална стратегия, която утрои онлайн присъствието.',
    category: 'Консултации',
    services: ['Стратегия', 'SEO', 'Реклама', 'Socials'],
    years: '2020 – до сега',
    image: './images/case-local.jpg',
    logo: 'AG',
  },
  {
    name: 'Dinkovi',
    tagline: 'Семейната строителна фирма се превърна в дигитален лидер в региона.',
    category: 'Строителство',
    services: ['SEO', 'Уеб дизайн', 'Фотография', 'Реклама'],
    years: '2019 – до сега',
    image: './images/case-content.jpg',
    logo: 'D',
  },
  {
    name: 'CC78',
    tagline: 'Доминиращи позиции в нишата за електронна търговия.',
    category: 'E-commerce',
    services: ['SEO', 'Реклама', 'Дизайн', 'Анализи'],
    years: '2021 – до сега',
    image: './images/hero-mockup.jpg',
    logo: 'CC78',
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return
    gsap.from(cardRef.current, {
      scrollTrigger: { trigger: cardRef.current, start: 'top 88%', once: true },
      y: 36, opacity: 0, duration: 0.8, ease: 'power3.out', clearProps: 'transform',
    })
  }, [index])

  return (
    <div ref={cardRef} className="group cursor-pointer relative">
      {/* Image */}
      <div className="relative overflow-hidden bg-[#F5F5F5] rounded-lg shadow-sm group-hover:shadow-xl transition-shadow duration-500">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Vertical year text on left */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <span
            className="text-[10px] font-light text-white/80 tracking-wider whitespace-nowrap"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
          >
            {project.years}
          </span>
        </div>
        {/* Vertical services text on right */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <span
            className="text-[9px] font-light text-white/70 tracking-wider whitespace-nowrap"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            {project.services.join(' / ')}
          </span>
        </div>
      </div>

      {/* Info below */}
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-[#1A1A1A] group-hover:text-[#DC2626] transition-colors">
            {project.name}
          </h3>
          <p className="text-sm font-light text-[#1A1A1A]/70 mt-1 max-w-sm leading-relaxed">
            {project.tagline}
          </p>
        </div>
        {project.logo && (
          <div className="text-[10px] font-semibold text-[#1A1A1A]/30 tracking-widest shrink-0 mt-1">
            {project.logo}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ProjectsGrid() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={sectionRef} className="bg-white py-16 lg:py-24 relative overflow-hidden">
      {/* Giant "ПРОЕКТИ" background text with parallax */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <span className="font-ultra-thin text-[clamp(100px,20vw,280px)] text-[#1A1A1A]/[0.04] tracking-[0.3em] whitespace-nowrap">
          ПРОЕКТИ
        </span>
      </div>

      <div className="section-padding relative z-10">
        <div className="container-max">
          {/* Section label */}
          <div className="mb-10">
            <span className="text-xs font-semibold text-[#1A1A1A] tracking-wider">Проекти</span>
          </div>

          {/* Asymmetric grid matching almero */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left column - 2 stacked */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
              <ProjectCard project={projects[0]} index={0} />
              <ProjectCard project={projects[4]} index={4} />
            </div>

            {/* Spacer for visual offset */}
            <div className="hidden lg:block lg:col-span-1" />

            {/* Right column - 2 stacked with offset */}
            <div className="lg:col-span-6 flex flex-col gap-6 lg:gap-8 lg:mt-24">
              <ProjectCard project={projects[1]} index={1} />
              <ProjectCard project={projects[3]} index={3} />
            </div>
          </div>

          {/* Bottom row - single center */}
          <div className="mt-6 lg:mt-8 max-w-2xl mx-auto">
            <ProjectCard project={projects[2]} index={2} />
          </div>
        </div>
      </div>
    </section>
  )
}
