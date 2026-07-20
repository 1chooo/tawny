import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { CopyCodeBlock } from '@/components/landing/copy-code-block'
import { CopyPageButton } from '@/components/landing/copy-page-button'
import { PackageManagerTabs } from '@/components/landing/package-manager-tabs'
import { BlurFade } from '@/components/ui/blur-fade'
import type { Design } from '@/lib/data'
import { highlightCode, languageFromPath } from '@/lib/highlight-code'
import { installCommands } from '@/lib/install-commands'

async function readTemplateSource(designId: string, relativePath: string) {
  const code = await readFile(
    path.join(process.cwd(), 'templates', designId, relativePath),
    'utf8',
  )
  const language = languageFromPath(relativePath)
  const html = await highlightCode(code, language)
  return { file: relativePath, code, html, language }
}

type DesignTemplateDocsProps = {
  design: Design
}

/**
 * About + install tabs + template source, rendered below a live design demo.
 */
export async function DesignTemplateDocs({ design }: DesignTemplateDocsProps) {
  const commands = installCommands(design.packageName)

  const [sources, highlightedCommands] = await Promise.all([
    Promise.all(
      design.sourceFiles.map((file) => readTemplateSource(design.id, file)),
    ),
    Promise.all(
      commands.map(async (cmd) => ({
        id: cmd.id,
        html: await highlightCode(cmd.code, 'bash'),
      })),
    ),
  ])

  const highlightedHtml = Object.fromEntries(
    highlightedCommands.map((c) => [c.id, c.html]),
  )

  return (
    <div className="mt-14 flex flex-col gap-14">
      <BlurFade delay={0.05}>
        <section>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            About
          </h2>
          <div className="mt-3 max-w-2xl space-y-3 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            {design.longDescription.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        </section>
      </BlurFade>

      <BlurFade delay={0.08}>
        <section>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Get the template
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Scaffold a local copy with your preferred package manager.
          </p>
          <div className="mt-5">
            <PackageManagerTabs
              commands={commands}
              highlightedHtml={highlightedHtml}
            />
          </div>
        </section>
      </BlurFade>

      <BlurFade delay={0.1}>
        <section>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Template source
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Key files from{' '}
            <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[12px] text-foreground/80">
              templates/{design.id}
            </code>
            .
          </p>
          <div className="mt-6 flex flex-col gap-5">
            {sources.map(({ file, code, html, language }) => (
              <CopyCodeBlock
                key={file}
                title={`templates/${design.id}/${file}`}
                code={code}
                html={html}
                language={language}
              />
            ))}
          </div>
        </section>
      </BlurFade>
    </div>
  )
}

type DesignDemoHeaderActionsProps = {
  design: Design
}

/**
 * Loads source + install commands for the Copy page button (server → client).
 */
export async function DesignCopyPageAction({
  design,
}: DesignDemoHeaderActionsProps) {
  const commands = installCommands(design.packageName)
  const sources = await Promise.all(
    design.sourceFiles.map(async (file) => {
      const code = await readFile(
        path.join(process.cwd(), 'templates', design.id, file),
        'utf8',
      )
      return {
        file,
        code,
        language: languageFromPath(file),
      }
    }),
  )

  return (
    <CopyPageButton
      title={design.title}
      description={design.description}
      longDescription={design.longDescription}
      packageName={design.packageName}
      installCommands={commands.map(({ label, code }) => ({ label, code }))}
      sources={sources}
    />
  )
}
