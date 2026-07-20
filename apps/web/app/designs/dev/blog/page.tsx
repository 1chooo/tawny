import { Link } from '@/lib/dev/navigation'
import { ProseLayout } from '@/components/dev/prose-layout'
import { getArticleList } from '@/lib/dev/articles'

export default async function DevBlogPage() {
  const items = await getArticleList()

  return (
    <ProseLayout>
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.slug}
            className="flex items-baseline justify-between gap-4"
          >
            <Link
              href={`/blog/${item.slug}`}
              className="text-[var(--foreground)] underline decoration-[var(--border)] underline-offset-2 hover:decoration-[var(--foreground)]"
            >
              {item.title}
            </Link>
            <span className="shrink-0 text-[var(--muted)]">{item.date}</span>
          </li>
        ))}
      </ul>
    </ProseLayout>
  )
}
