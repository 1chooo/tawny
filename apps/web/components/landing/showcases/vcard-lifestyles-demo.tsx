import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'
import { VcardLifestyles } from '@/components/vcard/lifestyles'
import { VcardRootShell } from '@/components/vcard/vcard-root-shell'

export function VcardLifestylesDemo() {
  return (
    <ScaledDesignCanvas>
      <VcardRootShell className="flex h-full items-center px-10">
        <div className="w-full">
          <VcardLifestyles />
        </div>
      </VcardRootShell>
    </ScaledDesignCanvas>
  )
}

export function VcardLifestylesDetail() {
  return (
    <VcardRootShell className="flex min-h-[24rem] items-center px-6 py-10">
      <div className="w-full">
        <VcardLifestyles />
      </div>
    </VcardRootShell>
  )
}
