import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "X-FACTORY",
  description: "X-factor와 INTERX Factory를 연결하는 몰입형 AI 온보딩 경험",
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
