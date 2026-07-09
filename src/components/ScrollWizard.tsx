import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { maskReveal } from '../lib/motion'

const questions = [
  { id: 'brandName', title: 'Каква е дейността на вашата марка?', subtitle: 'Нека се запознаем. След този въпрос имаме още няколко, които ще ни помогнат да научим повече за вас. Попълването им отнема само минута.', type: 'text', placeholder: 'предмет на дейност' },
  { id: 'focus', title: 'Какъв е фокусът на вашия бизнес?', subtitle: 'Можете да маркирате повече от един отговор.', type: 'checkbox', options: ['Услуга/и', 'Продукт/и собствено производство', 'Търговия или дистрибуция'] },
  { id: 'goals', title: 'Какви са вашите цели за онлайн развитие?', type: 'radio', options: ['Разпознаваемост', 'Продажби', 'Абонаменти', 'Подготовка за експанзия'] },
  { id: 'period', title: 'За какъв период очаквате резултати?', type: 'radio', options: ['3 месеца', '6 месеца', '1 година', '2+ години'] },
  { id: 'needs', title: 'От какви услуги имате нужда?', subtitle: 'Можете да маркирате повече от един отговор.', type: 'checkbox', options: ['Нов уебсайт', 'SEO оптимизация', 'Онлайн реклама', 'Брандинг и дизайн', 'Социални мрежи'] },
  { id: 'budget', title: 'Какъв е предвиденият бюджет?', type: 'radio', options: ['До 500 €', '500 – 1500 €', '1500 – 2500 €', '2500 – 5000 €', 'Над 5000 €'] },
  { id: 'name', title: 'Вашето име', type: 'text', placeholder: 'име и фамилия' },
  { id: 'email', title: 'Вашият e-mail адрес', type: 'email', placeholder: 'email@company.bg' },
  { id: 'phone', title: 'Телефон за връзка', type: 'tel', placeholder: '0888 123 456' },
]

const categories = ['Бизнес', 'Цели', 'Ресурси', 'Изпращане']
const catOf = (i: number) => (i <= 1 ? 0 : i <= 3 ? 1 : i <= 5 ? 2 : 3)

const isAnswered = (data: Record<string, unknown>, id: string) => {
  const v = data[id]
  return Array.isArray(v) ? v.length > 0 : Boolean(v && String(v).trim())
}

