import localFont from 'next/font/local'
import { Source_Serif_4 } from 'next/font/google'

/** Variable Noto Serif TC, subset to `sealDisplayCharacters` in lib/seal/content.ts. */
export const sealDisplay = localFont({
  src: '../../fonts/noto-serif-tc-subset.woff2',
  display: 'swap',
  preload: false,
  weight: '200 900',
  variable: '--font-seal-display',
  adjustFontFallback: false,
  fallback: ['Songti TC', 'PMingLiU', 'serif'],
})

export const sealBody = Source_Serif_4({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-seal-body',
})
