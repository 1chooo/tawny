import { notFound } from 'next/navigation'
import { getPost, VcardBlogDetail } from '@/components/vcard/blog-detail'
import { posts } from '@/lib/vcard/content'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  return { title: post ? `${post.title} — VCard` : 'VCard' }
}

export default async function VcardBlogSlugPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()
  return <VcardBlogDetail post={post} />
}
