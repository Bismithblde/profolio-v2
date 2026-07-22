import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFrame } from "./components/site-frame";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ryan Chen | Software Engineer",
    template: "%s | Ryan Chen",
  },
  description:
    "Ryan Chen is a software engineer and product builder in New York, studying computer science at Stony Brook University.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteFrame>
          <main id="main-content">{children}</main>
        </SiteFrame>
      </body>
    </html>
  );
}
