import Link from 'next/link'
import Image from 'next/image'
import TopBar from '@/components/TopBar'
import BottomNav from '@/components/BottomNav'
import { brands } from '@/data/products'
import { getProducts } from '@/lib/products-store'

export const revalidate = 0

export default async function BrandsPage() {
  const products = await getProducts()

  const brandsWithCount = brands.map((b) => ({
    ...b,
    count: products.filter((p) => p.brandSlug === b.slug).length,
  }))

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopBar />

      {/* Hero */}
      <div className="bg-[#00234B] pt-20 pb-10 px-5">
        <div className="max-w-2xl mx-auto">
          <p className="text-orange-400 text-[11px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Каталог запчастей
          </p>
          <h1 className="text-white text-[28px] font-black leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Выберите марку<br />автомобиля
          </h1>
          <p className="text-slate-400 text-[13px] mt-2">Прямые поставки с заводов Китая</p>
        </div>
      </div>

      <main className="pb-32 px-5 max-w-2xl mx-auto">
        <div className="grid grid-cols-2 gap-3 mt-5">
          {brandsWithCount.map((brand) => (
            <Link
              key={brand.slug}
              href={`/brands/${brand.slug}`}
              className="bg-white border border-slate-100 p-5 flex flex-col items-center justify-center gap-3 hover:border-orange-400 hover:shadow-lg transition-all group rounded-2xl shadow-sm"
            >
              <div className="w-16 h-16 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300">
                <Image src={brand.image} alt={brand.name} width={64} height={64} className="w-full object-contain" />
              </div>
              <div className="text-center">
                <span className="block text-[14px] font-bold text-[#00234B]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {brand.name}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">{brand.count} запч.</span>
              </div>
            </Link>
          ))}

          <div className="bg-white border-2 border-dashed border-slate-200 p-5 flex flex-col items-center justify-center gap-3 hover:border-orange-400 hover:bg-orange-50 transition-all cursor-pointer group rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[20px]">add</span>
            </div>
            <div className="text-center">
              <span className="block text-[14px] font-bold text-[#00234B]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Другая марка
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Запросить</span>
            </div>
          </div>
        </div>

        {/* VIN Search banner */}
        <div className="mt-5 bg-gradient-to-br from-[#00234B] to-[#00408a] text-white p-6 rounded-2xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-white text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>manage_search</span>
              </div>
              <h3 className="text-[17px] font-black" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>VIN Поиск</h3>
            </div>
            <p className="text-slate-300 text-[13px] mb-4 leading-relaxed">
              Напишите нам в WhatsApp — найдём деталь по VIN за 24 часа.
            </p>
            <a
              href="https://wa.me/996704226587?text=Здравствуйте!+Хочу+найти+запчасть+по+VIN."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 text-white text-[13px] font-bold px-5 py-2.5 rounded-xl inline-flex items-center gap-2 hover:bg-orange-600 transition-colors"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
              Написать в WhatsApp
            </a>
          </div>
          <span className="material-symbols-outlined absolute -bottom-8 -right-8 text-white/5 text-[180px]">construction</span>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
