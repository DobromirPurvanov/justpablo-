import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const rowOne = [
  'Комуникационна стратегия',
  'SEO оптимизация',
  'Google Ads',
  'Криейтив',
  'Брандинг',
  'Рекламни кампании',
  'Омниканален маркетинг',
  'Business Intelligence',
]

const rowTwo = [
  'Маркетинг автоматизация',
  'Визуална идентичност',
  'Постинг план',
  'Viber маркетинг',
  'SMS кампании',
  'Инсайти',
  'Планинг',
  'Ключови предимства',
]

function MarqueeRow({ items, direction, outline }: { items: string[]; direction: 'left' | 'right'; outline?: boolean }) {
  const content = (hidden: boolean) => (
    <div className="flex items-center shrink-0" aria-hidden={hidden || undefined}>
      {items.map(item => (
        <span key={item} className="flex items-center shrink-0">
          <span
            className={`whitespace-nowrap text-[clamp(30px,5.5vw,68px)] font-extralight leading-none tracking-tight ${
              outline ? 'text-outline-red' : 'text-[#1A1A1A]'
            }`}
          >
            {item}
          </span>
          <span className="mx-6 lg:mx-10 w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-[#DC2626] shrink-0" />
        </span>
      ))}
    </div>
  )

  return (
    <div className="marquee-fade overflow-hidden w-full">
      <div className={`flex w-max ${direction === 'left' ? 'marquee-track-left' : 'marquee-track-right'}`}>
        {content(false)}
        {content(true)}
      </div>
    </div>
  )
}

export default function ExpandSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
        }
      )
      gsap.fromTo(marqueeRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: marqueeRef.current, start: 'top 90%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-white py-20 lg:py-32 overflow-hidden">
      <div className="section-padding">
        <div className="container-max">
          <div ref={headerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end mb-14 lg:mb-20">
            <div className="lg:col-span-7">
              <span className="text-[10px] uppercase tracking-[0.2em] font-light text-[#DC2626]">Пълна гама дигитални услуги</span>
              <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-[#1A1A1A] leading-tight mt-3">
                Непрекъснато разширяваме обхвата на комуникация
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                Затваряме кръга на потребителското изживяване и оптимизираме възвръщаемостта на инвестициите чрез пълна гама от дигитални услуги. Максимална ефективност, която показва, че вашият бранд е в добри ръце.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full-bleed dual marquee */}
      <div ref={marqueeRef} className="marquee-group flex flex-col gap-6 lg:gap-8">
        <MarqueeRow items={rowOne} direction="left" />
        <MarqueeRow items={rowTwo} direction="right" outline />
      </div>
    </section>
  )
}
