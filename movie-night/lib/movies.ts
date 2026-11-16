import movies from "@/data/movies.json";

export type Movie = {
  id: number;
  title: string;
  year: number;
  genre: string;
  minutes: number;
};

// Simulates a slow database query (1 second)
export async function getMovies(): Promise<Movie[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return movies;
}

// The id comes from the URL, so it is a string: "2", not 2
export async function getMovie(id: string): Promise<Movie | undefined> {
  const all = await getMovies();
  return all.find((movie) => String(movie.id) === id);
}