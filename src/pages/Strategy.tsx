import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { ArrowRight, Check, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { bgn } from '../lib/currency'

gsap.registerPlugin(ScrollTrigger)

type Roadmap = {
  phase: string
  title: string
  subtitle: string
  price: string
  priceBgn?: string
  period: string
  color: string
  items: string[]
}

const roadmaps: Roadmap[] = [
  {
    phase: 'Фаза 1',
    title: 'Premium Digital Analysis',
    subtitle: 'Пълна дигитална диагностика',
    price: '485 €',
    priceBgn: bgn(485),
    period: 'еднократно',
    color: '#DC2626',
    items: [
      'Технически SEO Одит',
      'On-page SEO и Съдържание',
      'Backlink и Authority Профил',
      'Уебсайт, UX и Конверсии',
      'Социални мрежи Одит',
      'Meta Ads Одит',
      'Google Ads Одит',
      'Бранд и Позициониране',
      'Конкурентен Анализ',
      'Аналитика и Данни',
      'Email и Автоматизации',
      'Финален Доклад и План',
    ],
  },
  {
    phase: 'Фаза 2',
    title: 'Стратегическа Пътна Карта',
    subtitle: '12-месечен план',
    price: 'След Фаза 1',
    period: 'персонална оферта',
    color: '#9BFF00',
    items: [
      'Keyword Universe (Cluster модел)',
      'Technical Roadmap',
      'Content Roadmap (3-6-12 месеца)',
      'On-page Пътна Карта',
      'Конкурентна Стратегия',
      'Internal Linking Blueprint',
      'Off-page Стратегия',
      'Ranking Window Прогноза',
      'Quarterly Execution Plan',
    ],
  },
  {
    phase: 'Фаза 1 + 2 + 3',
    title: 'Пълен Дигитален Пакет',
    subtitle: 'Анализ + Стратегия + Изпълнение',
    price: 'Индивидуална оферта',
    period: 'с отстъпка',
    color: '#6612D1',
    items: [
      'Всичко от Фаза 1',
      'Всичко от Фаза 2',
      'Месечно дигитално обслужване',
      'Content Management',
      'Link Building Management',
      'Performance SEO модел',
      'Месечен отчет и анализ',
      'Приоритетна поддръжка',
    ],
  },
]

const discounts = [
  { period: '6 месеца', discount: '5% отстъпка', description: 'При предварително плащане за 6 месеца' },
  { period: '12 месеца', discount: '10% отстъпка', description: 'При предварително плащане за 12 месеца' },
]

export default function Strategy() {
  const heroRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, { scrollTrigger: { trigger: heroRef.current, start: 'top 80%' }, y: 50, opacity: 0, duration: 1, ease: 'power3.out' })
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, { scrollTrigger: { trigger: card, start: 'top 90%' }, y: 40, opacity: 0, duration: 0.7, delay: i * 0.15, ease: 'power2.out' })
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
            <span className="text-[10px] uppercase tracking-[0.2em] font-light text-[#DC2626]">Пътят към успешния бранд — стъпка по стъпка</span>
            <h1 className="font-thin-display text-[clamp(48px,9vw,120px)] text-[#1A1A1A] leading-none mt-4">
              Стратегия
            </h1>
            <p className="text-lg lg:text-xl font-light text-[#1A1A1A]/50 mt-6 max-w-2xl">
              Три фази, които покриват целия процес — от диагностика през планиране до изпълнение и резултати.
            </p>
          </div>
        </div>
      </section>

      {/* Road Maps */}
      <section className="bg-[#F5F5F5] py-20 lg:py-32">
        <div className="section-padding">
          <div className="container-max">
            <div className="flex flex-col gap-8">
              {roadmaps.map((roadmap, i) => (
                <div
                  key={roadmap.phase}
                  ref={el => { if (el) cardsRef.current[i] = el }}
                  className="bg-white rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    {/* Left header */}
                    <div className="lg:col-span-4 p-8 lg:p-10 flex flex-col justify-between" style={{ backgroundColor: roadmap.color + '08' }}>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] font-light mb-3" style={{ color: roadmap.color }}>{roadmap.phase}</div>
                        <h2 className="text-2xl lg:text-3xl font-light text-[#1A1A1A] mb-2">{roadmap.title}</h2>
                        <p className="text-sm font-light text-[#1A1A1A]/40">{roadmap.subtitle}</p>
                      </div>
                      <div className="mt-6">
                        <div className="text-3xl lg:text-4xl font-extralight" style={{ color: roadmap.color }}>{roadmap.price}</div>
                        {roadmap.priceBgn && <div className="text-sm font-light text-[#1A1A1A]/40 mt-1">{roadmap.priceBgn}</div>}
                        <div className="text-xs font-light text-[#1A1A1A]/30 mt-1 uppercase tracking-wider">{roadmap.period}</div>
                      </div>
                    </div>

                    {/* Right items */}
                    <div className="lg:col-span-8 p-8 lg:p-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                        {roadmap.items.map(item => (
                          <div key={item} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: roadmap.color + '15' }}>
                              <Check size={12} style={{ color: roadmap.color }} />
                            </div>
                            <span className="text-sm font-light text-[#1A1A1A]/60">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Discounts */}
      <section className="bg-white py-20 lg:py-32">
        <div className="section-padding">
          <div className="container-max">
            <h2 className="font-thin-display text-[clamp(32px,5vw,60px)] text-[#1A1A1A] mb-12">Предварителни отстъпки</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {discounts.map(d => (
                <div key={d.period} className="bg-[#F5F5F5] rounded-2xl p-8 flex items-center gap-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#9BFF00] flex items-center justify-center shrink-0">
                    <ChevronRight size={24} className="text-[#1A1A1A]" />
                  </div>
                  <div>
                    <div className="text-2xl font-extralight text-[#1A1A1A] mb-1">{d.discount}</div>
                    <div className="text-sm font-light text-[#1A1A1A]/40">{d.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1A1A1A] py-20 lg:py-32">
        <div className="section-padding">
          <div className="container-max text-center">
            <h2 className="font-thin-display text-[clamp(32px,5vw,60px)] text-white mb-8">
              Всичко започва от едно място
            </h2>
            <p className="text-base font-light text-white/40 mb-8 max-w-xl mx-auto">
              Premium Digital Analysis — 485 € ({bgn(485)}). Единствената публична цена. Задължителен етап за всички клиенти.
            </p>
            <Link to="/zapitvane" className="inline-flex items-center gap-3 bg-[#DC2626] text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-[#E64922] hover:scale-[1.02] transition-all duration-300">
              Заяви Дигитален Анализ <ArrowRight size={22} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
