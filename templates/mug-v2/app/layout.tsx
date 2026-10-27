import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { RootShell } from "@/components/root-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Jane Mug — Handmade mugs & pottery",
    template: "%s — Jane Mug",
  },
  description:
    "Wheel-thrown mugs and cups made in small batches. Shop the current kiln.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full`}
    >
      <body className="font-sans">
        <RootShell>{children}</RootShell>
      </body>
    </html>
  );
}
