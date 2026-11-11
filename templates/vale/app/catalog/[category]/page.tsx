import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CatalogPage } from '@/components/catalog-page'
import { getCategory, isCategoryId } from '@/lib/catalog'
import { categories } from '@/lib/content'

type Props = { params: Promise<{ category: string }> }

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const entry = getCategory(category)
  return { title: entry?.label ?? 'Catalog' }
}

export default async function Page({ params }: Props) {
  const { category } = await params
  if (!isCategoryId(category)) notFound()
  return <CatalogPage category={category} />
}
