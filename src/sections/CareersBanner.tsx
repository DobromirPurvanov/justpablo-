import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'

const positions = [
  {
    title: 'SEO Специалист',
    type: 'Пълен работен ден',
    location: 'Варна / Remote',
    tags: ['SEO', 'Анализи', 'Content'],
  },
  {
    title: 'Уеб Дизайнер',
    type: 'Пълен работен ден',
    location: 'Варна',
    tags: ['UI/UX', 'Figma', 'Tailwind'],
  },
  {
    title: 'Копирайтър',
    type: 'Пълен работен ден / Freelance',
    location: 'Варна / Remote',
    tags: ['Копирайтинг', 'SEO текстове', 'Socials'],
  },
  {
    title: 'PPC Специалист',
    type: 'Пълен работен ден',
    location: 'Варна / Remote',
    tags: ['Google Ads', 'Facebook Ads', 'Анализи'],
  },
  {
    title: 'Проект Мениджър',
    type: 'Пълен работен ден',
    location: 'Варна',
    tags: ['Управление', 'Клиенти', 'Стратегия'],
  },
]

export default function CareersBanner() {
  return (
    <section className="bg-[#F5F5F5] py-16 lg:py-20">
      <div className="section-padding">
        <div className="container-max">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-semibold text-[#DC2626] tracking-wider uppercase mb-2 block">
                Присъедини се към екипа
              </span>
              <h2 className="font-thin-display text-3xl lg:text-5xl text-[#1A1A1A] leading-tight">
                5 свободни позиции
              </h2>
            </div>
            <Link
              to="/karieri"
              className="group inline-flex items-center gap-2 text-sm font-light text-[#1A1A1A]/60 hover:text-[#DC2626] transition-colors"
            >
              Виж всички позиции
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Positions grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {positions.map((pos, i) => (
              <Link
                key={i}
                to="/karieri"
                className="group bg-white rounded-2xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-medium text-[#DC2626] bg-[#DC2626]/10 px-2 py-1 rounded-full">
                    {pos.type}
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-[#1A1A1A]/50 group-hover:text-[#DC2626] group-hover:translate-x-1 transition-all"
                  />
                </div>
                <h3 className="text-base font-bold text-[#1A1A1A] mb-1 group-hover:text-[#DC2626] transition-colors">
                  {pos.title}
                </h3>
                <p className="text-xs font-light text-[#1A1A1A]/50 mb-3">
                  {pos.location}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {pos.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium text-[#1A1A1A]/55 bg-[#F5F5F5] px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
