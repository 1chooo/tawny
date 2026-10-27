import { Suspense } from 'react'
import { SignInForm } from '@/components/cobalt/sign-in-form'
import { SplitShell } from '@/components/cobalt/split-shell'

export default function CobaltLoginPage() {
  return (
    <SplitShell>
      <Suspense>
        <SignInForm />
      </Suspense>
    </SplitShell>
  )
}
