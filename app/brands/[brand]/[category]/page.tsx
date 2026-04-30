import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import TopBar from '@/components/TopBar'
import BottomNav from '@/components/BottomNav'
import AddToCartButton from '@/components/AddToCartButton'
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

        <h2 className="text-display font-bold text-primary-container mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          {category.name}
        </h2>
        <p className="text-on-surface-variant text-body-md mb-stack-lg">{items.length} товаров</p>

        {items.length === 0 ? (
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-12 text-center">
            <span className="material-symbols-outlined text-4xl text-outline mb-4 block">inventory_2</span>
            <p className="text-on-surface-variant text-body-md">В этой категории пока нет товаров.</p>
            <a
              href={`https://wa.me/996704226587?text=${encodeURIComponent(`Здравствуйте! Ищу ${category.name} для ${brand.name}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-orange-500 text-white px-6 py-3 rounded-lg text-[13px] font-bold uppercase hover:bg-orange-600 transition-colors"
            >
              Запросить в WhatsApp
            </a>
          </div>
        ) : (
          <div className="flex flex-col gap-gutter">
            {items.map((product) => (
              <div key={product.id} className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden flex gap-0 hover:shadow-md transition-shadow">
                <Link href={`/product/${product.id}`} className="w-32 h-32 shrink-0 bg-surface-container">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </Link>
                <div className="flex-1 p-stack-md flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link href={`/product/${product.id}`}>
                        <h3 className="text-[14px] font-bold text-primary leading-snug" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                          {product.name}
                        </h3>
                      </Link>
                    </div>
                    <p className="text-[11px] text-secondary mt-1">{product.partNumber}</p>
                    <div className="flex gap-2 mt-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        product.status === 'В наличии'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {product.status}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed-variant">
                        {product.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[20px] font-bold text-primary" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      ${product.price}
                    </span>
                    <AddToCartButton product={product} compact />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  )
}
