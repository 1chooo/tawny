'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

type CopyCodeBlockProps = {
  code: string
  title?: string
  language?: string
  className?: string
}

/**
 * Tawny-styled code panel with one-click clipboard copy.
 */
export function CopyCodeBlock({
  code,
  title,
  language = 'tsx',
  className,
}: CopyCodeBlockProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code.trim())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-white/8 bg-white/3',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5">
        <span className="truncate font-mono text-[11px] text-muted-foreground">
          {title ?? language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          aria-label={copied ? 'Copied' : 'Copy code'}
        >
          {copied ? (
            <>
              <Check className="size-3.5" aria-hidden />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-3.5" aria-hidden />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-foreground/85">
        <code>{code.trim()}</code>
      </pre>
    </div>
  )
}
