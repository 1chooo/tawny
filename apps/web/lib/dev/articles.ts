import { promises as fs } from 'fs'
import path from 'path'

const articlesDirectory = path.join(process.cwd(), 'content', 'dev', 'articles')

export type DevArticleMeta = {
  title: string
  date?: string
  description?: string
  draft?: boolean
}

export type DevArticleListItem = {
  slug: string
  title: string
  date: string
  sort: number
}

export async function getArticleSlugs(): Promise<string[]> {
  const articles = await fs.readdir(articlesDirectory)
  return articles
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => name.replace(/\.mdx$/, ''))
}

export async function getArticleList(): Promise<DevArticleListItem[]> {
  const articles = await fs.readdir(articlesDirectory)
  const items: DevArticleListItem[] = []

  for (const article of articles) {
    if (!article.endsWith('.mdx')) continue
    const slug = article.replace(/\.mdx$/, '')
    const articleModule = await import(`@/content/dev/articles/${slug}.mdx`)
    const metadata = articleModule.metadata as DevArticleMeta | undefined

    if (!metadata) throw new Error(`Missing metadata in ${article}`)
    if (metadata.draft) continue

    items.push({
      slug,
      title: metadata.title,
      date: metadata.date || '-',
      sort: Number(metadata.date?.replaceAll('.', '') || 0),
    })
  }

  items.sort((a, b) => b.sort - a.sort)
  return items
}
