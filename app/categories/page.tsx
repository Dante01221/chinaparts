import Link from 'next/link'
import TopBar from '@/components/TopBar'
import BottomNav from '@/components/BottomNav'
import { categories, brands } from '@/data/products'
import { getProducts } from '@/lib/products-store'

export const revalidate = 0

export default async function CategoriesPage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopBar />

      {/* Hero */}
      <div className="bg-[#00234B] pt-20 pb-8 px-5">
        <div className="max-w-2xl mx-auto">
          <p className="text-orange-400 text-[11px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            По категориям
          </p>
          <h1 className="text-white text-[28px] font-black leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Все категории
          </h1>
          <p className="text-slate-400 text-[13px] mt-1">Выберите систему и марку автомобиля</p>
        </div>
      </div>

      <main className="pb-32 px-5 max-w-2xl mx-auto mt-5">
        <div className="flex flex-col gap-3">
          {categories.map((cat) => {
            const totalCount = products.filter((p) => p.categorySlug === cat.slug).length
            const brandsWithCat = brands.filter((b) =>
              products.some((p) => p.brandSlug === b.slug && p.categorySlug === cat.slug)
            )
            if (totalCount === 0) return null
            return (
              <div key={cat.slug} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="flex items-center gap-3 p-4 border-b border-slate-50">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-[#00234B] shrink-0">
                    <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[15px] font-bold text-[#00234B]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-slate-400">{cat.description} · {totalCount} товаров</p>
                  </div>
                </div>
                <div className="p-3 flex flex-wrap gap-2">
                  {brandsWithCat.map((brand) => {
                    const count = products.filter(
                      (p) => p.brandSlug === brand.slug && p.categorySlug === cat.slug
                    ).length
                    return (
                      <Link
                        key={brand.slug}
                        href={`/brands/${brand.slug}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-orange-50 hover:border-orange-300 border border-transparent rounded-xl transition-all group"
                      >
                        <span className="text-[13px] font-bold text-[#00234B] group-hover:text-orange-600" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                          {brand.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">{count}</span>
                        <span className="material-symbols-outlined text-[14px] text-slate-300 group-hover:text-orange-400 transition-colors">arrow_forward</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-5 bg-gradient-to-br from-[#00234B] to-[#00408a] text-white p-6 rounded-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-[17px] font-black mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Не нашли нужную деталь?</h3>
            <p className="text-slate-300 text-[13px] mb-4">Закажем напрямую с заводов Китая за 7–14 дней.</p>
            <a
              href="https://wa.me/996704226587?text=Здравствуйте!+Ищу+запчасть,+которой+нет+в+каталоге."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 text-white text-[13px] font-bold px-5 py-2.5 rounded-xl inline-flex items-center gap-2 hover:bg-orange-600 transition-colors"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
              Написать в WhatsApp
            </a>
          </div>
          <span className="material-symbols-outlined absolute -bottom-8 -right-8 text-white/5 text-[180px]">category</span>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
