import type { ReactNode } from 'react'

export function PageHeading({
  title,
  description,
  actions,
}: {
  title: string
  description: string
  actions?: ReactNode
}) {
  return (
    <div className="mb-4 space-y-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground @md:text-3xl">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      {actions ? <div className="flex flex-col gap-2 @sm:flex-row">{actions}</div> : null}
    </div>
  )
}

export const primaryButton =
  'h-9 rounded-lg bg-primary px-3 text-sm text-primary-foreground hover:bg-primary/90'
export const quietButton = 'h-9 rounded-lg border border-border bg-transparent px-3 text-sm text-foreground hover:bg-muted'
