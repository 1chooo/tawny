'use client'

import { useEffect, useId, useState } from 'react'
import { site } from '@/lib/vale/content'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function NewsletterDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const titleId = useId()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  function submit(event: React.FormEvent) {
    event.preventDefault()
    if (!emailPattern.test(email.trim())) {
      setError('Enter a valid email address.')
      setDone(false)
      return
    }
    setError('')
    setDone(true)
  }

  return (
    <div className="vale-dialog" role="presentation" onClick={onClose}>
      <div
        className="vale-dialog-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="vale-dialog-close vale-ui" onClick={onClose}>
          Close
        </button>
        <p className="vale-kicker vale-ui">{site.newsletter.kicker}</p>
        <h2 id={titleId}>{site.newsletter.title}</h2>
        <p>{site.newsletter.body}</p>
        {done ? (
          <p className="vale-fine" role="status">
            {site.newsletter.success}
          </p>
        ) : (
          <form className="vale-newsletter-form" onSubmit={submit} noValidate>
            <label className="vale-ui" htmlFor="vale-email">
              Email address
            </label>
            <input
              id="vale-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {error ? (
              <p className="vale-form-error" role="alert">
                {error}
              </p>
            ) : null}
            <button type="submit" className="vale-ui">
              Get updates
            </button>
          </form>
        )}
        <p className="vale-fine">{site.newsletter.finePrint}</p>
      </div>
    </div>
  )
}
