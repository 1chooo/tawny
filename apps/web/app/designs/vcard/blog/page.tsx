import { VcardBlogList } from '@/components/vcard/blog-list'
import { VcardShell } from '@/components/vcard/shell'

export default function VcardBlogRoute() {
  return (
    <VcardShell title="Blog">
      <VcardBlogList />
    </VcardShell>
  )
}
