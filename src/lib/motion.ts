import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const EASE = 'power3.out'

type RevealOpts = {
  y?: number
  scale?: number
  stagger?: number
  delay?: number
  duration?: number
  start?: string
}

/**
 * Единна entrance анимация за целия сайт: леко повдигане + fade,
 * изпълнява се веднъж при влизане във viewport-а.
 * clearProps маха inline transform-а след края, за да не пречи на hover ефектите.
 */
export function reveal(targets: gsap.TweenTarget, trigger: Element | null, opts: RevealOpts = {}) {
  return gsap.from(targets, {
    y: opts.y ?? 28,
    scale: opts.scale ?? 1,
    opacity: 0,
    duration: opts.duration ?? 0.8,
    delay: opts.delay ?? 0,
    stagger: opts.stagger ?? 0,
    ease: EASE,
    clearProps: 'transform',
    scrollTrigger: trigger ? { trigger, start: opts.start ?? 'top 85%', once: true } : undefined,
  })
}

/* ─────────── Паралакс хелпъри (almero стил) ───────────
   Работят само на desktop и при изключен prefers-reduced-motion.
   Прилагат се върху обвивки/декорация — никога върху елемент,
   който вече има entrance анимация на същото свойство. */

const PARALLAX_MEDIA = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)'

/** Вертикален дрифт при скрол (фонови текстове, колони, декорация) */
export function drift(target: gsap.TweenTarget, trigger: Element, opts: { from?: number; to?: number; scrub?: number } = {}) {
  const mm = gsap.matchMedia()
  mm.add(PARALLAX_MEDIA, () => {
    gsap.fromTo(target,
      { y: opts.from ?? 40 },
      {
        y: opts.to ?? -40,
        ease: 'none',
        scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: opts.scrub ?? 1 },
      }
    )
  })
  return mm
}

/** Хоризонтален дрифт (голямото "digital") */
export function driftX(target: gsap.TweenTarget, trigger: Element, opts: { from?: number; to?: number; scrub?: number } = {}) {
  const mm = gsap.matchMedia()
  mm.add(PARALLAX_MEDIA, () => {
    gsap.fromTo(target,
      { x: opts.from ?? -40 },
      {
        x: opts.to ?? 40,
        ease: 'none',
        scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: opts.scrub ?? 1 },
      }
    )
  })
  return mm
}

/** Вътрешен паралакс на изображение в карта — подписът на almero.
    Изображението е в scale-[1.15] обвивка и се движи вертикално,
    докато рамката минава през viewport-а. */
export function imageParallax(imgWrap: gsap.TweenTarget, frame: Element, opts: { amount?: number; scrub?: number } = {}) {
  const a = opts.amount ?? 6.5
  const mm = gsap.matchMedia()
  mm.add(PARALLAX_MEDIA, () => {
    gsap.fromTo(imgWrap,
      { yPercent: -a },
      {
        yPercent: a,
        ease: 'none',
        scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: opts.scrub ?? 0.8 },
      }
    )
  })
  return mm
}
