import { Host_Grotesk } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteHeader from "@/components/Site/Header";
import { Toaster } from "@/components/ui/sonner";
import Auth from "@/components/Auth";

const HostSans = Host_Grotesk({
  variable: "--font-host-grotesk-sans",
  subsets: ["latin"],
});

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://joinmemoire.netlify.app";
const APP_NAME = "Commitments";
const APP_DEFAULT_TITLE = "Commitments";
const APP_TITLE_TEMPLATE = "%s - Commitments";
const APP_DESCRIPTION = "Share updates as you build";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  metadataBase: new URL(APP_URL || "https://commitments.m10.live"),
};

export const viewport: Viewport = {
  themeColor: "#c7d2fe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${HostSans.variable} antialiased`}>
        <SiteHeader />
        <Auth />
        <div>{children}</div>
        <Toaster position="top-center" offset={"2rem"} theme="system" />
      </body>
    </html>
  );
}
