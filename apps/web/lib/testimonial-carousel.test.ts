import { describe, expect, it } from 'vitest'
import {
  rawOffset,
  slideMotion,
  slideOffset,
  swipeDirection,
  wrapIndex,
} from './testimonial-carousel'

describe('slideOffset', () => {
  it('keeps a neighbor on either side of the last slide', () => {
    expect(slideOffset(0, 5, 6)).toBe(1)
    expect(slideOffset(5, 5, 6)).toBe(0)
    expect(slideOffset(4, 5, 6)).toBe(-1)
  })

  it('folds distances past half the set', () => {
    expect(slideOffset(5, 0, 6)).toBe(-1)
    expect(slideOffset(4, 0, 6)).toBe(-2)
    expect(slideOffset(3, 0, 6)).toBe(3)
    expect(rawOffset(0, 5)).toBe(-5)
  })

  it('places a 78% card at 80% of the track', () => {
    expect(slideMotion(1).transform).toBe('translateX(102.564%) scale(0.97)')
    expect((78 * 102.564) / 100).toBeCloseTo(80, 2)
  })

  it('hides the previous card and parks the rest', () => {
    expect(slideMotion(0)).toMatchObject({ opacity: 1, pointerEvents: 'auto' })
    expect(slideMotion(-1)).toMatchObject({
      transform: 'translateX(-33.333%) scale(0.97)',
      opacity: 0,
      pointerEvents: 'none',
    })
    expect(slideMotion(2).transform).toBe('translateX(133.333%) scale(0.97)')
    expect(slideMotion(-3).transform).toBe('translateX(-40%) scale(0.97)')
  })
})

describe('swipeDirection', () => {
  it('treats a short or steep drag as no swipe', () => {
    expect(swipeDirection(47, 0)).toBeNull()
    expect(swipeDirection(48, 41)).toBeNull()
    expect(swipeDirection(-60, 51)).toBeNull()
  })

  it('maps a flat drag to next or previous', () => {
    expect(swipeDirection(-48, 0)).toBe(1)
    expect(swipeDirection(48, 0)).toBe(-1)
    expect(swipeDirection(60, 40)).toBe(-1)
    expect(swipeDirection(-60, 50)).toBe(1)
  })
})

describe('wrapIndex', () => {
  it('wraps both directions', () => {
    expect(wrapIndex(-1, 6)).toBe(5)
    expect(wrapIndex(6, 6)).toBe(0)
  })
})
