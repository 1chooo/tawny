import createMDX from '@next/mdx'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./lib/art/request.ts')

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm'],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  transpilePackages: ['@tawny/ui', 'embed-card'],
  // v0 fetches /r/[name] at runtime. Trace the monorepo templates into that
  // function when the Next root is apps/web.
  outputFileTracingIncludes: {
    '/r/[name]': ['../../templates/**/*'],
  },
  async redirects() {
    return [
      {
        source: '/npm',
        destination: 'https://www.npmjs.com/package/create-tawny',
        permanent: false,
      },
    ]
  },
}

export default withNextIntl(withMDX(nextConfig))
