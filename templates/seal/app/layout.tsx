import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Source_Serif_4 } from 'next/font/google'
import { NoiseTexture } from '@/components/noise-texture'
import { site } from '@/lib/content'
import './globals.css'

const display = localFont({
  src: '../fonts/noto-serif-tc-subset.woff2',
  display: 'swap',
  preload: false,
  weight: '200 900',
  variable: '--font-seal-display',
  adjustFontFallback: false,
})

const body = Source_Serif_4({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-seal-body',
})

export const metadata: Metadata = {
  title: `${site.name} — editorial studio`,
  description: site.hero.body,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className={`${body.className} seal`}>
        <NoiseTexture />
        {children}
      </body>
    </html>
  )
}
