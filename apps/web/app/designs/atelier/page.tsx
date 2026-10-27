import { Categories } from "@/components/atelier/categories";
import { Hero } from "@/components/atelier/hero";
import { Intro } from "@/components/atelier/intro";
import { Offerings } from "@/components/atelier/offerings";
import { SiteShell } from "@/components/atelier/site-shell";
import { Testimonials } from "@/components/atelier/testimonials";
import { Visit } from "@/components/atelier/visit";

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
