import { site } from "@/components/atelier/content";
import { Photo } from "./photo";
import { sectionTitle } from "./styles";

export function Visit() {
  const { visit } = site;
  const address = visit.address.trim();
  const hours = visit.hours.trim();
  const hasPlace = address !== "" || hours !== "";
  const show =
    visit.visible &&
    (visit.title.trim() !== "" ||
      visit.body.trim() !== "" ||
      hasPlace ||
      visit.steps.length > 0);
  if (!show) return null;

  return (
    <section id={visit.id} className="border-t border-border">
      <div className="grid lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
        <div className="border-b border-border px-5 py-14 md:px-10 md:py-16 lg:border-r lg:border-b-0">
          {visit.title.trim() ? (
            <h2 className={sectionTitle}>{visit.title}</h2>
          ) : null}
          {visit.body.trim() ? (
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {visit.body}
            </p>
          ) : null}
          {hasPlace ? (
            <div className="mt-8 border border-border p-5 text-sm leading-relaxed">
              {address ? <p className="break-words">{address}</p> : null}
              {hours ? (
                <p className={address ? "mt-2 break-words" : "break-words"}>
                  {hours}
                </p>
              ) : null}
            </div>
          ) : null}
          {visit.steps.length > 0 ? (
            <ol className="mt-10 flex flex-col gap-6">
              {visit.steps.map((step, index) => (
                <li key={step.title} className="border-t border-border pt-6">
                  <p className="text-xs tracking-widest text-muted-foreground uppercase">
                    {`Step ${index + 1}`}
                  </p>
                  <h3 className="mt-2 text-lg break-words">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          ) : null}
        </div>
        <div className="relative min-h-80 lg:min-h-[40rem]">
          <Photo
            src={visit.image}
            alt={visit.imageAlt}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="absolute inset-0 size-full"
          />
        </div>
      </div>
    </section>
  );
}
