
import { getMovie, parseId } from "@/lib/movies";
import { jsonError, serverError } from "@/lib/http";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const parsedId = parseId(id);

    if (parsedId === null) {
      return jsonError("Invalid movie ID", 400);
    }

    const movie = await getMovie(parsedId);

    if (!movie) {
      return jsonError("Movie not found", 404);
    }

    return Response.json(movie);
  } catch {
    return serverError();
  }
}
