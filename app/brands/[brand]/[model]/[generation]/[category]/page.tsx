import Link from 'next/link'
import { notFound } from 'next/navigation'
import TopBar from '@/components/TopBar'
import BottomNav from '@/components/BottomNav'
import ProductFilters from '@/components/ProductFilters'
import { brands, models, categories } from '@/data/products'
import { getProducts } from '@/lib/products-store'

export const revalidate = 0

export default async function ProductListPage({ params }: { params: { brand: string; model: string; generation: string; category: string } }) {
  const brand = brands.find((b) => b.slug === params.brand)
  const carModel = models.find((m) => m.slug === params.model && m.brandSlug === params.brand)
  const category = categories.find((c) => c.slug === params.category)
  if (!brand || !carModel || !category) notFound()

  const gen = carModel.generations.find((g) => g.slug === params.generation)
  if (!gen) notFound()

  const allProducts = await getProducts()
  const items = allProducts.filter(
    (p) =>
      p.brandSlug === params.brand &&
      p.modelSlug === params.model &&
      p.generationSlug === params.generation &&
      p.categorySlug === params.category
  )

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopBar />
      <main className="pt-20 pb-32 px-5 max-w-2xl mx-auto">
        <div className="flex items-center gap-1.5 mb-4 flex-wrap text-[11px] uppercase tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          <Link href="/brands" className="text-slate-400 hover:text-orange-500 transition-colors">Каталог</Link>
          <span className="material-symbols-outlined text-slate-300 text-sm">chevron_right</span>
          <Link href={`/brands/${params.brand}`} className="text-slate-400 hover:text-orange-500 transition-colors">{brand.name}</Link>
          <span className="material-symbols-outlined text-slate-300 text-sm">chevron_right</span>
          <Link href={`/brands/${params.brand}/${params.model}`} className="text-slate-400 hover:text-orange-500 transition-colors">{carModel.name}</Link>
          <span className="material-symbols-outlined text-slate-300 text-sm">chevron_right</span>
          <Link href={`/brands/${params.brand}/${params.model}/${params.generation}`} className="text-slate-400 hover:text-orange-500 transition-colors">{gen.name}</Link>
          <span className="material-symbols-outlined text-slate-300 text-sm">chevron_right</span>
          <span className="text-orange-500 font-bold">{category.name}</span>
        </div>

        <h2 className="text-[22px] font-black text-[#00234B] mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          {category.name}
        </h2>
        <p className="text-slate-400 text-[13px] mb-5">
          {brand.name} {carModel.name} · {gen.name} · {gen.years}
        </p>

        <ProductFilters
          products={items}
          brandSlug={params.brand}
          brandName={brand.name}
          modelName={`${carModel.name} ${gen.name}`}
          categoryName={category.name}
        />
      </main>
      <BottomNav />
    </div>
  )
}
