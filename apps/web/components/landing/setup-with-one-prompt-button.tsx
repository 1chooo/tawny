'use client'

import { useState } from 'react'
import { Check, Sparkles } from 'lucide-react'
import { cn } from '@tawny/ui/lib/utils'
import { buildSetupPrompt } from '@/lib/setup-prompt'

type SetupWithOnePromptButtonProps = {
  designId: string
  title: string
  className?: string
}

/**
 * Copies an agent prompt that scaffolds this design via create-tawny --yes.
 */
export function SetupWithOnePromptButton({
  designId,
  title,
  className,
}: SetupWithOnePromptButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    const origin = window.location.origin
    const prompt = buildSetupPrompt({ id: designId, title }, origin)
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-border hover:bg-muted hover:text-foreground',
        className,
      )}
      aria-label={
        copied
          ? 'Copied setup prompt'
          : 'Copy a setup prompt for a coding agent'
      }
    >
      {copied ? (
        <>
          <Check size={14} aria-hidden="true" />
          Copied
        </>
      ) : (
        <>
          <Sparkles size={14} aria-hidden="true" />
          Setup with one prompt
        </>
      )}
    </button>
  )
}
