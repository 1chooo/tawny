'use client'

import { Apple, Smartphone } from 'lucide-react'
import { useDesk } from '@/components/desk/desk-store'
import { PHONE } from '@/lib/desk/model'

export function PhoneCard() {
  const { notify } = useDesk()

  function unavailable(store: string) {
    notify(`${store} is not part of this demo.`, 'err')
  }

  return (
    <section className="relative overflow-hidden rounded-lg border border-primary bg-primary p-4 text-primary-foreground @md:p-5">
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full"
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 36 Q25 18 50 36 T100 36 T150 36 T200 36 V60 H0 Z"
          fill="var(--tawny)"
          opacity="0.35"
        />
        <path d="M0 46 Q25 30 50 46 T100 46 T150 46 T200 46 V60 H0 Z" fill="var(--tawny)" />
      </svg>
      <div className="relative">
        <Smartphone className="size-6" aria-hidden="true" />
        <h2 className="mt-3 text-xl font-semibold tracking-tight">{PHONE.title}</h2>
        <p className="mt-1 text-xs text-primary-foreground/75">{PHONE.note}</p>
        <div className="mt-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => unavailable('The App Store')}
            className="flex h-10 items-center gap-2 rounded-lg bg-primary-foreground px-3 text-left text-primary"
          >
            <Apple className="size-5 shrink-0" aria-hidden="true" />
            <span>
              <span className="block text-[10px] leading-none">Download on the</span>
              <span className="text-sm font-medium leading-tight">App Store</span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => unavailable('Google Play')}
            className="flex h-10 items-center gap-2 rounded-lg bg-primary-foreground px-3 text-left text-primary"
          >
            <svg className="size-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M3 20.5v-17C3 2.9 3.3 2.4 3.8 2.2L13.7 12 3.8 21.8C3.3 21.6 3 21.1 3 20.5M16.8 15.1 6 21.3l8.5-8.5 2.3 2.3M20.2 10.8c.3.3.6.7.6 1.2s-.2.9-.6 1.2l-2.3 1.3-2.5-2.5 2.5-2.5 2.3 1.3M6 2.7l10.8 6.2-2.3 2.3L6 2.7Z"
              />
            </svg>
            <span>
              <span className="block text-[10px] leading-none">Get it on</span>
              <span className="text-sm font-medium leading-tight">Google Play</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
