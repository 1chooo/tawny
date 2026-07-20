import { describe, expect, it } from 'vitest'
import { installCommands } from './install-commands'

describe('installCommands', () => {
  it('builds create commands for each package manager', () => {
    const commands = installCommands('create-tawny', 'art', 'my-journal')

    expect(commands).toEqual([
      {
        id: 'pnpm',
        label: 'pnpm',
        code: 'pnpm create tawny@latest art my-journal',
      },
      {
        id: 'npm',
        label: 'npm',
        code: 'npx create-tawny@latest art my-journal',
      },
      {
        id: 'yarn',
        label: 'yarn',
        code: 'yarn create tawny art my-journal',
      },
      {
        id: 'bun',
        label: 'bun',
        code: 'bunx create-tawny@latest art my-journal',
      },
    ])
  })

  it('defaults the project name to my-app', () => {
    const [pnpm] = installCommands('create-tawny', 'dev')
    expect(pnpm.code).toBe('pnpm create tawny@latest dev my-app')
  })

  it('does not strip non create- package names', () => {
    const [pnpm] = installCommands('tawny-cli', 'art', 'demo')
    expect(pnpm.code).toBe('pnpm create tawny-cli@latest art demo')
  })
})
