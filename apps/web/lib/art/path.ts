import { join } from 'path'

export const POSTS_DIRECTORY = join(process.cwd(), 'content', 'art', 'posts')
export const PROJECTS_DIRECTORY = join(process.cwd(), 'content', 'art', 'projects')

export const postPath = (slug: string) => `/notes/${slug}`
export const projectPath = (slug: string) => `/projects/${slug}`
