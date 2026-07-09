import { useState } from 'react'

const questions = [
  { id: 'brandName', title: 'Кой е вашият бранд?', subtitle: 'Нека се запознаем.', type: 'text', placeholder: 'име на бранда' },
  { id: 'focus', title: 'Какъв е фокусът на вашия бизнес?', subtitle: 'Можете да маркирате повече от един отговор.', type: 'checkbox', options: ['Услуга/и', 'Продукт/и собствено производство', 'Търговия или дистрибуция'] },
  { id: 'goals', title: 'Какви са вашите цели за онлайн развитие?', type: 'radio', options: ['Разпознаваемост', 'Продажби', 'Абонаменти', 'Подготовка за експанзия'] },
  { id: 'period', title: 'За какъв период очаквате резултати?', type: 'radio', options: ['3 месеца', '6 месеца', '1 година', '2+ години'] },
  { id: 'needs', title: 'От какви услуги имате нужда?', type: 'checkbox', options: ['Нов уебсайт', 'SEO оптимизация', 'Онлайн реклама', 'Брандинг и дизайн', 'Социални мрежи'] },
  { id: 'budget', title: 'Какъв е предвиденият бюджет?', type: 'radio', options: ['Под 1000 лв.', '1000-3000 лв.', '3000-5000 лв.', '5000-10 000 лв.', 'Над 10 000 лв.'] },
  { id: 'name', title: 'Вашето име', type: 'text', placeholder: 'Име и фамилия' },
  { id: 'email', title: 'E-mail адрес', type: 'email', placeholder: 'email@company.bg' },
  { id: 'phone', title: 'Телефон', type: 'tel', placeholder: '0888 123 456' },
]

