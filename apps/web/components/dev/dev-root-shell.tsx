'use client'

'use client'

import type { ReactNode } from 'react'
import { JetBrains_Mono } from 'next/font/google'
import { SiteFooter } from '@/components/dev/site-footer'
import { SiteHeader } from '@/components/dev/site-header'
import {
  DevThemeProvider,
  useDevTheme,
} from '@/components/dev/dev-theme-provider'
import { cn } from '@tawny/ui/lib/utils'

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-dev-mono',
  display: 'swap',
})

function DevRootInner({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const { theme } = useDevTheme()

  return (
    <div
      data-theme={theme}
      className={cn(
        'dev-root',
        mono.variable,
        mono.className,
        'bg-[var(--background)] font-mono text-[var(--foreground)] antialiased',
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 py-8 md:py-12">
        <SiteHeader />
        <main className="mt-8 flex-1">{children}</main>
        <SiteFooter />
      </div>
    </div>
  )
}

/**
 * Dev design root — fonts, header, footer, and independent theme.
 * Used by ProductFrame showcase and /view.
 */
export function DevRootShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <DevThemeProvider>
      <DevRootInner className={className}>{children}</DevRootInner>
    </DevThemeProvider>
  )
}
