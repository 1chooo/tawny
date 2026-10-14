import type { Metadata } from 'next'
import { Inter, Oswald } from 'next/font/google'
import { site } from '@/lib/content'
import './globals.css'

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-ocean-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-ocean-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.hero.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable}`}
      style={{ colorScheme: 'only dark' }}
    >
      <body>{children}</body>
    </html>
  )
}
