import { redirect } from 'next/navigation'
import { ART_BASE, artDefaultLocale } from '@/lib/art/routing'

export default function ArtShowcaseIndexPage() {
  redirect(`${ART_BASE}/${artDefaultLocale}`)
}
