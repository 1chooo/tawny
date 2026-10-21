import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="border-b border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:px-8 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="flex flex-col justify-between gap-10 lg:col-span-6">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Ceramic studio · Small batch
          </p>
          <h1 className="font-display text-6xl font-semibold leading-none tracking-tighter text-balance sm:text-7xl xl:text-8xl">
            Round things, <span className="text-primary">thrown</span> square
            to the hand.
          </h1>
          <div className="flex flex-col gap-6">
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              Mugs, cups and vessels made one at a time on the wheel. Cobalt,
              oat and charcoal glazes fired to cone 6 — built for every
              morning, not just the shelf.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#work"
                className="flex h-12 items-center gap-2 bg-foreground px-6 text-sm font-medium text-background hover:opacity-90"
              >
                Shop the current kiln
                <ArrowRight className="size-4" aria-hidden />
              </a>
              <a
                href="#work"
                className="flex h-12 items-center border border-foreground px-6 text-sm font-medium hover:bg-foreground hover:text-background"
              >
                See the work
              </a>
            </div>
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative aspect-square overflow-hidden rounded-full bg-muted">
            <Image
              src="/images/hero-mugs.png"
              alt="Three handmade stoneware mugs in cobalt, oat and charcoal glazes"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 flex size-28 flex-col justify-center bg-primary p-4 text-primary-foreground sm:size-36">
            <span className="font-display text-3xl font-semibold sm:text-4xl">
              6
            </span>
            <span className="text-xs leading-snug">pieces in this firing</span>
          </div>
        </div>
      </div>
    </section>
  );
}
