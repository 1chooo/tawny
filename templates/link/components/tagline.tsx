import { profile } from "@/lib/links";

export function Tagline() {
  return (
    <div className="font-link-serif relative w-full pt-5 pb-2 text-center text-sm leading-normal font-normal wrap-break-word text-muted-foreground [word-spacing:0.08em]">
      {profile.tagline}
    </div>
  );
}
