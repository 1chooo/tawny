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
  transpilePackages: ['@tawny/ui'],
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
