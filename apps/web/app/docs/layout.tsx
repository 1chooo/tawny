import { DocsShell } from '@/components/docs/docs-shell'
import { getDocsSidebar } from '@/lib/docs/load'
import { getDocsSearchIndex } from '@/lib/docs/search'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const groups = getDocsSidebar()
  const searchEntries = getDocsSearchIndex()

  return (
    <DocsShell groups={groups} searchEntries={searchEntries}>
      {children}
    </DocsShell>
  )
}
