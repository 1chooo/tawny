import { VcardLink } from '@/components/vcard/link'
import { VcardShell } from '@/components/vcard/shell'

export default function VcardNotFound() {
  return (
    <VcardShell title="Not found">
      <p className="vcard-bio">This sample page is not in the vcard.</p>
      <p className="vcard-detail-links">
        <VcardLink href="/" className="vcard-detail-link">
          Back to About
        </VcardLink>
      </p>
    </VcardShell>
  )
}
