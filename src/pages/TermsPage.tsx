import { Link } from 'react-router'

export default function TermsPage() {
  return (
    <div className="pt-24 pb-20 bg-white">
      <div className="section-padding">
        <div className="container-max">
          <h1 className="font-thin-display text-4xl lg:text-6xl text-[#1A1A1A] mb-8">
            Условия за ползване
          </h1>

          <div className="max-w-3xl">
            <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed mb-8">
              Последно обновяване: май 2026
            </p>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">1. Приемане на условията</h2>
              <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                С достъпа и използването на уебсайта{' '}
                <a href="https://justpablo.bg" className="text-[#DC2626] hover:underline">justpablo.bg</a>{' '}
                („уебсайтът"), вие приемате и се съгласявате да спазвате тези условия за ползване. 
                Ако не сте съгласни с някоя част от тези условия, моля, не използвайте нашия уебсайт.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">2. Услуги</h2>
              <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                JustPablo предоставя дигитални маркетинг услуги, включително, но не само: SEO оптимизация, 
                уеб дизайн и разработка, онлайн реклама (Google Ads, Facebook Ads), брандинг, 
                съдържание и копирайтинг, социални медии, имейл маркетинг и консултации.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">3. Интелектуална собственост</h2>
              <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                Цялото съдържание на този уебсайт — текстове, изображения, лога, графики, видео — 
                е собственост на JustPablo или е лицензирано за използване от нас и е защитено от 
                законите за авторското право. Не е разрешено възпроизвеждане, разпространение или 
                промяна на съдържанието без предварително писмено съгласие.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">4. Запитвания и оферти</h2>
              <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                Формата за запитване на уебсайта служи за събиране на информация за потенциални 
                клиенти. Изпращането на запитване не създава договорни отношения. JustPablo си 
                запазва правото да откаже сътрудничество по своя преценка, без да дължи обяснение.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">5. Отговорност</h2>
              <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                JustPablo полага разумни усилия за осигуряване на точна и актуална информация 
                на уебсайта. Въпреки това, не гарантираме пълната точност, пълнота или актуалност 
                на съдържанието. Уебсайтът и услугите се предоставят „както са" без каквито и да 
                било гаранции.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">6. Връзки към външни сайтове</h2>
              <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                Нашият уебсайт може да съдържа връзки към външни уебсайтове. JustPablo не носи 
                отговорност за съдържанието или практиките за поверителност на тези трети страни.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">7. Промени в условията</h2>
              <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                JustPablo си запазва правото да променя тези условия за ползване по всяко време. 
                Промените влизат в сила от момента на публикуването им на уебсайта. Препоръчваме 
                ви периодично да преглеждате тази страница.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">8. Контакт</h2>
              <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                Ако имате въпроси относно тези условия за ползване, моля свържете се с нас на{' '}
                <a href="mailto:info@justpablo.bg" className="text-[#DC2626] hover:underline">
                  info@justpablo.bg
                </a>.
              </p>
            </section>

            <div className="flex gap-6 mt-12 pt-8 border-t border-[#1A1A1A]/10">
              <Link to="/poveritelnost" className="text-sm font-light text-[#1A1A1A]/60 hover:text-[#DC2626] transition-colors">
                Политика за поверителност
              </Link>
              <Link to="/biskvitki" className="text-sm font-light text-[#1A1A1A]/60 hover:text-[#DC2626] transition-colors">
                Политика за бисквитки
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
