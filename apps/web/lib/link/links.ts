export type IconName = 'github' | 'linkedin' | 'signature'

export interface LinkItem {
  label: string
  url: string
  icon: IconName
}

export const links: LinkItem[] = [
  { label: 'Github', url: 'https://github.com/1chooo', icon: 'github' },
  {
    label: 'Linkedin',
    url: 'https://www.linkedin.com/in/1chooo/',
    icon: 'linkedin',
  },
  { label: 'Portfolio', url: 'https://1chooo.com/', icon: 'signature' },
]

export const profile = {
  name: 'Hugo Lin',
  bio: 'CS @ USC | Making 1chooo.com more fun',
  avatarUrl: 'https://github.com/1chooo.png',
  faviconUrl: 'https://avatars.githubusercontent.com/u/94162591?v=4',
  tagline:
    '"You are too focused on the future without realizing that today is exactly what you prayed for years ago."',
  popupQuote:
    '"You are too focused on the future without realizing that today is exactly what you prayed for years ago."',
}
