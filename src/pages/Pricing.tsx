import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { ArrowRight, Check, ChevronDown } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const pricingPlans = [
  {
    name: 'Premium SEO Analysis',
    price: '950 лв.',
    period: 'еднократно',
    accent: '#DC2626',
    features: ['Технически SEO Одит', 'Индексация и Crawl Анализ', 'Структура и Архитектура', 'On-page SEO', 'Keyword & Intent Анализ', 'Конкурентен Анализ', 'Content GAP Анализ', 'EEAT & Brand Trust', 'Schema / Rich Snippets', 'Backlink Профил', 'Conversion SEO', 'Финален Доклад (PDF)'],
    cta: 'Заяви анализ',
    link: '/zapitvane',
    popular: false,
  },
  {
    name: 'Monthly Management',
    price: '400–500 лв.',
    period: '/месец',
    accent: '#9BFF00',
    features: ['Технически мониторинг и поддръжка', 'On-page Оптимизация (текуща)', 'Вътрешно линкване', 'Месечен анализ и отчет', 'Конкурентно разузнаване', 'SEO Management & Oversight', 'Корекции през CMS', 'Приоритизация на задачи'],
    cta: 'Започни партньорство',
    link: '/zapitvane',
    popular: true,
  },
  {
    name: 'Performance SEO',
    price: 'По договаряне',
    period: 'според думите',
    accent: '#6612D1',
    features: ['Всичко от Monthly Management', 'Създаване на ново съдържание', 'Off-page SEO (Link Building)', 'Outreach с медии', 'Performance бонуси', 'TOP 10 заплащане', 'TOP 3 заплащане', 'Прозрачно проследяване'],
    cta: 'Искам оферта',
    link: '/zapitvane',
    popular: false,
  },
]

const webServices = [
  { name: 'Изработка на уебсайт', from: 'от 1500 лв.' },
  { name: 'Онлайн магазин', from: 'от 3000 лв.' },
  { name: 'WEB приложение', from: 'по договаряне' },
  { name: 'Уеб дизайн (UI/UX)', from: 'от 800 лв.' },
  { name: 'SEO оптимизация на сайт', from: 'от 500 лв.' },
  { name: 'Поддръжка на сайт', from: 'от 200 лв./мес.' },
]

const adServices = [
  { name: 'Facebook & Instagram реклами', from: 'от 500 лв./мес.' },
  { name: 'Google Ads management', from: 'от 500 лв./мес.' },
  { name: 'E-mail маркетинг', from: 'от 300 лв./мес.' },
  { name: 'Управление на социални мрежи', from: 'от 600 лв./мес.' },
  { name: 'Копирайтинг', from: 'от 50 лв./час' },
  { name: 'Фотография и видео', from: 'по договаряне' },
]

const faqs = [
  { q: 'Защо цената на SEO Анализа е публична?', a: 'Защото това е единственият етап, който не зависи от спецификите на бизнеса. Всички останали услуги се ценообразуват персонално след одита.' },
  { q: 'Може ли да се започне директно с месечно обслужване?', a: 'Не. Без преминат Premium SEO Analysis не изготвяме оферта за SEO абонамент. Одитът е задължителен етап.' },
  { q: 'Как работи Performance моделът?', a: 'След одита се определя списък от ключови думи с индивидуална тарифа. Плащането се начислява само при постигнат резултат — TOP 10 или TOP 3.' },
  { q: 'Има ли отстъпки при дългосрочен договор?', a: 'Да. 5% отстъпка при 6 месеца предплащане, 10% при 12 месеца.' },
  { q: 'Каква е минималната ангажираност?', a: 'Препоръчваме минимум 6 месеца за видими резултати. Performance моделът е гъвкав.' },
  { q: 'Как се плаща?', a: 'SEO Анализ — 50% аванс, 50% при завършване. Месечно обслужване — авансово. Performance — отчет на месечна база.' },
]

