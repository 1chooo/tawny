import { ArtHeaderDemo, ArtHeaderDetail } from '@/components/landing/showcases/art-header-demo'
import { DevHeaderDemo, DevHeaderDetail } from '@/components/landing/showcases/dev-header-demo'
import { TawnyHeaderDemo, TawnyHeaderDetail } from '@/components/landing/showcases/tawny-header-demo'

/**
 * Tawny, Art, and Dev in one frame. Each band keeps its own desktop canvas
 * and clips to the bar, so the three headers share a single 16:9 card.
 */
export function HeadersDemo() {
  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1 overflow-hidden border-b border-border">
        <TawnyHeaderDemo />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden border-b border-border">
        <ArtHeaderDemo />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <DevHeaderDemo />
      </div>
    </div>
  )
}

/** Detail page: the three bars at a readable size, still one frame. */
export function HeadersDetail() {
  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1 overflow-hidden border-b border-border">
        <TawnyHeaderDetail />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden border-b border-border">
        <ArtHeaderDetail />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <DevHeaderDetail />
      </div>
    </div>
  )
}
