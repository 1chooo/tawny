"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/lib/art/navigation";
import { artLocales } from "@/lib/art/routing";
import clsx from "clsx";

export function LocaleSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <div
      className="border-art-bento-ink flex gap-0 border-2 text-xs font-bold uppercase"
      role="group"
      aria-label="Language"
    >
      {artLocales.map((loc) => (
        <Link
          key={loc}
          href={pathname}
          locale={loc}
          className={clsx(
            "px-2 py-1 transition-colors",
            locale === loc
              ? "bg-art-bento-ink text-art-bento-bg"
              : "hover:bg-art-bento-ink/10 text-art-bento-ink",
          )}
        >
          {loc === "zh" ? "中" : "EN"}
        </Link>
      ))}
    </div>
  );
}
