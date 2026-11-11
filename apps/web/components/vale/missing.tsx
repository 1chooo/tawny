import { ValeLink } from '@/components/vale/vale-link'

export function MissingPage() {
  return (
    <div className="vale-missing">
      <h1 className="vale-display">Missing</h1>
      <p>That page is not in the catalog.</p>
      <ValeLink href="/" className="vale-text-link vale-ui">
        Back to the studio
      </ValeLink>
    </div>
  )
}
