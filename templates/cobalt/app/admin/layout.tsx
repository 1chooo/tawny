import type { Metadata } from "next";
import { TopBar } from "@/components/top-bar";
import { STUDIO_EMAIL } from "@/lib/sales";

export const metadata: Metadata = {
  title: "Studio admin — Jane Mug",
  description: "Sales for the Jane Mug studio.",
  robots: { index: false },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-dvh bg-background p-3 sm:p-4 md:p-6">
      <div className="mx-auto flex min-h-[calc(100dvh-1.5rem)] max-w-[1400px] flex-col border border-foreground bg-card sm:min-h-[calc(100dvh-2rem)] md:min-h-[calc(100dvh-3rem)]">
        <TopBar email={STUDIO_EMAIL} />
        <div className="flex min-w-0 flex-1 flex-col gap-8 px-4 py-6 md:px-6 lg:px-8 lg:py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
