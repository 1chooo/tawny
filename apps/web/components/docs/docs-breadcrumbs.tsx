import { Fragment } from 'react'
import Link from 'next/link'
import { cn } from '@tawny/ui/lib/utils'

export type DocsBreadcrumbItem = {
  label: string
  href?: string
}

export function DocsBreadcrumbs({
  items,
  className,
}: {
  items: DocsBreadcrumbItem[]
  className?: string
}) {
  if (items.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className={cn('mb-6', className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <Fragment key={`${item.label}-${index}`}>
              {index > 0 ? (
                <li aria-hidden="true" className="text-muted-foreground/40">
                  /
                </li>
              ) : null}
              <li>
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={cn(isLast && 'font-medium text-foreground')}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
