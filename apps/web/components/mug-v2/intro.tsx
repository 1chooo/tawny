import { site } from "@/components/mug-v2/content";
import { Photo } from "./photo";
import { sectionPad, sectionTitle, shell } from "./styles";

export function Intro() {
  const { intro } = site;
  const hasCopy = intro.title.trim() !== "" || intro.body.trim() !== "";
  if (!intro.visible || !hasCopy) return null;

  const images = intro.images;

  return (
    <section id={intro.id} className={`${shell} ${sectionPad}`}>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-8">
        <div className="z-10 border border-border bg-background p-8 md:p-12 lg:-mr-10">
          {intro.eyebrow.trim() ? (
            <p className="text-xs tracking-widest text-muted-foreground uppercase">
              {intro.eyebrow}
            </p>
          ) : null}
          {intro.title.trim() ? (
            <h2 className={`${sectionTitle} mt-4`}>{intro.title}</h2>
          ) : null}
          {intro.body.trim() ? (
            <p className="mt-6 max-w-prose text-base leading-relaxed text-muted-foreground">
              {intro.body}
            </p>
          ) : null}
        </div>
        {images.length > 0 ? (
          <div
            className={
              images.length > 1
                ? "grid grid-cols-2 items-start gap-4 sm:gap-6"
                : "grid"
            }
          >
            {images.map((image, index) => (
              <Photo
                key={`${image.src}-${image.alt}`}
                src={image.src}
                alt={image.alt}
                sizes="(min-width: 1024px) 25vw, 50vw"
                className={`aspect-[3/4] ${index === 1 ? "lg:mt-16" : ""}`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
