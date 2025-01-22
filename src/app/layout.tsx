import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your life (before the singularity) in weeks",
  description: "A visualization of how much of your pre-AGI life has passed.",
  icons: {
    icon: "/square.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col gap-6 py-6 [&_a]:text-blue-500 hover:[&_a]:text-blue-700 [&_a]:underline`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
