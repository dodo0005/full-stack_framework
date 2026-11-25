
import Link from "next/link";
import { getMovies, getVotes } from "@/lib/movies";

const timeFormat = new Intl.DateTimeFormat("en-GB", {
  timeStyle: "medium",
  timeZone: "Europe/Paris",
});

export async function TopMovies() {
  // First experiment: sequential fetching
const [movies, { votes, countedAt }] = await Promise.all([
  getMovies({ cache: "no-store" }),
  getVotes({ cache: "no-store" }),
]);

  const top = [...votes]
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  return (
    <>
      <ol className="mt-3 list-decimal space-y-1 pl-6">
        {top.map((vote) => (
          <li key={vote.movieId}>
            <Link
              href={`/movies/${vote.movieId}`}
              className="underline underline-offset-4"
            >
              {movies.find((movie) => movie.id === vote.movieId)?.title}
            </Link>
            : {vote.count} votes
          </li>
        ))}
      </ol>

      <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
        Votes counted at {timeFormat.format(new Date(countedAt))}
      </p>
    </>
  );
}
