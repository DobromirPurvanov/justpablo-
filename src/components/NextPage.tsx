import { Link } from 'react-router'

/** Almero стил навигация в края на страницата — води към следващата. */
export default function NextPage({ to, label }: { to: string; label: string }) {
  return (
    <section className="border-t border-[#1A1A1A]/[0.06] bg-white">
      <Link to={to} data-cursor="Напред" className="group block section-padding py-14 lg:py-20">
        <div className="container-max flex items-center justify-between gap-8">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] font-light text-[#1A1A1A]/40 mb-4 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
              Следваща страница
            </div>
            <div className="font-thin-display text-[clamp(40px,8vw,104px)] leading-none text-[#1A1A1A] group-hover:text-[#DC2626] transition-colors duration-500">
              {label}
            </div>
          </div>
          <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-full border border-[#1A1A1A]/15 flex items-center justify-center shrink-0 group-hover:bg-[#DC2626] group-hover:border-[#DC2626] transition-all duration-500">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#1A1A1A] group-hover:text-white group-hover:translate-x-1 transition-all duration-500">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </Link>
    </section>
  )
}
