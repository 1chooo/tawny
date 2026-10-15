'use client'

import { useState } from 'react'
import { Bookmark, Eye, Heart } from 'lucide-react'
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

/** A feed of announcement posts for the drop. */
export function TalentDrop() {
  return (
    <section
      aria-label="Talent drop"
      className="w-full max-w-md tracking-[-0.01em]"
    >
      <DropHeader />
      <ul className="flex flex-col gap-2">
        {PEOPLE.map((person) => (
          <AnnouncementPost key={person.id} person={person} />
        ))}
      </ul>
    </section>
  )
}

function DropHeader() {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-3 px-1">
      <h2 className="flex items-baseline gap-2 text-[15px] font-semibold leading-5 text-foreground">
        <span className="text-[13px] font-medium text-tawny tabular-nums">{DROP.index}</span>
        {DROP.title}
      </h2>
      <p className="text-[12px] leading-4 text-muted-foreground tabular-nums">{DROP.range}</p>
    </div>
  )
}

function AnnouncementPost({ person }: { person: Person }) {
  const [seen, setSeen] = useState(false)
  const [saved, setSaved] = useState(false)
  const [liked, setLiked] = useState(false)

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
          <button
            type="button"
            aria-pressed={seen}
            aria-label={seen ? `Mark ${person.name} as unseen` : `Mark ${person.name} as seen`}
            onClick={() => setSeen((value) => !value)}
            className={cn(ICON_BUTTON, seen && 'text-foreground')}
          >
            <Eye className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-pressed={saved}
            aria-label={saved ? `Unsave ${person.name}` : `Save ${person.name}`}
            onClick={() => setSaved((value) => !value)}
            className={cn(ICON_BUTTON, saved && 'text-foreground')}
          >
            <Bookmark className={cn('size-4', saved && 'fill-current')} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-pressed={liked}
            aria-label={liked ? `Unlike ${person.name}` : `Like ${person.name}`}
            onClick={() => setLiked((value) => !value)}
            className={cn(ICON_BUTTON, liked && 'text-foreground')}
          >
            <Heart className={cn('size-4', liked && 'fill-current')} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 px-3 pb-3">
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
    </li>
  )
}

function Avatar({ initials }: { initials: string }) {
  return (
    <span
      className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-accent text-[11px] font-medium text-foreground"
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
