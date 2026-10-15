import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import { profile } from "@/lib/profile";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-vcard-sans",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-vcard-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} | VCard`,
  description: profile.bio[0],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${robotoMono.variable}`}
      style={{ colorScheme: "dark" }}
    >
      <body className={roboto.className}>
        <div className="vcard-root">{children}</div>
      </body>
    </html>
  );
}
