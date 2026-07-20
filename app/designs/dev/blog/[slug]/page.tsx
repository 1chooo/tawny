import { notFound } from 'next/navigation'
import { ProseLayout } from '@/components/dev/prose-layout'
import { devMdxComponents } from '@/components/dev/mdx-components'
import { getArticleSlugs } from '@/lib/dev/articles'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getArticleSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata(props: Props) {
  const { slug } = await props.params
  try {
    const articleModule = await import(`@/content/dev/articles/${slug}.mdx`)
    return {
      title: articleModule.metadata?.title,
      description: articleModule.metadata?.description,
    }
  } catch {
    return {}
  }
}

export default async function DevBlogPostPage(props: Props) {
  const { slug } = await props.params

  try {
    const { default: MDXContent } = await import(
      `@/content/dev/articles/${slug}.mdx`
    )
    return (
      <ProseLayout>
        <MDXContent components={devMdxComponents} />
      </ProseLayout>
    )
  } catch {
    notFound()
  }
}
