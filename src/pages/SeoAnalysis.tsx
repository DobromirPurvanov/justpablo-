import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { Check, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const modules = [
  { number: '01', title: 'Технически SEO Одит', items: ['Core Web Vitals (LCP, INP, CLS)', 'Мобилна оптимизация', 'Грешки 404/500', 'Robots.txt & Sitemap', 'Canonical логика'] },
  { number: '02', title: 'Индексация и Crawl Анализ', items: ['Индексирани vs. неиндексирани', 'Crawl waste анализ', 'Duplicate URLs', 'Orphan pages', 'Canonical / pagination'] },
  { number: '03', title: 'Структура и Архитектура', items: ['Логика на категориите', 'URL структура', 'Вътрешно линкване', 'Йерархия на страниците', 'Навигация'] },
  { number: '04', title: 'On-page SEO', items: ['H1/H2/H3 структура', 'Дублирано съдържание', 'Липсващи ключови думи', 'Thin content анализ', 'CTR подобрения'] },
  { number: '05', title: 'Keyword & Intent Анализ', items: ['Keyword clusters', 'Национални и локални думи', 'Анализ по intent', 'Difficulty и търсения', 'Предвиждане на растеж'] },
  { number: '06', title: 'Конкурентен Анализ', items: ['Думи, по които доминират', 'Слабости в съдържанието', 'Технически предимства', 'Сравнение на Authority', 'Content gap'] },
  { number: '07', title: 'Content GAP Анализ', items: ['Липсващи страници', 'Липсващи информационни статии', 'Content decay', 'Topical authority', 'Контент календар'] },
  { number: '08', title: 'EEAT & Brand Trust', items: ['Доверие и ревюта', 'Експертност', 'Author pages', 'Brand Trust Score', 'Репутация'] },
  { number: '09', title: 'Schema / Rich Snippets', items: ['Schema markup', 'FAQ, How-To', 'Конфликтни данни', 'Structured data', 'Rich snippets'] },
  { number: '10', title: 'Backlink Профил', items: ['Токсични линкове', 'Anchor текст', 'Липсващи типове', 'Конкуренти', 'Link opportunities'] },
  { number: '11', title: 'Conversion SEO', items: ['CTA елементи', 'UX friction', 'Landing page', 'Точки на отпадане', 'Конверсия'] },
  { number: '12', title: 'Финален Доклад', items: ['PDF документ', 'Списък с проблеми', 'Приоритети', 'Реалистична прогноза', 'Основа за Фаза 2'] },
]

const deliverables = [
  'PDF документ с пълен анализ',
  'Списък с проблеми и конкретни задачи',
  'Приоритети (висок / среден / нисък)',
  'Реалистична прогноза за резултати',
  'Основа за Фаза 2',
]

export default function SeoAnalysis() {
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
                  Premium<br />SEO Analysis
                </h1>
                <p className="text-lg lg:text-xl font-light text-[#1A1A1A]/70 mt-6 max-w-xl">
                  Единствената публична цена. Задължителен етап за всички клиенти.
                </p>
              </div>
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-[#9BFF00] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-extralight text-[#1A1A1A]">950 лв.</div>
                  <div className="text-xs font-light text-[#1A1A1A]/70 mt-1">еднократно</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F5F5] py-20 lg:py-32">
        <div className="section-padding">
          <div className="container-max">
            <h2 className="font-thin-display text-[clamp(32px,5vw,60px)] text-[#1A1A1A] mb-12">12 модула — пълен рентген</h2>
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
              Заяви SEO Анализ <ArrowRight size={22} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
