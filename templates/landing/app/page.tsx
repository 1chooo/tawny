import { FeaturedWork } from "@/components/featured-work";
import { Hero } from "@/components/hero";
import { Process } from "@/components/process";
import { StudioNote } from "@/components/studio-note";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <Process />
      <StudioNote />
    </>
  );
}
