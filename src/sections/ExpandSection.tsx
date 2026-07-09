import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const servicesRing2 = [
  'Комуникационна стратегия',
  'SEO оптимизация',
  'Планинг',
  'Криейтив',
  'Google ads',
  'Ключови предимства',
  'Маркетинг автоматизация',
  'Рекламни кампании',
  'Омниканален маркетинг',
  'Инсайти',
  'Брандинг',
  'Постинг план',
  'Визуална идентичност',
  'SMS',
  'Viber маркетинг',
  'Business intelligence',
]

export default function ExpandSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const rightTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title entrance
      gsap.fromTo(titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      )

      // Circle entrance with scale
      gsap.fromTo(circleRef.current,
        { scale: 0.85, opacity: 0, rotation: -20 },
        {
          scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: circleRef.current, start: 'top 80%' },
        }
      )

      // Circle parallax rotation while scrolling
      gsap.to(circleRef.current, {
        rotation: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      // Right text entrance
      gsap.fromTo(rightTextRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: rightTextRef.current, start: 'top 85%' },
        }
      )

      // Parallax: title moves slower
      gsap.fromTo(titleRef.current,
        { y: 40 },
        {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      )

      // Parallax: circle moves faster (opposite direction)
      gsap.fromTo(circleRef.current,
        { y: -60 },
        {
          y: 60,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )

      // Parallax: right text moves at medium speed
      gsap.fromTo(rightTextRef.current,
        { y: 30 },
        {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-white py-20 lg:py-32 relative overflow-hidden">
      {/* Decorative parallax background shapes */}
      <div className="absolute top-[20%] right-[5%] w-[200px] h-[200px] rounded-full bg-[#DC2626]/[0.03] pointer-events-none parallax-shape" />
      <div className="absolute bottom-[10%] left-[8%] w-[150px] h-[150px] rounded-full bg-[#DC2626]/[0.02] pointer-events-none parallax-shape" />

      <div className="section-padding relative z-10">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            {/* Left: Title + Semi-circle */}
            <div className="lg:col-span-5">
              <div ref={titleRef} className="mb-12">
                <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-[#1A1A1A] leading-tight">
                  Непрекъснато разширяваме обхвата на комуникация
                </h2>
              </div>

              {/* Semi-circle with services - positioned to the left */}
              <div ref={circleRef} className="relative w-[340px] h-[340px] md:w-[420px] md:h-[420px] hover:scale-[1.02] transition-transform duration-500">
                <svg viewBox="0 0 380 380" className="absolute inset-0 w-full h-full">
                  <defs>
                    <path
                      id="expandArc"
                      d="M 40,190 A 150,150 0 1,1 340,190 A 150,150 0 1,1 40,190"
                      fill="none"
                    />
                  </defs>
                  <text fill="#DC2626" fontSize="10" fontFamily="Montserrat, sans-serif" fontWeight="500" letterSpacing="0.8">
                    <textPath href="#expandArc" startOffset="2%">
                      {servicesRing2.join('  /  ')}
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>

            {/* Right: Text */}
            <div ref={rightTextRef} className="lg:col-span-7 lg:pt-32">
              <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                Затваряме кръга на потребителското изживяване и оптимизираме възвръщаемостта на инвестициите чрез пълна гама от дигитални услуги. Максимална ефективност, която показва, че вашият бранд е в добри ръце.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
