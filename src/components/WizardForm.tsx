import { useState } from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'

interface Question {
  id: string
  title: string
  subtitle?: string
  description?: string
  type: 'radio' | 'checkbox' | 'text' | 'textarea' | 'email' | 'tel' | 'contact'
  options?: string[]
  placeholder?: string
}

interface WizardStep {
  name: string
  questions: Question[]
}

const steps: WizardStep[] = [
  {
    name: 'Бизнес',
    questions: [
      {
        id: 'brandName',
        title: 'Кой е вашият бранд?',
        subtitle: 'Нека се запознаем. След този въпрос имаме още няколко, които ще ни помогнат да научим повече за вас. Попълването им отнема само минута.',
        type: 'text',
        placeholder: 'име на бранда',
      },
      {
        id: 'focus',
        title: 'Какъв е фокусът на вашия бизнес?',
        subtitle: 'Можете да маркирате повече от един отговор.',
        type: 'checkbox',
        options: ['Услуга/и', 'Продукт/и собствено производство', 'Търговия или дистрибуция'],
      },
      {
        id: 'idealClients',
        title: 'Кои са вашите идеални клиенти?',
        type: 'textarea',
        placeholder: 'Опишете таргет аудиторията си...',
      },
      {
        id: 'differentiation',
        title: 'С какво се различавате от конкурентите си?',
        type: 'textarea',
        placeholder: 'Вашето уникално предложение...',
      },
    ],
  },
  {
    name: 'Цели',
    questions: [
      {
        id: 'goals',
        title: 'Какви са вашите цели за онлайн развитие?',
        type: 'radio',
        options: ['Разпознаваемост', 'Продажби', 'Абонаменти', 'Запазване на клиенти', 'Подготовка за експанзия'],
      },
      {
        id: 'period',
        title: 'За какъв период очаквате да реализираме вашите цели?',
        type: 'radio',
        options: ['3 месеца', '6 месеца', '1 година', '2+ години'],
      },
    ],
  },
  {
    name: 'Ресурси',
    questions: [
      {
        id: 'needs',
        title: 'Според вас, от какви услуги имате нужда?',
        type: 'checkbox',
        options: [
          'Нов уебсайт', 'SEO оптимизация', 'Бизнес анализ',
          'Фотография и видео', 'Онлайн реклама', 'E-mail маркетинг',
          'Маркетинг стратегия', 'Нов брандинг', 'Дизайн на рекламни материали',
          'Копирайтинг', 'Управление на социални мрежи', 'Всичко, ако има необходимост',
        ],
      },
      {
        id: 'materials',
        title: 'Налични маркетингови материали',
        subtitle: 'Имате ли професионални дигитални материали?',
        type: 'checkbox',
        options: ['Лого', 'Снимки', 'Видео', 'Брандбуук', 'Презентация', 'Няма'],
      },
      {
        id: 'budget',
        title: 'Имате ли заделен рекламен бюджет?',
        type: 'radio',
        options: ['Под 1000 лв.', '1000-3000 лв.', '3000-5000 лв.', '5000-10 000 лв.', 'Над 10 000 лв.'],
      },
    ],
  },
  {
    name: 'Изпращане',
    questions: [
      {
        id: 'contact',
        title: 'Информация за контакт',
        subtitle: 'След като изпратите запитването, ще се запознаем с подадената информация в детайли и ще се свържем с вас.',
        type: 'contact',
      },
    ],
  },
]

const allQuestions = steps.flatMap(s => s.questions)

