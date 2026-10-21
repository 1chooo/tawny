import Image from "next/image";
import Link from "next/link";

export function StudioNote() {
  return (
    <section id="studio" className="scroll-mt-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-8 lg:grid-cols-2 lg:items-center lg:py-24">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <Image
            src="/images/studio.png"
            alt="Pottery studio with a wheel and shelves of drying pots"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-6 lg:pl-8">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            The studio
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-balance md:text-5xl">
            One wheel, one kiln, and a shelf that&apos;s always full.
          </h2>
          <p className="max-w-lg leading-relaxed text-muted-foreground">
            I&apos;m Jane. I make functional pottery in short runs, so a glaze
            you love might not come back exactly the same. That&apos;s the
            point — every mug carries the marks of the day it was made.
          </p>
          <Link
            href="/login"
            className="flex h-12 w-fit items-center bg-primary px-6 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Create an account for kiln drops
          </Link>
        </div>
      </div>
    </section>
  );
}
