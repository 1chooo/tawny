import Link from 'next/link'

/**
 * Discreet control on /view pages to return to the framed Tawny showcase.
 * Hidden in development so screenshot captures stay chrome-free.
 */
export function ViewBackLink({ href }: { href: string }) {
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <Link
      href={href}
      className="fixed bottom-4 right-4 z-50 rounded-full border border-white/15 bg-black/70 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md transition-colors hover:border-white/25 hover:text-white"
    >
      Back to Tawny
    </Link>
  )
}
