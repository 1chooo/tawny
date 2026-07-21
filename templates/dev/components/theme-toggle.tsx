"use client";

import { useTheme, type Theme } from "@/components/theme-provider";
import clsx from "clsx";

function ThemeOption({
  value,
  active,
  onSelect,
}: {
  value: Theme;
  active: boolean;
  onSelect: (theme: Theme) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={clsx(
        "px-2 py-0.5 text-sm transition-colors",
        active
          ? "font-extrabold text-[var(--foreground)]"
          : "font-normal text-[var(--muted)] hover:text-[var(--foreground)]",
      )}
      aria-pressed={active}
    >
      {value}
    </button>
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="group"
      aria-label="Theme"
      className="inline-flex items-center rounded-md border border-[color-mix(in_srgb,var(--foreground)_22%,transparent)] font-mono"
    >
      <ThemeOption value="light" active={theme === "light"} onSelect={setTheme} />
      <span aria-hidden="true" className="select-none text-[var(--muted)]">
        |
      </span>
      <ThemeOption value="dark" active={theme === "dark"} onSelect={setTheme} />
    </div>
  );
}
