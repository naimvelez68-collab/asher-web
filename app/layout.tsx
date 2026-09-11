import type { Metadata, Viewport } from "next";
import { Inter, Libre_Baskerville, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif-brand",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-brand",
});

export const metadata: Metadata = {
  title: "ASHER | Consultora de Crecimiento de Marca",
  description:
    "Construimos, mejoramos, digitalizamos, publicitamos y protegemos tu marca. Consultora premium de branding, marketing digital y blindaje legal.",
  keywords: ["branding", "marketing digital", "publicidad", "diseño de marca", "registro de marca", "Ecuador"],
  openGraph: {
    title: "ASHER | Consultora de Crecimiento de Marca",
    description: "Construimos, mejoramos, digitalizamos, publicitamos y protegemos tu marca.",
    type: "website",
  },
  icons: {
    icon: "/veyra.png",
    apple: "/veyra.png",
    shortcut: "/veyra.png",
  },
  appleWebApp: {
    capable: true,
    title: "ASHER",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F4ED",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${libreBaskerville.variable} ${ibmPlexMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
