import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { DeskAppShell } from "@/components/desk-shell";
import { DeskProvider } from "@/components/desk-store";
import "./globals.css";

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-desk-sans",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-desk-mono",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-desk-serif",
});

export const metadata: Metadata = {
  title: "Desk",
  description: "A project desk — tasks, calendar, team, and import.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${serif.variable} h-full`}
    >
      <body className="flex h-dvh flex-col overflow-hidden antialiased">
        <DeskProvider>
          <DeskAppShell>{children}</DeskAppShell>
        </DeskProvider>
      </body>
    </html>
  );
}
