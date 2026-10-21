import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'
import { AdminFrame } from '@/components/mug/admin-frame'
import { MugRootShell } from '@/components/mug/mug-root-shell'

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
        <MugRootShell className="h-full">
          <AdminFrame />
        </MugRootShell>
      </div>
    </ScaledDesignCanvas>
  )
}
