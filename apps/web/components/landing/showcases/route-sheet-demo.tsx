'use client'

import { useState } from 'react'
import {
  Bell,
  Bike,
  Car,
  CircleParking,
  KeyRound,
  Lock,
  LockOpen,
  Navigation,
  PersonStanding,
  TrainFront,
  X,
  Zap,
} from 'lucide-react'
import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'
import { cn } from '@tawny/ui/lib/utils'

type RouteId = 'bike' | 'drive' | 'transit'
type LegMode = 'walk' | 'bike' | 'drive' | 'transit'
type StopKind = 'start' | 'stop' | 'end'
type StopIconName = 'navigate' | 'unlock' | 'lock' | 'key' | 'parking' | 'station'
type StatIconName = 'bike' | 'ebike' | 'parking' | 'train'

type Stat = {
  label: string
  value: string
  icon: StatIconName
}

type Stop = {
  kicker: string
  title: string
  kind: StopKind
  icon: StopIconName
  stats?: Stat[]
}

type Leg = {
  mode: LegMode
  minutes: number
  via?: string
}

type Route = {
  id: RouteId
  label: string
  duration: string
  stops: Stop[]
  legs: Leg[]
}

const ROUTES: Route[] = [
  {
    id: 'bike',
    label: 'Bike',
    duration: '1 hr',
    stops: [
      { kicker: 'Start', title: 'Your Location', kind: 'start', icon: 'navigate' },
      {
        kicker: 'Pickup',
        title: 'W 84 St & Amsterdam Ave',
        kind: 'stop',
        icon: 'unlock',
        stats: [
          { label: 'Bikes', value: '30', icon: 'bike' },
          { label: 'EBikes', value: '25', icon: 'ebike' },
        ],
      },
      {
        kicker: 'Dropoff',
        title: 'Barrow St & Hudson St',
        kind: 'stop',
        icon: 'lock',
        stats: [{ label: 'Parking', value: '41', icon: 'parking' }],
      },
      { kicker: 'Destination', title: 'Wall Street', kind: 'end', icon: 'key' },
    ],
    legs: [
      { mode: 'walk', minutes: 10 },
      { mode: 'bike', minutes: 34 },
      { mode: 'walk', minutes: 44 },
    ],
  },
  {
    id: 'drive',
    label: 'Drive',
    duration: '22 min',
    stops: [
      { kicker: 'Start', title: 'Your Location', kind: 'start', icon: 'navigate' },
      {
        kicker: 'Park',
        title: 'Battery Parking Garage',
        kind: 'stop',
        icon: 'parking',
        stats: [{ label: 'Parking', value: '64', icon: 'parking' }],
      },
      { kicker: 'Destination', title: 'Wall Street', kind: 'end', icon: 'key' },
    ],
    legs: [
      { mode: 'drive', minutes: 18, via: 'West Side Highway' },
      { mode: 'walk', minutes: 4 },
    ],
  },
  {
    id: 'transit',
    label: 'Transit',
    duration: '32 min',
    stops: [
      { kicker: 'Start', title: 'Your Location', kind: 'start', icon: 'navigate' },
      {
        kicker: 'Station',
        title: '86 St',
        kind: 'stop',
        icon: 'station',
        stats: [{ label: 'Line', value: '1', icon: 'train' }],
      },
      { kicker: 'Station', title: 'Wall St', kind: 'stop', icon: 'station' },
      { kicker: 'Destination', title: 'Wall Street', kind: 'end', icon: 'key' },
    ],
    legs: [
      { mode: 'walk', minutes: 4 },
      { mode: 'transit', minutes: 26 },
      { mode: 'walk', minutes: 2 },
    ],
  },
]

const ICON_BUTTON =
  'inline-flex size-8 items-center justify-center rounded-full transition-colors duration-[80ms] ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tawny'

export function RouteSheet({ route }: { route: Route }) {
  return (
    <section
      aria-label={`${route.label} route`}
      className="w-full max-w-sm rounded-2xl border border-border bg-card p-4 tracking-[-0.01em]"
    >
      <div className="grid grid-cols-[2rem_1fr_2rem] items-center gap-2">
        <button type="button" aria-label="Alerts" className={cn(ICON_BUTTON, 'bg-tawny text-tawny-foreground hover:bg-tawny/80')}>
          <Bell className="size-4" aria-hidden="true" />
        </button>
        <div className="text-center">
          <h2 className="text-[15px] font-semibold leading-5 text-foreground">Route</h2>
          <p className="text-[13px] leading-4 text-muted-foreground tabular-nums">{route.duration}</p>
        </div>
        <button
          type="button"
          aria-label="Close route"
          className={cn(ICON_BUTTON, 'border border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground')}
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-4">
        {route.stops.map((stop, index) => (
          <TimelineStop key={`${stop.kicker}-${stop.title}-${index}`} stop={stop} leg={route.legs[index]} />
        ))}
      </div>
    </section>
  )
}

