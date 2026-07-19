import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ShimmerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  background?: string
}

export function ShimmerButton({
  children,
  className,
  shimmerColor = 'rgba(255,255,255,0.2)',
  shimmerSize = '0.05em',
  borderRadius = '100px',
  background = 'rgba(0,0,0,1)',
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      style={
        {
          '--shimmer-color': shimmerColor,
          '--shimmer-size': shimmerSize,
          '--border-radius': borderRadius,
          '--background': background,
          borderRadius,
        } as React.CSSProperties
      }
      className={cn(
        'group relative inline-flex items-center justify-center gap-2',
        'cursor-pointer overflow-hidden whitespace-nowrap',
        'px-6 py-3 text-sm font-medium text-white',
        'bg-[var(--background)]',
        'transition-all duration-300',
        // shimmer sweep
        'before:absolute before:inset-0 before:-translate-x-full',
        'before:bg-gradient-to-r before:from-transparent before:via-[var(--shimmer-color)] before:to-transparent',
        'before:transition-transform before:duration-700',
        'hover:before:translate-x-full before:skew-x-[-20deg]',
        // border ring
        'ring-1 ring-white/15 hover:ring-white/25',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
