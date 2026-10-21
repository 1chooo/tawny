'use client'

import type { ReactNode } from 'react'
import { DeskAppShell } from '@/components/desk/desk-shell'
import { DeskProvider } from '@/components/desk/desk-store'

export default function DeskWorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <DeskProvider>
      <DeskAppShell>{children}</DeskAppShell>
    </DeskProvider>
  )
}
