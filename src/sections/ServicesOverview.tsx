import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { maskReveal, reveal } from '../lib/motion'
import { scrollToY } from '../lib/scroll'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  {
    number: '01',
    title: 'Стратегия и позициониране',
    text: 'Полагаме основите за онлайн успеха на бизнеса ви с изготвяне на цялостна маркетинг стратегия. Определяме конкретни целеви сегменти и потребителски профили. Създаваме дългосрочна комуникационна стратегия за успешно позициониране на бранда онлайн.',
  },
  {
    number: '02',
    title: 'Съдържание и кампании',
    text: 'Създаваме съдържание, което откроява дигиталното ви присъствие и е съобразено със спецификите на вашия бранд. Изготвяме планинг за регулярните кампании, като следим резултатите в реално време, за да адаптираме прецизно комуникацията.',
  },
  {
    number: '03',
    title: 'Резултати и възвръщаемост',
    text: 'Затваряме кръга на потребителското изживяване и оптимизираме възвръщаемостта на инвестициите чрез пълна гама от дигитални услуги. Максимална ефективност, която показва, че вашият бранд е в добри ръце.',
  },
]

const rings = [
  {
    id: 'ring-outer', r: 267.5, spin: 'ring-a',
    text: 'Комуникационна стратегия   /   Целеви аудитории   /   Позициониране   /   Брандинг   /   Инсайти   /   Визуална идентичност   /',
  },
  {
    id: 'ring-mid', r: 239, spin: 'ring-b',
    text: 'Уеб дизайн   /   Фотография   /   Видео   /   Копирайт   /   Google Ads   /   SEO   /   Рекламни кампании   /   Постинг план   /',
  },
  {
    id: 'ring-inner', r: 210.55, spin: 'ring-c',
    text: 'Business Intelligence   /   Автоматизация   /   Криейтив   /   Планинг   /   SMS   /   Viber   /',
  },
]

const circlePath = (r: number) =>
  `M ${280 - r},280 A ${r},${r} 0 1,1 ${280 + r},280 A ${r},${r} 0 1,1 ${280 - r},280`

/**
 * Almero workflow модел: на desktop секцията се заковава и скролът
 * превърта трите стъпки — активното заглавие свети, съответният
 * пръстен изпъква, текстът се сменя. Кликът върху заглавие скролва
 * до стъпката. На мобилно — статични стълбове.
 */
