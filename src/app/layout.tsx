import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feet/Grand Order",
  description: "The degenerate FGO feet identification game",
  openGraph: {
    title: "Feet/Grand Order",
    type: "website",
    images: [{ url: "/feet-grand-order-logo.png", width: 551, height: 248 }],
    url: "https://feet-go.blargel.com/",
    description: "The degenerate FGO feet identification game",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
