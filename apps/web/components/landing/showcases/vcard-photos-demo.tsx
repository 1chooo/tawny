import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'
import { VcardPhotos } from '@/components/vcard/photos'
import { VcardRootShell } from '@/components/vcard/vcard-root-shell'

export function VcardPhotosDemo() {
  return (
    <ScaledDesignCanvas>
      <VcardRootShell className="flex h-full items-center">
        <div className="w-full px-8">
          <VcardPhotos />
        </div>
      </VcardRootShell>
    </ScaledDesignCanvas>
  )
}

export function VcardPhotosDetail() {
  return (
    <VcardRootShell className="flex min-h-[24rem] items-center px-6 py-10">
      <div className="w-full">
        <VcardPhotos />
      </div>
    </VcardRootShell>
  )
}
