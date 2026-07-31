'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ReactNode } from 'react'

// next-themes injects an inline <script> to prevent theme flash. React 19 warns
// that scripts inside components never run on the client — false positive here:
// the script executes during SSR before paint.
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const orig = console.error
  console.error = (...args: unknown[]) => {
    if (
      args.some(
        (arg) =>
          typeof arg === 'string' && arg.includes('Encountered a script tag'),
      )
    ) {
      return
    }
    orig.apply(console, args)
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="tawny-theme"
    >
      {children}
    </NextThemesProvider>
  )
}
