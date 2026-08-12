import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://usc-nsl-ddb.github.io/ddb-landing/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "DDB — Source-Level Interactive Debugging for Distributed Applications",
  description: "DDB extends source-level interactive debugging across RPC boundaries with Distributed Backtrace, intent-preserving control, and Pause-Erased Time.",
  icons: { icon: "/ddb-logo.png", shortcut: "/ddb-logo.png", apple: "/ddb-logo.png" },
  openGraph: {
    title: "DDB — Debug beyond the process boundary.",
    description: "Source-level interactive debugging for distributed applications.",
    type: "website",
    images: [{ url: "/og.png", width: 1729, height: 910, alt: "DDB — Debug beyond the process boundary." }],
  },
  twitter: { card: "summary_large_image", title: "DDB — Debug beyond the process boundary.", description: "Source-level interactive debugging for distributed applications.", images: ["/og.png"] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, colorScheme: "light dark", themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f7f8fb" }, { media: "(prefers-color-scheme: dark)", color: "#080b12" }] };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{__html: `(function(){try{var t=localStorage.getItem('ddb-theme');if(!t)t=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){}})();`}} /></head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
