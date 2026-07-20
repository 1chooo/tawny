import type { Metadata } from 'next'
import { DM_Sans, JetBrains_Mono, Playfair_Display } from 'next/font/google'

const display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-art-serif-display',
})

const sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-art-sans-body',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-art-mono',
})

export const metadata: Metadata = {
  title: 'Art — Live Design Demo',
  description:
    'Interactive showcase of the Art bento journal design, hosted inside Tawny.',
}

export default function ArtShowcaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={`art-root ${display.variable} ${sans.variable} ${mono.variable} ${sans.className} bg-black text-art-bento-ink min-h-[70vh] font-(family-name:--font-art-sans-body) antialiased`}
    >
      {children}
    </div>
  )
}
