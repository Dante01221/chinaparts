import Link from 'next/link'
import { notFound } from 'next/navigation'
import TopBar from '@/components/TopBar'
import BottomNav from '@/components/BottomNav'
import { brands, models } from '@/data/products'
import { getProducts } from '@/lib/products-store'

export const revalidate = 0

export default async function ModelGenerationsPage({ params }: { params: { brand: string; model: string } }) {
  const brand = brands.find((b) => b.slug === params.brand)
  const carModel = models.find((m) => m.slug === params.model && m.brandSlug === params.brand)
  if (!brand || !carModel) notFound()

  const products = await getProducts()

  const generationsWithCount = carModel.generations.map((gen) => ({
    ...gen,
    count: products.filter(
      (p) => p.brandSlug === params.brand && p.modelSlug === params.model && p.generationSlug === gen.slug
    ).length,
  }))

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
            <span className="text-orange-400 text-[12px] uppercase font-bold tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {carModel.name}
            </span>
          </div>
          <h1 className="text-white text-[24px] font-black leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {brand.name} {carModel.name}
          </h1>
          <p className="text-slate-400 text-[13px] mt-1">Выберите поколение</p>
        </div>
      </div>

      <main className="pb-32 px-5 max-w-2xl mx-auto mt-5">
        <div className="flex flex-col gap-3">
          {generationsWithCount.map((gen) => (
            <Link
              key={gen.slug}
              href={`/brands/${params.brand}/${params.model}/${gen.slug}`}
              className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 hover:border-orange-400 hover:shadow-md transition-all group shadow-sm"
            >
              {/* Иконка поколения */}
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex flex-col items-center justify-center text-[#00234B] group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors shrink-0">
                <span className="material-symbols-outlined text-[22px]">directions_car</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-[16px] font-black text-[#00234B]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {gen.name}
                  </h4>
                  <span className="text-[11px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md shrink-0" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {gen.years}
                  </span>
                </div>
                <p className="text-slate-400 text-[12px] mt-0.5">{gen.bodyType}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {gen.count > 0 && (
                  <span className="text-[12px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {gen.count} запч.
                  </span>
                )}
                <span className="material-symbols-outlined text-slate-300 group-hover:text-orange-500 transition-colors">chevron_right</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-5 bg-gradient-to-br from-[#00234B] to-[#00408a] text-white p-6 rounded-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-[17px] font-black mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Нужна конкретная деталь?</h3>
            <p className="text-slate-300 text-[13px] mb-4">Напишите нам — найдём по VIN за 24 часа.</p>
            <a
              href={`https://wa.me/996704226587?text=${encodeURIComponent(`Здравствуйте! Ищу запчасть для ${brand.name} ${carModel.name}.`)}`}
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
