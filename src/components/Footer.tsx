import { Link } from 'react-router'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

const navLinks = [
  { path: '/', label: 'Начало' },
  { path: '/uslugi', label: 'Услуги' },
  { path: '/analiz', label: 'Анализ' },
  { path: '/rezultati', label: 'Резултати' },
  { path: '/strategiya', label: 'Стратегия' },
  { path: '/ceni', label: 'Цени' },
  { path: '/zapitvane', label: 'Запитване' },
]

export default function Footer() {
  return (
    <footer id="contacts" className="bg-[#1A1A1A] text-white">
      {/* Main content */}
      <div className="section-padding py-20 lg:py-32">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Left: Logo + Nav */}
            <div className="lg:col-span-3">
              <Link to="/" className="inline-flex items-center gap-3 mb-8">
                <img src="/images/logo-mark-white.png" alt="Just Pablo Digital" loading="lazy" decoding="async" className="w-9 h-9 object-contain" />
                <span className="flex flex-col leading-none">
                  <span className="text-lg font-semibold text-white">Just Pablo</span>
                  <span className="text-[8px] font-bold uppercase tracking-[0.32em] text-[#DC2626] mt-1">Digital</span>
                </span>
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
                <a href="https://m.me/justpablo" target="_blank" rel="noopener noreferrer" className="text-[#DC2626] hover:text-white transition-colors">
                  Messenger
                </a>
              </div>

              <div className="mt-8">
                <div className="text-[11px] uppercase tracking-[0.15em] font-light text-white/50 mb-3">
                  Варна
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Варна+ул.+Мария+Луиза+47"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-light text-white/70 hover:text-[#DC2626] transition-colors block"
                >
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
                    src="/images/case-ecommerce.jpg"
                    alt="Резултати и казуси на клиенти"
                    width="128"
                    height="128"
                    loading="lazy"
                    decoding="async"
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
            <p className="text-[10px] uppercase tracking-[0.15em] font-light text-white/60">
              © JustPablo — всички права запазени.
            </p>
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-cookie-settings'))}
                className="text-[10px] uppercase tracking-[0.15em] font-light text-white/60 hover:text-white transition-colors"
              >
                Настройки за бисквитки
              </button>
              <Link to="/biskvitki" className="text-[10px] uppercase tracking-[0.15em] font-light text-white/60 hover:text-white transition-colors">
                Бисквитки
              </Link>
              <Link to="/poveritelnost" className="text-[10px] uppercase tracking-[0.15em] font-light text-white/60 hover:text-white transition-colors">
                Поверителност
              </Link>
              <Link to="/usloviya" className="text-[10px] uppercase tracking-[0.15em] font-light text-white/60 hover:text-white transition-colors">
                Условия за ползване
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
