'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { ThemedEmbedCard } from 'embed-card/next-themes'
import { cn } from '@tawny/ui/lib/utils'

const SAMPLES = [
  {
    id: 'youtube',
    label: 'YouTube',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: 'x',
    label: 'X',
    url: 'https://x.com/1chooo___/status/2028573993972969585',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/p/DXKYttciGe7/',
  },
  {
    id: 'reddit',
    label: 'Reddit',
    url: 'https://www.reddit.com/r/github/comments/1j6jga7/i_rebuilt_my_personal_portfolio_using_nextjsits/',
  },
  {
    id: 'maps',
    label: 'Maps',
    url: 'https://www.google.com/maps?q=Tokyo+Station&output=embed',
  },
  {
    id: 'vimeo',
    label: 'Vimeo',
    url: 'https://vimeo.com/76979871',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    url: 'https://www.tiktok.com/@scout2015/video/6718335390845095173',
  },
  {
    id: 'link',
    label: 'Link',
    url: 'https://1chooo.com',
  },
] as const

type SampleId = (typeof SAMPLES)[number]['id']

/** Provider-specific stage so 9:16 / 1:1 embeds do not blow out the playground. */
const PREVIEW_STYLE: Record<SampleId, CSSProperties> = {
  youtube: { width: '100%' },
  vimeo: { width: '100%' },
  maps: { width: '100%' },
  x: { width: '100%', maxWidth: 440, marginInline: 'auto', maxHeight: 520 },
  reddit: { width: '100%', maxWidth: 560, marginInline: 'auto' },
  link: { width: '100%', maxWidth: 560, marginInline: 'auto' },
  instagram: {
    width: '100%',
    maxWidth: 328,
    marginInline: 'auto',
    minHeight: 0,
    maxHeight: 520,
  },
  tiktok: {
    width: '100%',
    maxWidth: 328,
    marginInline: 'auto',
    minHeight: 0,
    maxHeight: 'min(420px, 50dvh)',
  },
}

/**
 * Mount after hydration. next-themes + third-party iframes mismatch SSR HTML
 * (Tawny defaults to dark; ThemedEmbedCard's first paint is light).
 */
function ClientThemedEmbedCard({
  url,
  style,
}: {
  url: string
  style?: CSSProperties
}) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  if (!ready) {
    return (
      <div
        aria-hidden
        className="w-full rounded-xl bg-muted/50"
        style={{ aspectRatio: '16 / 9', minHeight: 180 }}
      />
    )
  }

  return (
    <ThemedEmbedCard
      key={url}
      url={url}
      ctaLabel="Visit site"
      style={style}
    />
  )
}

/**
 * 16:9 gallery / changelog crop — YouTube only, no scaled canvas.
 * Live iframes must not be CSS-scaled; tall providers would clip here.
 */
export function EmbedCardGalleryPreview({ className }: { className?: string }) {
  return (
    <div className={cn('h-full overflow-hidden bg-background', className)}>
      <ClientThemedEmbedCard url={SAMPLES[0].url} />
    </div>
  )
}

/**
 * Detail-page playground. Natural height (not a scaled 16:9 canvas) so each
 * provider can keep its own aspect ratio.
 */
export function EmbedCardDemo({ className }: { className?: string }) {
  const [url, setUrl] = useState<string>(SAMPLES[0].url)
  const sample = SAMPLES.find((item) => item.url === url) ?? SAMPLES[0]

  return (
    <div className={cn('flex flex-col bg-background', className)}>
      <div className="flex flex-wrap gap-1.5 border-b border-border px-4 py-3">
        {SAMPLES.map((item) => {
          const selected = item.url === url
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setUrl(item.url)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs transition-colors',
                selected
                  ? 'border-tawny/40 bg-tawny/15 text-foreground'
                  : 'border-border bg-muted/40 text-muted-foreground hover:border-tawny/25 hover:text-foreground',
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      <div className="flex justify-center px-4 py-6">
        <div className="w-full">
          <ClientThemedEmbedCard
            url={sample.url}
            style={PREVIEW_STYLE[sample.id]}
          />
        </div>
      </div>
    </div>
  )
}
