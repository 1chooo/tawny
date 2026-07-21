import { ProfilePicture } from '@/components/link/profile-picture'
import { UserInfo } from '@/components/link/user-info'
import { LinkList } from '@/components/link/link-list'
import { Tagline } from '@/components/link/tagline'

export default function LinkHomePage() {
  return (
    <main className="mx-auto flex min-h-[inherit] w-full max-w-md flex-1 flex-col justify-center px-[clamp(1rem,4vw,1.75rem)] pt-6 pb-8">
      <ProfilePicture />
      <UserInfo />
      <LinkList />
      <Tagline />
    </main>
  )
}
