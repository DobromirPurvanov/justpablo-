import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { ArrowUpRight, Phone } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const questions = [
  { q: 'Колко ми струва едно запитване от клиент?', a: 'Чрез детайлен анализ на вашите рекламни канали и конверсии, определяме точната цена на всяко запитване. Това ви позволява да оптимизирате бюджета и да фокусирате усилията върху най-ефективните канали.' },
  { q: 'Какъв е профилът на моите клиенти?', a: 'Изграждаме детайлни клиентски профили на база демографски данни, поведение и предпочитания. Това ни помага да създаваме персонализирани маркетингови послания, които резонират с точната аудитория.' },
  { q: 'Каква комбинация от онлайн реклама привлича ефективно нови клиенти?', a: 'Анализираме ефективността на всеки канал — Google Ads, Facebook, Instagram, SEO, email маркетинг. На база данни, изготвяме оптимална мултиканална стратегия, която максимизира ROI.' },
  { q: 'Колко ми струва една продажба?', a: 'Проследяваме целия път на клиента — от първия клик до финализираната продажба. Така определяме Cost Per Acquisition (CPA) и ви даваме яснота кои канали носят най-печеливши клиенти.' },
  { q: 'Каква е рецептата бизнесът ви да расте печелившо и предвидимо?', a: 'Комбинация от data-driven маркетинг, непрекъсната оптимизация и прозрачна отчетност. Работим с ясни KPI-та, месечни цели и регулярни ревюта, за да гарантираме устойчив растеж.' },
]

