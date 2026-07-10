import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check } from 'lucide-react'
import { maskReveal, reveal, wordsReveal } from '../lib/motion'
import StatsBand from '../components/StatsBand'
import MagneticCta from '../components/MagneticCta'
import NextPage from '../components/NextPage'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  {
    number: '01',
    title: 'Платформата',
    text: 'Мрежа от профилирани страници с ясно изразен характер и отчетлив хумор — от тесни и специализирани до широки аудитории. Групата от страници около Just Pablo разполага с най-много последователи и най-диверсифицираните органично изградени аудитории сред инфлуенсър платформите в България.',
  },
  {
    number: '02',
    title: 'Native подходът',
    text: 'Всяка продукция, която създаваме, стъпва на native advertising — брандът влиза естествено в хумористичния поток и ежедневните тенденциозни теми. Така сваляме „напрежението" на потребителя от класическите рекламни подходи и успеваемостта ни винаги е над гарантираното базисно ниво.',
  },
  {
    number: '03',
    title: 'Данни в реално време',
    text: 'Общата ни платформа събира и анализира потребителското поведение в реално време. Проследяваме метричните стойности по демографски признаци, адаптираме посланията в движение и знаем кои течения как се възприемат от различните аудитории, които таргетираме.',
  },
]

const results = [
  'Голям базисен reach до силно ангажирани аудитории — директни потребители и естествени преносители на посланията',
  'Повишаване на информираността около дейностите на бранда',
  'Повишаване на потреблението върху личните канали на бранда',
  'Дългосрочно изменение на представите на потребителя за бранда',
  'Измерима ефективност от прилагането на стратегиите ни',
]

const coverage = [
  { group: '18–24', pablo: '130 000', bg: '410 000', pct: '31%', hot: true },
  { group: '25–34', pablo: '78 000', bg: '390 000', pct: '20%' },
  { group: '35–44', pablo: '18 500', bg: '212 000', pct: '11%' },
  { group: '45–54', pablo: '5 000', bg: '33 000', pct: '15%' },
  { group: '65+', pablo: '5 000', bg: '24 000', pct: '20%' },
]

