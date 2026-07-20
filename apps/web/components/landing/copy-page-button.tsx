'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@tawny/ui/lib/utils'

type SourceSnippet = {
  file: string
  code: string
  language: string
}

type CopyPageButtonProps = {
  title: string
  description: string
  longDescription: string[]
  packageName: string
  installCommands: { label: string; code: string }[]
  sources: SourceSnippet[]
  className?: string
}

function buildMarkdown({
  title,
  description,
  longDescription,
  packageName,
  installCommands,
  sources,
}: Omit<CopyPageButtonProps, 'className'>) {
  const lines: string[] = [
    `# ${title}`,
    '',
    description,
    '',
    ...longDescription.flatMap((p) => [p, '']),
    '## Get the template',
    '',
    `Package: \`${packageName}\``,
    '',
    ...installCommands.flatMap((cmd) => [
      `### ${cmd.label}`,
      '',
      '```bash',
      cmd.code,
      '```',
      '',
    ]),
    '## Template source',
    '',
    ...sources.flatMap((src) => [
      `### \`${src.file}\``,
      '',
      `\`\`\`${src.language}`,
      src.code.trimEnd(),
      '```',
      '',
    ]),
  ]

  return lines.join('\n').trim() + '\n'
}

/**
 * Copies a markdown version of the design demo page for pasting into an LLM.
 */
export function CopyPageButton({
  title,
  description,
  longDescription,
  packageName,
  installCommands,
  sources,
  className,
}: CopyPageButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    const markdown = buildMarkdown({
      title,
      description,
      longDescription,
      packageName,
      installCommands,
      sources,
    })
    try {
      await navigator.clipboard.writeText(markdown)
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
        'inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/8 bg-white/3 px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-white/15 hover:text-foreground',
        className,
      )}
      aria-label={copied ? 'Copied page as markdown' : 'Copy page as markdown'}
    >
      {copied ? (
        <>
          <Check size={14} aria-hidden="true" />
          Copied
        </>
      ) : (
        <>
          <Copy size={14} aria-hidden="true" />
          Copy page
        </>
      )}
    </button>
  )
}
