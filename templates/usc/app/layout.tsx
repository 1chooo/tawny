import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import { SiteFrame } from "@/components/site-frame";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dr. Alexandra J. Martinez - USC Professor",
  description: "Professor of Biomedical Engineering at the University of Southern California",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sourceSans.className} flex min-h-dvh flex-col antialiased`}>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
