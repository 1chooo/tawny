'use client'

import { useDevTheme, type DevTheme } from '@/components/dev/dev-theme-provider'
import clsx from 'clsx'

function ThemeOption({
  value,
  active,
  onSelect,
}: {
  value: DevTheme
  active: boolean
  onSelect: (theme: DevTheme) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={clsx(
        'px-2 py-0.5 text-sm transition-colors',
        active
          ? 'font-extrabold text-foreground'
          : 'font-normal text-muted hover:text-foreground',
      )}
      aria-pressed={active}
    >
      {value}
    </button>
  )
}

export function DevThemeToggle() {
  const { theme, setTheme } = useDevTheme()

  return (
    <div
      role="group"
      aria-label="Theme"
      className="inline-flex items-center rounded-md border border-[color-mix(in_srgb,var(--foreground)_22%,transparent)] font-mono"
    >
      <ThemeOption value="light" active={theme === 'light'} onSelect={setTheme} />
      <span
        aria-hidden="true"
        className="select-none text-muted"
      >
        |
      </span>
      <ThemeOption value="dark" active={theme === 'dark'} onSelect={setTheme} />
    </div>
  )
}
