import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s - {{AUTHOR_NAME}}",
    default: "{{AUTHOR_NAME}}",
  },
  description: "Software builder and writer. Replace this with your own bio.",
  openGraph: {
    title: "{{AUTHOR_NAME}}",
    description: "Software builder and writer. Replace this with your own bio.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} min-h-screen`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <body
        className={`${jetbrainsMono.className} min-h-screen bg-[var(--background)] font-mono text-[var(--foreground)] antialiased`}
      >
        <ThemeProvider>
          <div className="mx-auto max-w-2xl px-6 py-8 md:py-12">
            <SiteHeader />
            <main className="mt-8">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
