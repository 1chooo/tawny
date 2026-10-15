'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Image from 'next/image'
import { Quote, X } from 'lucide-react'
import { testimonials, type VcardTestimonial } from '@/lib/vcard/showcase'
import { cn } from '@tawny/ui/lib/utils'

export function VcardTestimonials({ className }: { className?: string }) {
  const [active, setActive] = useState<VcardTestimonial | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()

  useEffect(() => {
    if (!active) return
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [active])

  return (
    <div className={cn('vcard-testimonials', className)}>
      <ul className="vcard-quotes">
        {testimonials.map((item) => (
          <li key={item.id}>
            <div
              role="button"
              tabIndex={0}
              className="vcard-quote vcard-gradient-card"
              onClick={() => setActive(item)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  setActive(item)
                }
              }}
            >
              <div className="vcard-quote-avatar">
                <Image
                  src={item.image}
                  alt=""
                  width={56}
                  height={56}
                />
              </div>
              <h3 className="vcard-quote-name">{item.name}</h3>
              <p className="vcard-quote-text">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>

      {active ? (
        <div
          className="vcard-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <button
            type="button"
            className="vcard-modal-overlay"
            aria-label="Close testimonial"
            onClick={() => setActive(null)}
          />
          <div className="vcard-modal-card">
            <button
              ref={closeRef}
              type="button"
              className="vcard-modal-close"
              aria-label="Close"
              onClick={() => setActive(null)}
            >
              <X size={16} aria-hidden="true" />
            </button>
            <div className="vcard-modal-portrait">
              <div className="vcard-modal-avatar">
                <Image src={active.image} alt="" width={72} height={72} />
              </div>
              <Quote
                className="vcard-modal-quote-icon"
                size={28}
                aria-hidden="true"
              />
            </div>
            <div>
              <h3 id={titleId} className="vcard-modal-name">
                {active.name}
              </h3>
              <time className="vcard-modal-date">{active.date}</time>
              <p className="vcard-modal-text">{active.text}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
