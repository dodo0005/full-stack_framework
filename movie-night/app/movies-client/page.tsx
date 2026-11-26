
"use client";

import { useEffect, useState } from "react";
import { MovieList } from "@/components/movie-list";
import type { Movie } from "@/lib/movies";

export default function MoviesClientPage() {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [genre, setGenre] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setMovies(null);
    setFailed(false);

    const query = genre ? `?genre=${encodeURIComponent(genre)}` : "";

    fetch(`/api/movies${query}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Movie API responded with ${res.status}`);
        }
        return res.json();
      })
      .then((data: Movie[]) => setMovies(data))
      .catch(() => setFailed(true));
  }, [genre]);

  return (
    <main className="mx-auto w-full max-w-2xl p-8">
      <h1 className="text-3xl font-bold">Movies (client-rendered)</h1>

      <label htmlFor="genre" className="mt-6 block">
        Filter by genre
      </label>
      <select
        id="genre"
        value={genre}
        onChange={(event) => setGenre(event.target.value)}
        className="mt-2 rounded border p-2 text-black"
      >
        <option value="">All genres</option>
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Sci-Fi">Sci-Fi</option>
      </select>

      {failed ? (
        <p className="mt-6" role="alert">
          The movies could not be loaded. Please try again.
        </p>
      ) : movies === null ? (
        <p className="mt-6" role="status">
          Loading movies...
        </p>
      ) : movies.length === 0 ? (
        <p className="mt-6">No movies found for this genre.</p>
      ) : (
        <MovieList movies={movies} />
      )}
    </main>
  );
}
