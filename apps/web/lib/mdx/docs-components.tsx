import type { MDXComponents } from 'mdx/types'
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react'
import Link from 'next/link'
import { Callout } from '@/components/docs/callout'
import { slugifyHeading } from '@/lib/docs/toc'
import { highlightCode } from '@/lib/highlight-code'
import { cn } from '@tawny/ui/lib/utils'

function headingText(children: ReactNode): string {
  if (typeof children === 'string') return children
  if (typeof children === 'number') return String(children)
  if (Array.isArray(children)) return children.map(headingText).join('')
  return ''
}

function DocsHeading({
  as: Tag,
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'h2'> & {
  as: 'h2' | 'h3'
}) {
  const text = headingText(children)
  const id = props.id ?? (text ? slugifyHeading(text) : undefined)

  return (
    <Tag id={id} className={className} {...props}>
      {id ? (
        <a
          href={`#${id}`}
          className="text-inherit no-underline hover:text-tawny"
        >
          {children}
        </a>
      ) : (
        children
      )}
    </Tag>
  )
}

function getTextContent(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(getTextContent).join('')
  if (node && typeof node === 'object' && 'props' in node) {
    const el = node as ReactElement<{ children?: ReactNode }>
    return getTextContent(el.props.children)
  }
  return ''
}

function getCodeLanguage(node: ReactNode): string {
  if (!node || typeof node !== 'object' || !('props' in node)) return 'text'
  const el = node as ReactElement<{ className?: string; children?: ReactNode }>
  const className = el.props.className ?? ''
  const match = /language-([\w-]+)/.exec(className)
  if (match?.[1]) return match[1]
  if (Array.isArray(el.props.children)) {
    for (const child of el.props.children) {
      const lang = getCodeLanguage(child)
      if (lang !== 'text') return lang
    }
  }
  return 'text'
}

async function DocsPre({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'pre'>) {
  const code = getTextContent(children).replace(/\n$/, '')
  const language = getCodeLanguage(children)

  try {
    const html = await highlightCode(code, language)
    return (
      <div
        className={cn(
          'docs-code mt-6 overflow-x-auto rounded-lg border border-white/8 bg-white/3 [&_pre]:m-0 [&_pre]:bg-transparent! [&_pre]:p-4 [&_pre]:text-sm [&_pre]:leading-relaxed',
          className,
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  } catch {
    return (
      <pre
        className={cn(
          'mt-6 overflow-x-auto rounded-lg border border-white/8 bg-white/3 p-4 font-mono text-sm leading-relaxed',
          '[&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit',
          className,
        )}
        {...props}
      >
        {children}
      </pre>
    )
  }
}

/**
 * Docs MDX registry — tawny prose styles, anchors, callouts, Shiki code.
 */
export const docsMdxComponents: MDXComponents = {
  h1: (props: ComponentPropsWithoutRef<'h1'>) => (
    <h1
      className="mt-0 text-balance text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-4xl"
      {...props}
    />
  ),
  h2: (props: ComponentPropsWithoutRef<'h2'>) => (
    <DocsHeading
      as="h2"
      className="mt-12 scroll-mt-28 text-balance text-2xl font-semibold tracking-[-0.03em] text-foreground"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <DocsHeading
      as="h3"
      className="mt-8 scroll-mt-28 text-xl font-semibold tracking-tight text-foreground"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p className="mt-5 leading-relaxed text-muted-foreground" {...props} />
  ),
  a: ({ href = '#', ...props }: ComponentPropsWithoutRef<'a'>) => {
    const isExternal = href.startsWith('http')
    if (isExternal) {
      return (
        <a
          href={href}
          className="font-medium text-tawny underline decoration-tawny/30 underline-offset-4 transition-colors hover:decoration-tawny"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      )
    }
    return (
      <Link
        href={href}
        className="font-medium text-tawny underline decoration-tawny/30 underline-offset-4 transition-colors hover:decoration-tawny"
        {...props}
      />
    )
  },
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-6 leading-relaxed text-muted-foreground marker:text-tawny"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-6 leading-relaxed text-muted-foreground marker:text-tawny"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<'li'>) => (
    <li className="pl-1" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="mt-6 border-l-2 border-tawny/50 bg-white/3 py-3 pl-5 pr-4 text-lg italic text-foreground/90"
      {...props}
    />
  ),
  hr: (props: ComponentPropsWithoutRef<'hr'>) => (
    <hr className="my-10 border-white/8" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<'code'>) => (
    <code
      className="rounded bg-white/8 px-1.5 py-0.5 font-mono text-sm text-foreground"
      {...props}
    />
  ),
  pre: DocsPre,
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="mt-6 overflow-x-auto rounded-lg border border-white/8">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<'th'>) => (
    <th
      className="border-b border-white/8 bg-white/3 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<'td'>) => (
    <td
      className="border-b border-white/8 px-4 py-3 text-muted-foreground"
      {...props}
    />
  ),
  Callout,
}
