import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "INTERX WORLD",
  description: "Immersive AI Onboarding Experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
