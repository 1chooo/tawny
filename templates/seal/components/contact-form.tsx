'use client'

import { useState, type FormEvent } from 'react'
import { site } from '@/lib/content'

export function ContactForm() {
  const [sent, setSent] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    if (!name || !email || !message) return
    setSent(true)
  }

  if (sent) {
    return (
      <div className="seal-sent" role="status">
        <p className="seal-sent-mark" lang="zh-Hant">
          {site.contact.received}
        </p>
        <p>{site.contact.receivedBody}</p>
      </div>
    )
  }

  return (
    <form className="seal-form" onSubmit={onSubmit}>
      <label className="seal-field">
        <span>Name</span>
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label className="seal-field">
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label className="seal-field">
        <span>Message</span>
        <textarea name="message" required />
      </label>
      <button type="submit" className="seal-action">
        <span className="seal-action-dot" aria-hidden="true" />
        Send the note
      </button>
    </form>
  )
}
