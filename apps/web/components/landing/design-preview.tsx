import {
  DM_Sans,
  Inter,
  JetBrains_Mono,
  Lora,
  Oswald,
  Playfair_Display,
  Roboto,
  Roboto_Mono,
  Source_Sans_3,
  Space_Grotesk,
} from 'next/font/google'
import { ArtPreviewMock } from '@/components/landing/art-preview-mock'
import { DevPreviewMock } from '@/components/landing/dev-preview-mock'
import { LinkPreviewMock } from '@/components/landing/link-preview-mock'
import { OceanPreviewMock } from '@/components/landing/ocean-preview-mock'
import { VcardPreviewMock } from '@/components/landing/vcard-preview-mock'
import { CobaltPreviewMock } from '@/components/landing/cobalt-preview-mock'
import { AtelierPreviewMock } from '@/components/landing/atelier-preview-mock'
import { AdminPreviewMock } from '@/components/landing/admin-preview-mock'
import { DeskPreviewMock } from '@/components/landing/desk-preview-mock'
import { USCPreviewMock } from '@/components/landing/usc-preview-mock'
import { SealPreviewMock } from '@/components/landing/seal-preview-mock'
import { IssueListDemo } from '@/components/landing/showcases/issue-list-demo'
import { cn } from '@tawny/ui/lib/utils'
import { sealBody, sealDisplay } from '@/lib/seal/fonts'

const artDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-art-serif-display',
})

const artSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-art-sans-body',
})

const artMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-art-mono',
})

const devMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-dev-mono',
})

const linkSans = Inter({
  subsets: ['latin'],
  variable: '--font-link-sans',
})

const linkSerif = Lora({
  subsets: ['latin'],
  style: ['italic'],
  variable: '--font-link-serif',
})

const oceanDisplay = Oswald({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-ocean-display',
})

const oceanSans = Inter({
  subsets: ['latin'],
  variable: '--font-ocean-sans',
})

const vcardSans = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-vcard-sans',
  display: 'swap',
})

const cobaltDisplay = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-cobalt-display',
  display: 'swap',
})

const uscSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-usc-sans',
})

const vcardMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-vcard-mono',
  display: 'swap',
})

type DesignPreviewProps = {
  id: string
  className?: string
}

/**
 * Shared scaled design preview — same mocks as the landing showcase.
 * Fonts are loaded here so catalog cards and landing stay in sync.
 */
export function DesignPreview({ id, className }: DesignPreviewProps) {
  if (id === 'art') {
    return (
      <div
        className={cn(
          artDisplay.variable,
          artSans.variable,
          artMono.variable,
          artSans.className,
          'h-full font-(family-name:--font-art-sans-body)',
          className,
        )}
      >
        <ArtPreviewMock className="h-full" />
      </div>
    )
  }

  if (id === 'dev') {
    return (
      <div
        className={cn(
          devMono.variable,
          devMono.className,
          'h-full font-mono',
          className,
        )}
      >
        <DevPreviewMock className="h-full" />
      </div>
    )
  }

  if (id === 'link') {
    return (
      <div
        className={cn(
          linkSans.variable,
          linkSerif.variable,
          linkSans.className,
          'h-full',
          className,
        )}
      >
        <LinkPreviewMock className="h-full" />
      </div>
    )
  }

  if (id === 'ocean') {
    return (
      <div
        className={cn(
          oceanDisplay.variable,
          oceanSans.variable,
          'h-full',
          className,
        )}
      >
        <OceanPreviewMock className="h-full" />
      </div>
    )
  }

  if (id === 'board') {
    return (
      <div className={cn('h-full bg-background', className)}>
        <IssueListDemo />
      </div>
    )
  }

  if (id === 'vcard') {
    return (
      <div
        className={cn(
          vcardSans.variable,
          vcardMono.variable,
          vcardSans.className,
          'h-full',
          className,
        )}
      >
        <VcardPreviewMock className="h-full" />
      </div>
    )
  }

  if (id === 'cobalt') {
    return (
      <div
        className={cn(
          cobaltDisplay.variable,
          cobaltDisplay.className,
          'h-full',
          className,
        )}
      >
        <CobaltPreviewMock className="h-full" />
      </div>
    )
  }

  if (id === 'atelier') {
    return (
      <div className={cn('h-full font-sans', className)}>
        <AtelierPreviewMock className="h-full" />
      </div>
    )
  }

  if (id === 'admin') {
    return <AdminPreviewMock className={cn('h-full', className)} />
  }

  if (id === 'desk') {
    return <DeskPreviewMock className={cn('h-full', className)} />
  }

  if (id === 'usc') {
    return (
      <div className={cn(uscSans.variable, uscSans.className, 'h-full', className)}>
        <USCPreviewMock className="h-full" />
      </div>
    )
  }

  if (id === 'seal') {
    return (
      <div
        className={cn(
          sealDisplay.variable,
          sealBody.variable,
          sealBody.className,
          'h-full',
          className,
        )}
      >
        <SealPreviewMock className="h-full" />
      </div>
    )
  }

  return null
}

/**
 * Browser content fill behind the scaled mock.
 * Matches each design’s own canvas — not the Tawny page background —
 * so letterboxing doesn’t flash a fourth color between panel and mock.
 */
export function designPreviewBg(id: string) {
  if (id === 'art') return 'bg-black'
  if (id === 'dev') return 'bg-(--dev-background,#09090b)'
  if (id === 'link') return 'bg-[#fcfcfc]'
  if (id === 'ocean') return 'bg-[#020a14]'
  if (id === 'board') return 'bg-background'
  if (id === 'vcard') return 'bg-[#121212]'
  if (id === 'cobalt') return 'bg-[#efede8]'
  if (id === 'atelier') return 'bg-white'
  if (id === 'admin') return 'bg-[#efede8]'
  if (id === 'desk') return 'bg-[#f7f6f3]'
  if (id === 'usc') return 'bg-[#990000]'
  if (id === 'seal') return 'bg-[#f3efe6]'
  return 'bg-background'
}
