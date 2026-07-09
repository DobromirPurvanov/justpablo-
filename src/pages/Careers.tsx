import { useEffect, useRef } from 'react'
import { ArrowRight, MapPin } from 'lucide-react'

const positions = [
  {
    title: 'SEO Специалист',
    type: 'Пълен работен ден',
    location: 'Варна / Remote',
    tags: ['SEO', 'Анализи', 'Content', 'Google Search Console', 'Ahrefs'],
    description: 'Търсим SEO специалист с опит в оптимизацията на уебсайтове, изграждането на линк профили и анализа на конкуренцията.',
    responsibilities: [
      'Провеждане на SEO одити и анализи',
      'Изграждане на стратегии за органичен трафик',
      'Оптимизация на on-page и off-page фактори',
      'Работа с Google Search Console, Ahrefs, SEMrush',
      'Изготвяне на месечни отчети за клиенти',
    ],
    requirements: [
      'Минимум 1 година опит в SEO',
      'Отлично познаване на Google алгоритмите',
      'Аналитично мислене и внимание към детайла',
      'Умения за работа с SEO инструменти',
    ],
    weOffer: [
      'Конкурентна заплата + бонуси',
      'Гъвкаво работно време',
      'Възможност за remote работа',
      'Обучение и сертификации',
      'Млад и динамичен екип',
    ],
  },
  {
    title: 'Уеб Дизайнер',
    type: 'Пълен работен ден',
    location: 'Варна',
    tags: ['UI/UX', 'Figma', 'Tailwind', 'React', 'Адаптивен дизайн'],
    description: 'Търсим креативен уеб дизайнер, който да създава модерни и функционални интерфейси за клиентите ни.',
    responsibilities: [
      'Създаване на UI/UX дизайн за уебсайтове',
      'Разработка на wireframes и прототипи',
      'Работа с Figma и Adobe Creative Suite',
      'Сътрудничество с разработчици за имплементация',
      'Поддръжка и ъпдейт на съществуващи проекти',
    ],
    requirements: [
      'Портфолио с уеб дизайн проекти',
      'Отлично владеене на Figma',
      'Познания в UI/UX принципите',
      'Опит с адаптивен дизайн',
    ],
    weOffer: [
      'Творческа среда и интересни проекти',
      'Модерно оборудване',
      'Възможност за професионално развитие',
      'Екипни събития и team building',
    ],
  },
  {
    title: 'Копирайтър',
    type: 'Пълен работен ден / Freelance',
    location: 'Варна / Remote',
    tags: ['Копирайтинг', 'SEO текстове', 'Social Media', 'Блог', 'Email маркетинг'],
    description: 'Търсим талантлив копирайтър, който да създава убедително съдържание за уеб, социални мрежи и маркетинг кампании.',
    responsibilities: [
      'Създаване на SEO-оптимизирани текстове',
      'Копирайтинг за социални мрежи',
      'Изготвяне на email кампании',
      'Блог статии и case studies',
      'Сътрудничество с SEO и дизайн екипа',
    ],
    requirements: [
      'Отлично владеене на български език',
      'Креативно мислене и стил на писане',
      'Опит с SEO копирайтинг (предимство)',
      'Умения за работа с deadlines',
    ],
    weOffer: [
      'Гъвкаво работно време',
      'Възможност за remote / freelance',
      'Разнообразие от проекти',
      'Обратна връзка и менторство',
    ],
  },
  {
    title: 'PPC Специалист',
    type: 'Пълен работен ден',
    location: 'Варна / Remote',
    tags: ['Google Ads', 'Facebook Ads', 'Анализи', 'ROI', 'A/B Testing'],
    description: 'Търсим PPC специалист за управление на рекламни кампании в Google Ads и Meta (Facebook/Instagram).',
    responsibilities: [
      'Създаване и оптимизация на Google Ads кампании',
      'Управление на Facebook/Instagram реклами',
      'A/B тестване на криейтиви и текстове',
      'Анализ на ROI и конверсии',
      'Месечни отчети и препоръки',
    ],
    requirements: [
      'Сертификати Google Ads (предимство)',
      'Опит с Facebook Business Manager',
      'Аналитични умения',
      'Ориентация към резултати',
    ],
    weOffer: [
      'Конкурентна заплата + performance бонуси',
      'Бюджети за обучение и сертификации',
      'Гъвкаво работно време',
      'Възможност за remote',
    ],
  },
  {
    title: 'Проект Мениджър',
    type: 'Пълен работен ден',
    location: 'Варна',
    tags: ['Управление', 'Клиенти', 'Стратегия', 'Agile', 'Комуникация'],
    description: 'Търсим организиран проект мениджър за координиране на дигитални проекти и комуникация с клиенти.',
    responsibilities: [
      'Управление на дигитални проекти от началото до края',
      'Комуникация с клиенти и екипа',
      'Планиране на задачи и срокове',
      'Следене на бюджети и ресурси',
      'Подготовка на презентации и отчети',
    ],
    requirements: [
      'Опит в управление на проекти (IT/дигитален маркетинг)',
      'Отлични комуникативни умения',
      'Организираност и лидерски качества',
      'Познания в Agile/Scrum (предимство)',
    ],
    weOffer: [
      'Атрактивна заплата + бонуси',
      'Възможност за професионален растеж',
      'Работа с разнообразни клиенти',
      'Екипни събития и приятна атмосфера',
    ],
  },
]

