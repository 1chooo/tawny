import { VcardProjectList } from '@/components/vcard/project-list'
import { VcardShell } from '@/components/vcard/shell'

export default function VcardProjectRoute() {
  return (
    <VcardShell title="Project">
      <VcardProjectList />
    </VcardShell>
  )
}
