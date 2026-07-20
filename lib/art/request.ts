import { getRequestConfig } from 'next-intl/server'
import { artDefaultLocale, isArtLocale } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale =
    requested && isArtLocale(requested) ? requested : artDefaultLocale

  return {
    locale,
    messages: (await import(`../../messages/art/${locale}.json`)).default,
  }
})
