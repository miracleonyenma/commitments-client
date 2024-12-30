import { Host_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/Site/Header";
import { Toaster } from "@/components/ui/sonner";
import Auth from "@/components/Auth";

const HostSans = Host_Grotesk({
  variable: "--font-host-grotesk-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
      </body>
      <Toaster position="top-center" offset={"2rem"} theme="system" />
    </html>
  );
}