export default function ScrollWizard() {
  const [phase, setPhase] = useState<'intro' | 'wizard'>('intro')
  const [current, setCurrent] = useState(0)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [isSuccess, setIsSuccess] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const animating = useRef(false)

  useEffect(() => {
    const el = rootRef.current
    if (el) maskReveal(el.querySelector('.wz-h1'), null, { delay: 0.1 })
  }, [phase, isSuccess])

  const setValue = (id: string, value: any) => setFormData(prev => ({ ...prev, [id]: value }))
  const toggleCheckbox = (id: string, option: string) => {
    const arr = (formData[id] as string[]) || []
    setValue(id, arr.includes(option) ? arr.filter(o => o !== option) : [...arr, option])
  }

  const startWizard = (brandType: string) => {
    setValue('brandType', brandType)
    const el = rootRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setPhase('wizard'); return }
    gsap.to(el, { opacity: 0, y: -20, duration: 0.3, ease: 'power2.in', onComplete: () => {
      setPhase('wizard')
      gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', clearProps: 'transform' })
    }})
  }

  const go = (target: number) => {
    if (target < 0 || target > questions.length - 1 || target === current || animating.current) return
    const items = gsap.utils.toArray<HTMLElement>('.wz-anim', rootRef.current)
    const dir = target > current ? 1 : -1
    if (!items.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setCurrent(target); return }
    animating.current = true
    gsap.to(items, { y: -24 * dir, opacity: 0, duration: 0.22, ease: 'power2.in', onComplete: () => {
      setCurrent(target)
      requestAnimationFrame(() => {
        const fresh = gsap.utils.toArray<HTMLElement>('.wz-anim', rootRef.current)
        gsap.fromTo(fresh, { y: 28 * dir, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', clearProps: 'transform', onComplete: () => { animating.current = false } })
      })
    }})
  }
  const next = () => go(current + 1)
  const prev = () => go(current - 1)

  const q = questions[current]
  const isLast = current === questions.length - 1
  const canSubmit = isAnswered(formData, 'email') && isAnswered(formData, 'name')

  /* ─── Отговорът (вътре в кръга на desktop / плоско на мобилно) ─── */
  const answerArea = (
    <div className="w-full max-w-sm mx-auto text-center">
      {(q.type === 'radio' || q.type === 'checkbox') && q.options && (
        <div className="flex flex-col items-center gap-4">
          {q.options.map(opt => {
            const selected = q.type === 'radio'
              ? formData[q.id] === opt
              : ((formData[q.id] as string[]) || []).includes(opt)
            const pick = () => {
              if (q.type === 'radio') { setValue(q.id, opt); window.setTimeout(next, 300) }
              else toggleCheckbox(q.id, opt)
            }
            return (
              <button key={opt} onClick={pick} className="group flex items-center gap-3 text-left">
                <span className={`transition-all duration-300 ${selected ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0'}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="3">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className={`text-base lg:text-lg font-bold transition-colors duration-300 ${selected ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/75 group-hover:text-[#1A1A1A]'}`}>
                  {opt}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {(q.type === 'text' || q.type === 'email' || q.type === 'tel') && (
        <div>
          <input
            type={q.type}
            value={formData[q.id] || ''}
            onChange={e => setValue(q.id, e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !isLast) next() }}
            autoFocus
            className="w-full bg-transparent border-b-2 border-[#DC2626] px-0 py-3 text-lg lg:text-xl font-light text-[#1A1A1A] text-center outline-none"
          />
          <div className="text-sm font-light text-[#1A1A1A]/55 mt-2">{q.placeholder}</div>
        </div>
      )}

      {isLast && (
        <button
          onClick={() => canSubmit && setIsSuccess(true)}
          disabled={!canSubmit}
          className={`mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium transition-all duration-300 ${canSubmit ? 'bg-[#DC2626] text-white hover:bg-[#B91C1C] hover:scale-[1.03]' : 'bg-[#1A1A1A]/10 text-[#1A1A1A]/40 cursor-not-allowed'}`}
        >
          Изпрати запитване
        </button>
      )}
    </div>
  )

  /* ─── Успех ─── */
  if (isSuccess) {
    return (
      <div ref={rootRef} className="min-h-[80vh] flex flex-col items-center justify-center text-center bg-white section-padding">
        <div className="w-24 h-24 bg-[#DC2626] rounded-full flex items-center justify-center mb-10">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h1 className="wz-h1 font-thin-display text-[clamp(40px,7vw,84px)] text-[#1A1A1A] leading-none mb-6">Благодарим!</h1>
        <p className="text-base font-light text-[#1A1A1A]/60 max-w-md mb-10">
          Получихме запитването ви. Ще се запознаем с детайлите и ще се свържем с вас в рамките на 24 часа.
        </p>
        <a href="#/" className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.14em] font-medium text-[#DC2626] hover:gap-3 transition-all duration-300">
          Обратно към началото
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </div>
    )
  }

  /* ─── Интро: Какъв е вашият бизнес? ─── */
  if (phase === 'intro') {
    return (
      <div ref={rootRef} className="bg-white min-h-[85vh] flex items-center py-14">
        <div className="section-padding w-full">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <h1 className="wz-h1 text-[clamp(32px,4.5vw,56px)] font-bold text-[#1A1A1A] leading-tight mb-8">
                  Какъв е вашият бизнес?
                </h1>
                <div className="flex flex-col gap-5 text-base lg:text-lg font-light italic text-[#1A1A1A]/70 leading-relaxed max-w-md">
                  <p>Изпращането на запитване не ви ангажира с нас, но ви гарантира, че ще се запознаем в детайли с вашия бизнес.</p>
                  <p>Така, когато ви се обадим за среща, ще влезем на нея подготвени и още от първия разговор ще ви бъдем полезни — с конкретни предложения, параметри и анализи.</p>
                </div>
              </div>
              <div className="lg:col-span-7 flex justify-center">
                <div className="relative w-[300px] h-[300px] md:w-[440px] md:h-[440px] lg:w-[560px] lg:h-[560px] rounded-full border border-[#1A1A1A]/10 flex flex-col items-center justify-center gap-8">
                  {['Съществуващ бранд', 'Стартиращ бранд'].map(opt => (
                    <button key={opt} onClick={() => startWizard(opt)} className="group flex items-center gap-3">
                      <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="3">
                          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-lg lg:text-2xl font-bold text-[#1A1A1A] group-hover:text-[#DC2626] transition-colors duration-300">{opt}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* ─── Wizard: активен въпрос + призрачни идващи + кръгът сцена ─── */
  return (
    <div ref={rootRef} className="bg-white min-h-[92vh] py-10 lg:py-14">
      <div className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Категории */}
            <div className="lg:col-span-2">
              <div className="flex lg:flex-col gap-4 lg:gap-3 lg:sticky lg:top-28">
                {categories.map((c, i) => (
                  <div key={c} className={`flex items-baseline gap-2 text-sm font-medium transition-colors duration-300 ${catOf(current) === i ? 'text-[#DC2626]' : 'text-[#1A1A1A]/55'}`}>
                    <span className="text-xs">{i + 1}</span>{c}
                  </div>
                ))}
              </div>
            </div>

            {/* Въпросите: активният тъмен, идващите прозират */}
            <div className="lg:col-span-4">
              <div className="wz-anim flex flex-col gap-7 lg:pt-6">
                <h2 className="wz-h1 text-[clamp(24px,2.6vw,36px)] font-bold text-[#1A1A1A] leading-tight">
                  {q.title}
                </h2>
                {questions.slice(current + 1, current + 5).map(uq => (
                  <button
                    key={uq.id}
                    onClick={() => go(questions.indexOf(uq))}
                    className="text-left text-[clamp(20px,2.2vw,30px)] font-bold text-[#1A1A1A]/[0.12] leading-tight hover:text-[#1A1A1A]/30 transition-colors duration-300"
                  >
                    {uq.title}
                  </button>
                ))}
              </div>

              <div className="mt-10 text-xs font-light text-[#1A1A1A]/55">
                Предпочитате директно? <a href="mailto:info@justpablo.bg" className="text-[#DC2626] hover:underline">info@justpablo.bg</a>
              </div>
            </div>

            {/* Кръгът — сцената за отговора (desktop) */}
            <div className="lg:col-span-6 hidden lg:flex justify-center">
              <div className="relative w-[min(44vw,620px)] aspect-square">
                {/* Тънката окръжност + червената дъга при СЛЕДВАЩ */}
                <div className="absolute inset-0 rounded-full border border-[#1A1A1A]/10" />
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                  <g transform="rotate(28 50 50)">
                    <circle cx="50" cy="50" r="49.6" fill="none" stroke="#DC2626" strokeWidth="0.8" pathLength="100" strokeDasharray="13 87" />
                  </g>
                </svg>

                {/* Съдържание в кръга */}
                <div className="wz-anim absolute inset-0 flex flex-col items-center justify-center px-[14%]">
                  {q.subtitle && (
                    <p className="text-sm font-light text-[#1A1A1A]/65 leading-relaxed text-center mb-10 max-w-xs">{q.subtitle}</p>
                  )}
                  {answerArea}
                </div>

                {/* ПРЕДИШЕН — вертикално на десния ръб */}
                {current > 0 && (
                  <button onClick={prev} className="absolute right-[2%] top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 text-[#1A1A1A]/45 hover:text-[#1A1A1A] transition-colors group">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-y-1 transition-transform">
                      <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[10px] font-medium tracking-[0.3em]" style={{ writingMode: 'vertical-rl' }}>ПРЕДИШЕН</span>
                  </button>
                )}

                {/* СЛЕДВАЩ — на ръба на кръга, долу вдясно */}
                {!isLast && (
                  <button onClick={next} className="absolute bottom-[8%] right-[10%] flex items-center gap-3 group">
                    <span className="text-[10px] font-medium tracking-[0.3em] text-[#DC2626]" style={{ writingMode: 'vertical-rl' }}>СЛЕДВАЩ</span>
                    <span className="w-16 h-16 rounded-full bg-[#DC2626] flex items-center justify-center shadow-lg shadow-[#DC2626]/30 group-hover:scale-110 transition-transform duration-300">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                        <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Мобилно: отговорът плоско под въпроса */}
            <div className="lg:hidden col-span-1">
              <div className="wz-anim">
                {q.subtitle && <p className="text-sm font-light text-[#1A1A1A]/65 leading-relaxed mb-6">{q.subtitle}</p>}
                {answerArea}
                <div className="flex items-center gap-4 mt-8">
                  {current > 0 && (
                    <button onClick={prev} className="flex items-center gap-2 text-sm font-light text-[#1A1A1A]/55 py-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      Назад
                    </button>
                  )}
                  {!isLast && (
                    <button onClick={next} className="flex items-center gap-2 bg-[#DC2626] text-white px-6 py-3 rounded-full text-sm font-medium">
                      Следващ
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
