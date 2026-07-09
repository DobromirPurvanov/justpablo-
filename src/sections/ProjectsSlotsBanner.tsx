import { Link } from 'react-router'
import { ArrowRight, Zap } from 'lucide-react'

const slots = [
  { id: 1, label: 'SEO проект', status: 'свободен' },
  { id: 2, label: 'Уеб дизайн', status: 'свободен' },
  { id: 3, label: 'Рекламна кампания', status: 'свободен' },
  { id: 4, label: 'Брандинг', status: 'свободен' },
  { id: 5, label: 'Пълен пакет', status: 'свободен' },
]

export default function ProjectsSlotsBanner() {
  return (
    <section className="bg-[#1A1A1A] py-14 lg:py-20">
      <div className="section-padding">
        <div className="container-max">
          {/* Header row */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#DC2626] rounded-full flex items-center justify-center">
                <Zap size={22} className="text-white" />
              </div>
              <div>
                <span className="text-xs font-semibold text-[#DC2626] tracking-wider uppercase block mb-1">
                  Този месец
                </span>
                <h2 className="font-thin-display text-3xl lg:text-5xl text-white leading-tight">
                  5 свободни места за проекти
                </h2>
              </div>
            </div>
            <Link
              to="/zapitvane"
              className="group inline-flex items-center gap-2 bg-[#DC2626] text-white px-6 py-3.5 rounded-full text-sm font-medium hover:bg-[#B91C1C] transition-colors shrink-0"
            >
              Запази своето
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 5 slots */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
            {slots.map((slot) => (
              <Link
                key={slot.id}
                to="/zapitvane"
                className="group relative bg-white/5 hover:bg-[#DC2626] border border-white/10 hover:border-[#DC2626] rounded-2xl p-5 lg:p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl lg:text-3xl font-extralight text-white/30 group-hover:text-white/50 transition-colors">
                    {String(slot.id).padStart(2, '0')}
                  </span>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#9BFF00] group-hover:bg-white transition-colors" />
                </div>
                <h3 className="text-sm lg:text-base font-bold text-white group-hover:text-white mb-1 transition-colors">
                  {slot.label}
                </h3>
                <span className="text-[10px] lg:text-xs font-light text-white/40 group-hover:text-white/70 uppercase tracking-wider transition-colors">
                  {slot.status}
                </span>

                {/* Hover arrow */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={16} className="text-white" />
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom note */}
          <p className="text-sm font-light text-white/40 mt-8 max-w-xl">
            Всеки месец приемаме ограничен брой нови клиенти, за да гарантираме качеството на работата. 
            Запази своя слот преди да са заети всички места.
          </p>
        </div>
      </div>
    </section>
  )
}
