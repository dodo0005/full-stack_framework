import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { NavLink } from "@/components/nav-link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Movie Night",
    default: "Movie Night",
  },
  description: "Pick the movie for our next movie night",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b">
          <nav aria-label="Main" className="mx-auto flex w-full max-w-2xl gap-6 p-4">
            <Link href="/" className="font-bold">
              Movie Night
            </Link>
            <NavLink href="/movies">Movies</NavLink>
            <NavLink href="/about">About</NavLink>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}