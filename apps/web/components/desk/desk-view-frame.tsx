'use client'

import type { ReactNode } from 'react'
import { DeskRootShell } from '@/components/desk/desk-root-shell'
import { DeskAppShell } from '@/components/desk/desk-shell'
import { DeskProvider } from '@/components/desk/desk-store'

export function DeskViewFrame({ children }: { children: ReactNode }) {
  return (
    <DeskRootShell className="flex h-dvh min-h-0 flex-col">
      <DeskProvider>
        <DeskAppShell>{children}</DeskAppShell>
      </DeskProvider>
    </DeskRootShell>
  )
}
