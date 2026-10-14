'use client'

import { ScaledDesignCanvas } from '@/components/landing/scaled-design-canvas'
import { LinearUxStage } from '@/components/writeups/linear-ux-demo'

/** Gallery card: the finished dashboard at desktop ratio. */
export function IssueListDemo() {
  return (
    <div className="h-full">
      <ScaledDesignCanvas>
        <LinearUxStage stage="alignment" presentation="product" />
      </ScaledDesignCanvas>
    </div>
  )
}

/** Detail page: natural height so all fourteen rows stay on screen. */
export function IssueListDetail() {
  return (
    <div className="h-[36rem]">
      <LinearUxStage stage="alignment" presentation="product" />
    </div>
  )
}
