
import { getVotes } from "@/lib/movies";
import { serverError } from "@/lib/http";

export async function GET() {
  try {
    const results = await getVotes();
    return Response.json(results);
  } catch {
    return serverError();
  }
}
