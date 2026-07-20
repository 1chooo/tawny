'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@tawny/ui/lib/utils'

type CopyCodeBlockProps = {
  /** Plain source used for clipboard copy */
  code: string
  /** Shiki-highlighted HTML (`codeToHtml` output) */
  html: string
  title?: string
  language?: string
  className?: string
}

/**
 * Tawny-styled code panel with Shiki syntax colors and one-click copy.
 */
export function CopyCodeBlock({
  code,
  html,
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
        'overflow-hidden rounded-xl border border-white/8 bg-[#0d1117]',
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
      <div
        className={cn(
          'overflow-x-auto p-4 text-[13px] leading-relaxed',
          '[&_pre]:m-0! [&_pre]:bg-transparent! [&_pre]:p-0!',
          '[&_code]:font-mono [&_code]:text-[13px] [&_code]:leading-relaxed',
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
