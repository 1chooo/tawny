import type { MDXComponents } from 'mdx/types'
import { evaluate } from 'next-mdx-remote-client/rsc'
import remarkGfm from 'remark-gfm'
import { docsMdxComponents } from '@/lib/mdx/docs-components'

export type RenderMdxResult = {
  content: React.ReactNode
  error: Error | null
}

/**
 * Compile and render MDX source with the docs component registry.
 */
export async function renderMdx(
  source: string,
  components: MDXComponents = docsMdxComponents,
): Promise<RenderMdxResult> {
  const { content, error } = await evaluate({
    source,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  })

  return {
    content,
    error: error ?? null,
  }
}
