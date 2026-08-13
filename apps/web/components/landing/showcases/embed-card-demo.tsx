'use client'

import { useState } from 'react'
import { ThemedEmbedCard } from 'embed-card/next-themes'
import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'
import { cn } from '@tawny/ui/lib/utils'

const SAMPLES = [
  {
    id: 'youtube',
    label: 'YouTube',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: 'link',
    label: 'Link preview',
    url: 'https://1chooo.com',
  },
] as const

/**
 * Live EmbedCard playground — sample pills switch the URL.
 * Gallery cards wrap this in pointer-events-none so iframes cannot steal clicks.
 */
export function EmbedCardDemo({ className }: { className?: string }) {
  const [url, setUrl] = useState<string>(SAMPLES[0].url)

  return (
    <div className={cn('h-full', className)}>
      <ScaledDesignCanvas>
        <div className="flex h-full flex-col bg-background px-16 py-10">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {SAMPLES.map((sample) => {
              const selected = sample.url === url
              return (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => setUrl(sample.url)}
                  className={cn(
                    'rounded-full border px-3.5 py-1.5 text-sm transition-colors',
                    selected
                      ? 'border-tawny/40 bg-tawny/15 text-foreground'
                      : 'border-border bg-muted/40 text-muted-foreground hover:border-tawny/25 hover:text-foreground',
                  )}
                >
                  {sample.label}
                </button>
              )
            })}
          </div>
          <div className="min-h-0 flex-1">
            <ThemedEmbedCard url={url} ctaLabel="Visit site" />
          </div>
        </div>
      </ScaledDesignCanvas>
    </div>
  )
}
