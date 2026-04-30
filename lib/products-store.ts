import type { Product } from '@/data/products'
import { products as initialProducts } from '@/data/products'

const KV_KEY = 'products'

function isKVConfigured() {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

async function getKV() {
  const { kv } = await import('@vercel/kv')
  return kv
}

// Local file fallback (dev without KV)
async function readLocalFile(): Promise<Product[]> {
  const fs = await import('fs/promises')
  const path = await import('path')
  const file = path.join(process.cwd(), 'data', 'products-local.json')
  try {
    const data = await fs.readFile(file, 'utf-8')
    return JSON.parse(data)
  } catch {
    return initialProducts
  }
}

async function writeLocalFile(products: Product[]): Promise<void> {
  const fs = await import('fs/promises')
  const path = await import('path')
  const file = path.join(process.cwd(), 'data', 'products-local.json')
  await fs.writeFile(file, JSON.stringify(products, null, 2))
}

export async function getProducts(): Promise<Product[]> {
  if (isKVConfigured()) {
    const kv = await getKV()
    const data = await kv.get<Product[]>(KV_KEY)
    // first launch — seed from initial data
    if (!data) {
      await kv.set(KV_KEY, initialProducts)
      return initialProducts
    }
    return data
  }
  return readLocalFile()
}

export async function setProducts(products: Product[]): Promise<void> {
  if (isKVConfigured()) {
    const kv = await getKV()
    await kv.set(KV_KEY, products)
  } else {
    await writeLocalFile(products)
  }
}

export async function addProduct(product: Product): Promise<Product[]> {
  const products = await getProducts()
  const updated = [...products, product]
  await setProducts(updated)
  return updated
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<Product[]> {
  const products = await getProducts()
  const updated = products.map((p) => (p.id === id ? { ...p, ...data } : p))
  await setProducts(updated)
  return updated
}

export async function deleteProduct(id: string): Promise<Product[]> {
  const products = await getProducts()
  const updated = products.filter((p) => p.id !== id)
  await setProducts(updated)
  return updated
}