export default function Careers() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current) return
    heroRef.current.scrollIntoView({ behavior: 'instant', block: 'start' })
  }, [])

  return (
    <div className="pt-20" ref={heroRef}>
      {/* Hero */}
      <section className="bg-white py-20 lg:py-28">
        <div className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <span className="text-xs font-semibold text-[#DC2626] tracking-wider uppercase mb-4 block">
                  Кариери
                </span>
                <h1 className="font-thin-display text-[clamp(36px,5vw,72px)] text-[#1A1A1A] leading-[1.05] mb-6">
                  Расти заедно с нас
                </h1>
                <p className="text-base font-light text-[#1A1A1A]/60 leading-relaxed max-w-xl">
                  JustPablo е дигитална агенция, която вярва в хората. Търсим таланти, които искат да се развиват, да учат и да създават значими проекти. Ако си сред тях — пиши ни.
                </p>
              </div>
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                  <svg viewBox="0 0 320 320" className="w-full h-full animate-spin-slow">
                    <defs>
                      <path id="careerCircle" d="M 160, 160 m -130, 0 a 130,130 0 1,1 260,0 a 130,130 0 1,1 -260,0" />
                    </defs>
                    <circle cx="160" cy="160" r="155" fill="none" stroke="#1A1A1A" strokeWidth="0.5" opacity="0.1" />
                    <circle cx="160" cy="160" r="160" fill="none" stroke="#DC2626" strokeWidth="0.5" opacity="0.2" />
                    <text className="fill-[#1A1A1A] text-[11px] font-light tracking-[0.2em] uppercase">
                      <textPath href="#careerCircle">
                        Присъедини се към JustPablo • 5 свободни позиции • 
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#DC2626] rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Positions */}
      <section className="bg-[#F5F5F5] py-16 lg:py-24">
        <div className="section-padding">
          <div className="container-max">
            <div className="flex flex-col gap-6">
              {positions.map((pos, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 lg:p-8 hover:shadow-lg transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                    {/* Left: Title + meta */}
                    <div className="lg:col-span-4">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-medium text-[#DC2626] bg-[#DC2626]/10 px-3 py-1 rounded-full">
                          {pos.type}
                        </span>
                        <span className="text-xs font-light text-[#1A1A1A]/50 flex items-center gap-1">
                          <MapPin size={12} />
                          {pos.location}
                        </span>
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-[#1A1A1A] mb-2">
                        {pos.title}
                      </h3>
                      <p className="text-sm font-light text-[#1A1A1A]/60 leading-relaxed">
                        {pos.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {pos.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-[10px] font-medium text-[#1A1A1A]/50 bg-[#F5F5F5] px-2.5 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Middle: Responsibilities + Requirements */}
                    <div className="lg:col-span-5">
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider mb-2">
                          Отговорности
                        </h4>
                        <ul className="space-y-1.5">
                          {pos.responsibilities.map((item, j) => (
                            <li key={j} className="text-sm font-light text-[#1A1A1A]/70 flex items-start gap-2">
                              <span className="text-[#DC2626] mt-1">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider mb-2">
                          Изисквания
                        </h4>
                        <ul className="space-y-1.5">
                          {pos.requirements.map((item, j) => (
                            <li key={j} className="text-sm font-light text-[#1A1A1A]/70 flex items-start gap-2">
                              <span className="text-[#DC2626] mt-1">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right: What we offer + CTA */}
                    <div className="lg:col-span-3">
                      <h4 className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider mb-2">
                        Предлагаме
                      </h4>
                      <ul className="space-y-1.5 mb-6">
                        {pos.weOffer.map((item, j) => (
                          <li key={j} className="text-sm font-light text-[#1A1A1A]/70 flex items-start gap-2">
                            <span className="text-[#9BFF00] mt-1">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                      <a
                        href="mailto:jobs@justpablo.bg?subject=Кандидатура:"
                        className="inline-flex items-center gap-2 bg-[#DC2626] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#B91C1C] transition-colors w-full justify-center"
                      >
                        Кандидатствай
                        <ArrowRight size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 lg:py-32">
        <div className="section-padding">
          <div className="container-max text-center">
            <h2 className="font-thin-display text-3xl lg:text-5xl text-[#1A1A1A] mb-6">
              Не намираш подходяща позиция?
            </h2>
            <p className="text-base font-light text-[#1A1A1A]/60 max-w-xl mx-auto mb-8">
              Винаги търсим таланти. Изпрати ни своята автобиография и портфолио — ще се свържем с теб, когато има подходяща възможност.
            </p>
            <a
              href="mailto:jobs@justpablo.bg"
              className="inline-flex items-center gap-3 bg-[#DC2626] text-white px-8 py-4 rounded-full text-base font-medium hover:bg-[#B91C1C] hover:scale-105 transition-all"
            >
              Изпрати CV
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
