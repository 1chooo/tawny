'use client'

import { useState } from 'react'
import { fieldClass } from '@/components/desk-dialog'
import { useDesk } from '@/components/desk-store'
import { PageHeading, primaryButton } from '@/components/views/page-heading'

export function SettingsView() {
  const { profile, updateProfile } = useDesk()
  const [name, setName] = useState(profile.name)
  const [email, setEmail] = useState(profile.email)
  const [mailAlerts, setMailAlerts] = useState(profile.mailAlerts)
  const [bellAlerts, setBellAlerts] = useState(profile.bellAlerts)
  const [error, setError] = useState('')

  return (
    <div>
      <PageHeading title="Settings" description="The signed-in profile for this demo." />
      <form
        className="max-w-xl space-y-4 rounded-lg border border-border bg-card p-4"
        onSubmit={(event) => {
          event.preventDefault()
          if (!name.trim()) {
            setError('Name is required.')
            return
          }
          if (!email.includes('@')) {
            setError('Use an email address.')
            return
          }
          setError('')
          updateProfile({ name: name.trim(), email: email.trim(), mailAlerts, bellAlerts })
        }}
      >
        <label className="block text-sm">
          <span className="mb-1 block text-xs text-muted-foreground">Name</span>
          <input className={fieldClass} value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-xs text-muted-foreground">Email</span>
          <input className={fieldClass} value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label className="flex items-center justify-between gap-3 text-sm">
          <span>Mail alerts</span>
          <input type="checkbox" checked={mailAlerts} onChange={(event) => setMailAlerts(event.target.checked)} />
        </label>
        <label className="flex items-center justify-between gap-3 text-sm">
          <span>Notification dot</span>
          <input type="checkbox" checked={bellAlerts} onChange={(event) => setBellAlerts(event.target.checked)} />
        </label>
        {error ? <p className="text-sm">{error}</p> : null}
        <button type="submit" className={primaryButton}>Save settings</button>
      </form>
    </div>
  )
}