export default function ScrollWizard() {
  const [current, setCurrent] = useState(0)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [isSuccess, setIsSuccess] = useState(false)

  const setValue = (id: string, value: any) => setFormData(prev => ({ ...prev, [id]: value }))

  const toggleCheckbox = (id: string, option: string) => {
    const arr = (formData[id] as string[]) || []
    setValue(id, arr.includes(option) ? arr.filter(o => o !== option) : [...arr, option])
  }

  const next = () => current < questions.length - 1 && setCurrent(c => c + 1)
  const prev = () => current > 0 && setCurrent(c => c - 1)

  const q = questions[current]
  const isLast = current === questions.length - 1
  const isFirst = current === 0

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-white pt-20">
        <div className="w-20 h-20 bg-[#9BFF00] rounded-full flex items-center justify-center mb-8">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h3 className="text-4xl font-extralight text-[#1A1A1A] mb-4">Благодарим!</h3>
        <p className="text-base font-light text-[#1A1A1A]/60 max-w-md">Ще се свържем с вас в рамките на 24 часа.</p>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen pt-24 pb-16">
      <div className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Question list */}
            <div className="lg:col-span-3 hidden lg:block pt-4">
              <div className="flex flex-col gap-5 mb-8">
                <div className={`text-sm font-medium ${current < 4 ? 'text-[#DC2626]' : 'text-[#1A1A1A]/30'}`}><span className="mr-2">1</span>Бизнес</div>
                <div className={`text-sm font-medium ${current >= 4 && current < 7 ? 'text-[#DC2626]' : 'text-[#1A1A1A]/30'}`}><span className="mr-2">2</span>Цели</div>
                <div className={`text-sm font-medium ${current >= 7 && current < 9 ? 'text-[#DC2626]' : 'text-[#1A1A1A]/30'}`}><span className="mr-2">3</span>Ресурси</div>
                <div className={`text-sm font-medium ${current >= 9 ? 'text-[#DC2626]' : 'text-[#1A1A1A]/30'}`}><span className="mr-2">4</span>Изпращане</div>
              </div>
              <div className="flex flex-col gap-2.5">
                {questions.map((question, i) => (
                  <button key={question.id} onClick={() => setCurrent(i)}
                    className={`text-left text-sm leading-snug transition-colors ${i === current ? 'text-[#1A1A1A] font-semibold' : i < current ? 'text-[#1A1A1A]/40' : 'text-[#1A1A1A]/20'}`}>
                    {question.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Center: Active question */}
            <div className="lg:col-span-6 pt-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1A1A1A] leading-tight mb-4">{q.title}</h2>
              {q.subtitle && <p className="text-base font-light text-[#1A1A1A]/60 mb-8">{q.subtitle}</p>}

              <div className="max-w-md">
                {q.type === 'radio' && q.options && (
                  <div className="flex flex-col gap-3">
                    {q.options.map(opt => (
                      <button key={opt} onClick={() => setValue(q.id, opt)}
                        className={`w-full text-left px-5 py-3.5 rounded-xl border text-base font-light transition-all ${formData[q.id] === opt ? 'bg-[#DC2626]/5 border-[#DC2626] text-[#1A1A1A]' : 'bg-white border-[#E0E0E0] text-[#1A1A1A]/70 hover:border-[#DC2626]/40'}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${formData[q.id] === opt ? 'border-[#DC2626] bg-[#DC2626]' : 'border-[#D0D0D0]'}`}>
                            {formData[q.id] === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                          {opt}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {q.type === 'checkbox' && q.options && (
                  <div className="flex flex-col gap-3">
                    {q.options.map(opt => {
                      const selected = (formData[q.id] as string[]) || []
                      return (
                        <button key={opt} onClick={() => toggleCheckbox(q.id, opt)}
                          className={`w-full text-left px-5 py-3.5 rounded-xl border text-base font-light transition-all ${selected.includes(opt) ? 'bg-[#DC2626]/5 border-[#DC2626] text-[#1A1A1A]' : 'bg-white border-[#E0E0E0] text-[#1A1A1A]/70 hover:border-[#DC2626]/40'}`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${selected.includes(opt) ? 'bg-[#DC2626] border-[#DC2626]' : 'border-[#D0D0D0]'}`}>
                              {selected.includes(opt) && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
                            </div>
                            {opt}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}

                {(q.type === 'text' || q.type === 'email' || q.type === 'tel') && (
                  <input type={q.type} value={formData[q.id] || ''} onChange={e => setValue(q.id, e.target.value)} placeholder={q.placeholder}
                    className="w-full bg-transparent border-b-2 border-[#DC2626] px-0 py-4 text-xl font-light text-[#1A1A1A] outline-none placeholder:text-[#1A1A1A]/30" />
                )}

                {q.type === 'textarea' && (
                  <textarea value={formData[q.id] || ''} onChange={e => setValue(q.id, e.target.value)} placeholder={q.placeholder} rows={4}
                    className="w-full bg-transparent border-b-2 border-[#DC2626] px-0 py-4 text-lg font-light text-[#1A1A1A] outline-none placeholder:text-[#1A1A1A]/30 resize-none" />
                )}
              </div>

              {/* Nav buttons */}
              <div className="flex items-center gap-4 mt-8">
                {!isFirst && (
                  <button onClick={prev} className="flex items-center gap-2 text-sm font-light text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
                    Предишен
                  </button>
                )}
                {!isLast ? (
                  <button onClick={next} className="flex items-center gap-2 bg-[#DC2626] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#B91C1C] transition-colors">
                    Следващ
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
                  </button>
                ) : (
                  <button onClick={() => setIsSuccess(true)} className="flex items-center gap-2 bg-[#DC2626] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#B91C1C] transition-colors">
                    Изпрати запитване
                  </button>
                )}
              </div>
            </div>

            {/* Right: Circle decoration */}
            <div className="lg:col-span-3 hidden lg:flex items-center justify-center">
              <div className="relative w-[260px] h-[260px]">
                <div className="absolute inset-0 rounded-full border border-[#DC2626]/20" />
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 260 260">
                  <path d="M 65,220 Q 130,255 195,220" stroke="#DC2626" strokeWidth="2" fill="none" />
                </svg>
                <button onClick={next} disabled={isLast}
                  className={`absolute bottom-3 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all ${isLast ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-[#DC2626] text-white hover:scale-110'}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
                </button>
                {!isFirst && (
                  <button onClick={prev}
                    className="absolute top-3 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full border border-[#1A1A1A]/20 flex items-center justify-center text-[#1A1A1A]/40 hover:text-[#DC2626] hover:border-[#DC2626] transition-all">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
