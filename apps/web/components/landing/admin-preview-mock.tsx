import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'
import { AdminFrame } from '@/components/cobalt/admin-frame'
import { CobaltRootShell } from '@/components/cobalt/cobalt-root-shell'

/**
 * Desktop crop of the sales dashboard — the same frame as the live admin
 * page, scaled into the catalog card. Charts are already drawn; nothing
 * inside can be clicked.
 */
export function AdminPreviewMock({ className }: { className?: string }) {
  return (
    <ScaledDesignCanvas className={className} width={1280} height={720}>
      <div
        inert
        role="img"
        aria-label="Admin design preview"
        className="h-full w-full"
      >
        <CobaltRootShell className="h-full">
          <AdminFrame />
        </CobaltRootShell>
      </div>
    </ScaledDesignCanvas>
  )
}
