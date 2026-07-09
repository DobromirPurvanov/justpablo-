import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { ArrowRight, Check, ChevronDown } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { bgn, bgnRange } from '../lib/currency'

gsap.registerPlugin(ScrollTrigger)

type PricingPlan = {
  name: string
  price: string
  priceBgn?: string
  period: string
  accent: string
  features: string[]
  cta: string
  link: string
  detailsLink?: string
  popular: boolean
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Premium Digital Analysis',
    price: '485 €',
    priceBgn: bgn(485),
    period: 'еднократно',
    accent: '#DC2626',
    features: ['Технически SEO Одит', 'On-page SEO и Съдържание', 'Backlink и Authority Профил', 'Уебсайт, UX и Конверсии', 'Социални мрежи Одит', 'Meta Ads Одит', 'Google Ads Одит', 'Бранд и Позициониране', 'Конкурентен Анализ', 'Аналитика и Данни', 'Email и Автоматизации', 'Финален Доклад и План'],
    cta: 'Заяви анализ',
    link: '/zapitvane',
    detailsLink: '/analiz',
    popular: false,
  },
  {
    name: 'Monthly Management',
    price: '205–255 €',
    priceBgn: bgnRange(205, 255),
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

type ServiceItem = { name: string; from: string; fromBgn?: string }

const webServices: ServiceItem[] = [
  { name: 'Изработка на уебсайт', from: 'от 765 €', fromBgn: bgn(765) },
  { name: 'Онлайн магазин', from: 'от 1535 €', fromBgn: bgn(1535) },
  { name: 'WEB приложение', from: 'по договаряне' },
  { name: 'Уеб дизайн (UI/UX)', from: 'от 410 €', fromBgn: bgn(410) },
  { name: 'SEO оптимизация на сайт', from: 'от 255 €', fromBgn: bgn(255) },
  { name: 'Поддръжка на сайт', from: 'от 100 €/мес.', fromBgn: `${bgn(100)}/мес.` },
]

const adServices: ServiceItem[] = [
  { name: 'Facebook & Instagram реклами', from: 'от 255 €/мес.', fromBgn: `${bgn(255)}/мес.` },
  { name: 'Google Ads management', from: 'от 255 €/мес.', fromBgn: `${bgn(255)}/мес.` },
  { name: 'E-mail маркетинг', from: 'от 155 €/мес.', fromBgn: `${bgn(155)}/мес.` },
  { name: 'Управление на социални мрежи', from: 'от 305 €/мес.', fromBgn: `${bgn(305)}/мес.` },
  { name: 'Копирайтинг', from: 'от 25 €/час', fromBgn: `${bgn(25)}/час` },
  { name: 'Фотография и видео', from: 'по договаряне' },
]

const faqs = [
  { q: 'Защо цената на Дигиталния Анализ е публична?', a: 'Защото това е единственият етап, който не зависи от спецификите на бизнеса. Всички останали услуги се ценообразуват персонално след анализа.' },
  { q: 'Може ли да се започне директно с месечно обслужване?', a: 'Не. Без преминат Premium Digital Analysis не изготвяме оферта за месечен абонамент. Анализът е задължителен етап.' },
  { q: 'Как работи Performance моделът?', a: 'След одита се определя списък от ключови думи с индивидуална тарифа. Плащането се начислява само при постигнат резултат — TOP 10 или TOP 3.' },
  { q: 'Има ли отстъпки при дългосрочен договор?', a: 'Да. 5% отстъпка при 6 месеца предплащане, 10% при 12 месеца.' },
  { q: 'Каква е минималната ангажираност?', a: 'Препоръчваме минимум 6 месеца за видими резултати. Performance моделът е гъвкав.' },
  { q: 'Как се плаща?', a: 'Дигитален Анализ — 50% аванс, 50% при завършване. Месечно обслужване — авансово. Performance — отчет на месечна база.' },
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
              <span className="text-[10px] uppercase tracking-[0.2em] font-light text-[#DC2626]">Анализ и SEO пакети</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {pricingPlans.map((plan) => (
                <div key={plan.name} className={`bg-white rounded-3xl p-8 lg:p-10 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-400 relative overflow-hidden ${plan.popular ? 'ring-2 ring-[#9BFF00]' : ''}`}>
                  {plan.popular && <div className="absolute top-0 right-0 bg-[#9BFF00] text-[#1A1A1A] text-[10px] font-bold px-4 py-2 rounded-bl-2xl uppercase tracking-wider">Препоръчителен</div>}
                  <div className="w-full h-1 rounded-full mb-8" style={{ backgroundColor: plan.accent }} />
                  <div className="text-xs font-light uppercase tracking-wider text-[#1A1A1A]/50 mb-2">{plan.name}</div>
                  <div className="text-4xl lg:text-5xl font-extralight text-[#1A1A1A] mb-1">{plan.price}</div>
                  {plan.priceBgn && <div className="text-sm font-light text-[#1A1A1A]/55 mb-1">{plan.priceBgn}</div>}
                  <div className="text-xs font-light text-[#1A1A1A]/50 mb-8 uppercase tracking-wider">{plan.period}</div>
                  <div className="flex flex-col gap-2.5 mb-8">
                    {plan.features.map(f => (
                      <div key={f} className="flex items-start gap-3">
                        <Check size={14} className="text-[#9BFF00] shrink-0 mt-0.5" />
                        <span className="text-xs font-light text-[#1A1A1A]/50">{f}</span>
                      </div>
                    ))}
                  </div>
                  {plan.detailsLink && (
                    <div className="mb-6 -mt-4">
                      <Link to={plan.detailsLink} className="inline-flex items-center gap-1 text-xs font-medium text-[#DC2626] hover:gap-2 transition-all duration-300">
                        Виж пълното съдържание на анализа <ArrowRight size={12} />
                      </Link>
                    </div>
                  )}
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
                  <span className="text-right shrink-0 pl-4">
                    <span className="block text-sm font-medium text-[#DC2626]">{s.from}</span>
                    {s.fromBgn && <span className="block text-[11px] font-light text-[#1A1A1A]/50 mt-0.5">{s.fromBgn}</span>}
                  </span>
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
                  <span className="text-right shrink-0 pl-4">
                    <span className="block text-sm font-medium text-[#DC2626]">{s.from}</span>
                    {s.fromBgn && <span className="block text-[11px] font-light text-[#1A1A1A]/50 mt-0.5">{s.fromBgn}</span>}
                  </span>
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
            <p className="text-base font-light text-white/60 mb-8 max-w-xl mx-auto">Premium Digital Analysis — 485 € ({bgn(485)}). Единствената публична цена.</p>
            <Link to="/zapitvane" className="inline-flex items-center gap-3 bg-[#DC2626] text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-[#E64922] hover:scale-[1.02] transition-all duration-300">
              Заяви Дигитален Анализ <ArrowRight size={22} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
