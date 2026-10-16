import { VcardLink } from "@/components/link";
import { VcardShell } from "@/components/shell";

export default function NotFound() {
  return (
    <VcardShell title="Not found">
      <p className="vcard-bio">This sample page is not in the vcard.</p>
      <p className="vcard-detail-links">
        <VcardLink href="/" className="vcard-detail-link">
          Back to About
        </VcardLink>
      </p>
    </VcardShell>
  );
}
