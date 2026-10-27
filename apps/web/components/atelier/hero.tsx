import { site } from "@/components/atelier/content";
import { ContentLink } from "./content-link";
import { Photo } from "./photo";
import { heroTitle, shell } from "./styles";

export function Hero() {
  const { hero } = site;
  if (!hero.visible || !hero.title.trim()) return null;

  const onPhoto = hero.image.trim() !== "";

  return (
    <section className="relative min-h-[70vh] bg-muted">
      {onPhoto ? (
        <Photo
          src={hero.image}
          alt={hero.imageAlt}
          priority
          sizes="100vw"
          className="absolute inset-0 size-full"
        />
      ) : null}
      {onPhoto ? (
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-black/25 md:bg-gradient-to-l md:from-black/55 md:via-black/20 md:to-transparent"
        />
      ) : null}
      <div
        className={`${shell} relative flex min-h-[70vh] items-center py-16 ${onPhoto ? "text-white md:justify-end md:text-right" : ""}`}
      >
        <div className="flex max-w-xl flex-col gap-8">
          <h1 className={`${heroTitle} [text-shadow:0_2px_18px_rgba(0,0,0,0.45)]`}>{hero.title}</h1>
          <ContentLink
            href={hero.cta.href}
            className={
              onPhoto
                ? "inline-flex h-11 w-fit items-center bg-white px-6 text-sm text-black transition-opacity hover:opacity-80 md:self-end"
                : "inline-flex h-11 w-fit items-center bg-foreground px-6 text-sm text-background transition-opacity hover:opacity-80"
            }
          >
            {hero.cta.label}
          </ContentLink>
        </div>
      </div>
    </section>
  );
}
