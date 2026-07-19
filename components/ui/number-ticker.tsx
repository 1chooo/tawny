'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring, animate } from 'motion/react'
import { cn } from '@/lib/utils'

interface NumberTickerProps {
  value: number
  /** Prefix string, e.g. "$" */
  prefix?: string
  /** Suffix string, e.g. "+" or "k+" */
  suffix?: string
  className?: string
  delay?: number
  decimalPlaces?: number
}

export function NumberTicker({
  value,
  prefix = '',
  suffix = '',
  className,
  delay = 0,
  decimalPlaces = 0,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 })
  const isInView = useInView(ref, { once: true, margin: '0px' })

  useEffect(() => {
    if (!isInView) return
    const timer = setTimeout(() => {
      animate(motionValue, value, { duration: 1.2, ease: 'easeOut' })
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [isInView, value, delay, motionValue])

  useEffect(() => {
    return springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent =
          prefix +
          Intl.NumberFormat('en-US', {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
          }).format(Number(latest.toFixed(decimalPlaces))) +
          suffix
      }
    })
  }, [springValue, prefix, suffix, decimalPlaces])

  return (
    <span
      ref={ref}
      className={cn('inline-block tabular-nums tracking-tight', className)}
    >
      {prefix}0{suffix}
    </span>
  )
}
