import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Sora } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anubhabghosh.com";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Anubhab Ghosh | AI Creator & Motion Designer",
    template: "%s | Anubhab Ghosh",
  },
  description: "Award-winning portfolio of cinematic AI videos, premium ads, motion graphics, and graphic design.",
  keywords: ["Anubhab Ghosh", "AI Creator", "Motion Designer", "Portfolio", "Cinematic Ads", "AI Videos"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Anubhab Ghosh | AI Creator & Motion Designer",
    description: "Award-winning portfolio of cinematic AI videos, premium ads, motion graphics, and graphic design.",
    url: siteUrl,
    siteName: "Anubhab Ghosh",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Anubhab Ghosh portfolio preview" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anubhab Ghosh | AI Creator & Motion Designer",
    description: "Award-winning portfolio of cinematic AI videos, premium ads, motion graphics, and graphic design.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${sora.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
