import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "A flat-fee audit of your dental software costs. See which vendors to replace and which to keep, including whether an AI receptionist is worth the switch.";

export const metadata: Metadata = {
  title: {
    default: "Dental Software Costs, Audited for Solo Practices | VendorSwap",
    template: "%s | VendorSwap",
  },
  description,
  openGraph: {
    type: "website",
    siteName: "VendorSwap",
    title: "Know which dental software you can safely cancel",
    description,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
