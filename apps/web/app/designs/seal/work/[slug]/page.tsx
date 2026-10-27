import { notFound } from 'next/navigation'
import { WorkDetail } from '@/components/seal/work-detail'
import { getProject, projects } from '@/lib/seal/content'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  return { title: project ? `${project.title} — Seal` : 'Seal' }
}

export default async function SealWorkPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()
  return <WorkDetail project={project} />
}
