'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { profile } from '@/lib/link/links'

export function ProfilePicture() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  const popup =
    mounted &&
    open &&
    createPortal(
      <div
        className="link-root fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[rgba(30,33,37,0.45)] backdrop-blur-xs"
        role="dialog"
        aria-modal="true"
        aria-label="Profile picture popup"
        onClick={() => setOpen(false)}
        style={{ animation: 'none', opacity: 1 }}
      >
        <div
          className="relative m-6 flex w-full max-w-[min(400px,calc(100vw-3rem))] scale-100 flex-col items-stretch rounded-(--radius) border border-(--link-border) bg-(--link-card) opacity-100 shadow-[0_4px_24px_rgba(46,49,53,0.12),inset_0_0_0_1px_rgba(255,255,255,0.8)]"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex w-full overflow-hidden rounded-t-[calc(var(--radius)-1px)]">
            <a
              href={profile.avatarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full leading-none"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.avatarUrl}
                alt={`${profile.name} full profile`}
                className="h-auto w-full align-middle"
              />
            </a>
          </div>
          <div className="font-link-serif border-t border-(--link-border) px-5 pt-4 pb-5 text-center text-[0.9375rem] leading-normal font-normal text-(--link-rurikon-600)">
            {profile.popupQuote}
          </div>
          <button
            className="absolute -top-3 -right-3 z-4 size-10 cursor-pointer rounded-full border border-(--link-border) bg-(--link-card) p-0 text-center text-[1.35rem] leading-[2.4rem] font-normal text-(--link-rurikon-600) shadow-[0_2px_8px_rgba(46,49,53,0.1)] transition-[background-color,color,border-color] duration-150 ease-in [-webkit-tap-highlight-color:transparent] hover:border-(--link-primary) hover:bg-(--link-primary) hover:text-(--link-primary-foreground) active:bg-(--link-rurikon-700) active:text-(--link-primary-foreground) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link-primary)"
            type="button"
            aria-label="Close popup"
            onClick={() => setOpen(false)}
          >
            &times;
          </button>
        </div>
      </div>,
      document.body,
    )

  return (
    <>
      <button
        className="relative mx-auto mb-4 block size-24 cursor-pointer rounded-full border-0 bg-transparent p-0 shadow-[0_0_0_1px_var(--link-border),0_2px_12px_rgba(46,49,53,0.08)] transition-shadow duration-150 ease-in [-webkit-tap-highlight-color:transparent] hover:shadow-[0_0_0_1px_var(--link-rurikon-300),0_4px_16px_rgba(46,49,53,0.12)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-(--link-primary)"
        type="button"
        aria-label="View full profile picture"
        onClick={() => setOpen(true)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile.avatarUrl}
          alt={`${profile.name} profile picture`}
          className="block size-24 rounded-full"
          width={96}
          height={96}
        />
      </button>
      {popup}
    </>
  )
}
