import type { LinkItem } from "@/lib/links";
import { Icon } from "@/components/icon";

export function LinkButton({ link }: { link: LinkItem }) {
  return (
    <a
      className="font-link-serif relative mb-2.5 block rounded-(--radius) border border-border bg-card px-4 py-3 text-center text-[0.9375rem] leading-[1.45] font-normal text-card-foreground no-underline shadow-[0_1px_2px_rgba(46,49,53,0.04)] transition-[background-color,color,border-color,box-shadow] duration-150 ease-in [-webkit-tap-highlight-color:transparent] hover:border-rurikon-200 hover:bg-secondary hover:text-secondary-foreground hover:shadow-[0_2px_8px_rgba(46,49,53,0.08)] active:bg-muted active:text-primary"
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon
        name={link.icon}
        className="mr-[0.35rem] inline-block size-[1em] align-middle"
      />
      {link.label}
    </a>
  );
}
