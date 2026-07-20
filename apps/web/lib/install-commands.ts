function createAlias(packageName: string) {
  return packageName.startsWith('create-')
    ? packageName.slice('create-'.length)
    : packageName
}

export const PACKAGE_MANAGERS = [
  {
    id: 'pnpm',
    label: 'pnpm',
    command: (pkg: string, args: string) =>
      `pnpm create ${createAlias(pkg)}@latest ${args}`,
  },
  {
    id: 'npm',
    label: 'npm',
    command: (pkg: string, args: string) => `npx ${pkg}@latest ${args}`,
  },
  {
    id: 'yarn',
    label: 'yarn',
    command: (pkg: string, args: string) =>
      `yarn create ${createAlias(pkg)} ${args}`,
  },
  {
    id: 'bun',
    label: 'bun',
    command: (pkg: string, args: string) => `bunx ${pkg}@latest ${args}`,
  },
] as const

export type PackageManagerId = (typeof PACKAGE_MANAGERS)[number]['id']

/**
 * Builds `create-tawny <templateId> <projectName>` commands for each package
 * manager. `templateId` matches a `Design.id` (e.g. `dev`, `art`), which the
 * CLI (`apps/cli`) uses to pick which `templates/<id>` to scaffold.
 */
export function installCommands(
  packageName: string,
  templateId: string,
  projectName = 'my-app',
) {
  const args = `${templateId} ${projectName}`
  return PACKAGE_MANAGERS.map((pm) => ({
    id: pm.id,
    label: pm.label,
    code: pm.command(packageName, args),
  }))
}
