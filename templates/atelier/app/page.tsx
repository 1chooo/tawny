import { Categories } from "@/components/categories";
import { Hero } from "@/components/hero";
import { Intro } from "@/components/intro";
import { Offerings } from "@/components/offerings";
import { SiteShell } from "@/components/site-shell";
import { Testimonials } from "@/components/testimonials";
import { Visit } from "@/components/visit";

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <Intro />
      <Categories />
      <Visit />
      <Testimonials />
      <Offerings />
    </SiteShell>
  );
}