const cities = ['София', 'Пловдив', 'Варна', 'Бургас', 'Русе', 'Велико Търново']

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = pageRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      reveal(el.querySelector('.ab-label'), el.querySelector('.ab-hero'), { y: 16, duration: 0.6 })
      maskReveal(el.querySelector('.ab-h1'), null, { delay: 0.1 })

      gsap.utils.toArray<HTMLElement>('.ab-h2').forEach(h => {
        const sec = h.closest('section')
        maskReveal(h, sec)
      })

      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('.w-reveal').forEach(p => wordsReveal(p))
      })

      gsap.utils.toArray<HTMLElement>('.ab-pillar').forEach((p, i) => {
        reveal(p, p, { y: 28, delay: i * 0.05 })
      })

      const list = el.querySelector('.ab-results')
      if (list) reveal(list.querySelectorAll('.ab-result'), list, { y: 20, stagger: 0.08 })

      gsap.utils.toArray<HTMLElement>('.cov-row').forEach(row => {
        gsap.from(row.querySelectorAll('.cov-cell'), {
          scrollTrigger: { trigger: row, start: 'top 88%', once: true },
          y: 20, opacity: 0, duration: 0.6, stagger: 0.06, ease: 'power3.out', clearProps: 'transform',
        })
      })

      const gender = el.querySelector('.ab-gender-fill')
      if (gender) {
        gsap.from(gender, {
          scrollTrigger: { trigger: gender, start: 'top 85%', once: true },
          scaleX: 0, transformOrigin: 'left center', duration: 1.1, ease: 'power3.out',
        })
      }
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="pt-20">
      {/* ─── HERO ─── */}
      <section className="ab-hero bg-white py-16 lg:py-24">
        <div className="section-padding">
          <div className="container-max">
            <span className="ab-label text-[10px] uppercase tracking-[0.2em] font-light text-[#DC2626] mb-4 block">За нас</span>
            <h1 className="ab-h1 font-thin-display text-[clamp(40px,6.5vw,92px)] text-[#1A1A1A] leading-[1.02] mb-10">
              Кои сме ние?
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <p className="w-reveal lg:col-span-7 text-lg lg:text-2xl font-light text-[#1A1A1A] leading-relaxed">
                Just Pablo започва през <strong>2013 г.</strong> като страница във Facebook, а от 2016 г. — и в Instagram. Оттогава изградихме ясно изразена и разпознаваема платформа с множество профилирани страници, отчетлив хумор и <em className="text-[#DC2626]">силно подкрепяща и изискваща маса потребители.</em>
              </p>
              <p className="w-reveal lg:col-span-5 text-base lg:text-lg font-light text-[#1A1A1A]/70 leading-relaxed lg:pt-2">
                Днес групата от страници около Just Pablo разполага с най-много последователи и най-диверсифицираните, органично изградени аудитории в условията на инфлуенсър платформите в България. Върху тази основа стъпи и дигиталната ни агенция.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ЧИСЛАТА ─── */}
      <StatsBand
        stats={[
          { value: '338 000+', label: 'Instagram аудитория' },
          { value: '156 000+', label: 'Facebook аудитория' },
          { value: '120 000+', label: 'Viber аудитория' },
          { value: '113 000+', label: 'взаимодействия на седмица' },
        ]}
      />

      {/* ─── КАКВО НИ ПРАВИ РАЗЛИЧНИ ─── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="section-padding">
          <div className="container-max">
            <h2 className="ab-h2 font-thin-display text-3xl lg:text-5xl text-[#1A1A1A] leading-tight mb-6 max-w-2xl">
              Какво ни прави различни
            </h2>
            <p className="w-reveal text-base lg:text-lg font-light text-[#1A1A1A]/70 leading-relaxed max-w-2xl mb-14">
              Диверсификацията на комуникационните послания, хумористичните подходи и оригиналният стил на изказ на всяка една от страниците ни ни позволяват да събираме от тесни и специализирани до широки аудитории — и да осъществяваме реално влияние с <strong>високо ROI</strong>.
            </p>

            <div className="flex flex-col">
              {pillars.map(p => (
                <div key={p.number} className="ab-pillar grid grid-cols-[auto_1fr] gap-6 lg:gap-10 py-8 lg:py-10 border-t border-[#1A1A1A]/[0.08]">
                  <span className="text-3xl lg:text-4xl font-extralight text-[#DC2626]/30 leading-none">{p.number}</span>
                  <div>
                    <h3 className="text-lg lg:text-xl font-semibold text-[#1A1A1A] mb-3">{p.title}</h3>
                    <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed max-w-3xl">{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── КАК ГО ПРАВИМ ─── */}
      <section className="bg-[#F5F5F5] py-16 lg:py-24">
        <div className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5">
                <h2 className="ab-h2 font-thin-display text-3xl lg:text-5xl text-[#1A1A1A] leading-tight mb-6 lg:sticky lg:top-32">
                  Как го правим
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="w-reveal text-base lg:text-lg font-light text-[#1A1A1A]/75 leading-relaxed mb-8">
                  „Вкарваме" присъствието на бранда в хумористичния поток и ежедневните тенденциозни теми, а ежедневните анализи на метричните показатели ни позволяват да строим средносрочни и дългосрочни кампании с висока успеваемост и ясно измерими показатели. Трайните резултати:
                </p>
                <div className="ab-results flex flex-col gap-3">
                  {results.map(item => (
                    <div key={item} className="ab-result flex items-start gap-4 bg-white rounded-xl px-6 py-4">
                      <div className="w-7 h-7 rounded-full bg-[#DC2626] flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={14} className="text-white" />
                      </div>
                      <span className="text-base font-light text-[#1A1A1A] leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ПОКРИТИЕ ─── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="section-padding">
          <div className="container-max">
            <h2 className="ab-h2 font-thin-display text-3xl lg:text-5xl text-[#1A1A1A] leading-tight mb-4 max-w-2xl">
              Покритие по възрастови групи
            </h2>
            <p className="text-base font-light text-[#1A1A1A]/60 mb-12 max-w-xl">
              Каква част от българската Instagram аудитория достига платформата ни — по данни от вътрешната ни аналитика.
            </p>

            <div className="hidden lg:grid grid-cols-12 gap-6 pb-4 border-b border-[#1A1A1A]/10 text-[10px] uppercase tracking-[0.18em] font-medium text-[#1A1A1A]/50">
              <div className="col-span-3">Възрастова група</div>
              <div className="col-span-3">Just Pablo</div>
              <div className="col-span-3">Instagram България</div>
              <div className="col-span-3 text-right">Покритие</div>
            </div>

            {coverage.map(row => (
              <div key={row.group} className={`cov-row grid grid-cols-2 lg:grid-cols-12 gap-3 lg:gap-6 py-5 lg:py-6 border-b border-[#1A1A1A]/[0.08] items-center ${row.hot ? 'bg-[#DC2626]/[0.03] -mx-4 px-4 rounded-lg' : ''}`}>
                <div className="cov-cell lg:col-span-3 text-base font-bold text-[#1A1A1A]">{row.group} г.</div>
                <div className="cov-cell lg:col-span-3 text-base font-light text-[#1A1A1A]/75 text-right lg:text-left">{row.pablo}</div>
                <div className="cov-cell hidden lg:block lg:col-span-3 text-base font-light text-[#1A1A1A]/50">{row.bg}</div>
                <div className={`cov-cell col-span-2 lg:col-span-3 text-right text-2xl lg:text-3xl font-extralight leading-none ${row.hot ? 'text-[#DC2626]' : 'text-[#1A1A1A]/70'}`}>
                  {row.pct}
                </div>
              </div>
            ))}

            {/* Демография */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-14 items-center">
              <div className="lg:col-span-6">
                <div className="text-[10px] uppercase tracking-[0.18em] font-medium text-[#1A1A1A]/50 mb-4">Балансирана аудитория</div>
                <div className="flex items-center justify-between text-sm font-medium mb-2">
                  <span className="text-[#1A1A1A]">Мъже 49%</span>
                  <span className="text-[#DC2626]">Жени 51%</span>
                </div>
                <div className="h-2.5 rounded-full bg-[#DC2626]/90 overflow-hidden">
                  <div className="ab-gender-fill h-full w-[49%] bg-[#1A1A1A] rounded-l-full" />
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="text-[10px] uppercase tracking-[0.18em] font-medium text-[#1A1A1A]/50 mb-4">Градове с най-голяма аудитория</div>
                <div className="flex flex-wrap gap-2.5">
                  {cities.map(c => (
                    <span key={c} className="px-4 py-2 rounded-full border border-[#1A1A1A]/10 text-sm font-light text-[#1A1A1A]/75">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ФИНАЛ ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8">
                <p className="w-reveal text-xl lg:text-3xl font-light text-[#1A1A1A] leading-relaxed">
                  Време е за нещо различно. <em className="text-[#DC2626]">Станете част от Pablo — Just Pablo.</em>
                </p>
              </div>
              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <MagneticCta className="w-40 h-40 lg:w-48 lg:h-48" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <NextPage to="/uslugi" label="Услуги" />
    </div>
  )
}
