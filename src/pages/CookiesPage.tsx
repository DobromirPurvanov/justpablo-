import { Link } from 'react-router'

export default function CookiesPage() {
  return (
    <div className="pt-24 pb-20 bg-white">
      <div className="section-padding">
        <div className="container-max">
          <h1 className="font-thin-display text-4xl lg:text-6xl text-[#1A1A1A] mb-8">
            Политика за бисквитки
          </h1>

          <div className="max-w-3xl">
            <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed mb-8">
              Последно обновяване: май 2026
            </p>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Какво представляват бисквитките?</h2>
              <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                Бисквитките са малки текстови файлове, които се съхраняват на вашето устройство 
                (компютър, таблет или мобилен телефон), когато посещавате уебсайт. Те се използват 
                широко за правилното функциониране на уебсайтовете, подобряване на потребителското 
                изживяване, както и за събиране на информация за начина, по който посетителите 
                използват сайта.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Какви бисквитки използваме?</h2>
              <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed mb-4">
                <strong className="text-[#1A1A1A]">Задължителни бисквитки</strong> — тези бисквитки 
                са необходими за правилното функциониране на уебсайта и не могат да бъдат изключени. 
                Те обикновено се задават само в отговор на ваши действия, като например настройка на 
                предпочитания за поверителност, влизане в профил или попълване на формуляри.
              </p>
              <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed mb-4">
                <strong className="text-[#1A1A1A]">Бисквитки за производителност</strong> — използваме 
                Google Analytics, за да разберем как посетителите взаимодействат с нашия уебсайт. 
                Тези бисквитки ни помагат да подобрим функционалността и дизайна на сайта.
              </p>
              <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                <strong className="text-[#1A1A1A]">Бисквитки за функционалност</strong> — използват се 
                за запомняне на вашите предпочитания (като език или регион), което позволява персонализирано 
                съдържание и функции.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Управление на бисквитките</h2>
              <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                Можете да управлявате и/или изтривате бисквитките по всяко време чрез настройките 
                на вашия браузър. Моля, имайте предвид, че деактивирането на определени бисквитки 
                може да повлияе на функционалността на уебсайта.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Контакт</h2>
              <p className="text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                Ако имате въпроси относно нашата политика за бисквитки, моля свържете се с нас на{' '}
                <a href="mailto:info@justpablo.bg" className="text-[#DC2626] hover:underline">
                  info@justpablo.bg
                </a>.
              </p>
            </section>

            <div className="flex gap-6 mt-12 pt-8 border-t border-[#1A1A1A]/10">
              <Link to="/poveritelnost" className="text-sm font-light text-[#1A1A1A]/60 hover:text-[#DC2626] transition-colors">
                Политика за поверителност
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
