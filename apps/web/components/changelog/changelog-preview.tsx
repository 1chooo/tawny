import {
  DesignPreview,
  designPreviewBg,
} from '@/components/landing/design-preview'
import { DemoWindow } from '@/components/landing/demo-window'
import { getComponentDemo } from '@/components/landing/showcases'
import { ProductFrame } from '@/components/product-frame'
import { cn } from '@tawny/ui/lib/utils'

const DESIGN_IDS = new Set([
  'art',
  'dev',
  'link',
  'ocean',
  'vcard',
  'mug',
])

type ChangelogPreviewProps = {
  id: string
}

/**
 * MDX embed for changelog posts — same interactive landing mocks, always 16:9.
 * Designs use DemoWindow + DesignPreview; components use ProductFrame + demo render.
 */
export function ChangelogPreview({ id }: ChangelogPreviewProps) {
  if (DESIGN_IDS.has(id)) {
    return (
      <div className="my-8 w-full max-w-none">
        <div className="aspect-video w-full overflow-hidden rounded-xl shadow-2xl">
          <DemoWindow
            title={`designs/${id}`}
            active
            className="h-full w-full"
            contentClassName={designPreviewBg(id)}
          >
            <DesignPreview id={id} className="h-full" />
          </DemoWindow>
        </div>
      </div>
    )
  }

  const demo = getComponentDemo(id)
  if (!demo) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[ChangelogPreview] Unknown preview id: ${id}`)
    }
    return null
  }

  return (
    <div className="my-8 w-full max-w-none">
      <ProductFrame
        title={demo.frameTitle}
        className="shadow-2xl"
        contentClassName={cn(
          'aspect-video overflow-hidden',
          demo.contentClassName,
        )}
      >
        {demo.render()}
      </ProductFrame>
    </div>
  )
}