export default function ServicesOverview() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      reveal(el.querySelector('.so-label'), el, { y: 16, duration: 0.6 })
      maskReveal(el.querySelector('.so-h2'), el, { delay: 0.1 })

      const mm = gsap.matchMedia()

      // Гигантското заглавие се плъзга хоризонтално
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('.so-bigtitle',
          { x: '6vw' },
          { x: '-12vw', ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 } }
        )
      })

      // Закачена стъпкова сцена (workflow)
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const scene = el.querySelector('.so-scene') as HTMLElement | null
        if (!scene) return
        const titles = gsap.utils.toArray<HTMLElement>('.so-step-title', scene)
        const texts = gsap.utils.toArray<HTMLElement>('.so-step-text', scene)
        const ringEls = gsap.utils.toArray<HTMLElement>('.so-ring', scene)
        if (titles.length < 3) return

        gsap.set(titles.slice(1), { opacity: 0.25 })
        gsap.set(texts.slice(1), { autoAlpha: 0, y: 20 })
        gsap.set(ringEls.slice(1), { opacity: 0.18 })

        const total = titles.length - 1
        const tl = gsap.timeline({
          defaults: { duration: 0.4, ease: 'power2.out' },
          scrollTrigger: {
            trigger: scene,
            start: 'top top',
            end: () => '+=' + total * window.innerHeight * 0.85,
            pin: true,
            scrub: 0.5,
            snap: { snapTo: 1 / total, duration: 0.35, ease: 'power2.inOut' },
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onRefresh: self => { stRef.current = self },
          },
        })
        stRef.current = tl.scrollTrigger ?? null

        titles.forEach((_, i) => {
          if (i === 0) return
          const t0 = i - 1
          tl.to(titles[i - 1], { opacity: 0.25 }, t0 + 0.1)
            .to(titles[i], { opacity: 1 }, t0 + 0.1)
            .to(texts[i - 1], { autoAlpha: 0, y: -20 }, t0 + 0.05)
            .to(texts[i], { autoAlpha: 1, y: 0 }, t0 + 0.35)
            .to(ringEls[i - 1], { opacity: 0.18 }, t0 + 0.1)
            .to(ringEls[i], { opacity: 1 }, t0 + 0.1)
        })
        tl.to({}, { duration: Math.max(0.001, total - tl.duration()) })
      })
    }, el)
    return () => ctx.revert()
  }, [])

  const goToStep = (i: number) => {
    const st = stRef.current
    if (!st) return
    const target = st.start + (i / (pillars.length - 1)) * (st.end - st.start) + 2
    scrollToY(target)
  }

  return (
    <section ref={sectionRef} className="bg-white py-16 lg:py-0 lg:pt-16 relative overflow-hidden">
      {/* Гигантско плъзгащо се секционно заглавие */}
      <div className="mb-12 lg:mb-8 pointer-events-none select-none">
        <span className="so-bigtitle block font-ultra-thin whitespace-nowrap text-[clamp(72px,15vw,210px)] leading-none text-[#1A1A1A] will-change-transform">
          &nbsp;Услуги
        </span>
      </div>

      {/* ═══ DESKTOP: закачена стъпкова сцена ═══ */}
      <div className="so-scene hidden lg:flex flex-col justify-center h-screen">
        <div className="section-padding w-full">
          <div className="container-max">
            <div className="mb-10 max-w-xl">
              <span className="so-label text-[10px] uppercase tracking-[0.2em] font-light text-[#DC2626]">Как работим</span>
              <h2 className="so-h2 text-[clamp(24px,3vw,40px)] font-bold text-[#1A1A1A] leading-tight mt-3">
                Поемаме дигиталната трансформация на вашия бизнес
              </h2>
            </div>

            <div className="grid grid-cols-12 gap-8 items-center">
              {/* Пръстените — активният изпъква */}
              <div className="col-span-5">
                <div className="relative w-[380px] h-[380px] xl:w-[430px] xl:h-[430px] mx-auto">
                  {rings.map(ring => (
                    <div key={ring.id} className={`so-ring absolute inset-0 ${ring.spin}`}>
                      <svg viewBox="0 0 560 560" className="w-full h-full">
                        <defs>
                          <path id={ring.id} d={circlePath(ring.r)} fill="none" />
                        </defs>
                        <text fill="#1A1A1A" opacity="0.6" fontSize="16" fontFamily="Montserrat, sans-serif" fontWeight="500" letterSpacing="1.5">
                          <textPath href={`#${ring.id}`}>{ring.text}</textPath>
                        </text>
                      </svg>
                    </div>
                  ))}
                  <div className="absolute inset-[28%] rounded-full bg-white/80 backdrop-blur-[2px] flex items-center justify-center">
                    <Link to="/uslugi" data-cursor="Виж повече" className="flex flex-col items-center text-center group px-6">
                      <span className="text-[11px] font-medium text-[#1A1A1A]/50 tracking-wider mb-2">Пътят към успешния бранд</span>
                      <span className="text-base font-semibold text-[#1A1A1A] group-hover:text-[#DC2626] transition-colors duration-300">Стъпка по стъпка</span>
                      <span className="mt-3 w-10 h-10 rounded-full bg-[#DC2626] flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Стъпките — заглавия винаги видими, активното свети */}
              <div className="col-span-7">
                <div className="flex flex-col gap-5 mb-8">
                  {pillars.map((p, i) => (
                    <button
                      key={p.number}
                      onClick={() => goToStep(i)}
                      className="so-step-title flex items-baseline gap-5 text-left w-fit group"
                    >
                      <span className="text-sm font-medium text-[#DC2626] tracking-wider">{p.number}</span>
                      <span className="text-2xl xl:text-[32px] font-bold text-[#1A1A1A] leading-tight group-hover:text-[#DC2626] transition-colors duration-300">
                        {p.title}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="relative min-h-[150px] max-w-xl">
                  {pillars.map(p => (
                    <p key={p.number} className="so-step-text absolute inset-0 text-base xl:text-lg font-light text-[#1A1A1A]/70 leading-relaxed">
                      {p.text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ МОБИЛНО: статични стълбове ═══ */}
      <div className="lg:hidden section-padding">
        <div className="container-max">
          <div className="mb-12 max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.2em] font-light text-[#DC2626]">Как работим</span>
            <h2 className="text-[clamp(26px,6vw,36px)] font-bold text-[#1A1A1A] leading-tight mt-3">
              Поемаме дигиталната трансформация на вашия бизнес
            </h2>
          </div>
          <div className="relative w-[280px] h-[280px] mx-auto mb-12">
            {rings.map(ring => (
              <div key={`m-${ring.id}`} className={`absolute inset-0 ${ring.spin}`}>
                <svg viewBox="0 0 560 560" className="w-full h-full">
                  <defs>
                    <path id={`m-${ring.id}`} d={circlePath(ring.r)} fill="none" />
                  </defs>
                  <text fill="#1A1A1A" opacity="0.5" fontSize="16" fontFamily="Montserrat, sans-serif" fontWeight="500" letterSpacing="1.5">
                    <textPath href={`#m-${ring.id}`}>{ring.text}</textPath>
                  </text>
                </svg>
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            {pillars.map(p => (
              <div key={p.number} className="grid grid-cols-[auto_1fr] gap-5 py-7 border-t border-[#1A1A1A]/[0.08] first:border-t-0 first:pt-0">
                <span className="text-2xl font-extralight text-[#DC2626]/40 leading-none">{p.number}</span>
                <div>
                  <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">{p.title}</h3>
                  <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
