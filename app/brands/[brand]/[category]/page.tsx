import Link from 'next/link'
import { notFound } from 'next/navigation'
import TopBar from '@/components/TopBar'
import BottomNav from '@/components/BottomNav'
import ProductFilters from '@/components/ProductFilters'
import { brands, categories, products, getProductsByBrandAndCategory } from '@/data/products'

export function generateStaticParams() {
  const params = []
  for (const brand of brands) {
    for (const cat of categories) {
      params.push({ brand: brand.slug, category: cat.slug })
    }
  }
  return params
}

export default function ProductListPage({ params }: { params: { brand: string; category: string } }) {
  const brand = brands.find((b) => b.slug === params.brand)
  const category = categories.find((c) => c.slug === params.category)
  if (!brand || !category) notFound()

  const items = getProductsByBrandAndCategory(params.brand, params.category)

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="pt-24 pb-32 px-container-margin max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-stack-md text-[12px] uppercase tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          <Link href="/brands" className="text-on-surface-variant">Каталог</Link>
          <span className="material-symbols-outlined text-outline text-sm">chevron_right</span>
          <Link href={`/brands/${params.brand}`} className="text-on-surface-variant">{brand.name}</Link>
          <span className="material-symbols-outlined text-outline text-sm">chevron_right</span>
          <span className="text-orange-500 font-bold">{category.name}</span>
        </div>

        <h2 className="text-display font-bold text-primary-container mb-stack-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          {category.name}
        </h2>

        <ProductFilters
          products={items}
          brandSlug={params.brand}
          brandName={brand.name}
          categoryName={category.name}
        />
      </main>
      <BottomNav />
    </div>
  )
}
