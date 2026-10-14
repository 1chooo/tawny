import type { MDXComponents } from 'mdx/types'
import { docsMdxComponents } from '@/lib/mdx/docs-components'

/** Docs prose for design writeups. Figures register here as posts need them. */
export const writeupsMdxComponents: MDXComponents = {
  ...docsMdxComponents,
}
