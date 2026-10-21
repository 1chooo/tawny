'use client'

import { EmptyNote } from '@/components/empty-note'
import { useDesk } from '@/components/desk-store'
import { PageHeading } from '@/components/views/page-heading'
import { HELP, matches } from '@/lib/model'

export function HelpView() {
  const { query } = useDesk()
  const articles = HELP.filter((article) => matches(query, article.title, article.body))

  return (
    <div>
      <PageHeading title="Help" description="How this desk demo behaves. Search filters these notes." />
      {articles.length === 0 ? (
        <EmptyNote title="No articles" body={`Nothing matches “${query.trim()}”.`} />
      ) : (
        <ul className="space-y-3">
          {articles.map((article) => (
            <li key={article.id} className="rounded-lg border border-border bg-card p-4">
              <h2 className="font-medium">{article.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{article.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
