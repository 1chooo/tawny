import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-board-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Board",
  description:
    "An issue dashboard on a 4px grid — 16px icons, labels and ids on the left, numbers and dates on the right.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sans.variable}>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
