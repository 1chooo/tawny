'use client'

import { Moon, Sun } from 'lucide-react'
import { useDevTheme } from '@/components/dev/dev-theme-provider'

export function DevThemeToggle() {
  const { theme, toggleTheme } = useDevTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex size-8 items-center justify-center rounded-md text-[var(--muted)] transition-colors hover:bg-[color-mix(in_srgb,var(--foreground)_8%,transparent)] hover:text-[var(--foreground)]"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? (
        <Sun size={16} aria-hidden="true" />
      ) : (
        <Moon size={16} aria-hidden="true" />
      )}
    </button>
  )
}
