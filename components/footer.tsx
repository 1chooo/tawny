import Link from 'next/link'
import { Logo } from '@/components/logo'

const links = {
  Product: [
    { label: 'Designs', href: '/designs' },
    { label: 'Components', href: '/components' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Changelog', href: '#' },
  ],
  Resources: [
    { label: 'Documentation', href: '#' },
    { label: 'Figma Files', href: '#' },
    { label: 'Logos & Marks', href: '/logos-marks' },
    { label: 'License', href: '#' },
    { label: 'FAQ', href: '#' },
  ],
  Connect: [
    { label: 'Twitter / X', href: '#' },
    { label: 'GitHub', href: '#' },
    { label: 'Dribbble', href: '#' },
    { label: 'Email', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-background px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="mb-4 flex items-center gap-2">
              <Logo className="size-6 rounded-[5px]" />
              <span className="text-sm font-medium text-foreground tracking-tight">Tawny</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Handcrafted web designs and UI components for developers and designers who care about quality.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {Object.entries(links).map(([group, items]) => (
              <div key={group}>
                <p className="mb-3 text-xs font-medium text-foreground uppercase tracking-widest">{group}</p>
                <ul className="flex flex-col gap-2">
                  {items.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Tawny. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
