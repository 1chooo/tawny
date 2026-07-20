import type { MDXComponents } from 'mdx/types'
import type { ReactNode } from 'react'
import { codeToHtml } from 'shiki'
import clsx from 'clsx'
import { Link } from '@/lib/dev/navigation'
import { DomTreeExplorer } from '@/components/dev/demos/dom-tree-explorer'
import { EventPropagationDemo } from '@/components/dev/demos/event-propagation-demo'
import { CssLayoutDemo } from '@/components/dev/demos/css-layout-demo'
import { BellCurveDemo } from '@/components/dev/demos/bell-curve-demo'
import { TcpDemo } from '@/components/dev/demos/tcp-demo'
import { RestApiDemo } from '@/components/dev/demos/rest-api-demo'

function getHeadingId(children: ReactNode): string {
  const getText = (node: ReactNode): string => {
    if (typeof node === 'string') return node
    if (Array.isArray(node)) return node.map(getText).join('')
    if (node && typeof node === 'object' && 'props' in node) {
      const props = node.props as { children?: ReactNode }
      if (props.children) return getText(props.children)
    }
    return ''
  }

  return getText(children)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const linkClass =
  'break-words underline decoration-[var(--border)] underline-offset-2 hover:text-[var(--foreground)] hover:decoration-[var(--foreground)]'

export const devMdxComponents = {
  h1: (props: Record<string, unknown>) => (
    <h1
      className="mb-6 text-2xl font-extrabold leading-tight text-[var(--foreground)]"
      {...props}
    />
  ),
  h2: ({
    children,
    ...props
  }: {
    children?: ReactNode
    [key: string]: unknown
  }) => {
    const id = getHeadingId(children as ReactNode)
    return (
      <h2
        id={id}
        className="mt-8 mb-3 scroll-mt-24 text-lg font-extrabold text-[var(--foreground)]"
        {...props}
      >
        <a href={`#${id}`} className="no-underline hover:underline">
          {children as ReactNode}
        </a>
      </h2>
    )
  },
  h3: (props: Record<string, unknown>) => (
    <h3
      className="mt-6 mb-2 text-base font-bold text-[var(--foreground)]"
      {...props}
    />
  ),
  p: (props: Record<string, unknown>) => (
    <p className="mb-5 leading-relaxed" {...props} />
  ),
  ul: (props: Record<string, unknown>) => (
    <ul className="mb-5 list-disc space-y-2 pl-5 leading-relaxed" {...props} />
  ),
  ol: (props: Record<string, unknown>) => (
    <ol
      className="mb-5 list-decimal space-y-2 pl-5 leading-relaxed"
      {...props}
    />
  ),
  li: (props: Record<string, unknown>) => <li {...props} />,
  strong: (props: Record<string, unknown>) => (
    <strong className="font-bold text-[var(--foreground)]" {...props} />
  ),
  blockquote: (props: Record<string, unknown>) => (
    <blockquote
      className="my-6 border-l-2 border-[var(--border)] pl-4 italic"
      {...props}
    />
  ),
  hr: (props: Record<string, unknown>) => (
    <hr className="my-8 border-[var(--border)]" {...props} />
  ),
  table: (props: Record<string, unknown>) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props: Record<string, unknown>) => (
    <th
      className="border border-[var(--border)] px-3 py-2 text-left font-bold text-[var(--foreground)]"
      {...props}
    />
  ),
  td: (props: Record<string, unknown>) => (
    <td className="border border-[var(--border)] px-3 py-2" {...props} />
  ),
  a: ({ href, ...props }: { href?: string; [key: string]: unknown }) => {
    if (typeof href === 'string' && href.startsWith('#')) {
      return <a href={href} className={linkClass} {...props} />
    }
    if (typeof href === 'string' && href.startsWith('/')) {
      return <Link href={href} className={linkClass} {...props} />
    }
    return (
      <a
        href={href}
        className={linkClass}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    )
  },
  pre: (props: Record<string, unknown>) => (
    <pre
      className="my-6 overflow-x-auto rounded-md border border-[var(--border)] bg-[var(--code-bg)] p-4 text-xs leading-relaxed"
      {...props}
    />
  ),
  code: async (props: {
    children?: ReactNode
    className?: string
    [key: string]: unknown
  }) => {
    if (typeof props.children === 'string') {
      const classNames = props.className || ''
      const lang =
        classNames.split(' ').find((c) => c.startsWith('language-')) ||
        'language-text'

      const html = await codeToHtml(props.children, {
        lang: lang.replace('language-', ''),
        theme: 'github-light',
      })

      return (
        <code
          className={clsx('block text-xs', classNames)}
          dangerouslySetInnerHTML={{
            __html: html.replace(
              /^<pre[^>]*><code[^>]*>|<\/code><\/pre>$/g,
              '',
            ),
          }}
        />
      )
    }

    return (
      <code
        className="rounded bg-[var(--code-bg)] px-1.5 py-0.5 text-[0.875em]"
        {...props}
      />
    )
  },
  DomTreeExplorer,
  EventPropagationDemo,
  CssLayoutDemo,
  BellCurveDemo,
  TcpDemo,
  RestApiDemo,
} as MDXComponents
