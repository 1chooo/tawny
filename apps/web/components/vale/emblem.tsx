import { site } from '@/lib/vale/content'

function BowlMark() {
  return (
    <svg
      className="vale-emblem"
      viewBox="0 0 160 64"
      width="149"
      height="60"
      aria-hidden="true"
    >
      <path d="M12 18h136" fill="none" stroke="currentColor" strokeWidth="1" />
      <path
        d="M28 18c0 26 22 36 52 36s52-10 52-36"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <rect x="76" y="10" width="8" height="8" fill="currentColor" />
    </svg>
  )
}

const marks = {
  bowl: BowlMark,
}

/** Swap `site.emblem` in lib/content.ts to point at another mark. */
export function Emblem() {
  const Mark = marks[site.emblem] ?? BowlMark
  return <Mark />
}
