import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { profile } from "@/lib/links";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-link-sans",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-link-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} | Linktree`,
  description: profile.bio,
  icons: {
    icon: profile.faviconUrl,
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
      className={`${inter.variable} ${lora.variable}`}
      style={{ colorScheme: "only light" }}
    >
      <body>{children}</body>
    </html>
  );
}
