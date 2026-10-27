import { site } from "@/components/atelier/content";
import { ContentLink } from "./content-link";
import { shell } from "./styles";

export function SiteFooter() {
  if (!site.footer.visible) return null;

  const email = site.email.trim();
  const phone = site.phone.trim();
  const policyLinks = site.policies.map((policy) => ({
    label: policy.label,
    href: `/policies/${policy.slug}`,
  }));
  const columns = [
    ...site.footer.columns,
    ...(policyLinks.length > 0
      ? [{ title: "Policies", links: policyLinks }]
      : []),
  ];

  return (
    <footer className="border-t border-border">
      <div
        className={`${shell} grid gap-12 py-16 md:grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)] md:py-20`}
      >
        <div className="flex max-w-sm flex-col gap-4">
          <p className="text-lg tracking-tight">{site.name}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {site.footer.blurb}
          </p>
          {email ? (
            <a
              href={`mailto:${email}`}
              className="text-sm underline-offset-4 hover:underline"
            >
              {email}
            </a>
          ) : null}
          {phone ? (
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="text-sm underline-offset-4 hover:underline"
            >
              {phone}
            </a>
          ) : null}
          {site.social.length > 0 ? (
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {site.social.map((item) => (
                <li key={item.href + item.label}>
                  <a
                    href={item.href}
                    className="text-sm underline-offset-4 hover:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="text-xs tracking-widest text-muted-foreground uppercase">
                {column.title}
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {column.links.map((item) => (
                  <li key={item.href + item.label}>
                    <ContentLink
                      href={item.href}
                      className="text-sm break-words underline-offset-4 hover:underline"
                    >
                      {item.label}
                    </ContentLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div
        className={`${shell} flex flex-col gap-2 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between`}
      >
        <span>{site.name}</span>
        <span>{site.footer.note}</span>
      </div>
    </footer>
  );
}
