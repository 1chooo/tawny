import { ProfilePicture } from "@/components/profile-picture";
import { UserInfo } from "@/components/user-info";
import { LinkList } from "@/components/link-list";
import { Tagline } from "@/components/tagline";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-md flex-col justify-center px-[clamp(1rem,4vw,1.75rem)] pt-6 pb-8">
      <ProfilePicture />
      <UserInfo />
      <LinkList />
      <Tagline />
    </main>
  );
}
