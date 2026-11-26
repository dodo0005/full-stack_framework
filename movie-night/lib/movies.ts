
import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

export type Movie = {
  id: number;
  title: string;
  year: number;
  genre: string;
  minutes: number;
};

export type Vote = {
  movieId: number;
  count: number;
};

export type VoteResults = {
  votes: Vote[];
  countedAt: string;
};

const LATENCY_MS = Number(process.env.DEMO_LATENCY_MS ?? 800);

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function read<T>(file: string): Promise<T> {
  return JSON.parse(
    await readFile(path.join(process.cwd(), "data", file), "utf8")
  );
}

export async function getMovies(): Promise<Movie[]> {
  await wait(LATENCY_MS);
  return read<Movie[]>("movies.json");
}

export const getMovie = cache(async (id: number) => {
  await wait(LATENCY_MS);
  return (await read<Movie[]>("movies.json")).find(
    (movie) => movie.id === id
  );
});

export async function getVotes(): Promise<VoteResults> {
  await wait(LATENCY_MS);
  return {
    votes: await read<Vote[]>("votes.json"),
    countedAt: new Date().toISOString(),
  };
}

export function parseId(value: string): number | null {
  return /^[1-9]\d*$/.test(value) ? Number(value) : null;
}
