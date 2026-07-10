import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Phone } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { countUp, maskReveal, wordsReveal } from '../lib/motion'
import MagneticCta from '../components/MagneticCta'
import NextPage from '../components/NextPage'

gsap.registerPlugin(ScrollTrigger)

const questions = [
  { q: 'Колко ми струва едно запитване от клиент?', a: 'Чрез детайлен анализ на вашите рекламни канали и конверсии, определяме точната цена на всяко запитване. Това ви позволява да оптимизирате бюджета и да фокусирате усилията върху най-ефективните канали.' },
  { q: 'Какъв е профилът на моите клиенти?', a: 'Изграждаме детайлни клиентски профили на база демографски данни, поведение и предпочитания. Това ни помага да създаваме персонализирани маркетингови послания, които резонират с точната аудитория.' },
  { q: 'Каква комбинация от онлайн реклама привлича ефективно нови клиенти?', a: 'Анализираме ефективността на всеки канал — Google Ads, Facebook, Instagram, SEO, email маркетинг. На база данни, изготвяме оптимална мултиканална стратегия, която максимизира ROI.' },
  { q: 'Колко ми струва една продажба?', a: 'Проследяваме целия път на клиента — от първия клик до финализираната продажба. Така определяме Cost Per Acquisition (CPA) и ви даваме яснота кои канали носят най-печеливши клиенти.' },
  { q: 'Каква е рецептата бизнесът ви да расте печелившо и предвидимо?', a: 'Комбинация от data-driven маркетинг, непрекъсната оптимизация и прозрачна отчетност. Работим с ясни KPI-та, месечни цели и регулярни ревюта, за да гарантираме устойчив растеж.' },
]

const caseStudies = [
  {
    name: 'Alpha Motors', business: 'Авточасти / E-commerce',
    bullets: ['Технически SEO одит и оптимизация', 'Ново съдържание за 200+ категории', 'Дългосрочна линк билдинг кампания'],
    strategy: 'Започнахме от основите — техническо изчистване на магазина и структура, която Google разбира. След това изградихме съдържание около реалните търсения на клиентите и постепенно наложихме домейна като авторитет в нишата.',
    highlightDesc: 'Органичен трафик', highlight: '+420%',
  },
  {
    name: 'Dinkovi', business: 'Строителство',
    bullets: ['Ново позициониране чрез нов сайт', 'Локална SEO стратегия за региона', 'Професионална фотография на обектите'],
    strategy: 'Семейна фирма с отлична репутация офлайн, но невидима онлайн. Изградихме дигитално присъствие от нулата — сайт, локални позиции и портфолио, което продава само. Днес запитванията идват предимно от Google.',
    highlightDesc: 'Онлайн запитвания', highlight: '+580%',
  },
  {
    name: 'Arcanum Group', business: 'Бизнес консултации',
    bullets: ['Цялостна дигитална стратегия', 'Съдържание с експертен авторитет', 'LinkedIn и социално присъствие'],
    strategy: 'В консултантския бизнес доверието е всичко. Фокусирахме се върху експертно съдържание и последователно присъствие, което позиционира бранда като първи избор в нишата — преди клиентът изобщо да е попитал.',
    highlightDesc: 'Онлайн присъствие', highlight: 'x3',
  },
  {
    name: 'Astrafolio', business: 'Инвестиции',
    bullets: ['Брандинг и визуална идентичност', 'SEO за конкурентни финансови термини', 'Съдържателна стратегия за доверие'],
    strategy: 'От стартиращ проект до разпознаваем бранд за под 2 години. Комбинирахме силна визуална идентичност с търпелива SEO работа по най-трудните термини в сектора — и търсенията по име на бранда изпревариха очакванията.',
    highlightDesc: 'Бранд търсения', highlight: '+315%',
  },
  {
    name: 'CC78', business: 'E-commerce',
    bullets: ['Доминация в нишови ключови думи', 'Оптимизация на конверсиите', 'Ремаркетинг и email автоматизации'],
    strategy: 'Вместо да се борим за най-скъпите думи, картографирахме цялата ниша и завзехме дългата опашка от търсения една по една. Резултатът — топ позиции по всички ключови термини в категорията и стабилно растящи продажби.',
    highlightDesc: 'Топ позиции в нишата', highlight: '100%',
  },
]

