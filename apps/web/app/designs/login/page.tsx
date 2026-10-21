import { Suspense } from 'react'
import { SignInForm } from '@/components/jane/sign-in-form'
import { SplitShell } from '@/components/jane/split-shell'

export default function LoginDesignPage() {
  return (
    <SplitShell>
      <Suspense>
        <SignInForm />
      </Suspense>
    </SplitShell>
  )
}