export default function WizardForm() {
  const [stepIndex, setStepIndex] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const currentStep = steps[stepIndex]
  const currentQuestion = currentStep.questions[questionIndex]
  const currentGlobalIndex = allQuestions.findIndex(q => q.id === currentQuestion.id)
  const isLastStep = stepIndex === steps.length - 1 && questionIndex === currentStep.questions.length - 1
  const isFirstStep = stepIndex === 0 && questionIndex === 0

  const goNext = () => {
    if (questionIndex < currentStep.questions.length - 1) {
      setQuestionIndex(q => q + 1)
    } else if (stepIndex < steps.length - 1) {
      setStepIndex(s => s + 1)
      setQuestionIndex(0)
    }
  }

  const goPrev = () => {
    if (questionIndex > 0) {
      setQuestionIndex(q => q - 1)
    } else if (stepIndex > 0) {
      setStepIndex(s => s - 1)
      setQuestionIndex(steps[stepIndex - 1].questions.length - 1)
    }
  }

  const goToQuestion = (globalIdx: number) => {
    let qIdx = globalIdx
    for (let s = 0; s < steps.length; s++) {
      if (qIdx < steps[s].questions.length) {
        setStepIndex(s)
        setQuestionIndex(qIdx)
        return
      }
      qIdx -= steps[s].questions.length
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 2000))
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const setValue = (id: string, value: any) => {
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const toggleCheckbox = (id: string, option: string) => {
    const current = (formData[id] as string[]) || []
    if (current.includes(option)) {
      setValue(id, current.filter(o => o !== option))
    } else {
      setValue(id, [...current, option])
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-[#9BFF00] rounded-full flex items-center justify-center mb-8">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h3 className="text-4xl font-extralight text-[#1A1A1A] mb-4">Благодарим!</h3>
        <p className="text-base font-light text-[#1A1A1A]/70 max-w-md mx-auto">Ще се свържем с вас в рамките на 24 часа.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-[70vh]">
      {/* LEFT: Steps + Question list */}
      <div className="lg:col-span-4 flex flex-col">
        {/* Steps */}
        <div className="flex flex-col gap-2 mb-6">
          {steps.map((step, i) => (
            <button
              key={step.name}
              onClick={() => { setStepIndex(i); setQuestionIndex(0) }}
              className={`text-left text-sm font-medium transition-colors duration-300 flex items-baseline gap-2 ${
                i === stepIndex ? 'text-[#DC2626]' : i < stepIndex ? 'text-[#1A1A1A]/70' : 'text-[#1A1A1A]/20'
              }`}
            >
              <span className="text-xs">{i + 1}</span>{step.name}
            </button>
          ))}
        </div>

        {/* Questions list - faded */}
        <div className="flex flex-col gap-1 mt-4">
          {allQuestions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => goToQuestion(i)}
              className={`text-left text-lg font-bold transition-all duration-300 leading-snug ${
                i === currentGlobalIndex
                  ? 'text-[#1A1A1A]'
                  : i < currentGlobalIndex
                  ? 'text-[#1A1A1A]/20'
                  : 'text-[#1A1A1A]/10'
              }`}
            >
              {q.title}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT: Content */}
      <div className="lg:col-span-8 flex flex-col relative">
        {/* Title */}
        <h2 className="text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-2 leading-tight max-w-lg">
          {currentQuestion.title}
        </h2>

        {/* Subtitle */}
        {currentQuestion.subtitle && (
          <p className="text-sm font-light text-[#1A1A1A]/70 mb-8 max-w-md">
            {currentQuestion.subtitle}
          </p>
        )}

        {/* Circle + content area */}
        <div className="flex-1 flex items-start gap-12 relative">
          {/* Content */}
          <div className="flex-1 max-w-lg pt-4">
            {/* Description for contact step */}
            {currentQuestion.description && (
              <p className="text-sm font-light text-[#1A1A1A]/70 mb-6">{currentQuestion.description}</p>
            )}

            {/* Radio options */}
            {currentQuestion.type === 'radio' && currentQuestion.options && (
              <div className="flex flex-col gap-3">
                {currentQuestion.options.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setValue(currentQuestion.id, opt)}
                    className={`w-full text-left px-6 py-4 rounded-xl border text-base font-light transition-all duration-300 ${
                      formData[currentQuestion.id] === opt
                        ? 'bg-[#DC2626]/5 border-[#DC2626] text-[#1A1A1A]'
                        : 'bg-white border-[#E0E0E0] text-[#1A1A1A]/60 hover:border-[#DC2626]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                        formData[currentQuestion.id] === opt ? 'border-[#DC2626] bg-[#DC2626]' : 'border-[#E0E0E0]'
                      }`}>
                        {formData[currentQuestion.id] === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      {opt}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Checkbox options */}
            {currentQuestion.type === 'checkbox' && currentQuestion.options && (
              <div className="flex flex-col gap-3">
                {currentQuestion.options.map(opt => {
                  const selected = (formData[currentQuestion.id] as string[]) || []
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleCheckbox(currentQuestion.id, opt)}
                      className={`w-full text-left px-6 py-4 rounded-xl border text-base font-light transition-all duration-300 ${
                        selected.includes(opt)
                          ? 'bg-[#DC2626]/5 border-[#DC2626] text-[#1A1A1A]'
                          : 'bg-white border-[#E0E0E0] text-[#1A1A1A]/60 hover:border-[#DC2626]/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                          selected.includes(opt) ? 'bg-[#DC2626] border-[#DC2626]' : 'bg-white border-[#E0E0E0]'
                        }`}>
                          {selected.includes(opt) && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
                        </div>
                        {opt}
                      </div>
                    </button>
                  )
                })}
              </div>
            )}

            {/* Text input */}
            {currentQuestion.type === 'text' && (
              <input
                type="text"
                value={formData[currentQuestion.id] || ''}
                onChange={e => setValue(currentQuestion.id, e.target.value)}
                placeholder={currentQuestion.placeholder}
                className="w-full bg-transparent border-b-2 border-[#DC2626] px-0 py-4 text-xl font-light text-[#1A1A1A] outline-none placeholder:text-[#1A1A1A]/60"
              />
            )}

            {/* Textarea */}
            {currentQuestion.type === 'textarea' && (
              <textarea
                value={formData[currentQuestion.id] || ''}
                onChange={e => setValue(currentQuestion.id, e.target.value)}
                placeholder={currentQuestion.placeholder}
                rows={4}
                className="w-full bg-transparent border-b-2 border-[#1A1A1A] px-0 py-4 text-lg font-light text-[#1A1A1A] outline-none placeholder:text-[#1A1A1A]/20 resize-none"
              />
            )}

            {/* Contact form */}
            {currentQuestion.type === 'contact' && (
              <div className="flex flex-col gap-6">
                {[
                  { id: 'name', label: 'Име:', type: 'text', placeholder: 'Вашето име' },
                  { id: 'email', label: 'E-mail:', type: 'email', placeholder: 'email@company.bg' },
                  { id: 'phone', label: 'Телефон:', type: 'tel', placeholder: '0888 123 456' },
                ].map(field => (
                  <div key={field.id}>
                    <label className="text-sm font-light text-[#1A1A1A]/60 mb-2 block italic">{field.label}</label>
                    <input
                      type={field.type}
                      value={formData[field.id] || ''}
                      onChange={e => setValue(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full bg-transparent border-b-2 border-[#1A1A1A] px-0 py-3 text-lg font-light text-[#1A1A1A] outline-none placeholder:text-[#1A1A1A]/20"
                    />
                  </div>
                ))}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="mt-6 w-full bg-[#DC2626] text-white py-5 rounded-full text-lg font-medium hover:bg-[#E64922] transition-all duration-300 disabled:opacity-70"
                >
                  {isSubmitting ? 'Изпращаме...' : 'Изпращане'}
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: Circle outline + nav buttons */}
          <div className="hidden lg:flex flex-col items-center justify-center relative shrink-0">
            {/* Big circle outline */}
            <div className="w-[380px] h-[380px] rounded-full border border-[#DC2626]/15 absolute top-8 left-1/2 -translate-x-1/2" />

            {/* Nav buttons */}
            <div className="relative z-10 flex flex-col items-center gap-4 mt-20">
              {/* Previous */}
              <button
                onClick={goPrev}
                disabled={isFirstStep}
                className={`flex flex-col items-center gap-1 text-[10px] uppercase tracking-[0.2em] font-light transition-all ${
                  isFirstStep ? 'text-[#1A1A1A]/10 cursor-default' : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]/60'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                  isFirstStep ? 'border-[#1A1A1A]/10' : 'border-[#1A1A1A]/20 hover:border-[#DC2626]'
                }`}>
                  <ArrowUp size={16} className={isFirstStep ? 'text-[#1A1A1A]/10' : 'text-[#1A1A1A]/60'} />
                </div>
                <span className="[writing-mode:vertical-rl] rotate-180 mt-1">ПРЕДИШЕН</span>
              </button>

              {/* Next */}
              {!isLastStep && (
                <button
                  onClick={goNext}
                  className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-[0.2em] font-light text-[#DC2626] hover:scale-105 transition-all group"
                >
                  <span className="[writing-mode:vertical-rl] rotate-180 mb-1">СЛЕДВАЩ</span>
                  <div className="w-14 h-14 rounded-full bg-[#DC2626] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <ArrowDown size={20} className="text-white" />
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="flex lg:hidden items-center justify-between mt-8 pt-6 border-t border-[#E0E0E0]">
          <button
            onClick={goPrev}
            disabled={isFirstStep}
            className={`text-xs uppercase tracking-wider font-light ${isFirstStep ? 'text-[#1A1A1A]/20' : 'text-[#1A1A1A]/70'}`}
          >
            ← Предишен
          </button>
          {!isLastStep && (
            <button onClick={goNext} className="text-xs uppercase tracking-wider font-light text-[#DC2626]">
              Следващ →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
