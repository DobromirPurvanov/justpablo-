import type Lenis from 'lenis'

/* Споделена препратка към активния Lenis инстанс. Програмният скрол минава
   през него, защото native `scrollTo({ behavior: 'smooth' })` не работи
   надеждно, докато Lenis управлява скрола. Ако Lenis не е активен (напр.
   prefers-reduced-motion), пада обратно към native скрол. */

let lenis: Lenis | null = null

export function registerLenis(instance: Lenis | null) {
  lenis = instance
}

export function scrollToY(top: number) {
  if (lenis) {
    lenis.scrollTo(top)
    return
  }
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
}
