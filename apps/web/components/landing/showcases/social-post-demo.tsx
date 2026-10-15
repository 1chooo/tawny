'use client'

import { useState } from 'react'
import { Bookmark, Eye, GraduationCap, Heart, MapPin } from 'lucide-react'
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
  posted: string
  note?: string
  education: Education
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
    posted: '5 Jun',
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
    posted: '19 Jun',
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

/** A feed of posts beside one profile post. */
export function SocialPosts() {
  const profile = PEOPLE.find((person) => person.id === 'xingyu')

  return (
    <section
      aria-label="Social posts"
      className="@container w-full max-w-4xl tracking-[-0.01em]"
    >
      <div className="flex flex-col gap-3 @min-[40rem]:flex-row @min-[40rem]:items-start">
        <ul className="flex min-w-0 flex-1 flex-col gap-2">
          {PEOPLE.map((person) => (
            <FeedPost key={person.id} person={person} />
          ))}
        </ul>
        {profile ? (
          <div className="min-w-0 flex-1">
            <ProfilePost person={profile} />
          </div>
        ) : null}
      </div>
    </section>
  )
}

function FeedPost({ person }: { person: Person }) {
  const [seen, setSeen] = useState(false)
  const [saved, setSaved] = useState(false)
  const [liked, setLiked] = useState(false)

  return (
    <li className="rounded-xl border border-border bg-card">
      <div className="flex items-start gap-2 p-3">
        <Avatar initials={person.initials} />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="truncate text-[13px] font-medium leading-5 text-foreground">{person.name}</p>
            <p className="shrink-0 text-[12px] leading-4 text-muted-foreground tabular-nums">{person.posted}</p>
          </div>
          <p className="text-[13px] leading-5 text-muted-foreground">
            Did {person.credential} and just became a{' '}
            <span className="font-medium text-foreground">
              {person.role} at {person.company}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 px-3">
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

      <div className="mt-2 flex items-center border-t border-border px-1.5 py-1">
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
    </li>
  )
}

function ProfilePost({ person }: { person: Person }) {
  return (
    <article className="rounded-xl border border-border bg-card px-4 py-4">
      <div className="flex flex-col items-center text-center">
        <Avatar initials={person.initials} size="lg" />
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
          className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-[13px] font-medium text-foreground transition-colors duration-[80ms] ease-out hover:bg-accent"
        >
          <LinkedInMark />
          View LinkedIn profile
        </button>
        {person.note ? (
          <p className="mt-3 max-w-xs text-[13px] leading-5 text-muted-foreground">{person.note}</p>
        ) : null}
      </div>

      <div className="mt-4 rounded-lg border border-border px-3 py-2.5">
        <div className="flex items-start gap-2 text-left">
          <GraduationCap className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <div>
            <p className="text-[12px] leading-4 text-muted-foreground tabular-nums">{person.education.years}</p>
            <p className="text-[13px] font-medium leading-5 text-foreground">{person.education.degree}</p>
            <p className="text-[12px] leading-4 text-muted-foreground">{person.education.school}</p>
          </div>
        </div>
      </div>
    </article>
  )
}

function LinkedInMark() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true">
      <rect x="1" y="1" width="14" height="14" rx="2" fill="currentColor" />
      <path
        d="M4.2 6.4H5.7V12H4.2zM4.95 3.8a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zM7.1 6.4h1.4v.75h.05c.2-.38.7-.78 1.45-.78 1.55 0 1.84 1.02 1.84 2.35V12H10.4V9c0-.62-.01-1.42-.87-1.42-.87 0-1 1.08-1 1.42V12H7.1z"
        fill="var(--background)"
      />
    </svg>
  )
}

function Avatar({ initials, size = 'sm' }: { initials: string; size?: 'sm' | 'lg' }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full border border-border bg-accent font-medium text-foreground',
        size === 'lg' ? 'size-16 text-[15px]' : 'size-8 text-[11px]',
      )}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}

/** Gallery card: both post styles, centered on the desktop canvas. */
export function SocialPostDemo() {
  return (
    <div className="h-full">
      <ScaledDesignCanvas>
        <div className="flex h-full items-center justify-center bg-background px-16">
          <SocialPosts />
        </div>
      </ScaledDesignCanvas>
    </div>
  )
}

/** Detail page: natural size, centered in the frame. */
export function SocialPostDetail() {
  return (
    <div className="flex h-full items-start justify-center overflow-auto bg-background p-6">
      <SocialPosts />
    </div>
  )
}
