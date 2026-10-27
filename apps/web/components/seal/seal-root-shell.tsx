import type { ReactNode } from 'react'
import { cn } from '@tawny/ui/lib/utils'
import { NoiseTexture } from '@/components/seal/noise-texture'
import { sealBody, sealDisplay } from '@/lib/seal/fonts'

export const sealFontClassName = cn(
  sealDisplay.variable,
  sealBody.variable,
  sealBody.className,
)

/**
 * Seal design root — fonts and tokens for the ProductFrame, /view, and
 * catalog mocks. Styles stay on this element, not on <html>.
 */
export function SealRootShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div lang="en" className={cn('seal', sealFontClassName, className)}>
      <NoiseTexture />
      {children}
    </div>
  )
}
