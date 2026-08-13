import { describe, expect, it } from 'vitest'
import { parseArgs, YES_DEFAULTS } from './args.mjs'

describe('parseArgs', () => {
  it('reads template and project name without --yes', () => {
    expect(parseArgs(['art', 'my-journal'])).toEqual({
      yes: false,
      templateArg: 'art',
      projectNameArg: 'my-journal',
    })
  })

  it('accepts --yes after the positionals', () => {
    expect(parseArgs(['art', 'my-journal', '--yes'])).toEqual({
      yes: true,
      templateArg: 'art',
      projectNameArg: 'my-journal',
    })
  })

  it('accepts --yes before the positionals', () => {
    expect(parseArgs(['--yes', 'art', 'my-journal'])).toEqual({
      yes: true,
      templateArg: 'art',
      projectNameArg: 'my-journal',
    })
  })

  it('allows --yes with only a template id', () => {
    expect(parseArgs(['art', '--yes'])).toEqual({
      yes: true,
      templateArg: 'art',
      projectNameArg: undefined,
    })
  })
})

describe('YES_DEFAULTS', () => {
  it('uses the CLI placeholder values', () => {
    expect(YES_DEFAULTS).toEqual({
      authorName: 'Alex Chen',
      authorEmail: 'hello@example.com',
      githubUsername: 'your-username',
      cityName: 'San Francisco',
    })
  })
})
