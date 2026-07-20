import Link from "next/link";
import { ProseLayout } from "@/components/prose-layout";

export const metadata = {
  title: "{{AUTHOR_NAME}}",
};

export default function HomePage() {
  return (
    <ProseLayout>
      <div className="space-y-6">
        <p>
          I&apos;m a software builder and writer. Replace this page with a short
          introduction — who you are and what you write about.
        </p>
        <p>
          Share your background, what you build professionally, and what you
          pursue outside of work.
        </p>
        <p>
          You can gain further insights through my{" "}
          <Link href="/blog">thoughts</Link>, <Link href="/projects">projects</Link>, or{" "}
          <a href="https://github.com/{{GITHUB_USERNAME}}">code</a>.{" "}
          <a href="mailto:{{AUTHOR_EMAIL}}">Reach out</a> if you&apos;d love to connect.
        </p>
      </div>
    </ProseLayout>
  );
}
