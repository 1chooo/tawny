import { profile } from "@/lib/links";

export function UserInfo() {
  return (
    <div className="w-full text-center text-[0.9375rem] leading-normal text-rurikon-700">
      <h1 className="mb-[0.35rem] text-lg tracking-[0.006em] text-foreground [font-variation-settings:'wght'_640,var(--sans-variation)]">
        {profile.name}
      </h1>
      <p className="mx-auto max-w-[36ch] text-muted-foreground [font-variation-settings:'wght'_440,var(--sans-variation)]">
        {profile.bio}
      </p>
    </div>
  );
}
