'use client'

import { useEffect, useState } from 'react'
import { Pause, Play, Square } from 'lucide-react'
import { TIMER_START } from '@/lib/desk/model'

function formatUnit(value: number) {
  return String(value).padStart(2, '0')
}

export function TimeTracker({ live = true }: { live?: boolean }) {
  const [seconds, setSeconds] = useState(TIMER_START)
  const [running, setRunning] = useState(live)

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => {
      setSeconds((current) => current + 1)
    }, 1000)
    return () => window.clearInterval(id)
  }, [running])

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  return (
    <section className="relative overflow-hidden rounded-lg border border-primary bg-primary p-4 text-primary-foreground @md:p-5">
      <svg
        className="pointer-events-none absolute top-0 right-0 h-full w-40 opacity-30"
        viewBox="0 0 120 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 30 Q30 10 60 30 T120 30"
          fill="none"
          stroke="var(--tawny)"
          strokeWidth="2"
        />
        <path
          d="M0 70 Q30 50 60 70 T120 70"
          fill="none"
          stroke="var(--tawny)"
          strokeWidth="2"
        />
        <path
          d="M0 110 Q30 90 60 110 T120 110"
          fill="none"
          stroke="var(--tawny)"
          strokeWidth="2"
        />
        <path
          d="M0 150 Q30 130 60 150 T120 150"
          fill="none"
          stroke="var(--tawny)"
          strokeWidth="2"
        />
      </svg>
      <div className="relative">
        <h2 className="text-lg font-semibold tracking-tight">Time tracker</h2>
        <p className="desk-mono mt-4 text-4xl tracking-tight tabular-nums @sm:text-5xl">
          {formatUnit(hours)}:{formatUnit(minutes)}:{formatUnit(secs)}
        </p>
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => setRunning((current) => !current)}
            className="flex size-10 items-center justify-center rounded-full bg-primary-foreground text-primary"
            aria-label={running ? 'Pause timer' : 'Start timer'}
            aria-pressed={running}
          >
            {running ? (
              <Pause className="size-4" aria-hidden="true" />
            ) : (
              <Play className="size-4" aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setSeconds(0)
              setRunning(false)
            }}
            className="flex size-10 items-center justify-center rounded-full bg-tawny text-tawny-foreground"
            aria-label="Reset timer"
          >
            <Square className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
