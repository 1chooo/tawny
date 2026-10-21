import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'
import { DeskBoard } from '@/components/desk/desk-board'
import { DeskRootShell } from '@/components/desk/desk-root-shell'

/**
 * Desktop crop of the project desk. The timer stays frozen, and nothing
 * inside the card can be clicked.
 */
export function DeskPreviewMock({ className }: { className?: string }) {
  return (
    <ScaledDesignCanvas className={className}>
      <div
        inert
        role="img"
        aria-label="Desk design preview"
        className="h-full w-full"
      >
        <DeskRootShell className="flex h-full min-h-0 flex-col">
          <DeskBoard live={false} />
        </DeskRootShell>
      </div>
    </ScaledDesignCanvas>
  )
}
