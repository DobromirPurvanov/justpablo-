import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { ArrowRight, Zap, X } from 'lucide-react'

const slots = [
  { id: 1, label: 'SEO проект', status: 'свободен' },
  { id: 2, label: 'Уеб дизайн', status: 'свободен' },
  { id: 3, label: 'Рекламна кампания', status: 'свободен' },
  { id: 4, label: 'Брандинг', status: 'свободен' },
  { id: 5, label: 'Пълен пакет', status: 'свободен' },
]

export default function ProjectSlotsPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Auto-show popup after 4 seconds on first visit
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  // Escape затваря popup-а
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  // Текущият месец на български (вместо хардкодната дата)
  const monthLabel = (() => {
    const s = new Date().toLocaleDateString('bg-BG', { month: 'long', year: 'numeric' })
    return s.charAt(0).toUpperCase() + s.slice(1)
  })()

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={open}
        className={`fixed top-[100px] md:top-[110px] left-3 md:left-6 z-40 flex items-center gap-2 md:gap-3 bg-[#1A1A1A] text-white pl-3 md:pl-4 pr-4 md:pr-5 py-2.5 md:py-3.5 rounded-full shadow-2xl hover:bg-[#DC2626] transition-all duration-500 group max-w-[calc(100vw-100px)] ${
          hasAnimated ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
        }`}
      >
        <div className="relative">
          <div className="w-8 h-8 bg-[#DC2626] rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
            <Zap size={16} className="text-white group-hover:text-[#DC2626] transition-colors" />
          </div>
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#DC2626] animate-ping opacity-40" />
        </div>
        <div className="text-left">
          <span className="text-[10px] uppercase tracking-wider font-light text-white/60 block leading-none">
            този месец
          </span>
          <span className="text-sm font-bold leading-tight">
            Ограничен брой места 5
          </span>
        </div>
        <ArrowRight
          size={14}
          className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all"
        />
      </button>

      {/* Popup overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={close}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#1A1A1A]/80 backdrop-blur-md" />

          {/* Modal */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="slots-popup-title"
            data-lenis-prevent
            className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-300"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={close}
              aria-label="Затвори"
              className="absolute top-4 right-4 w-10 h-10 bg-[#F5F5F5] hover:bg-[#DC2626] rounded-full flex items-center justify-center text-[#1A1A1A] hover:text-white transition-all z-10"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="p-8 pb-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-[#DC2626] rounded-full flex items-center justify-center">
                  <Zap size={24} className="text-white" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#DC2626] tracking-wider uppercase block">
                    {monthLabel}
                  </span>
                  <h2 id="slots-popup-title" className="font-thin-display text-3xl lg:text-4xl text-[#1A1A1A] leading-tight">
                    Ограничен брой места 5
                  </h2>
                </div>
              </div>
              <p className="text-base font-light text-[#1A1A1A]/60 max-w-lg">
                Всеки месец приемаме ограничен брой нови клиенти, за да гарантираме 
                качеството на работата. Запази своя слот преди да са заети.
              </p>
            </div>

            {/* Slots grid */}
            <div className="px-8 pb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {slots.map((slot) => (
                  <Link
                    key={slot.id}
                    to="/zapitvane"
                    onClick={close}
                    className="group relative bg-[#F5F5F5] hover:bg-[#DC2626] rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Zap size={20} className="text-[#DC2626] group-hover:text-white transition-colors" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#9BFF00] group-hover:bg-white transition-colors" />
                    </div>
                    <h3 className="text-base font-bold text-[#1A1A1A] group-hover:text-white mb-1 transition-colors">
                      {slot.label}
                    </h3>
                    <span className="text-[10px] font-medium text-[#1A1A1A]/55 group-hover:text-white/60 uppercase tracking-wider transition-colors">
                      {slot.status}
                    </span>
                    <ArrowRight
                      size={14}
                      className="absolute top-4 right-4 text-[#1A1A1A]/0 group-hover:text-white/60 group-hover:translate-x-1 transition-all"
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer CTA */}
            <div className="p-8 pt-4">
              <Link
                to="/zapitvane"
                onClick={close}
                className="group w-full bg-[#DC2626] text-white px-8 py-4 rounded-full text-base font-medium hover:bg-[#B91C1C] transition-all flex items-center justify-center gap-3"
              >
                Запази своя слот
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-xs font-light text-[#1A1A1A]/55 text-center mt-4">
                След запитване ще се свържем с вас в рамките на 24 часа.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
