import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

const MAX_BYTES = 500 * 1024
const MIN_QUALITY = 30
const QUALITY_STEP = 10
const MAX_WIDTH = 1600
const MIN_WIDTH = 640

type ScreenshotBody = {
  kind: 'design' | 'component'
  id: string
  path: string
  selector?: string
  viewport?: { width?: number; height?: number }
  /**
   * Optical zoom, applied by shrinking the capture viewport by this factor
   * instead of cropping after the fact — pages pinning header/footer to the
   * viewport edges (min-h-screen layouts) keep both in frame, just with less
   * empty middle space, rather than losing whichever edge a crop would trim.
   */
  zoom?: number
}

function isValidId(id: string) {
  return /^[a-z0-9-]+$/.test(id)
}

async function compressUnderBudget(input: Buffer) {
  const sharp = (await import('sharp')).default

  let width = MAX_WIDTH
  let quality = 80

  let buffer = await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toBuffer()

  while (buffer.length > MAX_BYTES) {
    if (quality > MIN_QUALITY) {
      quality -= QUALITY_STEP
    } else if (width > MIN_WIDTH) {
      width = Math.round(width * 0.85)
    } else {
      break
    }

    buffer = await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer()
  }

  return buffer
}

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const body = (await request.json()) as ScreenshotBody
  const { kind, id, path: targetPath, selector, viewport, zoom } = body

  if (kind !== 'design' && kind !== 'component') {
    return NextResponse.json({ error: 'Invalid kind' }, { status: 400 })
  }
  if (!id || !isValidId(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }
  if (!targetPath || !targetPath.startsWith('/')) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 })
  }

  const { chromium } = await import('playwright')

  const zoomFactor = zoom && zoom > 1 ? zoom : 1

  let browser
  try {
    browser = await chromium.launch()
    const page = await browser.newPage({
      viewport: {
        width: Math.round((viewport?.width ?? 1440) / zoomFactor),
        height: Math.round((viewport?.height ?? 900) / zoomFactor),
      },
      deviceScaleFactor: 1,
    })

    const url = new URL(targetPath, request.url).toString()
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 })

    const raw = selector
      ? await page.locator(selector).screenshot()
      : await page.screenshot()

    const compressed = await compressUnderBudget(raw)

    const dir = path.join(
      process.cwd(),
      'public',
      'thumbnails',
      kind === 'design' ? 'designs' : 'components',
    )
    await mkdir(dir, { recursive: true })

    const filePath = path.join(dir, `${id}.webp`)
    await writeFile(filePath, compressed)

    return NextResponse.json({
      ok: true,
      path: `/thumbnails/${kind === 'design' ? 'designs' : 'components'}/${id}.webp`,
      sizeKB: Math.round((compressed.length / 1024) * 10) / 10,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Screenshot failed' },
      { status: 500 },
    )
  } finally {
    await browser?.close()
  }
}
