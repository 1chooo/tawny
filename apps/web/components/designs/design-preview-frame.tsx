import {
  DesignPreview,
  designPreviewBg,
} from '@/components/landing/design-preview'
import { DemoWindow } from '@/components/landing/demo-window'
import { cn } from '@tawny/ui/lib/utils'

/**
 * Live design window used as a blog cover. Interactive, so callers keep it
 * outside any link to the demo.
 */
export function DesignPreviewFrame({
  id,
  className,
}: {
  id: string
  className?: string
}) {
  return (
    <div className={cn('relative aspect-video overflow-hidden bg-muted', className)}>
      <DemoWindow
        title={`designs/${id}`}
        active
        className="h-full w-full rounded-none border-0 shadow-none ring-0"
        contentClassName={designPreviewBg(id)}
      >
        <DesignPreview id={id} className="h-full" />
      </DemoWindow>
    </div>
  )
}
