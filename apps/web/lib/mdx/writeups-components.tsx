import type { MDXComponents } from 'mdx/types'
import { LinearUxStage } from '@/components/writeups/linear-ux-demo'
import { TestimonialStage } from '@/components/writeups/testimonial-stage'
import { docsMdxComponents } from '@/lib/mdx/docs-components'

/** Docs prose, plus the interactive figures used in design writeups. */
export const writeupsMdxComponents: MDXComponents = {
  ...docsMdxComponents,
  LinearUxStage,
  TestimonialStage,
}
