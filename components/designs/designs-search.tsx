'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useTransition,
} from 'react'
import { Search } from 'lucide-react'

type DesignsSearchProps = {
  initialQuery: string
}

/**
 * Debounced `?q=` updater — preserves other search params (e.g. category).
 */
export function DesignsSearch({ initialQuery }: DesignsSearchProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(initialQuery)
  const [prevQuery, setPrevQuery] = useState(initialQuery)
  const [, startTransition] = useTransition()
  const mounted = useRef(false)
  const spRef = useRef(searchParams)

  if (initialQuery !== prevQuery) {
    setPrevQuery(initialQuery)
    setValue(initialQuery)
  }

  useLayoutEffect(() => {
    spRef.current = searchParams
  }, [searchParams])

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    const id = window.setTimeout(() => {
      const next = new URLSearchParams(spRef.current.toString())
      const trimmed = value.trim()
      if (trimmed) next.set('q', trimmed)
      else next.delete('q')
      next.delete('page')
      const qs = next.toString()
      startTransition(() => {
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
      })
    }, 300)
    return () => window.clearTimeout(id)
  }, [value, pathname, router])

  return (
    <label className="relative block min-w-0 flex-1 sm:max-w-xs">
      <span className="sr-only">Search designs</span>
      <Search
        size={14}
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search designs…"
        autoComplete="off"
        spellCheck={false}
        className="w-full rounded-full border border-white/8 bg-white/3 py-2 pr-3 pl-9 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-white/20"
      />
    </label>
  )
}
