import { Categories } from "@/components/mug-v2/categories";
import { Hero } from "@/components/mug-v2/hero";
import { Intro } from "@/components/mug-v2/intro";
import { Offerings } from "@/components/mug-v2/offerings";
import { SiteShell } from "@/components/mug-v2/site-shell";
import { Testimonials } from "@/components/mug-v2/testimonials";
import { Visit } from "@/components/mug-v2/visit";

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
