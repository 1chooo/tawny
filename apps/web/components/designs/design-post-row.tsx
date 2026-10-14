import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { DesignPreviewFrame } from '@/components/designs/design-preview-frame'
import type { Design } from '@/lib/data'

/** Index row: live cover beside the catalog copy. The preview stays outside the links. */
export function DesignPostRow({ design }: { design: Design }) {
  const tags = design.tags.join(' · ')

  const copy = (
    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
      <p className="text-sm text-muted-foreground">{design.category}</p>
      <h3 className="text-balance text-lg font-semibold leading-snug tracking-tight text-foreground">
        <Link
          href={design.demoPath}
          className="transition-colors hover:text-tawny"
        >
          {design.title}
        </Link>
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {design.description}
      </p>
      <p className="text-sm text-muted-foreground">{tags}</p>
      <Link
        href={design.demoPath}
        className="mt-2 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-tawny transition-opacity hover:opacity-80"
      >
        Open live demo
        <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
      </Link>
    </div>
  )

  return (
    <li className="border-t border-border py-5 first:border-t-0 md:py-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
        <DesignPreviewFrame
          id={design.id}
          className="w-full shrink-0 overflow-hidden rounded-xs border border-border md:w-80"
        />
        {copy}
      </div>
    </li>
  )
}
