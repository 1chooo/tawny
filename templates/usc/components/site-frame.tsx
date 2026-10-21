"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { UscWordmark } from "@/components/marks";

const links = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Research" },
  { href: "/students", label: "Students" },
  { href: "/teaching", label: "Teaching" },
  { href: "/publications", label: "Publications" },
];

const pages: Record<string, { title: string; subtitles?: string[] }> = {
  "/": {
    title: "Dr. Alexandra J. Martinez",
    subtitles: [
      "Professor, Biomedical Engineering",
      "Director of Neural Engineering Research Laboratory",
    ],
  },
  "/research": { title: "Research" },
  "/students": { title: "Students" },
  "/teaching": { title: "Teaching" },
  "/publications": { title: "List of Publications" },
};

function SiteNav({ label }: { label: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap items-center justify-start gap-x-1 md:justify-end">
        {links.map((link, index) => {
          const active = pathname === link.href;
          return (
            <li key={link.href} className="flex items-center">
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-10 items-center px-2 text-sm font-bold text-[#EEEEEE] hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFCC00] ${
                  active ? "underline" : ""
                }`}
              >
                {link.label}
              </Link>
              {index < links.length - 1 ? (
                <span aria-hidden="true" className="text-[#EEEEEE]">
                  |
                </span>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function SiteFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const page = pages[pathname] ?? { title: "University of Southern California" };

  return (
    <div className="flex min-h-dvh flex-1 flex-col bg-[#333333] text-black">
      <div className="mx-auto mt-[5px] mb-4 flex w-[min(1100px,calc(100%-1rem))] flex-1 flex-col border border-black bg-[#EEEEEE]">
        <header className="shrink-0 border-b border-black bg-[#990000] pb-2">
          <div className="flex items-center justify-between gap-4 px-4 pt-4">
            <p className="text-sm font-bold text-[#FFCC00] sm:text-base">
              University of Southern California
            </p>
            <a
              href="https://www.usc.edu/"
              aria-label="USC"
              className="inline-flex shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFCC00]"
            >
              <UscWordmark />
            </a>
          </div>
          <div className="mt-3 flex flex-col gap-2 px-4 pb-2 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
              <h1 className="text-3xl leading-tight font-bold text-white md:text-4xl">{page.title}</h1>
              {page.subtitles?.map((subtitle) => (
                <p
                  key={subtitle}
                  className="mt-1 text-lg leading-snug font-bold text-white md:ml-3 md:text-2xl"
                >
                  {subtitle}
                </p>
              ))}
            </div>
            <SiteNav label="Primary" />
          </div>
        </header>
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
        <footer className="mt-auto shrink-0 border-t border-black bg-[#990000] px-4 py-2">
          <SiteNav label="Footer" />
        </footer>
      </div>
    </div>
  );
}
