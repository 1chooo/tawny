import Image from "next/image";
import { CobaltLink } from "./cobalt-link";

export function SplitShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-foreground lg:block">
        <Image
          src="/images/hero-mugs.png"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover opacity-90"
        />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 bg-foreground/80 p-10 text-background backdrop-blur-sm">
          <p className="font-display text-3xl font-semibold tracking-tight text-balance">
            Keep your bag, and be first when the kiln opens.
          </p>
          <p className="font-mono text-xs uppercase tracking-widest opacity-70">
            Jane Mug Ceramics
          </p>
        </div>
      </aside>
      <main className="flex flex-col px-6 py-8 md:px-12">
        <CobaltLink href="/" className="flex w-fit items-center gap-2.5" aria-label="Jane Mug home">
          <span
            aria-hidden
            className="flex size-7 items-center justify-center rounded-full bg-primary"
          >
            <span className="size-2.5 bg-primary-foreground" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Jane Mug
          </span>
        </CobaltLink>
        <div className="flex flex-1 items-center justify-center py-12">
          <div id="sign-in" className="w-full max-w-sm">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
