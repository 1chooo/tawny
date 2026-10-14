import Link from 'next/link'
import type { Design } from '@/lib/data'

/** Text row for the designs index — every catalog entry, including the pins. */
export function DesignPostRow({ design }: { design: Design }) {
  const tags = design.tags.join(' · ')

  return (
    <li className="border-t border-border first:border-t-0">
      <Link href={design.demoPath} className="group block py-5 md:py-6">
        <div className="flex flex-col gap-1.5 md:hidden">
          <p className="text-sm text-muted-foreground">{design.category}</p>
          <h3 className="text-balance text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-tawny">
            {design.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {design.description}
          </p>
          <p className="text-sm text-muted-foreground">{tags}</p>
        </div>

        <div className="hidden items-start gap-6 md:grid md:grid-cols-[7rem_minmax(0,1fr)]">
          <p className="pt-0.5 text-sm text-muted-foreground">{design.category}</p>
          <div className="min-w-0">
            <h3 className="text-balance text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-tawny">
              {design.title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {design.description}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{tags}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}
