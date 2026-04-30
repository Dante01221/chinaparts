import type { Product } from '@/data/products'
import { products as initialProducts } from '@/data/products'

const KV_KEY = 'products'

function isRedisConfigured() {
  return !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
}

async function getRedis() {
  const { Redis } = await import('@upstash/redis')
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  })
}

export async function getProducts(): Promise<Product[]> {
  if (!isRedisConfigured()) return initialProducts
  try {
    const redis = await getRedis()
    const data = await redis.get<Product[]>(KV_KEY)
    if (!data) {
      await redis.set(KV_KEY, initialProducts)
      return initialProducts
    }
    return data
  } catch {
    return initialProducts
  }
}

export async function setProducts(products: Product[]): Promise<void> {
  if (!isRedisConfigured()) return
  const redis = await getRedis()
  await redis.set(KV_KEY, products)
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
