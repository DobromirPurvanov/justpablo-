import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center pt-20">
      <div className="text-center px-6">
        <div className="mb-8">
          <span className="font-ultra-thin text-[150px] lg:text-[200px] text-[#DC2626] leading-none block">
            404
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-4">
          Страницата не е намерена
        </h1>
        <p className="text-base font-light text-[#1A1A1A]/60 mb-10 max-w-md mx-auto">
          Страницата, която търсите, не съществува или е била преместена.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#DC2626] text-white px-8 py-4 rounded-full text-base font-medium hover:bg-[#B91C1C] hover:scale-105 transition-all"
        >
          Начална страница
        </Link>
      </div>
    </div>
  )
}
