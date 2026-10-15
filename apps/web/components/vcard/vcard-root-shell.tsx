import type { ReactNode } from 'react'
import { Roboto, Roboto_Mono } from 'next/font/google'
import { cn } from '@tawny/ui/lib/utils'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-vcard-sans',
  display: 'swap',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-vcard-mono',
  display: 'swap',
})

/**
 * VCard design root — fonts and tokens for the ProductFrame, /view, and
 * component-gallery demos. Styles stay on this element, not on <html>.
 */
export function VcardRootShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'vcard-root',
        roboto.variable,
        robotoMono.variable,
        roboto.className,
        className,
      )}
    >
      {children}
    </div>
  )
}
