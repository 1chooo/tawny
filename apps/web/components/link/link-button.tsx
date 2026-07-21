import type { LinkItem } from '@/lib/link/links'
import { LinkIcon } from '@/components/link/icon'

export function LinkButton({ link }: { link: LinkItem }) {
  return (
    <a
      className="font-link-serif relative mb-2.5 block rounded-(--radius) border border-[var(--link-border)] bg-[var(--link-card)] px-4 py-3 text-center text-[0.9375rem] leading-[1.45] font-normal text-[var(--link-card-foreground)] no-underline shadow-[0_1px_2px_rgba(46,49,53,0.04)] transition-[background-color,color,border-color,box-shadow] duration-150 ease-in [-webkit-tap-highlight-color:transparent] hover:border-[var(--link-rurikon-200)] hover:bg-[var(--link-secondary)] hover:text-[var(--link-secondary-foreground)] hover:shadow-[0_2px_8px_rgba(46,49,53,0.08)] active:bg-[var(--link-muted)] active:text-[var(--link-primary)]"
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <LinkIcon
        name={link.icon}
        className="mr-[0.35rem] inline-block size-[1em] align-middle"
      />
      {link.label}
    </a>
  )
}