export default function Results() {
  const pageRef = useRef<HTMLDivElement>(null)
  const trendRef = useRef<SVGPathElement>(null)
  const [openQ, setOpenQ] = useState<number | null>(null)

  useEffect(() => {
    const el = pageRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      // ── Hero: заглавие -> текст -> графика (барове растат) -> въпроси
      maskReveal(el.querySelector('.hero-title'), null, { delay: 0.05, duration: 1 })
      const tl = gsap.timeline({ delay: 0.35 })
      tl.from('.hero-desc', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' })
        .from('.hero-chart', { opacity: 0, duration: 0.4 }, '-=0.4')
        .from('.chart-bar', {
          scaleY: 0, transformOrigin: '50% 100%', duration: 0.7,
          stagger: 0.05, ease: 'power3.out',
        }, '<')
        .from('.chart-trend', { opacity: 0, duration: 0.6 }, '-=0.4')
        .from('.chart-label', { scale: 0.6, opacity: 0, duration: 0.5, ease: 'back.out(1.7)', transformOrigin: '50% 50%' }, '-=0.3')
        .from('.hero-questions li', { x: 30, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' }, '-=0.4')

      // Пунктираната тренд линия "тече" постоянно
      if (trendRef.current) {
        gsap.to(trendRef.current, { strokeDashoffset: -40, duration: 4, ease: 'none', repeat: -1 })
      }

      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Дума по дума просветване на големите параграфи (almero стил)
        gsap.utils.toArray<HTMLElement>('.w-reveal').forEach(p => wordsReveal(p))

      })

      // Казусите — ред по ред + броящи числа
      gsap.utils.toArray<HTMLElement>('.case-row').forEach(row => {
        gsap.from(row.querySelectorAll('.case-cell'), {
          scrollTrigger: { trigger: row, start: 'top 85%', once: true },
          y: 26, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', clearProps: 'transform',
        })
        const num = row.querySelector('.case-num')
        if (num) countUp(num, { trigger: row, delay: 0.35 })
      })

      // Телефонната секция — каскада
      const phoneSec = el.querySelector('.phone-section')
      if (phoneSec) {
        gsap.from(phoneSec.querySelectorAll('.ph-item'), {
          scrollTrigger: { trigger: phoneSec, start: 'top 80%', once: true },
          y: 32, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', clearProps: 'transform',
        })
      }
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div className="pt-20" ref={pageRef}>
      {/* ─── HERO ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Ляво: заглавие + описание */}
              <div className="lg:col-span-5">
                <h1 className="hero-title font-thin-display text-[clamp(36px,5vw,72px)] text-[#1A1A1A] leading-[1.05] mb-8">
                  Проследими и предвидими резултати
                </h1>
                <p className="hero-desc text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                  Работим едновременно да намалим средната цена на онлайн запитване и да увеличим възвръщаемостта на инвестицията ви в онлайн реклама. По този начин ви даваме възможност да се фокусирате върху <em className="text-[#DC2626]">растежа и управлението на бизнеса си.</em>
                </p>
              </div>

              {/* Дясно: графика + въпроси */}
              <div className="lg:col-span-7">
                <div className="hero-chart relative mb-10">
                  <svg viewBox="0 0 600 200" className="w-full" fill="none">
                    {[0, 50, 100, 150].map(y => (
                      <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="#E5E5E5" strokeWidth="0.5" />
                    ))}
                    {[40, 55, 45, 70, 80, 95, 110, 120, 135, 150, 140, 155].map((h, i) => (
                      <rect key={i} className="chart-bar" x={30 + i * 45} y={160 - h} width="25" height={h} rx="3" fill="#DC2626" opacity={i >= 8 ? 1 : 0.3 + i * 0.05} />
                    ))}
                    <path ref={trendRef} className="chart-trend" d="M42.5 120 Q 100 110, 150 90 T 250 70 T 350 50 T 450 30 T 540 15" stroke="#DC2626" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                    <g className="chart-label">
                      <rect x="20" y="50" width="70" height="30" rx="4" fill="#DC2626" />
                      <text x="55" y="70" textAnchor="middle" fill="white" fontSize="11" fontFamily="Montserrat" fontWeight="600">122 €</text>
                    </g>
                    <text x="55" y="95" textAnchor="middle" fill="#1A1A1A" fontSize="9" fontFamily="Montserrat" opacity="0.5">цена на запитване</text>
                  </svg>
                </div>

                <ul className="hero-questions flex flex-col gap-4">
                  {questions.map((item, i) => (
                    <li key={i}>
                      <button
                        onClick={() => setOpenQ(openQ === i ? null : i)}
                        aria-expanded={openQ === i}
                        className={`block w-full text-left text-base font-medium py-2.5 transition-colors duration-300 ${openQ === i ? 'text-[#DC2626]' : 'text-[#1A1A1A]/80 hover:text-[#DC2626]'}`}
                      >
                        {item.q}
                      </button>
                      <div
                        className="overflow-hidden transition-all duration-400"
                        style={{ maxHeight: openQ === i ? '260px' : '0', opacity: openQ === i ? 1 : 0 }}
                      >
                        <p className="text-sm font-light text-[#1A1A1A]/70 leading-relaxed mt-3 pl-4 border-l-2 border-[#DC2626]">
                          {item.a}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLARITY ─── */}
      <section className="clarity-section bg-white py-16 lg:py-24">
        <div className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5">
                <h2 className="font-thin-display text-3xl lg:text-5xl text-[#1A1A1A] leading-tight mb-8 lg:sticky lg:top-32">
                  Получавате яснота за вашето дигитално позициониране
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="w-reveal text-lg lg:text-xl font-light text-[#1A1A1A] leading-relaxed mb-8">
                  Ние обичаме данните. Чрез тях можем да измерим потребителското поведение, да определим в детайли целевите клиентски профили и да идентифицираме потенциално нови сегменти. По този начин ние използваме ефективно най-голямата сила на онлайн рекламата — <em className="text-[#DC2626]">достигането до точните хора, в точното време.</em>
                </p>
                <p className="w-reveal text-lg lg:text-xl font-light text-[#1A1A1A] leading-relaxed mb-8">
                  Ние заставаме зад думите си. Подплатяваме ги и с цифри, като измерваме ефективността на различните канали и комуникационни стратегии в брой обаждания, онлайн запитвания и продажби.
                </p>
                <p className="w-reveal text-lg lg:text-xl font-light text-[#1A1A1A] leading-relaxed">
                  Благодарение на това, знаем навреме какъв е <strong>резултатът</strong> от съвместната ни работа, а вие се сдобивате с <strong>управляем канал за продажба и растеж</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── OPTIMAL ACTIONS ─── */}
      <section className="growth-section bg-white py-16 lg:py-24">
        <div className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5">
                <h2 className="font-thin-display text-3xl lg:text-5xl text-[#1A1A1A] leading-tight mb-8 lg:sticky lg:top-32">
                  Оптимални действия за печеливш растеж
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="w-reveal text-lg lg:text-xl font-light text-[#1A1A1A] leading-relaxed mb-8">
                  Разполагайки с точната информация какво носи <strong>реален резултат и икономически обоснована възвръщаемост</strong>, онлайн маркетингът се превръща в <em className="text-[#DC2626]">прецизен и предвидим инструмент за устойчив растеж</em> на вашия бизнес.
                </p>
                <p className="w-reveal text-lg lg:text-xl font-light text-[#1A1A1A] leading-relaxed">
                  Инструмент, даващ ясни параметри за избора на <strong>рекламния бюджет</strong>, който да доведе до постигането на <strong>желания от вас резултат</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── КАЗУСИ — almero таблица ─── */}
      <section className="bg-white py-16 lg:py-24 border-t border-[#1A1A1A]/[0.06]">
        <div className="section-padding">
          <div className="container-max">
            <div className="mb-12 lg:mb-16">
              <span className="text-[10px] uppercase tracking-[0.2em] font-light text-[#DC2626]">Реални казуси</span>
              <h2 className="font-thin-display text-3xl lg:text-5xl text-[#1A1A1A] leading-tight mt-3 max-w-2xl">
                Числата зад думите
              </h2>
            </div>

            {/* Хедър на таблицата — desktop */}
            <div className="hidden lg:grid grid-cols-12 gap-6 pb-4 border-b border-[#1A1A1A]/10 text-[10px] uppercase tracking-[0.18em] font-medium text-[#1A1A1A]/55">
              <div className="col-span-3">Клиент</div>
              <div className="col-span-3">Дейност</div>
              <div className="col-span-4">Стратегия</div>
              <div className="col-span-2 text-right">Резултат</div>
            </div>

            {caseStudies.map(c => (
              <div key={c.name} className="case-row grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 py-8 lg:py-10 border-b border-[#1A1A1A]/[0.08]">
                <div className="case-cell lg:col-span-3">
                  <div className="text-lg font-bold text-[#1A1A1A]">{c.name}</div>
                  <div className="text-xs font-light text-[#1A1A1A]/50 mt-1">{c.business}</div>
                </div>
                <div className="case-cell lg:col-span-3">
                  <div className="lg:hidden text-[10px] uppercase tracking-[0.18em] font-medium text-[#1A1A1A]/55 mb-2">Дейност</div>
                  <ul className="flex flex-col gap-2">
                    {c.bullets.map(b => (
                      <li key={b} className="flex items-start gap-2 text-sm font-light text-[#1A1A1A]/75 leading-snug">
                        <span className="w-1 h-1 rounded-full bg-[#DC2626] mt-2 shrink-0" />{b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="case-cell lg:col-span-4">
                  <div className="lg:hidden text-[10px] uppercase tracking-[0.18em] font-medium text-[#1A1A1A]/55 mb-2">Стратегия</div>
                  <p className="text-sm font-light text-[#1A1A1A]/70 leading-relaxed">{c.strategy}</p>
                </div>
                <div className="case-cell lg:col-span-2 lg:text-right">
                  <div className="text-xs font-light text-[#1A1A1A]/50 mb-1">{c.highlightDesc}</div>
                  <div className="case-num text-[clamp(36px,4vw,56px)] font-extralight text-[#DC2626] leading-none">{c.highlight}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PHONE TRACKING DEMO ─── */}
      <section className="phone-section bg-[#F5F5F5] py-20 lg:py-32">
        <div className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <h2 className="ph-item font-thin-display text-3xl lg:text-5xl text-[#1A1A1A] leading-tight mb-8">
                  Позвънете, за да видите как работи проследяването
                </h2>

                <p className="ph-item text-base font-light text-[#1A1A1A]/70 leading-relaxed mb-8">
                  Имаме нужда от абсолютно минимална интеракция с всеки потребител, за да създадем пълен профил за неговото поведение, на базата на което да изградим дългосрочни взаимоотношения.
                </p>

                <div className="flex flex-col gap-6">
                  <div className="ph-item flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#DC2626]/10 rounded-lg flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-[#DC2626]" />
                    </div>
                    <p className="text-sm font-light text-[#1A1A1A]/70 leading-relaxed">
                      Обаждането е напълно безплатно и служи за тестово проследяване. След като наберете номера ще чуете сигнал &quot;заето&quot;.
                    </p>
                  </div>
                  <div className="ph-item flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#DC2626]/10 rounded-lg flex items-center justify-center shrink-0">
                      <ArrowUpRight size={18} className="text-[#DC2626]" />
                    </div>
                    <p className="text-sm font-light text-[#1A1A1A]/70 leading-relaxed">
                      Вашият профил ще бъде готов в рамките на около минута, след което ще можете да разгледате активността си и интеракциите, които сте направили с някои от нашите уебсайтове.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col items-center justify-center">
                <div className="ph-item relative mb-8">
                  <svg width="200" height="260" viewBox="0 0 200 260" fill="none" className="opacity-10">
                    <rect x="30" y="100" width="140" height="140" rx="20" stroke="#1A1A1A" strokeWidth="8" />
                    <path d="M60 100V70C60 42.4 82.4 20 110 20H110C137.6 20 160 42.4 160 70V100" stroke="#1A1A1A" strokeWidth="8" strokeLinecap="round" />
                    <circle cx="100" cy="170" r="15" stroke="#1A1A1A" strokeWidth="8" />
                    <line x1="100" y1="185" x2="100" y2="205" stroke="#1A1A1A" strokeWidth="8" strokeLinecap="round" />
                  </svg>
                </div>

                <a href="tel:+359887654321" data-cursor="Позвъни" className="ph-item text-4xl md:text-5xl lg:text-7xl font-extralight text-[#DC2626] hover:scale-105 transition-transform duration-300 tracking-tight">
                  +359 887 654 321
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-white py-20 lg:py-32">
        <div className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8">
                <p className="w-reveal text-xl lg:text-2xl font-light text-[#1A1A1A] leading-relaxed italic">
                  Ние заставаме зад думите си. Подплатяваме ги и с цифри, като измерваме ефективността на различните канали и комуникационни стратегии в брой обаждания, онлайн запитвания и продажби.
                </p>
              </div>
              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <MagneticCta className="w-40 h-40 lg:w-48 lg:h-48" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <NextPage to="/ceni" label="Цени" />
    </div>
  )
}
