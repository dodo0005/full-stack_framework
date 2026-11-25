import Link from "next/link";
import { TopMovies } from "@/components/top-movies";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-2xl p-8">
      <h1 className="text-3xl font-bold">Movie Night</h1>
      <p className="mt-2">Pick the movie for our next movie night.</p>

      <nav className="mt-6 flex gap-4 underline">
        <Link href="/movies">Movies</Link>
        <Link href="/about">About</Link>
      </nav>

      <section aria-labelledby="top-3" className="mt-8">
  <h2 id="top-3" className="text-xl font-semibold">
    Tonight&apos;s top 3
  </h2>

  <Suspense
    fallback={
      <p className="mt-3" role="status">
        Counting the votes...
      </p>
    }
  >
    <TopMovies />
  </Suspense>
</section>
    </main>
  );
}
