import Link from 'next/link'
import { notFound } from 'next/navigation'
import TopBar from '@/components/TopBar'
import BottomNav from '@/components/BottomNav'
import { brands, models, categories } from '@/data/products'
import { getProducts } from '@/lib/products-store'

export const revalidate = 0

export default async function BodyCategoriesPage({ params }: { params: { brand: string; model: string; body: string } }) {
  const brand = brands.find((b) => b.slug === params.brand)
  const carModel = models.find((m) => m.slug === params.model && m.brandSlug === params.brand)
  if (!brand || !carModel) notFound()

  const bodyType = carModel.bodyTypes.find((b) => b.slug === params.body)
  if (!bodyType) notFound()

  const products = await getProducts()

  const availableCategories = categories.filter((cat) =>
    products.some(
      (p) =>
        p.brandSlug === params.brand &&
        p.modelSlug === params.model &&
        p.bodySlug === params.body &&
        p.categorySlug === cat.slug
    )
  )

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopBar />

      <div className="bg-[#00234B] pt-20 pb-8 px-5">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Link href="/brands" className="text-slate-400 text-[12px] uppercase font-medium tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Каталог
            </Link>
            <span className="material-symbols-outlined text-slate-600 text-sm">chevron_right</span>
            <Link href={`/brands/${params.brand}`} className="text-slate-400 text-[12px] uppercase font-medium tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {brand.name}
            </Link>
            <span className="material-symbols-outlined text-slate-600 text-sm">chevron_right</span>
            <Link href={`/brands/${params.brand}/${params.model}`} className="text-slate-400 text-[12px] uppercase font-medium tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {carModel.name}
            </Link>
            <span className="material-symbols-outlined text-slate-600 text-sm">chevron_right</span>
            <span className="text-orange-400 text-[12px] uppercase font-bold tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {bodyType.name}
            </span>
          </div>
          <div>
            <h1 className="text-white text-[24px] font-black leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {brand.name} {carModel.name}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-orange-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {bodyType.name}
              </span>
              <p className="text-slate-400 text-[13px]">Выберите категорию запчастей</p>
            </div>
          </div>
        </div>
      </div>

      <main className="pb-32 px-5 max-w-2xl mx-auto mt-5">
        {availableCategories.length > 0 ? (
          <div className="flex flex-col gap-3">
            {availableCategories.map((cat) => {
              const count = products.filter(
                (p) =>
                  p.brandSlug === params.brand &&
                  p.modelSlug === params.model &&
                  p.bodySlug === params.body &&
                  p.categorySlug === cat.slug
              ).length
              return (
                <Link
                  key={cat.slug}
                  href={`/brands/${params.brand}/${params.model}/${params.body}/${cat.slug}`}
                  className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4 hover:border-orange-400 hover:shadow-md transition-all group shadow-sm"
                >
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-[#00234B] group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors shrink-0">
                    <span className="material-symbols-outlined">{cat.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[16px] font-bold text-[#00234B]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{cat.name}</h4>
                    <p className="text-slate-400 text-[12px] mt-0.5">{cat.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[12px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {count}
                    </span>
                    <span className="material-symbols-outlined text-slate-300 group-hover:text-orange-500 transition-colors">chevron_right</span>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
            <span className="material-symbols-outlined text-4xl text-slate-300 mb-4 block">inventory_2</span>
            <p className="text-slate-500 text-[15px] mb-5">Запчастей для этой конфигурации пока нет в каталоге.</p>
            <a
              href={`https://wa.me/996704226587?text=${encodeURIComponent(`Здравствуйте! Ищу запчасть для ${brand.name} ${carModel.name} (${bodyType.name}).`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl text-[13px] font-bold uppercase hover:bg-orange-600 transition-colors"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Запросить в WhatsApp
            </a>
          </div>
        )}

        <div className="mt-5 bg-gradient-to-br from-[#00234B] to-[#00408a] text-white p-6 rounded-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-[17px] font-black mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Не нашли нужную деталь?</h3>
            <p className="text-slate-300 text-[13px] mb-4">Закажем напрямую с заводов Китая за 7–14 дней.</p>
            <a
              href={`https://wa.me/996704226587?text=${encodeURIComponent(`Здравствуйте! Ищу запчасть для ${brand.name} ${carModel.name} ${bodyType.name}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 text-white text-[13px] font-bold px-5 py-2.5 rounded-xl inline-flex items-center gap-2 hover:bg-orange-600 transition-colors"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
              Связаться в WhatsApp
            </a>
          </div>
          <span className="material-symbols-outlined absolute -bottom-6 -right-6 text-white/5 text-[160px]">build</span>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
