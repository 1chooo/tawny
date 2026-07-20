import { Analytics } from '@vercel/analytics/next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { SiteChrome } from '@/components/site-chrome'
import './globals.css'

const _geistSans = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })
const _instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Tawny — Web Designs & UI Components',
  description:
    'Beautiful, ready-to-use web designs and UI components crafted for your next project. Free and premium templates available.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background dark">
      <body className="antialiased font-sans min-h-screen flex flex-col">
        <SiteChrome>{children}</SiteChrome>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
