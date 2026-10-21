import { Suspense } from 'react'
import { SignInForm } from '@/components/mug/sign-in-form'
import { SplitShell } from '@/components/mug/split-shell'

export default function MugLoginPage() {
  return (
    <SplitShell>
      <Suspense>
        <SignInForm />
      </Suspense>
    </SplitShell>
  )
}
