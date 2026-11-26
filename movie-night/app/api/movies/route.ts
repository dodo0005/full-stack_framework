
import { getMovies } from "@/lib/movies";
import { jsonError, serverError } from "@/lib/http";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const genre = searchParams.get("genre");

    const movies = await getMovies();

    const filtered = genre
      ? movies.filter(
          (movie) => movie.genre.toLowerCase() === genre.toLowerCase()
        )
      : movies;

    return Response.json(filtered);
  } catch {
    return serverError();
  }
}
