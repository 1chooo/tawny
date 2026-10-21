'use client'

import { useEffect, useId, useState } from 'react'
import { groupByYear, parsePublications, type Publication } from '@/lib/usc/publications'

export function USCPublications() {
  const groups = groupByYear(parsePublications())
  const [open, setOpen] = useState<Publication | null>(null)
  const [copied, setCopied] = useState(false)
  const titleId = useId()

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div>
      {groups.map(([year, pubs]) => (
        <section key={year} className="mb-8" aria-labelledby={`year-${year}`}>
          <h2
            id={`year-${year}`}
            className="mb-4 bg-[#990000] px-3 py-2 text-center text-xl font-semibold text-white"
          >
            {year}
          </h2>
          <div className="space-y-6">
            {pubs.map((pub) => (
              <article key={pub.id} className="flex flex-col gap-2 md:flex-row md:gap-4">
                <div className="font-medium whitespace-nowrap text-[#767676] md:w-12">
                  [{pub.index}]
                </div>
                <div className="min-w-0 flex-1 leading-relaxed">
                  <p className="font-bold">{pub.title}</p>
                  <p>{pub.authors}.</p>
                  <p className="italic">In {pub.venue}.</p>
                  <p>
                    {pub.month} {pub.year}.
                    {pub.note ? <span className="font-bold"> {pub.note}.</span> : null}
                  </p>
                </div>
                <div className="md:shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setCopied(false)
                      setOpen(pub)
                    }}
                    className="inline-flex min-h-10 items-center px-1 text-base font-semibold text-[#990000] underline underline-offset-2 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#990000]"
                  >
                    bibtex
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setOpen(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="max-h-[calc(100%-2rem)] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-6 text-black shadow-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <h2 id={titleId} className="text-lg font-semibold">
                BibTeX Citation
              </h2>
              <button
                type="button"
                autoFocus
                onClick={() => setOpen(null)}
                className="inline-flex min-h-10 min-w-10 items-center justify-center text-xl leading-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#990000]"
              >
                <span aria-hidden="true">×</span>
                <span className="sr-only">Close</span>
              </button>
            </div>
            <pre className="rounded-md bg-[#EEEEEE] p-4 text-sm whitespace-pre-wrap">{open.bibTeX}</pre>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(open.bibTeX).then(() => setCopied(true))
              }}
              className="mt-4 inline-flex min-h-10 items-center rounded-md bg-[#990000] px-4 font-semibold text-white hover:bg-[#990000]/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#990000]"
            >
              {copied ? 'Copied' : 'Copy to Clipboard'}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
