import type { SealMotif } from '@/lib/seal/content'

type MotifProps = {
  name: SealMotif
  className?: string
  filled?: number
}

function dotClass(index: number, filled: number) {
  return index < filled ? 'seal-fill' : 'seal-stroke'
}

export function Motif({ name, className, filled = 1 }: MotifProps) {
  const classes = ['seal-motif', className].filter(Boolean).join(' ')

  return (
    <span className={classes} aria-hidden="true">
      {name === 'disc' ? (
        <img src="/images/seal-wax.png" alt="" className="seal-wax" />
      ) : null}
      {name === 'ring' ? (
        <svg viewBox="0 0 100 100">
          <circle className="seal-stroke" cx="50" cy="50" r="40" />
        </svg>
      ) : null}
      {name === 'overlap' ? (
        <svg viewBox="0 0 100 100">
          <circle className="seal-stroke" cx="38" cy="50" r="28" />
          <circle className="seal-fill" cx="64" cy="50" r="28" />
        </svg>
      ) : null}
      {name === 'half' ? (
        <svg viewBox="0 0 100 100">
          <circle className="seal-stroke" cx="50" cy="50" r="40" />
          <path className="seal-fill" d="M50 10 A40 40 0 0 0 50 90 Z" />
        </svg>
      ) : null}
      {name === 'rule' ? (
        <svg viewBox="0 0 120 80">
          <line className="seal-rule" x1="2" y1="40" x2="118" y2="40" />
          <circle className="seal-knockout" cx="60" cy="40" r="20" />
        </svg>
      ) : null}
      {name === 'dots' ? (
        <svg viewBox="0 0 100 36">
          <circle className={dotClass(0, filled)} cx="14" cy="18" r="7" />
          <circle className={dotClass(1, filled)} cx="50" cy="18" r="7" />
          <circle className={dotClass(2, filled)} cx="86" cy="18" r="7" />
        </svg>
      ) : null}
    </span>
  )
}
