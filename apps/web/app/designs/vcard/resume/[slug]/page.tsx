import { notFound } from 'next/navigation'
import {
  getResume,
  VcardResumeDetail,
} from '@/components/vcard/resume-page'
import { resume } from '@/lib/vcard/content'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return resume.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const item = getResume(slug)
  return { title: item ? `${item.institution} — VCard` : 'VCard' }
}

export default async function VcardResumeSlugPage({ params }: Props) {
  const { slug } = await params
  const item = getResume(slug)
  if (!item) notFound()
  return <VcardResumeDetail item={item} />
}
