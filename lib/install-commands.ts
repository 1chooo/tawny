function createAlias(packageName: string) {
  return packageName.startsWith('create-')
    ? packageName.slice('create-'.length)
    : packageName
}

export const PACKAGE_MANAGERS = [
  {
    id: 'pnpm',
    label: 'pnpm',
    command: (pkg: string) => `pnpm create ${createAlias(pkg)}@latest my-app`,
  },
  {
    id: 'npm',
    label: 'npm',
    command: (pkg: string) => `npx ${pkg}@latest my-app`,
  },
  {
    id: 'yarn',
    label: 'yarn',
    command: (pkg: string) => `yarn create ${createAlias(pkg)} my-app`,
  },
  {
    id: 'bun',
    label: 'bun',
    command: (pkg: string) => `bunx ${pkg}@latest my-app`,
  },
] as const

export type PackageManagerId = (typeof PACKAGE_MANAGERS)[number]['id']

export function installCommands(packageName: string) {
  return PACKAGE_MANAGERS.map((pm) => ({
    id: pm.id,
    label: pm.label,
    code: pm.command(packageName),
  }))
}
