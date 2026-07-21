import { profile } from '@/lib/link/links'

export function UserInfo() {
  return (
    <div className="w-full text-center text-[0.9375rem] leading-normal text-(--link-rurikon-700)">
      <h1 className="mb-[0.35rem] text-lg tracking-[0.006em] text-(--link-foreground) [font-variation-settings:'wght'_640,var(--link-sans-variation)]">
        {profile.name}
      </h1>
      <p className="mx-auto max-w-[36ch] text-(--link-muted-foreground) [font-variation-settings:'wght'_440,var(--link-sans-variation)]">
        {profile.bio}
      </p>
    </div>
  )
}
