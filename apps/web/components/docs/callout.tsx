import type { ReactNode } from 'react'
import { Info, Lightbulb, TriangleAlert } from 'lucide-react'
import { cn } from '@tawny/ui/lib/utils'

const calloutConfig = {
  note: {
    icon: Info,
    className: 'border-white/10 bg-white/3',
    iconClassName: 'text-muted-foreground',
  },
  tip: {
    icon: Lightbulb,
    className: 'border-tawny/30 bg-tawny/5',
    iconClassName: 'text-tawny',
  },
  warning: {
    icon: TriangleAlert,
    className: 'border-red-500/30 bg-red-500/5',
    iconClassName: 'text-red-400',
  },
} as const

export type CalloutType = keyof typeof calloutConfig

export function Callout({
  type = 'note',
  title,
  children,
  className,
}: {
  type?: CalloutType
  title?: string
  children: ReactNode
  className?: string
}) {
  const config = calloutConfig[type] ?? calloutConfig.note
  const Icon = config.icon

  return (
    <aside
      className={cn(
        'mt-6 flex gap-3 rounded-lg border px-4 py-3.5',
        config.className,
        className,
      )}
    >
      <Icon
        className={cn('mt-0.5 size-4 shrink-0', config.iconClassName)}
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        {title ? (
          <p className="mb-1 text-sm font-semibold text-foreground">{title}</p>
        ) : null}
        <div className="text-sm leading-relaxed text-muted-foreground [&>p:last-child]:mb-0 [&>p]:mb-2">
          {children}
        </div>
      </div>
    </aside>
  )
}