export default function Results() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [openQ, setOpenQ] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.from('.hero-title', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' })
        .from('.hero-desc', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .from('.hero-chart', { scale: 0.9, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.5')
        .from('.hero-questions li', { x: 30, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' }, '-=0.5')

      gsap.from('.clarity-section', {
        scrollTrigger: { trigger: '.clarity-section', start: 'top 80%' },
        y: 40, opacity: 0, duration: 1, ease: 'power3.out',
      })

      gsap.from('.growth-section', {
        scrollTrigger: { trigger: '.growth-section', start: 'top 80%' },
        y: 40, opacity: 0, duration: 1, ease: 'power3.out',
      })

      gsap.from('.phone-section', {
        scrollTrigger: { trigger: '.phone-section', start: 'top 80%' },
        y: 40, opacity: 0, duration: 1, ease: 'power3.out',
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="pt-20" ref={heroRef}>
      {/* ─── HERO ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left: Title + Description */}
              <div className="lg:col-span-5">
                <h1 className="hero-title font-thin-display text-[clamp(36px,5vw,72px)] text-[#1A1A1A] leading-[1.05] mb-8">
                  Проследими и предвидими резултати
                </h1>
                <p className="hero-desc text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                  Работим едновременно да намалим средната цена на онлайн запитване и да увеличим възвръщаемостта на инвестицията ви в онлайн реклама. По този начин ви даваме възможност да се фокусирате върху <em className="text-[#DC2626]">растежа и управлението на бизнеса си.</em>
                </p>
              </div>

              {/* Right: Chart + Questions */}
              <div className="lg:col-span-7">
                {/* Chart illustration */}
                <div className="hero-chart relative mb-10">
                  <svg viewBox="0 0 600 200" className="w-full" fill="none">
                    {/* Grid lines */}
                    {[0, 50, 100, 150].map(y => (
                      <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="#E5E5E5" strokeWidth="0.5" />
                    ))}
                    {/* Bars */}
                    {[40, 55, 45, 70, 80, 95, 110, 120, 135, 150, 140, 155].map((h, i) => (
                      <rect key={i} x={30 + i * 45} y={160 - h} width="25" height={h} rx="3" fill={i >= 8 ? '#DC2626' : '#DC2626'} opacity={i >= 8 ? 1 : 0.3 + i * 0.05} />
                    ))}
                    {/* Trend line */}
                    <path d="M42.5 120 Q 100 110, 150 90 T 250 70 T 350 50 T 450 30 T 540 15" stroke="#DC2626" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                    {/* Label */}
                    <rect x="20" y="50" width="70" height="30" rx="4" fill="#DC2626" />
                    <text x="55" y="70" textAnchor="middle" fill="white" fontSize="11" fontFamily="Montserrat" fontWeight="600">239 лв.</text>
                    <text x="55" y="85" textAnchor="middle" fill="#1A1A1A" fontSize="9" fontFamily="Montserrat" opacity="0.5">цена на запитване</text>
                  </svg>
                </div>

                {/* Questions */}
                <ul className="hero-questions flex flex-col gap-4">
                  {questions.map((item, i) => (
                    <li key={i}>
                      <button
                        onClick={() => setOpenQ(openQ === i ? null : i)}
                        className={`text-left text-base font-medium transition-colors ${openQ === i ? 'text-[#DC2626]' : 'text-[#1A1A1A]/80 hover:text-[#DC2626]'}`}
                      >
                        {item.q}
                      </button>
                      {openQ === i && (
                        <p className="text-sm font-light text-[#1A1A1A]/70 leading-relaxed mt-3 pl-4 border-l-2 border-[#DC2626]">
                          {item.a}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLARITY SECTION ─── */}
      <section className="clarity-section bg-white py-16 lg:py-24">
        <div className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left: Title */}
              <div className="lg:col-span-5">
                <h2 className="font-thin-display text-3xl lg:text-5xl text-[#1A1A1A] leading-tight mb-8">
                  Получавате яснота за вашето дигитално позициониране
                </h2>
              </div>

              {/* Right: Text */}
              <div className="lg:col-span-7">
                <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed mb-6">
                  Ние обичаме данните. Чрез тях можем да измерим потребителското поведение, да определим в детайли целевите клиентски профили и да идентифицираме потенциално нови сегменти. По този начин ние използваме ефективно най-голямата сила на онлайн рекламата — <em className="text-[#DC2626]">достигането до точните хора, в точното време.</em>
                </p>
                <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed mb-6">
                  Ние заставаме зад думите си. Подплатяваме ги и с цифри, като измерваме ефективността на различните канали и комуникационни стратегии в брой обаждания, онлайн запитвания и продажби.
                </p>
                <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                  Благодарение на това, знаем навреме какъв е <strong className="text-[#1A1A1A]">резултатът</strong> от съвместната ни работа, а вие се сдобивате с <strong className="text-[#1A1A1A]">управляем канал за продажба и растеж</strong>.
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
              {/* Left: Title */}
              <div className="lg:col-span-5">
                <h2 className="font-thin-display text-3xl lg:text-5xl text-[#1A1A1A] leading-tight mb-8">
                  Оптимални действия за печеливш растеж
                </h2>
              </div>

              {/* Right: Text */}
              <div className="lg:col-span-7">
                <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed mb-6">
                  Разполагайки с точната информация какво носи <strong className="text-[#1A1A1A]">реален резултат и икономически обоснована възвръщаемост</strong>, онлайн маркетингът се превръща в <em className="text-[#DC2626]">прецизен и предвидим инструмент за устойчив растеж</em> на вашия бизнес.
                </p>
                <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                  Инструмент, даващ ясни параметри за избора на <strong className="text-[#1A1A1A]">рекламния бюджет</strong>, който да доведе до постигането на <strong className="text-[#1A1A1A]">желания от вас резултат</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PHONE TRACKING DEMO ─── */}
      <section className="phone-section bg-white py-20 lg:py-32">
        <div className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left: Title */}
              <div className="lg:col-span-5">
                <h2 className="font-thin-display text-3xl lg:text-5xl text-[#1A1A1A] leading-tight mb-8">
                  Позвънете, за да видите как работи проследяването
                </h2>

                <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed mb-8">
                  Имаме нужда от абсолютно минимална интеракция с всеки потребител, за да създадем пълен профил за неговото поведение, на базата на което да изградим дългосрочни взаимоотношения.
                </p>

                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#DC2626]/10 rounded-lg flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-[#DC2626]" />
                    </div>
                    <p className="text-sm font-light text-[#1A1A1A]/70 leading-relaxed">
                      Обаждането е напълно безплатно и служи за тестово проследяване. След като наберете номера ще чуете сигнал &quot;заето&quot;.
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#DC2626]/10 rounded-lg flex items-center justify-center shrink-0">
                      <ArrowUpRight size={18} className="text-[#DC2626]" />
                    </div>
                    <p className="text-sm font-light text-[#1A1A1A]/70 leading-relaxed">
                      Вашият профил ще бъде готов в рамките на около минута, след което ще можете да разгледате активността си и интеракциите, които сте направили с някои от нашите уебсайтове.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Big Phone Number */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center">
                {/* Lock icon illustration */}
                <div className="relative mb-8">
                  <svg width="200" height="260" viewBox="0 0 200 260" fill="none" className="opacity-10">
                    <rect x="30" y="100" width="140" height="140" rx="20" stroke="#1A1A1A" strokeWidth="8" />
                    <path d="M60 100V70C60 42.4 82.4 20 110 20H110C137.6 20 160 42.4 160 70V100" stroke="#1A1A1A" strokeWidth="8" strokeLinecap="round" />
                    <circle cx="100" cy="170" r="15" stroke="#1A1A1A" strokeWidth="8" />
                    <line x1="100" y1="185" x2="100" y2="205" stroke="#1A1A1A" strokeWidth="8" strokeLinecap="round" />
                  </svg>
                </div>

                <a href="tel:+359887654321" className="text-5xl lg:text-7xl font-extralight text-[#DC2626] hover:scale-105 transition-transform tracking-tight">
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
                <p className="text-xl lg:text-2xl font-light text-[#1A1A1A] leading-relaxed italic">
                  Ние заставаме зад думите си. Подплатяваме ги и с цифри, като измерваме ефективността на различните канали и комуникационни стратегии в брой обаждания, онлайн запитвания и продажби.
                </p>
              </div>
              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <Link
                  to="/zapitvane"
                  className="group relative w-36 h-36 lg:w-44 lg:h-44 flex items-center justify-center"
                >
                  <svg viewBox="0 0 180 180" className="absolute inset-0 w-full h-full animate-spin-slow">
                    <defs>
                      <path
                        id="ctaCircleR"
                        d="M 90, 90 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                      />
                    </defs>
                    <text className="fill-[#1A1A1A] text-[9px] font-light tracking-[0.15em] uppercase">
                      <textPath href="#ctaCircleR">
                        Направи запитване • JustPablo • 
                      </textPath>
                    </text>
                  </svg>
                  <div className="w-20 h-20 lg:w-24 lg:h-24 bg-[#DC2626] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
