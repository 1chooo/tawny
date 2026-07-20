'use client'

import { motion, useInView, type Variants } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { cn } from '../lib/utils'

interface BlurFadeProps {
  children: ReactNode
  className?: string
  /** Delay in seconds before the animation starts */
  delay?: number
  /** Duration in seconds */
  duration?: number
  /** Y-axis offset to animate from (px) */
  yOffset?: number
  /** Whether to only animate once when entering the viewport */
  inView?: boolean
  /** Margin for IntersectionObserver */
  inViewMargin?: string
  blur?: string
}

const blurFadeVariants: Variants = {
  hidden: ({ yOffset, blur }: { yOffset: number; blur: string }) => ({
    y: yOffset,
    opacity: 0,
    filter: `blur(${blur})`,
  }),
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
  },
}

export function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.4,
  yOffset = 6,
  inView: useInViewProp = false,
  inViewMargin = '-50px',
  blur = '6px',
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: inViewMargin as `${number}px` })

  const shouldAnimate = useInViewProp ? isInView : true

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={shouldAnimate ? 'visible' : 'hidden'}
      variants={blurFadeVariants}
      custom={{ yOffset, blur }}
      transition={{ delay, duration, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}
