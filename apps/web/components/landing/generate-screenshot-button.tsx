'use client'

import { useState } from 'react'
import { Camera, Check, Loader2, X } from 'lucide-react'
import { cn } from '@tawny/ui/lib/utils'

type GenerateScreenshotButtonProps = {
  kind: 'design' | 'component'
  id: string
  path: string
  selector?: string
  /** Override the capture viewport — e.g. to match the narrower gallery card width. */
  viewport?: { width?: number; height?: number }
  className?: string
}

type Status =
  | { state: 'idle' }
  | { state: 'loading' }
  | { state: 'success'; sizeKB: number }
  | { state: 'error'; message: string }

/**
 * Dev-only tool that captures a real headless-browser screenshot of the live
 * preview and saves it as a compressed thumbnail under `public/thumbnails/`.
 */
export function GenerateScreenshotButton({
  kind,
  id,
  path,
  selector,
  viewport,
  className,
}: GenerateScreenshotButtonProps) {
  const [status, setStatus] = useState<Status>({ state: 'idle' })

  async function handleGenerate() {
    setStatus({ state: 'loading' })
    try {
      const res = await fetch('/api/dev/screenshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind, id, path, selector, viewport }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? 'Screenshot failed')
      }
      setStatus({ state: 'success', sizeKB: data.sizeKB })
      setTimeout(() => setStatus({ state: 'idle' }), 2500)
    } catch (error) {
      setStatus({
        state: 'error',
        message: error instanceof Error ? error.message : 'Screenshot failed',
      })
      setTimeout(() => setStatus({ state: 'idle' }), 3000)
    }
  }

  const isLoading = status.state === 'loading'

  return (
    <button
      type="button"
      onClick={handleGenerate}
      disabled={isLoading}
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/8 bg-white/3 px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-white/15 hover:text-foreground disabled:opacity-60',
        className,
      )}
      aria-label="Generate thumbnail screenshot"
    >
      {status.state === 'success' ? (
        <>
          <Check size={14} aria-hidden="true" />
          Saved ({status.sizeKB} KB)
        </>
      ) : status.state === 'error' ? (
        <>
          <X size={14} aria-hidden="true" />
          Failed
        </>
      ) : isLoading ? (
        <>
          <Loader2 size={14} className="animate-spin" aria-hidden="true" />
          Capturing…
        </>
      ) : (
        <>
          <Camera size={14} aria-hidden="true" />
          Generate screenshot
        </>
      )}
    </button>
  )
}
