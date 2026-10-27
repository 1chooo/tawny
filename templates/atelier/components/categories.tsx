import { sectionVisible, site } from "@/lib/content";
import { ContentLink } from "./content-link";
import { Photo } from "./photo";
import { sectionPad, sectionTitle, shell } from "./styles";

export function Categories() {
  const { categories } = site;
  if (!sectionVisible(categories.visible, categories.items)) return null;

  return (
    <section className="border-t border-border">
      <div className={`${shell} ${sectionPad}`}>
        <h2 className={sectionTitle}>{categories.title}</h2>
        <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {categories.items.map((item) => (
            <li key={item.href + item.title} className="min-w-0">
              <ContentLink href={item.href} className="group block">
                <Photo
                  src={item.image}
                  alt={item.alt}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="aspect-[4/5]"
                />
                <h3 className="mt-4 text-base break-words">{item.title}</h3>
              </ContentLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
