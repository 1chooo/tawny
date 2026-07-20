import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { SiteHeader } from '@/components/art/site-header'
import { artLocales, isArtLocale, type ArtLocale } from '@/lib/art/routing'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

async function loadArtMessages(locale: ArtLocale) {
  return (await import(`@/messages/art/${locale}.json`)).default
}

export function generateStaticParams() {
  return artLocales.map((locale) => ({ locale }))
}

export default async function ArtLocaleLayout({ children, params }: Props) {
  const { locale: localeParam } = await params
  if (!isArtLocale(localeParam)) {
    notFound()
  }

  const locale = localeParam
  setRequestLocale(locale)
  const messages = await loadArtMessages(locale)

  return (
    <NextIntlClientProvider key={locale} locale={locale} messages={messages}>
      <div className="flex min-h-0 flex-1 flex-col">
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
    </NextIntlClientProvider>
  )
}
