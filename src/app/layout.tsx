import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { AnimatedCursor } from "@/components/ui/animated-cursor";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "INSPECTOR | Bespoke Automotive Recording",
  description: "Experience the future of automotive clarity, protection, and intelligence with Inspector.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${outfit.variable} font-sans antialiased selection:bg-white/20`}>
        <SmoothScroll>
          <AnimatedCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
