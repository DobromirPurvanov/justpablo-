# Justpablo — уебсайт

Пълният сайт на [justpablo.bg](https://justpablo.bg) — дигитален маркетинг и бизнес развитие.

## Стек

- [Vite](https://vite.dev) + [React 19](https://react.dev) + TypeScript
- [Tailwind CSS 3](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) (само използваните компоненти в `src/components/ui`)
- [GSAP](https://gsap.com) + ScrollTrigger — скрол анимации
- [Lenis](https://lenis.darkroom.engineering) — плавен скрол
- [React Router 7](https://reactrouter.com) (`HashRouter`)

## Команди

```bash
npm install      # инсталиране на зависимостите
npm run dev      # dev сървър на http://localhost:3000
npm run build    # production build в dist/ (tsc + vite)
npm run lint     # ESLint
npm run preview  # преглед на production build-а
```

## Структура

```
src/
  pages/       # страници (route-ове в App.tsx)
  sections/    # секции от началната страница
  components/  # навигация, футър, анимации, форми
  components/ui/  # shadcn/ui примитиви
  lib/         # утилити (cn, валута, motion помощници)
public/        # статични активи (икони, изображения)
```
