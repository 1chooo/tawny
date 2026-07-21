'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type DevTheme = 'light' | 'dark'

const STORAGE_KEY = 'tawny-dev-theme'
const DEFAULT_THEME: DevTheme = 'dark'

type DevThemeContextValue = {
  theme: DevTheme
  setTheme: (theme: DevTheme) => void
  toggleTheme: () => void
}

const DevThemeContext = createContext<DevThemeContextValue | null>(null)

function readStoredTheme(): DevTheme {
  if (typeof window === 'undefined') return DEFAULT_THEME
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // ignore
  }
  return DEFAULT_THEME
}

export function DevThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<DevTheme>(DEFAULT_THEME)

  useEffect(() => {
    setThemeState(readStoredTheme())
  }, [])

  const setTheme = useCallback((next: DevTheme) => {
    setThemeState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [setTheme, theme])

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  )

  return (
    <DevThemeContext.Provider value={value}>{children}</DevThemeContext.Provider>
  )
}

export function useDevTheme() {
  const ctx = useContext(DevThemeContext)
  if (!ctx) {
    throw new Error('useDevTheme must be used within DevThemeProvider')
  }
  return ctx
}
