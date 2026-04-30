import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getProducts, addProduct } from '@/lib/products-store'
import type { Product } from '@/data/products'

function checkAuth(req: NextRequest) {
  const password = req.headers.get('x-admin-password')
  const correct = process.env.ADMIN_PASSWORD || 'admin123'
  return password === correct
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const products = await getProducts()
  return NextResponse.json(products)
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const product = (await req.json()) as Product
  const updated = await addProduct(product)
  revalidatePath('/', 'layout')
  return NextResponse.json(updated)
}
