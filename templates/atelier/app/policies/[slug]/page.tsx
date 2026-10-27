import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { sectionTitle, shell } from "@/components/styles";
import { getPolicy, site } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return site.policies.map((policy) => ({ slug: policy.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) return { title: "Policy" };
  return { title: policy.label, description: policy.body };
}

export default async function PolicyPage({ params }: Props) {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) notFound();

  return (
    <SiteShell>
      <article className={`${shell} max-w-3xl py-20 md:py-28`}>
        <h1 className={sectionTitle}>{policy.label}</h1>
        <p className="mt-6 max-w-prose text-base leading-relaxed text-muted-foreground">
          {policy.body}
        </p>
      </article>
    </SiteShell>
  );
}
