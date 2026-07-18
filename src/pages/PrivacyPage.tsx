import { Link } from 'react-router'

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-20 bg-white">
      <div className="section-padding">
        <div className="container-max">
          <h1 className="font-thin-display text-4xl lg:text-6xl text-[#1A1A1A] mb-8">
            Политика за поверителност
          </h1>

          <div className="max-w-3xl">
            <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed mb-8">
              Последно обновяване: май 2026
            </p>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">1. Въведение</h2>
              <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                JustPablo („ние", „нас" или „наш") уважава вашата поверителност и се ангажира да защитава 
                личните ви данни. Тази политика за поверителност обяснява как събираме, използваме, 
                съхраняваме и защитаваме вашата информация, когато използвате нашия уебсайт{' '}
                <a href="https://justpablo.bg" className="text-[#DC2626] hover:underline">justpablo.bg</a> 
                и нашите услуги.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">2. Каква информация събираме</h2>
              <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed mb-4">
                <strong className="text-[#1A1A1A]">Информация, която ни предоставяте доброволно:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-base font-light text-[#1A1A1A]/70 leading-relaxed mb-4">
                <li>Име и фамилия</li>
                <li>Имейл адрес</li>
                <li>Телефонен номер</li>
                <li>Име на фирма/бранд</li>
                <li>Информация за вашия бизнес и маркетингови нужди (чрез формата за запитване)</li>
              </ul>
              <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                <strong className="text-[#1A1A1A]">Автоматично обработвана информация:</strong> при всяко
                посещение хостинг доставчикът ни може да записва в стандартни сървърни логове технически
                данни (IP адрес, тип браузър) за сигурност и стабилност на услугата. Не използваме
                инструменти за детайлно проследяване на поведението; такива биха се въвели само след
                вашето изрично съгласие чрез банера за бисквитки.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">3. Как използваме вашата информация</h2>
              <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                Използваме събраната информация, за да:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                <li>Отговорим на вашите запитвания и предоставим поисканата информация</li>
                <li>Предоставим нашите маркетинг и уеб услуги</li>
                <li>Комуникираме с вас относно вашите проекти</li>
                <li>Подобрим нашия уебсайт и услуги</li>
                <li>Изпращаме маркетингови материали (с ваше съгласие)</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">4. Съхранение и защита на данните</h2>
              <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                Прилагаме подходящи технически и организационни мерки за защита на вашите лични 
                данни от неразрешено или незаконно обработване и от случайна загуба, унищожаване 
                или повреждане. Вашите данни се съхраняват на сигурни сървъри и се обработват 
                само от упълномощен персонал.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">5. Вашите права</h2>
              <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                Съгласно Общия регламент за защита на данните (GDPR), имате следните права:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                <li>Право на достъп до вашите лични данни</li>
                <li>Право на корекция на неточни данни</li>
                <li>Право на изтриване („право да бъдеш забравен")</li>
                <li>Право на ограничаване на обработката</li>
                <li>Право на възражение срещу обработката</li>
                <li>Право на преносимост на данните</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">6. Контакт</h2>
              <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                Ако имате въпроси относно тази политика за поверителност или искате да упражните 
                правата си, моля свържете се с нас на{' '}
                <a href="mailto:info@justpablo.bg" className="text-[#DC2626] hover:underline">
                  info@justpablo.bg
                </a>.
              </p>
            </section>

            <div className="flex gap-6 mt-12 pt-8 border-t border-[#1A1A1A]/10">
              <Link to="/biskvitki" className="text-sm font-light text-[#1A1A1A]/60 hover:text-[#DC2626] transition-colors">
                Политика за бисквитки
              </Link>
              <Link to="/usloviya" className="text-sm font-light text-[#1A1A1A]/60 hover:text-[#DC2626] transition-colors">
                Условия за ползване
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
