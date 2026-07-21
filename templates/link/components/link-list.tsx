import { links } from "@/lib/links";
import { LinkButton } from "@/components/link-button";

export function LinkList() {
  return (
    <nav className="mx-auto mt-6 block w-full max-w-168.75" aria-label="Social links">
      {links.map((link) => (
        <LinkButton key={link.url} link={link} />
      ))}
    </nav>
  );
}
