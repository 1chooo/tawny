import type { MDXComponents } from 'mdx/types'
import { LinearUxDemo, LinearUxStage } from '@/components/writeups/linear-ux-demo'
import { docsMdxComponents } from '@/lib/mdx/docs-components'

/** Docs prose, plus the interactive figures used in design writeups. */
export const writeupsMdxComponents: MDXComponents = {
  ...docsMdxComponents,
  LinearUxDemo,
  LinearUxStage,
}
