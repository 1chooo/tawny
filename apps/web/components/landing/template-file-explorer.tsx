'use client'

import { useMemo, useState } from 'react'
import { Check, ChevronDown, ChevronRight, Copy, File, Folder } from 'lucide-react'
import { cn } from '@tawny/ui/lib/utils'
import type { TemplateFileContent, TemplateFileNode } from '@/lib/template-tree'

type TemplateFileExplorerProps = {
  /** Shown above the tree, e.g. `templates/dev` */
  rootLabel: string
  tree: TemplateFileNode[]
  files: Record<string, TemplateFileContent>
  className?: string
}

function findFirstFile(nodes: TemplateFileNode[]): string | undefined {
  for (const node of nodes) {
    if (node.type === 'file') return node.path
    const found = findFirstFile(node.children)
    if (found) return found
  }
  return undefined
}

function ancestorDirs(filePath: string): string[] {
  const parts = filePath.split('/')
  parts.pop()
  const dirs: string[] = []
  for (let i = 0; i < parts.length; i++) {
    dirs.push(parts.slice(0, i + 1).join('/'))
  }
  return dirs
}

/**
 * shadcn/ui-blocks-style "Code" tab: a file-tree sidebar plus a syntax
 * highlighted code panel for browsing a full template directory.
 */
export function TemplateFileExplorer({
  rootLabel,
  tree,
  files,
  className,
}: TemplateFileExplorerProps) {
  const defaultPath = useMemo(
    () => (files['README.md'] ? 'README.md' : findFirstFile(tree) ?? ''),
    [tree, files],
  )
  const [selected, setSelected] = useState(defaultPath)
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(ancestorDirs(defaultPath)),
  )
  const [copied, setCopied] = useState(false)

  function toggleDir(dirPath: string) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(dirPath)) next.delete(dirPath)
      else next.add(dirPath)
      return next
    })
  }

  function selectFile(filePath: string) {
    setSelected(filePath)
    setExpanded((prev) => new Set([...prev, ...ancestorDirs(filePath)]))
  }

  async function handleCopy() {
    const code = files[selected]?.code
    if (!code) return
    try {
      await navigator.clipboard.writeText(code.trim())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  const active = files[selected]

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-xl border border-white/8 bg-[#0d1117] md:flex-row',
        className,
      )}
    >
      <div className="shrink-0 overflow-y-auto border-b border-white/8 p-2 md:max-h-128 md:w-56 md:border-b-0 md:border-r md:p-3">
        <p className="mb-1.5 truncate px-1.5 font-mono text-[11px] text-muted-foreground/70">
          {rootLabel}
        </p>
        <FileTree
          nodes={tree}
          depth={0}
          selected={selected}
          expanded={expanded}
          onToggleDir={toggleDir}
          onSelectFile={selectFile}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5">
          <span className="truncate font-mono text-[11px] text-muted-foreground">
            {selected || 'Select a file'}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            disabled={!active}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground disabled:opacity-40"
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
            'max-h-128 overflow-auto p-4 text-[13px] leading-relaxed',
            '[&_pre]:m-0! [&_pre]:bg-transparent! [&_pre]:p-0!',
            '[&_code]:font-mono [&_code]:text-[13px] [&_code]:leading-relaxed',
          )}
          dangerouslySetInnerHTML={{ __html: active?.html ?? '' }}
        />
      </div>
    </div>
  )
}

type FileTreeProps = {
  nodes: TemplateFileNode[]
  depth: number
  selected: string
  expanded: Set<string>
  onToggleDir: (path: string) => void
  onSelectFile: (path: string) => void
}

function FileTree({
  nodes,
  depth,
  selected,
  expanded,
  onToggleDir,
  onSelectFile,
}: FileTreeProps) {
  return (
    <ul className="flex flex-col gap-0.5">
      {nodes.map((node) => (
        <li key={node.path}>
          {node.type === 'dir' ? (
            <>
              <button
                type="button"
                onClick={() => onToggleDir(node.path)}
                className="flex w-full items-center gap-1.5 rounded-md px-1.5 py-1 text-left text-[13px] text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                style={{ paddingLeft: `${depth * 14 + 6}px` }}
              >
                {expanded.has(node.path) ? (
                  <ChevronDown className="size-3.5 shrink-0" aria-hidden />
                ) : (
                  <ChevronRight className="size-3.5 shrink-0" aria-hidden />
                )}
                <Folder className="size-3.5 shrink-0" aria-hidden />
                <span className="truncate">{node.name}</span>
              </button>
              {expanded.has(node.path) && (
                <FileTree
                  nodes={node.children}
                  depth={depth + 1}
                  selected={selected}
                  expanded={expanded}
                  onToggleDir={onToggleDir}
                  onSelectFile={onSelectFile}
                />
              )}
            </>
          ) : (
            <button
              type="button"
              onClick={() => onSelectFile(node.path)}
              className={cn(
                'flex w-full items-center gap-1.5 rounded-md px-1.5 py-1 text-left text-[13px] transition-colors',
                selected === node.path
                  ? 'bg-white/8 text-foreground'
                  : 'text-muted-foreground hover:bg-white/5 hover:text-foreground',
              )}
              style={{ paddingLeft: `${depth * 14 + 24}px` }}
            >
              <File className="size-3.5 shrink-0" aria-hidden />
              <span className="truncate">{node.name}</span>
            </button>
          )}
        </li>
      ))}
    </ul>
  )
}
