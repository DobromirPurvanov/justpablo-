/* Per-route SEO мета: title, description, canonical и og тагове.
   Прилага се централизирано от App.tsx при всяка смяна на маршрут,
   защото сайтът е SPA и index.html носи само мета за началната страница. */

const SITE = 'Just Pablo Digital'
const BASE_URL = 'https://justpablo.bg'

type PageMeta = { title: string; description: string }

const ROUTE_META: Record<string, PageMeta> = {
  '/': {
    title: `${SITE} — Дигитален маркетинг, SEO и реклама`,
    description: 'Дигитална агенция за растеж: пълен дигитален анализ, SEO, онлайн реклама и уеб разработка. Прозрачни цени в евро и лева.',
  },
  '/za-nas': {
    title: `За нас — ${SITE}`,
    description: 'Кои сме ние и как подхождаме към дигиталния растеж на вашия бизнес — стратегия, прозрачност и измерими резултати.',
  },
  '/uslugi': {
    title: `Услуги — SEO, реклама, уеб дизайн и брандинг | ${SITE}`,
    description: 'Пълен набор дигитални услуги: SEO оптимизация, онлайн реклама, уеб дизайн, брандинг, съдържание и анализи.',
  },
  '/rezultati': {
    title: `Резултати и проекти — ${SITE}`,
    description: 'Реални проекти и измерим растеж за нашите клиенти — казуси от SEO, реклама и уеб разработка.',
  },
  '/strategiya': {
    title: `Стратегия за дигитален растеж — ${SITE}`,
    description: 'Как изграждаме ясна дигитална стратегия с конкретни стъпки, приоритети и измерими цели.',
  },
  '/analiz': {
    title: `Безплатен дигитален анализ — ${SITE}`,
    description: 'Получете задълбочен анализ на дигиталното присъствие на вашия бизнес и конкретни препоръки за растеж.',
  },
  '/ceni': {
    title: `Цени и пакети — ${SITE}`,
    description: 'Прозрачни цени за SEO, реклама и уеб услуги в евро и лева. Изберете пакет според целите на вашия бизнес.',
  },
  '/zapitvane': {
    title: `Запитване — започнете проект | ${SITE}`,
    description: 'Изпратете запитване за вашия проект. Ще се запознаем с детайлите и ще се свържем с вас в рамките на 24 часа.',
  },
  '/biskvitki': {
    title: `Политика за бисквитки — ${SITE}`,
    description: 'Как Just Pablo Digital използва бисквитки и как можете да управлявате своите предпочитания.',
  },
  '/poveritelnost': {
    title: `Политика за поверителност — ${SITE}`,
    description: 'Как събираме, използваме и защитаваме личните ви данни в Just Pablo Digital.',
  },
  '/usloviya': {
    title: `Условия за ползване — ${SITE}`,
    description: 'Условията за ползване на уебсайта и услугите на Just Pablo Digital.',
  },
}

const NOT_FOUND: PageMeta = {
  title: `Страницата не е намерена — ${SITE}`,
  description: 'Търсената страница не съществува.',
}

function setTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/** Дали пътят е валиден маршрут (за да различаваме 404 от реална страница). */
export function isKnownRoute(pathname: string) {
  return pathname in ROUTE_META
}

function setRobots(noindex: boolean) {
  const existing = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')
  if (noindex) {
    if (existing) existing.setAttribute('content', 'noindex, follow')
    else setTag('name', 'robots', 'noindex, follow')
  } else if (existing) {
    existing.remove()
  }
}

export function applyRouteMeta(pathname: string) {
  const known = isKnownRoute(pathname)
  const meta = ROUTE_META[pathname] ?? NOT_FOUND
  const url = `${BASE_URL}${pathname === '/' ? '/' : pathname}`
  document.title = meta.title
  setTag('name', 'description', meta.description)
  setTag('property', 'og:title', meta.title)
  setTag('property', 'og:description', meta.description)
  setTag('property', 'og:url', url)
  setTag('name', 'twitter:title', meta.title)
  setTag('name', 'twitter:description', meta.description)
  setCanonical(url)
  // Soft-404: непознатите маршрути не бива да се индексират.
  setRobots(!known)
}
