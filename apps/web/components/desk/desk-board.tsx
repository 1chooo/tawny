'use client'

import { DeskProvider } from '@/components/desk/desk-store'
import { DeskAppShell } from '@/components/desk/desk-shell'
import { DashboardHome } from '@/components/desk/views/dashboard-home'

/** Catalog mock. The live routes use the workspace layout instead. */
export function DeskBoard({ live = true }: { live?: boolean }) {
  return (
    <DeskProvider persist={false}>
      <DeskAppShell>
        <DashboardHome live={live} />
      </DeskAppShell>
    </DeskProvider>
  )
}
