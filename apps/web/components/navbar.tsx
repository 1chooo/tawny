'use client'

import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  type RefObject,
} from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@tawny/ui/lib/utils'

const navLinks = [
  { label: 'Designs', href: '/designs' },
  { label: 'Components', href: '/components' },
  { label: 'Writeups', href: '/writeups' },
]

/** Gap kept between side chrome and the centered nav band. */
const NAV_SIDE_GAP = 16

function isNavActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

/**
 * Reserve equal side gutters from the wider chrome cluster so the nav band
 * stays mathematically centered:
 *   side = max(left, right) + gap
 *   navWidth = total − 2 × side
 */
function useCenteredNavSidePad(
  barRef: RefObject<HTMLElement | null>,
  leftRef: RefObject<HTMLElement | null>,
  rightRef: RefObject<HTMLElement | null>,
) {
  const [sidePad, setSidePad] = useState(0)

  useLayoutEffect(() => {
    const bar = barRef.current
    const left = leftRef.current
    const right = rightRef.current
    if (!bar || !left || !right) return

    const update = () => {
      const barRect = bar.getBoundingClientRect()
      const leftRect = left.getBoundingClientRect()
      const rightRect = right.getBoundingClientRect()
      // Desktop right cluster is `display: none` below md — zero boxes would
      // blow out the gutter math, so wait until both clusters are laid out.
      if (leftRect.width === 0 || rightRect.width === 0) return
      // Distance from bar edge to the inner edge of each cluster.
      const leftExtent = leftRect.right - barRect.left
      const rightExtent = barRect.right - rightRect.left
      setSidePad(Math.max(leftExtent, rightExtent) + NAV_SIDE_GAP)
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(bar)
    ro.observe(left)
    ro.observe(right)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [barRef, leftRef, rightRef])

  return sidePad
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const barRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLAnchorElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const sidePad = useCenteredNavSidePad(barRef, leftRef, rightRef)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-sm'
          : // Mobile always gets a subtle scrim so the logo/links stay readable over the hero;
            // desktop stays fully transparent until scroll.
            'bg-background/35 backdrop-blur-md border-b border-border/60 md:bg-transparent md:backdrop-blur-none md:border-transparent'
      )}
    >
      <div
        ref={barRef}
        className="relative mx-auto flex h-14 max-w-340 items-center px-6"
      >
        {/* Logo */}
        <Link
          ref={leftRef}
          href="/"
          className="relative z-10 flex items-center gap-2.5 group"
          aria-label="Tawny home"
        >
          <Logo className="size-8 rounded-md group-hover:opacity-80 transition-opacity" />
          <span className="font-serif text-xl italic tracking-tight text-foreground">Tawny</span>
        </Link>

        {/* Desktop nav — band width = total − 2 × max(left, right) */}
        <nav
          className="pointer-events-none absolute inset-y-0 hidden items-center justify-center md:flex"
          style={{ left: sidePad, right: sidePad }}
          aria-label="Main navigation"
        >
          <div className="pointer-events-auto flex min-w-0 items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-1.5 rounded-md text-sm transition-colors',
                  isNavActive(pathname, link.href)
                    ? 'text-foreground bg-muted'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* CTA + theme */}
        <div
          ref={rightRef}
          className="relative z-10 ml-auto hidden items-center gap-2 md:flex"
        >
          <ThemeToggle />
          <Link
            href="/designs"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-85 transition-opacity"
          >
            Browse designs
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="relative z-10 ml-auto flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-6 pb-5 pt-2 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-3 py-2 rounded-md text-sm transition-colors',
                isNavActive(pathname, link.href)
                  ? 'text-foreground bg-muted'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 pt-3 border-t border-border">
            <Link
              href="/designs"
              className="flex items-center justify-center px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-85 transition-opacity"
            >
              Browse designs
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
