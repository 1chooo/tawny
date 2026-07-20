import { ProseLayout } from '@/components/dev/prose-layout'
import { devMdxComponents } from '@/components/dev/mdx-components'

export default async function DevProjectsPage() {
  const { default: MDXContent } = await import('@/content/dev/projects.mdx')

  return (
    <ProseLayout>
      <MDXContent components={devMdxComponents} />
    </ProseLayout>
  )
}
