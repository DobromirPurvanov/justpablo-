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
