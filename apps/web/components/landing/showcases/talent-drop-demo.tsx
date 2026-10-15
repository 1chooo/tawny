'use client'

import { useState } from 'react'
import {
  Bookmark,
  ChevronDown,
  Eye,
  GraduationCap,
  Heart,
  MapPin,
} from 'lucide-react'
import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'
import { cn } from '@tawny/ui/lib/utils'

type Education = {
  years: string
  degree: string
  school: string
}

type Person = {
  id: string
  name: string
  initials: string
  credential: string
  role: string
  company: string
  tags: string[]
  more: number
  location: string
  note?: string
  education: Education
}

const DROP = {
  index: '07',
  title: 'Talent drop',
  range: '5 Jun 23 – 19 Jun 23',
}

const PEOPLE: Person[] = [
  {
    id: 'matt',
    name: 'Matt James',
    initials: 'MJ',
    credential: 'a PhD in Naming Layers at Facebook',
    role: 'Founder',
    company: 'Layers',
    tags: ['United Kingdom', 'Energytech', 'Climate'],
    more: 2,
    location: 'United Kingdom',
    education: {
      years: 'PhD',
      degree: 'Naming Layers',
      school: 'Facebook',
    },
  },
  {
    id: 'xingyu',
    name: 'Xingyu Wu',
    initials: 'XW',
    credential: 'a PhD in computer science at EPFL',
    role: 'Founder',
    company: 'Stealth Startup',
    tags: ['Ex-Unicorn', 'Switzerland', 'Technical founder'],
    more: 2,
    location: 'Switzerland',
    note: "Building a Stealth Startup from scratch—it's fun :)",
    education: {
      years: '2009–2014',
      degree: 'Doctor of Philosophy—PhD—Statistics',
      school: 'University of Glasgow',
    },
  },
]

const ICON_BUTTON =
  'inline-flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors duration-[80ms] ease-out hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tawny'

export function TalentDrop() {
  const [openId, setOpenId] = useState<string>('xingyu')

  return (
    <section
      aria-label="Talent drop"
      className="w-full max-w-md tracking-[-0.01em]"
    >
      <div className="mb-3 flex items-baseline justify-between gap-3 px-1">
        <h2 className="flex items-baseline gap-2 text-[15px] font-semibold leading-5 text-foreground">
          <span className="text-[13px] font-medium text-tawny tabular-nums">{DROP.index}</span>
          {DROP.title}
        </h2>
        <p className="text-[12px] leading-4 text-muted-foreground tabular-nums">{DROP.range}</p>
      </div>

      <ul className="flex flex-col gap-2">
        {PEOPLE.map((person) => (
          <PersonCard
            key={person.id}
            person={person}
            open={openId === person.id}
            onToggle={() => setOpenId((current) => (current === person.id ? '' : person.id))}
          />
        ))}
      </ul>
    </section>
  )
}

function PersonCard({
  person,
  open,
  onToggle,
}: {
  person: Person
  open: boolean
  onToggle: () => void
}) {
  return (
    <li className="rounded-xl border border-border bg-card">
      <div className="flex items-start gap-2 p-3">
        <Avatar initials={person.initials} />
        <p className="min-w-0 flex-1 text-[13px] leading-5 text-muted-foreground">
          <span className="font-medium text-foreground">{person.name}</span> who did{' '}
          {person.credential} just became a{' '}
          <span className="font-medium text-foreground">
            {person.role} at {person.company}
          </span>
        </p>
        <div className="flex shrink-0 items-center">
          <button type="button" aria-label={`Mark ${person.name} as seen`} className={ICON_BUTTON}>
            <Eye className="size-4" aria-hidden="true" />
          </button>
          <button type="button" aria-label={`Save ${person.name}`} className={ICON_BUTTON}>
            <Bookmark className="size-4" aria-hidden="true" />
          </button>
          <button type="button" aria-label={`Like ${person.name}`} className={ICON_BUTTON}>
            <Heart className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 px-3 pb-2">
        {person.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-2 py-0.5 text-[11px] leading-4 text-muted-foreground"
          >
            {tag}
          </span>
        ))}
        <span className="px-1 py-0.5 text-[11px] leading-4 text-muted-foreground">+{person.more} more</span>
      </div>

      <div className="border-t border-border">
        <button
          type="button"
          aria-expanded={open}
          onClick={onToggle}
          className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-muted-foreground transition-colors duration-[80ms] ease-out hover:bg-accent hover:text-foreground"
        >
          <span className="inline-flex size-4 items-center justify-center" aria-hidden="true">
            <span className="size-1.5 rounded-full bg-muted-foreground" />
          </span>
          Founder summary
          <ChevronDown
            className={cn('ml-auto size-4 transition-transform duration-[80ms] ease-out', open && 'rotate-180')}
            aria-hidden="true"
          />
        </button>

        {open ? <FounderSummary person={person} /> : null}
      </div>
    </li>
  )
}

