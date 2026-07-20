import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { SiteHeader } from '@/components/art/site-header'
import { artLocales, isArtLocale } from '@/lib/art/routing'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return artLocales.map((locale) => ({ locale }))
}

export default async function ArtLocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!isArtLocale(locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex min-h-[70vh] flex-col">
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
    </NextIntlClientProvider>
  )
}
