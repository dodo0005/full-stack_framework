
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-2xl p-8">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-2">This page does not exist.</p>
      <Link href="/movies" className="mt-6 inline-block underline">
        See all movies
      </Link>
    </main>
  );
}
