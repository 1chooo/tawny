'use client'

import { useState } from 'react'
import Image from 'next/image'
import { VcardLink } from '@/components/vcard/link'
import { projects, type VcardProject } from '@/lib/vcard/content'

export function VcardProjectList() {
  const categories = [...new Set(projects.map((project) => project.category))]
  const [active, setActive] = useState('All')
  const visible =
    active === 'All'
      ? projects
      : projects.filter((project) => project.category === active)

  return (
    <>
      <ul className="vcard-filters">
        <li>
          <FilterChip
            label={`All (${projects.length})`}
            pressed={active === 'All'}
            onClick={() => setActive('All')}
          />
        </li>
        {categories.map((category) => {
          const count = projects.filter(
            (project) => project.category === category,
          ).length
          return (
            <li key={category}>
              <FilterChip
                label={`${category} (${count})`}
                pressed={active === category}
                onClick={() => setActive(category)}
              />
            </li>
          )
        })}
      </ul>
      <ul className="vcard-list-cards">
        {visible.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </>
  )
}

function FilterChip({
  label,
  pressed,
  onClick,
}: {
  label: string
  pressed: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      className={pressed ? 'vcard-filter is-active' : 'vcard-filter'}
      aria-pressed={pressed}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

function ProjectCard({ project }: { project: VcardProject }) {
  return (
    <VcardLink href={`/project/${project.slug}`} className="vcard-list-card">
      <span className="vcard-list-banner">
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes="(min-width: 720px) 360px, 100vw"
        />
      </span>
      <span className="vcard-list-body">
        <span className="vcard-list-meta">
          <span>
            {project.start} — {project.end}
          </span>
          <span>{project.category.toUpperCase()}</span>
        </span>
        <span className="vcard-list-title">{project.title}</span>
        <span className="vcard-tech">
          {project.tech.map((item) => (
            <span key={item} className="vcard-tag">
              {item}
            </span>
          ))}
        </span>
      </span>
    </VcardLink>
  )
}
