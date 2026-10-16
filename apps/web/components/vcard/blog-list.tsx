'use client'

import { useState } from 'react'
import Image from 'next/image'
import { VcardLink } from '@/components/vcard/link'
import { posts, type VcardPost } from '@/lib/vcard/content'

export function VcardBlogList() {
  const categories = [...new Set(posts.map((post) => post.category))]
  const [active, setActive] = useState('All')
  const visible =
    active === 'All'
      ? posts
      : posts.filter((post) => post.category === active)

  return (
    <>
      <ul className="vcard-filters">
        <li>
          <button
            type="button"
            className={active === 'All' ? 'vcard-filter is-active' : 'vcard-filter'}
            aria-pressed={active === 'All'}
            onClick={() => setActive('All')}
          >
            All ({posts.length})
          </button>
        </li>
        {categories.map((category) => {
          const count = posts.filter((post) => post.category === category).length
          return (
            <li key={category}>
              <button
                type="button"
                className={
                  active === category ? 'vcard-filter is-active' : 'vcard-filter'
                }
                aria-pressed={active === category}
                onClick={() => setActive(category)}
              >
                {category} ({count})
              </button>
            </li>
          )
        })}
      </ul>
      <ul className="vcard-list-cards">
        {visible.map((post) => (
          <li key={post.slug}>
            <BlogCard post={post} />
          </li>
        ))}
      </ul>
    </>
  )
}

function BlogCard({ post }: { post: VcardPost }) {
  return (
    <VcardLink href={`/blog/${post.slug}`} className="vcard-list-card">
      <span className="vcard-list-banner">
        <Image
          src={post.image}
          alt={post.alt}
          fill
          sizes="(min-width: 720px) 360px, 100vw"
        />
      </span>
      <span className="vcard-list-body">
        <span className="vcard-list-meta">
          <span>{post.category.toUpperCase()}</span>
        </span>
        <span className="vcard-list-title">{post.title}</span>
        <time className="vcard-list-date">{post.date}</time>
      </span>
    </VcardLink>
  )
}
