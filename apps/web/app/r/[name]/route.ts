import { NextResponse } from 'next/server'
import { getDesign } from '@/lib/data'
import { buildRegistryItem } from '@/lib/registry-item'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type RouteContext = {
  params: Promise<{ name: string }>
}

/**
 * Public registry item for Open in v0: `/r/<designId>.json`.
 * The design id is resolved from the catalog before any template is read.
 */
export async function GET(_request: Request, context: RouteContext) {
  const { name } = await context.params
  const id = name.endsWith('.json') ? name.slice(0, -'.json'.length) : name
  const design = getDesign(id)
  if (!design) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  try {
    const item = await buildRegistryItem(design)
    return NextResponse.json(item)
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}
