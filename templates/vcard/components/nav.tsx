"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#writing", label: "Writing" },
] as const;

export function VcardNav() {
  const [active, setActive] = useState<(typeof LINKS)[number]["href"]>("#about");
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash;
      if (LINKS.some((link) => link.href === hash)) {
        setActive(hash as (typeof LINKS)[number]["href"]);
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <nav className="vcard-nav" aria-label="Sections">
      <ul className="vcard-nav-list">
        {LINKS.map((link) => {
          const isActive = active === link.href;
          const isHovered = hovered === link.href;
          return (
            <li key={link.href}>
              <a
                href={link.href}
                className={isActive ? "is-active" : undefined}
                aria-current={isActive ? "location" : undefined}
                onClick={() => setActive(link.href)}
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
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
