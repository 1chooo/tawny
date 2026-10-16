"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { VcardLink } from "@/components/link";

const LINKS = [
  { href: "/", label: "About", match: "exact" },
  { href: "/resume", label: "Resume", match: "prefix" },
  { href: "/project", label: "Project", match: "prefix" },
  { href: "/blog", label: "Blog", match: "prefix" },
] as const;

export function VcardNav() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <nav className="vcard-nav" aria-label="Sections">
      <ul className="vcard-nav-list">
        {LINKS.map((link) => {
          const isActive =
            link.match === "exact"
              ? pathname === "/"
              : pathname === link.href || pathname.startsWith(`${link.href}/`);
          const isHovered = hovered === link.href;
          return (
            <li key={link.href}>
              <VcardLink
                href={link.href}
                className={isActive ? "is-active" : undefined}
                aria-current={isActive ? "page" : undefined}
                onMouseEnter={() => setHovered(link.href)}
                onMouseLeave={() => setHovered(null)}
              >
                {isHovered ? (
                  <span className="vcard-nav-hover" aria-hidden="true" />
                ) : null}
                {link.label}
                {isActive ? (
                  <span className="vcard-nav-line" aria-hidden="true" />
                ) : null}
                {isHovered && !isActive ? (
                  <span className="vcard-nav-hover-line" aria-hidden="true" />
                ) : null}
              </VcardLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
