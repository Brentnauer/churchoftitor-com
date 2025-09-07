// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import "devlink/global.css";
import { DevLinkProvider } from 'devlink/DevLinkProvider';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

const siteUrl = "https://www.timetravelinstitute.com";
const siteName = "The Church of Titor";
const siteDescription =
  "An apocryphal annex of the Time Travel Institute. A living hypertext liturgy dedicated to John Titor, retrocomputing, and temporal esoterica.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s — ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: "Time Travel Institute" }],
  generator: "Next.js",
  referrer: "strict-origin-when-cross-origin",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteName,
    siteName,
    description: siteDescription,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "The Church of Titor — Time Travel Institute",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    // Even if you don’t use Twitter, most link unfurlers support this card spec.
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/og.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <DevLinkProvider>{children}</DevLinkProvider>
      </body>
    </html>
  );
}
