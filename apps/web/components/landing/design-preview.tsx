import {
  DM_Sans,
  Inter,
  JetBrains_Mono,
  Lora,
  Playfair_Display,
} from 'next/font/google'
import { ArtPreviewMock } from '@/components/landing/art-preview-mock'
import { DevPreviewMock } from '@/components/landing/dev-preview-mock'
import { LinkPreviewMock } from '@/components/landing/link-preview-mock'
import { cn } from '@tawny/ui/lib/utils'

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

type DesignPreviewProps = {
  id: string
  className?: string
}

/**
 * Shared inert design preview — same mocks as the landing showcase.
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

  return null
}

/** Frame background for a design preview (art is black, others light). */
export function designPreviewBg(id: string) {
  if (id === 'art') return 'bg-black'
  if (id === 'link') return 'bg-[#fcfcfc]'
  return 'bg-white dark:bg-zinc-950'
}
