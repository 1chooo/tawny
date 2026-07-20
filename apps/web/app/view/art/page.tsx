import { redirect } from 'next/navigation'
import { ART_VIEW_BASE, artDefaultLocale } from '@/lib/art/routing'

export default function ArtViewIndexPage() {
  redirect(`${ART_VIEW_BASE}/${artDefaultLocale}`)
}
