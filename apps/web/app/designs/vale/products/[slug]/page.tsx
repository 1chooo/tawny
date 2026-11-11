import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductDetail } from '@/components/vale/product-detail'
import { getProduct } from '@/lib/vale/catalog'
import { products, site } from '@/lib/vale/content'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  return { title: product ? `${product.title} | ${site.name}` : site.name }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()
  return <ProductDetail product={product} />
}