function FounderSummary({ person }: { person: Person }) {
  return (
    <div className="border-t border-border bg-background px-4 py-4">
      <div className="flex flex-col items-center text-center">
        <Avatar initials={person.initials} large />
        <p className="mt-3 text-[15px] font-medium leading-5 text-foreground">{person.name}</p>
        <p className="mt-1 text-[13px] leading-4 text-muted-foreground">
          {person.role}, {person.company}
        </p>
        <p className="mt-1 flex items-center gap-1 text-[12px] leading-4 text-muted-foreground">
          <MapPin className="size-3.5" aria-hidden="true" />
          {person.location}
        </p>
        <div className="mt-3 h-1 w-28 overflow-hidden rounded-full bg-border">
          <div className="h-full w-2/3 rounded-full bg-tawny" />
        </div>
        <button
          type="button"
          className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-[13px] font-medium text-foreground transition-colors duration-[80ms] ease-out hover:bg-accent"
        >
          <LinkedInMark />
          View LinkedIn profile
        </button>
        {person.note ? (
          <p className="mt-3 max-w-xs text-[13px] leading-5 text-muted-foreground">{person.note}</p>
        ) : null}
      </div>

      <div className="mt-4 rounded-lg border border-border px-3 py-2.5">
        <div className="flex items-start gap-2">
          <GraduationCap className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <div>
            <p className="text-[12px] leading-4 text-muted-foreground tabular-nums">{person.education.years}</p>
            <p className="text-[13px] font-medium leading-5 text-foreground">{person.education.degree}</p>
            <p className="text-[12px] leading-4 text-muted-foreground">{person.education.school}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function LinkedInMark() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true">
      <rect x="1" y="1" width="14" height="14" rx="2" fill="currentColor" />
      <path
        d="M4.2 6.4H5.7V12H4.2zM4.95 3.8a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zM7.1 6.4h1.4v.75h.05c.2-.38.7-.78 1.45-.78 1.55 0 1.84 1.02 1.84 2.35V12H10.4V9c0-.62-.01-1.42-.87-1.42-.87 0-1 1.08-1 1.42V12H7.1z"
        fill="var(--card)"
      />
    </svg>
  )
}

function Avatar({ initials, large = false }: { initials: string; large?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full border border-border bg-accent font-medium text-foreground',
        large ? 'size-16 text-[15px]' : 'size-8 text-[11px]',
      )}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}

/** Gallery card: the drop at desktop ratio, centered on the canvas. */
export function TalentDropDemo() {
  return (
    <div className="h-full">
      <ScaledDesignCanvas>
        <div className="flex h-full items-center justify-center bg-background px-16">
          <TalentDrop />
        </div>
      </ScaledDesignCanvas>
    </div>
  )
}

/** Detail page: natural size, centered in the frame. */
export function TalentDropDetail() {
  return (
    <div className="flex h-full items-start justify-center overflow-auto bg-background p-6">
      <TalentDrop />
    </div>
  )
}
