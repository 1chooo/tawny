'use client'

import { useDesk } from '@/components/desk-store'
import { endedShare } from '@/lib/model'
import { Panel } from '@/components/panel'

const RADIUS = 64
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function ProgressRing() {
  const { projects } = useDesk()
  const progress = endedShare(projects)
  const offset = CIRCUMFERENCE * (1 - progress / 100)

  return (
    <Panel>
      <h2 className="text-lg font-semibold tracking-tight">Progress</h2>
      <div className="mt-4 flex flex-col items-center">
        <div className="relative size-40" role="img" aria-label={`${progress} percent of projects ended`}>
          <svg className="size-full -rotate-90" viewBox="0 0 160 160" aria-hidden="true">
            <circle cx="80" cy="80" r={RADIUS} fill="none" stroke="var(--border)" strokeWidth="12" />
            <circle
              cx="80"
              cy="80"
              r={RADIUS}
              fill="none"
              stroke="var(--tawny)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="desk-serif text-4xl leading-none">{progress}%</span>
            <span className="mt-1 text-xs text-muted-foreground">Ended</span>
          </div>
        </div>
        <ul className="mt-4 flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
          <li className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-tawny" aria-hidden="true" />
            Ended
          </li>
          <li className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-foreground" aria-hidden="true" />
            Running
          </li>
          <li className="flex items-center gap-1.5">
            <span
              className="size-2.5 rounded-full"
              aria-hidden="true"
              style={{
                background:
                  'repeating-linear-gradient(45deg, transparent, transparent 2px, var(--muted-foreground) 2px, var(--muted-foreground) 3px)',
              }}
            />
            Pending
          </li>
        </ul>
      </div>
    </Panel>
  )
}
