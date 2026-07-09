import { Link } from 'react-router'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

const navLinks = [
  { path: '/', label: 'Начало' },
  { path: '/uslugi', label: 'Услуги' },
  { path: '/rezultati', label: 'Резултати' },
  { path: '/strategiya', label: 'Стратегия' },
  { path: '/ceni', label: 'Цени' },
  { path: '/zapitvane', label: 'Запитване' },
]

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      {/* Main content */}
      <div className="section-padding py-20 lg:py-32">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Left: Logo + Nav */}
            <div className="lg:col-span-3">
              <Link to="/" className="inline-flex items-center gap-2 mb-8">
                <div className="w-8 h-8">
                  <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                    <path d="M20 2C20 2 8 8 8 20C8 32 20 38 20 38C20 38 32 32 32 20C32 8 20 2 20 2Z" fill="#DC2626" />
                    <circle cx="20" cy="18" r="5" fill="white"/>
                    <circle cx="20" cy="26" r="2.5" fill="white"/>
                  </svg>
                </div>
                <span className="text-lg font-semibold text-white">JustPablo</span>
              </Link>

              <nav className="flex flex-col gap-2">
                {navLinks.map(link => (
                  <Link
                    key={link.label}
                    to={link.path}
                    className="text-[11px] uppercase tracking-[0.15em] font-light text-white/60 hover:text-[#DC2626] hover:translate-x-1 transition-all duration-300 w-fit"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Middle: Contact */}
            <div className="lg:col-span-3">
              <div className="text-[11px] uppercase tracking-[0.15em] font-light text-white/50 mb-6">
                JustPablo
              </div>
              <div className="flex flex-col gap-3 text-sm font-light">
                <a href="mailto:info@justpablo.bg" className="text-[#DC2626] hover:text-white transition-colors">
                  info@justpablo.bg
                </a>
                <a href="#" className="text-[#DC2626] hover:text-white transition-colors">
                  Messenger
                </a>
              </div>

              <div className="mt-8">
                <div className="text-[11px] uppercase tracking-[0.15em] font-light text-white/50 mb-3">
                  Варна
                </div>
                <a href="#" className="text-sm font-light text-white/70 hover:text-[#DC2626] transition-colors block">
                  ул. Мария Луиза 47
                </a>
                <a href="tel:0887654321" className="text-sm font-light text-white/70 hover:text-[#DC2626] transition-colors block mt-1">
                  0887 654 321
                </a>
              </div>
            </div>

            {/* Right: Big image + CTA */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              {/* Projects link */}
              <Link to="/rezultati" className="group flex items-center gap-4 mb-12">
                <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-[#F5F5F5] overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <img
                    src="./images/case-ecommerce.jpg"
                    alt="Results"
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                  />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-light text-white/50 mb-1">
                    Продължи към
                  </div>
                  <div className="text-lg font-light text-white/80 group-hover:text-[#DC2626] transition-colors">
                    Резултати
                  </div>
                  <ArrowUpRight size={16} className="text-white/50 mt-1 group-hover:text-[#DC2626] transition-colors" />
                </div>
              </Link>

              {/* Big CTA */}
              <div>
                <h3 className="font-thin-display text-4xl lg:text-6xl text-white mb-6 leading-tight">
                  Нови хоризонти<br />за вашия бизнес
                </h3>
                <Link
                  to="/zapitvane"
                  className="inline-flex items-center gap-3 bg-[#DC2626] text-white px-8 py-4 rounded-full text-base font-medium hover:bg-[#B91C1C] hover:scale-[1.02] transition-all duration-300"
                >
                  Започни проект
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="section-padding py-6">
          <div className="container-max flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[10px] uppercase tracking-[0.15em] font-light text-white/40">
              © JustPablo — всички права запазени.
            </p>
            <div className="flex items-center gap-4 md:gap-6">
              <Link to="/biskvitki" className="text-[10px] uppercase tracking-[0.15em] font-light text-white/40 hover:text-white/60 transition-colors">
                Бисквитки
              </Link>
              <Link to="/poveritelnost" className="text-[10px] uppercase tracking-[0.15em] font-light text-white/40 hover:text-white/60 transition-colors">
                Поверителност
              </Link>
              <Link to="/usloviya" className="text-[10px] uppercase tracking-[0.15em] font-light text-white/40 hover:text-white/60 transition-colors">
                Условия за ползване
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
