import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { Check, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { bgn } from '../lib/currency'

gsap.registerPlugin(ScrollTrigger)

const PRICE_EUR = 485

const modules = [
  { number: '01', title: 'Технически SEO Одит', items: ['Core Web Vitals (LCP, INP, CLS)', 'Скорост и мобилна оптимизация', 'Индексация и Crawl анализ', 'Robots.txt & Sitemap', 'Грешки 404/500 и redirects'] },
  { number: '02', title: 'On-page SEO и Съдържание', items: ['H1/H2/H3 структура', 'Keyword & Intent анализ', 'Content GAP срещу конкуренти', 'Thin и дублирано съдържание', 'Schema / Rich Snippets'] },
  { number: '03', title: 'Backlink и Authority Профил', items: ['Токсични линкове', 'Anchor текст разпределение', 'Сравнение с конкуренти', 'Link opportunities', 'EEAT сигнали и доверие'] },
  { number: '04', title: 'Уебсайт, UX и Конверсии', items: ['Пътека на потребителя', 'CTA елементи и friction', 'Структура на landing страниците', 'Точки на отпадане', 'Мобилно преживяване'] },
  { number: '05', title: 'Социални мрежи Одит', items: ['Facebook, Instagram, TikTok профили', 'Качество и консистентност', 'Engagement и достигане', 'Визуална идентичност', 'Тон и послания'] },
  { number: '06', title: 'Meta Ads Одит', items: ['Структура на кампаниите', 'Аудитории и таргетинг', 'Криейтиви и послания', 'ROAS и цена на резултат', 'Pixel и събития'] },
  { number: '07', title: 'Google Ads Одит', items: ['Search / PMax структура', 'Ключови думи и негативи', 'Quality Score анализ', 'Разходи и загуби', 'Проследяване на конверсии'] },
  { number: '08', title: 'Бранд и Позициониране', items: ['Визуална идентичност', 'Тон и комуникация', 'Онлайн репутация и ревюта', 'Диференциация от конкуренти', 'Brand Trust Score'] },
  { number: '09', title: 'Конкурентен Анализ', items: ['SEO позиции на конкуренти', 'Рекламна активност (Ads Library)', 'Социално присъствие', 'Ценово позициониране', 'Къде точно ви изпреварват'] },
  { number: '10', title: 'Аналитика и Данни', items: ['GA4 конфигурация', 'Проследяване на конверсии', 'Атрибуция на каналите', 'UTM дисциплина', 'Качество на данните'] },
  { number: '11', title: 'Email и Автоматизации', items: ['Списъци и сегментация', 'Funnel-и и последователности', 'Ретаргетинг връзки', 'Deliverability', 'Пропуснати приходи'] },
  { number: '12', title: 'Финален Доклад и План', items: ['PDF с пълния анализ', 'Проблеми по канали и приоритети', 'Quick wins за първите 30 дни', 'Реалистична прогноза', 'Основа за Фаза 2'] },
]

const deliverables = [
  'PDF документ с пълния дигитален анализ',
  'Конкретни проблеми и задачи по канали',
  'Приоритети (висок / среден / нисък)',
  'Quick wins за първите 30 дни',
  'Реалистична прогноза и основа за Фаза 2',
]

export default function DigitalAnalysis() {
  const heroRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, { scrollTrigger: { trigger: heroRef.current, start: 'top 80%' }, y: 50, opacity: 0, duration: 1, ease: 'power3.out' })
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, { scrollTrigger: { trigger: card, start: 'top 90%' }, y: 40, opacity: 0, duration: 0.6, delay: i * 0.05, ease: 'power2.out' })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="pt-20">
      <section ref={heroRef} className="bg-white py-20 lg:py-32">
        <div className="section-padding">
          <div className="container-max">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div>
                <h1 className="font-thin-display text-[clamp(48px,9vw,140px)] text-[#DC2626] leading-none">
                  Premium<br />Digital Analysis
                </h1>
                <p className="text-lg lg:text-xl font-light text-[#1A1A1A]/70 mt-6 max-w-xl">
                  Пълен анализ на цялото ви дигитално присъствие — сайт, SEO, реклами, социални мрежи и данни. Единствената публична цена. Задължителен етап за всички клиенти.
                </p>
              </div>
              <div className="w-36 h-36 lg:w-44 lg:h-44 rounded-full bg-[#9BFF00] flex items-center justify-center shrink-0">
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-extralight text-[#1A1A1A]">{PRICE_EUR} €</div>
                  <div className="text-xs font-light text-[#1A1A1A]/60 mt-1">{bgn(PRICE_EUR)}</div>
                  <div className="text-[10px] font-light uppercase tracking-wider text-[#1A1A1A]/50 mt-1">еднократно</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F5F5] py-20 lg:py-32">
        <div className="section-padding">
          <div className="container-max">
            <h2 className="font-thin-display text-[clamp(32px,5vw,60px)] text-[#1A1A1A] mb-12">12 модула — пълен рентген на бизнеса ви онлайн</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {modules.map((module, i) => (
                <div key={module.number} ref={el => { if (el) cardsRef.current[i] = el }} className="bg-white rounded-2xl p-6 lg:p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group">
                  <div className="text-4xl font-extralight text-[#DC2626]/10 mb-4 group-hover:text-[#DC2626]/30 transition-colors">{module.number}</div>
                  <h3 className="text-base font-medium text-[#1A1A1A] mb-4">{module.title}</h3>
                  <ul className="flex flex-col gap-2">
                    {module.items.map(item => (
                      <li key={item} className="flex items-start gap-2 text-xs font-light text-[#1A1A1A]/70">
                        <span className="w-1 h-1 rounded-full bg-[#DC2626] mt-1.5 shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-32">
        <div className="section-padding">
          <div className="container-max">
            <div className="max-w-2xl">
              <h2 className="font-thin-display text-[clamp(32px,5vw,60px)] text-[#1A1A1A] mb-8">Какво получавате</h2>
              <div className="flex flex-col gap-3">
                {deliverables.map(item => (
                  <div key={item} className="flex items-center gap-4 bg-[#F5F5F5] rounded-xl px-6 py-4">
                    <div className="w-7 h-7 rounded-full bg-[#DC2626] flex items-center justify-center shrink-0"><Check size={14} className="text-white" /></div>
                    <span className="text-base font-light text-[#1A1A1A]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#DC2626] py-20 lg:py-32">
        <div className="section-padding">
          <div className="container-max text-center">
            <h2 className="font-thin-display text-[clamp(32px,5vw,60px)] text-white mb-8">Готови ли сте за първата стъпка?</h2>
            <Link to="/zapitvane" className="inline-flex items-center gap-3 bg-[#1A1A1A] text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-[#333] hover:scale-[1.02] transition-all duration-300">
              Заяви Дигитален Анализ <ArrowRight size={22} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
