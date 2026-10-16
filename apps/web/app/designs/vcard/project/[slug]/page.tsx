import { notFound } from 'next/navigation'
import {
  getProject,
  VcardProjectDetail,
} from '@/components/vcard/project-detail'
import { projects } from '@/lib/vcard/content'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  return { title: project ? `${project.title} — VCard` : 'VCard' }
}

export default async function VcardProjectSlugPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()
  return <VcardProjectDetail project={project} />
}
