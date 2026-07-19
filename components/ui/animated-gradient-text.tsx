import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface AnimatedGradientTextProps {
  children: ReactNode
  className?: string
}

/**
 * Pill badge with an animated conic-gradient border and shimmer fill.
 */
export function AnimatedGradientText({ children, className }: AnimatedGradientTextProps) {
  return (
    <div
      className={cn(
        'group relative mx-auto flex max-w-fit cursor-default items-center justify-center',
        'rounded-full px-4 py-1.5 text-sm',
        'bg-background/80 backdrop-blur-sm',
        'shadow-[inset_0_-6px_10px_#ffffff1f]',
        'transition-shadow duration-500 ease-out',
        'hover:shadow-[inset_0_-6px_10px_#ffffff3f]',
        // animated border via background-clip trick
        'before:absolute before:inset-0 before:-z-10 before:rounded-full',
        'before:bg-[conic-gradient(from_var(--border-angle),transparent_25%,rgba(255,255,255,0.18)_50%,transparent_75%)]',
        '[--border-angle:0turn]',
        'before:animate-[border-beam_4s_linear_infinite]',
        className
      )}
    >
      <span
        className={cn(
          'inline-flex items-center gap-1.5',
          'bg-gradient-to-r from-white/90 via-white to-white/60 bg-clip-text text-transparent'
        )}
      >
        {children}
      </span>
    </div>
  )
}
