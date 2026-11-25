
"use client";

import { useEffect, useState } from "react";
import { MovieList } from "@/components/movie-list";
import type { Movie } from "@/lib/movies";

const API_URL =
  process.env.NEXT_PUBLIC_MOVIES_API_URL ?? "http://127.0.0.1:4001";

export default function MoviesClientPage() {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/movies`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Movie API responded with ${res.status}`);
        }
        return res.json();
      })
      .then((data: Movie[]) => setMovies(data))
      .catch(() => setFailed(true));
  }, []);

  return (
    <main className="mx-auto w-full max-w-2xl p-8">
      <h1 className="text-3xl font-bold">Movies (client-rendered)</h1>

      {failed ? (
        <p className="mt-6" role="alert">
          The movies could not be loaded. Is the Movie API running?
        </p>
      ) : movies === null ? (
        <p className="mt-6" role="status">
          Loading movies...
        </p>
      ) : (
        <MovieList movies={movies} />
      )}
    </main>
  );
}
