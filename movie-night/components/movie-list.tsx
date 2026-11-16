import Link from "next/link";
import type { Movie } from "@/lib/movies";

export function MovieList({ movies }: { movies: Movie[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {movies.map((movie) => (
        <li key={movie.id} className="rounded border p-4">
          <h2 className="font-semibold">
            <Link href={`/movies/${movie.id}`} className="hover:underline">
              {movie.title} ({movie.year})
            </Link>
          </h2>
          <p className="text-sm">
            {movie.genre} · {movie.minutes} min
          </p>
        </li>
      ))}
    </ul>
  );
}