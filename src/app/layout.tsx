import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono, Manrope, Space_Grotesk, Syne } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import { Cursor } from "@/components/ui/Cursor";
import { DEFAULT_THEME, themeScript, themes } from "@/lib/theme";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Ayoub Amensar — Graphic Designer à Casablanca",
  description:
    "Portfolio d’Ayoub Amensar, graphic designer à Casablanca : identités visuelles, campagnes social media, print, prépresse et signalétique.",
  keywords: ["Ayoub Amensar", "graphic designer", "Casablanca", "branding", "identité visuelle", "social media", "prépresse"],
  openGraph: {
    title: "Ayoub Amensar — Graphic Designer",
    description: "Identités visuelles, social media & print. Basé à Casablanca.",
    type: "website",
    locale: "fr_MA",
  },
};

export const viewport: Viewport = {
  themeColor: themes[DEFAULT_THEME].themeColor,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      data-theme={DEFAULT_THEME}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${syne.variable} ${grotesk.variable} ${interTight.variable} ${manrope.variable} ${jetbrains.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full overflow-x-clip">
        <MotionProvider>
          <Cursor />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
