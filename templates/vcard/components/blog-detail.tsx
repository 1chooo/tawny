import Image from 'next/image'
import { VcardLink } from '@/components/link'
import { VcardShell } from '@/components/shell'
import { posts, profile, type VcardPost } from '@/lib/profile'

export function VcardBlogDetail({ post }: { post: VcardPost }) {
  return (
    <VcardShell
      title={
        <VcardLink href="/blog" className="vcard-back">
          ← Back to Blog
        </VcardLink>
      }
    >
      <p className="vcard-detail-kicker">{post.category}</p>
      <h1 className="vcard-detail-title">{post.title}</h1>
      <div className="vcard-detail-author">
        <span className="vcard-detail-avatar">
          <Image
            src={profile.avatar}
            alt=""
            width={40}
            height={40}
            className="vcard-avatar-img"
          />
        </span>
        <span>
          {profile.name}
          <span className="vcard-detail-period">
            {post.date}
            <span className="vcard-writing-dot" aria-hidden="true" />
            {post.readingTime}
          </span>
        </span>
      </div>
      <div className="vcard-detail-cover">
        <Image
          src={post.image}
          alt={post.alt}
          fill
          sizes="(min-width: 960px) 720px, 100vw"
          priority
        />
      </div>
      <div className="vcard-detail-body">
        {post.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </VcardShell>
  )
}

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug)
}
