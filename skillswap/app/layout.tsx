
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SkillSwap",
  description: "A community-based skill exchange platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <Link href="/" className="site-title">
            SkillSwap
          </Link>
          <Navbar />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

// Replace this placeholder with a normal Next.js Link,
// as shown in the note below.
