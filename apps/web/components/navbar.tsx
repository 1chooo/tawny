'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/logo'
import { cn } from '@tawny/ui/lib/utils'

const navLinks = [
  { label: 'Designs', href: '/designs' },
  { label: 'Components', href: '/components' },
  { label: 'Pricing', href: '/pricing' },
]

function isNavActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

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
          ? 'bg-background/80 backdrop-blur-xl border-b border-white/8 shadow-[0_1px_0_rgba(255,255,255,0.04)]'
          : // Mobile always gets a subtle scrim so the logo/links stay readable over the hero;
            // desktop stays fully transparent until scroll.
            'bg-background/35 backdrop-blur-md border-b border-white/5 md:bg-transparent md:backdrop-blur-none md:border-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="Tawny home">
          <Logo className="size-8 rounded-md group-hover:opacity-80 transition-opacity" />
          <span className="font-serif text-xl italic tracking-tight text-foreground">Tawny</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-3 py-1.5 rounded-md text-sm transition-colors',
                isNavActive(pathname, link.href)
                  ? 'text-foreground bg-white/8'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-85 transition-opacity"
          >
            Get access
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-white/8 px-6 pb-5 pt-2 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-3 py-2 rounded-md text-sm transition-colors',
                isNavActive(pathname, link.href)
                  ? 'text-foreground bg-white/8'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 pt-3 border-t border-white/8">
            <Link
              href="/pricing"
              className="flex items-center justify-center px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-85 transition-opacity"
            >
              Get access
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
