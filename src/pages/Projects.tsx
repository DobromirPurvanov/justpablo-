import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { name: 'Alphamotors.bg', years: '2022 — 2025', services: ['SEO + Content', 'Link Building', 'Google Ads'], description: 'Лидер в онлайн търговията с автомобилни части. Постигнахме устойчив растеж и доминация в нишата.', image: '/images/case-ecommerce.jpg', result: '+420%' },
  { name: 'Astrafolio', years: '2023 — 2025', services: ['Web Design', 'SEO', 'Social Media'], description: 'Инвестиционна платформа с иновативен подход. Построихме доверие и видимост от нулата.', image: '/images/case-b2b.jpg', result: '+315%' },
  { name: 'dinkovi.com', years: '2018 — до сега', services: ['SEO', 'Content Strategy', 'Local SEO'], description: 'Семейна традиция в строителство, превърната в дигитален бранд-лидер в региона.', image: '/images/case-local.jpg', result: '+580%' },
  { name: 'hansel and Gretel barber', years: '2015 — до сега', services: ['Branding', 'SEO', 'Social Media'], description: 'Барбер култура с характер. Превърнахме локален салон в разпознаваем бранд.', image: '/images/case-content.jpg', result: '№1' },
  { name: 'Cityeuro.bg', years: '2019 — 2021', services: ['SEO + Content', 'Technical', 'Link Building'], description: 'Европейски стандарт в електронната търговия с постоянен ръст на органичния трафик.', image: '/images/hero-mockup.jpg', result: '+288%' },
]

const blogPosts = [
  { title: 'Как SEO оптимизацията увеличава продажбите', date: '15.01.2024', category: 'SEO', excerpt: 'Практически съвети за използване на SEO за растеж на онлайн бизнеса.' },
  { title: '10 грешки в дигиталния маркетинг', date: '02.01.2024', category: 'Стратегия', excerpt: 'Какво не трябва да правите, когато управлявате онлайн присъствието си.' },
  { title: 'Content marketing за 2024', date: '20.12.2023', category: 'Content', excerpt: 'Тенденции и стратегии, които ще ви отличат от конкуренцията.' },
]

export default function Projects() {
  const heroRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, { scrollTrigger: { trigger: heroRef.current, start: 'top 80%' }, y: 50, opacity: 0, duration: 1, ease: 'power3.out' })
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, { scrollTrigger: { trigger: card, start: 'top 90%' }, y: 50, opacity: 0, duration: 0.7, delay: i * 0.1, ease: 'power2.out' })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="pt-20">
      {/* Hero */}
      <section ref={heroRef} className="bg-white py-20 lg:py-32">
        <div className="section-padding">
          <div className="container-max">
            <h1 className="font-thin-display text-[clamp(48px,9vw,120px)] text-[#1A1A1A] leading-none">
              Проекти
            </h1>
            <p className="text-lg lg:text-xl font-light text-[#1A1A1A]/70 mt-6 max-w-xl">
              Реални резултати за реални бизнеси. Всяка цифра е проверима.
            </p>

            {/* Sub-nav */}
            <div className="flex flex-wrap gap-6 mt-12 border-b border-[#E0E0E0] pb-4">
              <span className="text-sm font-medium text-[#DC2626] border-b-2 border-[#DC2626] pb-4 -mb-4">Клиенти</span>
              <Link to="#" className="text-sm font-light text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors pb-4">Кейс студия</Link>
              <Link to="#" className="text-sm font-light text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors pb-4">Блог</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="bg-[#F5F5F5] py-20 lg:py-32">
        <div className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {projects.map((project, i) => (
                <div key={project.name} ref={el => { if (el) cardsRef.current[i] = el }} className="group relative bg-white rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-6">
                    <div className="text-xs font-light text-[#1A1A1A]/60 mb-2 tracking-wider">{project.years}</div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.services.map(s => (
                        <span key={s} className="text-[10px] uppercase tracking-wider font-light text-[#1A1A1A]/70 border border-[#1A1A1A]/10 rounded-full px-3 py-1">{s}</span>
                      ))}
                    </div>
                    <h3 className="text-lg font-light text-[#1A1A1A] mb-2 group-hover:text-[#DC2626] transition-colors">{project.name}</h3>
                    <p className="text-xs font-light text-[#1A1A1A]/70 leading-relaxed">{project.description}</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-[#DC2626] text-white text-sm font-medium px-4 py-2 rounded-full">{project.result}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog preview */}
      <section className="bg-white py-20 lg:py-32">
        <div className="section-padding">
          <div className="container-max">
            <h2 className="font-thin-display text-[clamp(32px,5vw,60px)] text-[#1A1A1A] mb-12">От блога</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogPosts.map(post => (
                <div key={post.title} className="group cursor-pointer">
                  <div className="text-[10px] uppercase tracking-wider font-light text-[#DC2626] mb-2">{post.category}</div>
                  <h3 className="text-lg font-light text-[#1A1A1A] mb-2 group-hover:text-[#DC2626] transition-colors">{post.title}</h3>
                  <p className="text-xs font-light text-[#1A1A1A]/70 mb-3">{post.excerpt}</p>
                  <div className="text-[10px] font-light text-[#1A1A1A]/60">{post.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
