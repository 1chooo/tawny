import { Archivo, Fraunces, Inter } from 'next/font/google'

export const valeHero = Fraunces({
  subsets: ['latin'],
  weight: 'variable',
  display: 'swap',
  variable: '--font-vale-hero',
  axes: ['SOFT', 'WONK', 'opsz'],
})

export const valeHeading = Archivo({
  subsets: ['latin'],
  weight: 'variable',
  display: 'swap',
  variable: '--font-vale-heading',
  axes: ['wdth'],
})

export const valeUi = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-vale-ui',
})

export const valeFontClassName = [
  valeHero.variable,
  valeHeading.variable,
  valeUi.variable,
  valeUi.className,
].join(' ')
