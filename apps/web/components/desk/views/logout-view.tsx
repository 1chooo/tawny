'use client'

import { useDesk } from '@/components/desk/desk-store'
import { PageHeading, primaryButton } from '@/components/desk/views/page-heading'

export function LogoutView() {
  const { signedIn, signOut, signIn, profile } = useDesk()

  if (!signedIn) {
    return (
      <div>
        <PageHeading title="Signed out" description="The demo data stays in this browser tab." />
        <button type="button" className={primaryButton} onClick={signIn}>
          Sign back in as {profile.name}
        </button>
      </div>
    )
  }

  return (
    <div>
      <PageHeading
        title="Log out"
        description="This leaves the desk without deleting projects or tasks."
      />
      <button type="button" className={primaryButton} onClick={signOut}>
        Log out
      </button>
    </div>
  )
}