export default function Pricing() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, { scrollTrigger: { trigger: heroRef.current, start: 'top 80%' }, y: 50, opacity: 0, duration: 1, ease: 'power3.out' })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="pt-20">
      <section ref={heroRef} className="bg-white py-20 lg:py-32">
        <div className="section-padding">
          <div className="container-max text-center">
            <h1 className="font-thin-display text-[clamp(48px,10vw,140px)] text-[#1A1A1A] leading-none">Цени</h1>
            <p className="text-lg lg:text-xl font-light text-[#1A1A1A]/50 mt-6 max-w-xl mx-auto">Прозрачност без компромис. Няма скрити такси, няма обещания без покритие.</p>
          </div>
        </div>
      </section>

      {/* SEO Pricing */}
      <section className="bg-[#F5F5F5] py-20 lg:py-32">
        <div className="section-padding">
          <div className="container-max">
            <div className="mb-8">
              <span className="text-[10px] uppercase tracking-[0.2em] font-light text-[#DC2626]">SEO услуги</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {pricingPlans.map((plan) => (
                <div key={plan.name} className={`bg-white rounded-3xl p-8 lg:p-10 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-400 relative overflow-hidden ${plan.popular ? 'ring-2 ring-[#9BFF00]' : ''}`}>
                  {plan.popular && <div className="absolute top-0 right-0 bg-[#9BFF00] text-[#1A1A1A] text-[10px] font-bold px-4 py-2 rounded-bl-2xl uppercase tracking-wider">Препоръчителен</div>}
                  <div className="w-full h-1 rounded-full mb-8" style={{ backgroundColor: plan.accent }} />
                  <div className="text-xs font-light uppercase tracking-wider text-[#1A1A1A]/30 mb-2">{plan.name}</div>
                  <div className="text-4xl lg:text-5xl font-extralight text-[#1A1A1A] mb-1">{plan.price}</div>
                  <div className="text-xs font-light text-[#1A1A1A]/30 mb-8 uppercase tracking-wider">{plan.period}</div>
                  <div className="flex flex-col gap-2.5 mb-8">
                    {plan.features.map(f => (
                      <div key={f} className="flex items-start gap-3">
                        <Check size={14} className="text-[#9BFF00] shrink-0 mt-0.5" />
                        <span className="text-xs font-light text-[#1A1A1A]/50">{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link to={plan.link} className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-sm font-medium transition-all duration-300 hover:scale-[1.02]" style={{ backgroundColor: plan.accent, color: plan.accent === '#9BFF00' ? '#1A1A1A' : '#FFFFFF' }}>
                    {plan.cta} <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Web & Design Pricing */}
      <section className="bg-white py-20 lg:py-32">
        <div className="section-padding">
          <div className="container-max">
            <div className="mb-12">
              <span className="text-[10px] uppercase tracking-[0.2em] font-light text-[#DC2626]">WEB разработка и дизайн</span>
              <h2 className="font-thin-display text-[clamp(32px,5vw,60px)] text-[#1A1A1A] mt-2">Уеб услуги</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {webServices.map(s => (
                <div key={s.name} className="flex items-center justify-between bg-[#F5F5F5] rounded-xl px-6 py-5 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                  <span className="text-sm font-light text-[#1A1A1A]">{s.name}</span>
                  <span className="text-sm font-medium text-[#DC2626]">{s.from}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ads & Marketing Pricing */}
      <section className="bg-[#F5F5F5] py-20 lg:py-32">
        <div className="section-padding">
          <div className="container-max">
            <div className="mb-12">
              <span className="text-[10px] uppercase tracking-[0.2em] font-light text-[#DC2626]">Реклама и маркетинг</span>
              <h2 className="font-thin-display text-[clamp(32px,5vw,60px)] text-[#1A1A1A] mt-2">Рекламни услуги</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {adServices.map(s => (
                <div key={s.name} className="flex items-center justify-between bg-white rounded-xl px-6 py-5 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                  <span className="text-sm font-light text-[#1A1A1A]">{s.name}</span>
                  <span className="text-sm font-medium text-[#DC2626]">{s.from}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 lg:py-32">
        <div className="section-padding">
          <div className="container-max max-w-3xl">
            <h2 className="font-thin-display text-[clamp(32px,5vw,60px)] text-[#1A1A1A] mb-12">Въпроси за ценообразуването</h2>
            <div className="flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-[#F5F5F5] rounded-2xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
                    <span className="text-base font-light text-[#1A1A1A] pr-4">{faq.q}</span>
                    <ChevronDown size={18} className={`text-[#1A1A1A] shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <div className="overflow-hidden transition-all duration-400" style={{ maxHeight: openFaq === i ? '300px' : '0', opacity: openFaq === i ? 1 : 0 }}>
                    <p className="px-6 pb-6 text-sm font-light text-[#1A1A1A]/50 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1A1A1A] py-20 lg:py-32">
        <div className="section-padding">
          <div className="container-max text-center">
            <h2 className="font-thin-display text-[clamp(32px,5vw,60px)] text-white mb-8">Всичко започва от едно място</h2>
            <p className="text-base font-light text-white/40 mb-8 max-w-xl mx-auto">Premium SEO Analysis — 950 лв. Единствената публична цена.</p>
            <Link to="/zapitvane" className="inline-flex items-center gap-3 bg-[#DC2626] text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-[#E64922] hover:scale-[1.02] transition-all duration-300">
              Заяви SEO Анализ <ArrowRight size={22} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
