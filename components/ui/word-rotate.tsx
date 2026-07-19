'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface WordRotateProps {
  words: string[]
  className?: string
  duration?: number
  motionProps?: React.ComponentProps<typeof motion.h1>
}

export function WordRotate({
  words,
  className,
  duration = 2800,
  motionProps,
}: WordRotateProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % words.length)
    }, duration)
    return () => clearInterval(interval)
  }, [words.length, duration])

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={words[index]}
        className={cn('inline-block', className)}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        {...motionProps}
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>
  )
}