function TimelineStop({ stop, leg }: { stop: Stop; leg?: Leg }) {
  return (
    <div className="relative grid grid-cols-[4.5rem_2rem_minmax(0,1fr)] gap-x-2">
      {leg ? (
        <div className="pointer-events-none absolute top-4 -bottom-4 left-24 w-4 -translate-x-1/2">
          <Spine mode={leg.mode} />
        </div>
      ) : null}

      {leg ? (
        <div className="absolute top-4 -bottom-4 left-0 flex w-[4.5rem] flex-col items-center justify-center gap-1">
          <ModeIcon mode={leg.mode} />
          <span className="rounded-full border border-border bg-accent px-2 py-0.5 text-[11px] leading-4 text-muted-foreground tabular-nums">
            {leg.minutes} min
          </span>
        </div>
      ) : null}

      <div className="relative z-10 col-start-2 row-start-1 flex h-8 justify-center">
        <StopNode kind={stop.kind} icon={stop.icon} />
      </div>

      <div className="col-start-3 row-start-1 pb-1">
        <p className="text-[12px] leading-4 text-muted-foreground">{stop.kicker}</p>
        <p className="text-[15px] font-medium leading-5 text-foreground">{stop.title}</p>
        {stop.stats ? <Stats stats={stop.stats} /> : null}
      </div>

      {leg ? (
        <div className={cn('col-start-3 row-start-2 flex items-center', leg.mode === 'bike' ? 'min-h-16' : 'min-h-12')}>
          {leg.via ? <p className="text-[13px] leading-4 text-muted-foreground">via {leg.via}</p> : null}
        </div>
      ) : null}
    </div>
  )
}

function StopNode({ kind, icon }: { kind: StopKind; icon: StopIconName }) {
  const endpoint = kind === 'start' || kind === 'end'
  return (
    <span
      className={cn(
        'inline-flex size-8 items-center justify-center rounded-full',
        endpoint ? 'bg-tawny text-tawny-foreground' : 'border border-border bg-card text-muted-foreground',
      )}
    >
      <StopGlyph icon={icon} />
    </span>
  )
}

function StopGlyph({ icon }: { icon: StopIconName }) {
  const className = 'size-4'
  if (icon === 'navigate') return <Navigation className={className} aria-hidden="true" />
  if (icon === 'unlock') return <LockOpen className={className} aria-hidden="true" />
  if (icon === 'lock') return <Lock className={className} aria-hidden="true" />
  if (icon === 'key') return <KeyRound className={className} aria-hidden="true" />
  if (icon === 'parking') return <CircleParking className={className} aria-hidden="true" />
  return <TrainFront className={className} aria-hidden="true" />
}

function ModeIcon({ mode }: { mode: LegMode }) {
  const className = 'size-4 text-muted-foreground'
  if (mode === 'walk') return <PersonStanding className={className} aria-hidden="true" />
  if (mode === 'bike') return <Bike className={className} aria-hidden="true" />
  if (mode === 'drive') return <Car className={className} aria-hidden="true" />
  return <TrainFront className={className} aria-hidden="true" />
}

function Stats({ stats }: { stats: Stat[] }) {
  return (
    <div className="mt-2 flex gap-6">
      {stats.map((stat) => (
        <div key={stat.label}>
          <p className="text-[11px] leading-4 text-muted-foreground">{stat.label}</p>
          <p className="mt-1 flex items-center gap-1.5 text-[13px] leading-4 text-foreground tabular-nums">
            <StatGlyph icon={stat.icon} />
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  )
}

function StatGlyph({ icon }: { icon: StatIconName }) {
  const className = 'size-4 text-muted-foreground'
  if (icon === 'bike') return <Bike className={className} aria-hidden="true" />
  if (icon === 'ebike') return <Zap className={className} aria-hidden="true" />
  if (icon === 'parking') return <CircleParking className={className} aria-hidden="true" />
  return <TrainFront className={className} aria-hidden="true" />
}

function Spine({ mode }: { mode: LegMode }) {
  if (mode === 'bike') {
    return (
      <svg className="h-full w-4 text-muted-foreground" viewBox="0 0 16 80" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M8 0C12 10 12 10 8 20C4 30 4 30 8 40C12 50 12 50 8 60C4 70 4 70 8 80"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    )
  }

  if (mode === 'transit') {
    return (
      <div className="flex h-full w-4 justify-center">
        <div
          className="h-full w-px"
          style={{
            backgroundImage: 'linear-gradient(to bottom, var(--border) 4px, transparent 4px)',
            backgroundSize: '1px 8px',
          }}
        />
      </div>
    )
  }

  return (
    <div className="flex h-full w-4 justify-center">
      <div className="h-full w-px bg-border" />
    </div>
  )
}

function RouteSwitcher({
  value,
  onChange,
}: {
  value: RouteId
  onChange: (id: RouteId) => void
}) {
  return (
    <div role="tablist" aria-label="Ways to get there" className="mb-3 flex flex-wrap justify-center gap-2">
      {ROUTES.map((route) => {
        const selected = route.id === value
        return (
          <button
            key={route.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(route.id)}
            className={cn(
              'rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-[80ms] ease-out',
              selected
                ? 'bg-foreground text-background'
                : 'border border-border text-muted-foreground hover:text-foreground',
            )}
          >
            {route.label}
          </button>
        )
      })}
    </div>
  )
}

function RouteSheetStage() {
  const [id, setId] = useState<RouteId>('bike')
  const route = ROUTES.find((entry) => entry.id === id) ?? ROUTES[0]

  return (
    <div className="flex w-full max-w-sm flex-col items-center">
      <RouteSwitcher value={route.id} onChange={setId} />
      <RouteSheet route={route} />
    </div>
  )
}

/** Gallery card: the sheet at desktop ratio, centered on the canvas. */
export function RouteSheetDemo() {
  return (
    <div className="h-full">
      <ScaledDesignCanvas>
        <div className="flex h-full items-center justify-center bg-background">
          <RouteSheetStage />
        </div>
      </ScaledDesignCanvas>
    </div>
  )
}

/** Detail and homepage: natural size, centered in the frame. */
export function RouteSheetDetail() {
  return (
    <div className="flex h-full items-center justify-center bg-background p-4">
      <RouteSheetStage />
    </div>
  )
}
