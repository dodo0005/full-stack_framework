
"use client";

export default function MoviesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto w-full max-w-2xl p-8">
      <div role="alert">
        <h1 className="text-2xl font-bold">
          The movies could not be loaded
        </h1>
        <p className="mt-2">
          {error.message || "Unknown error"}
        </p>
      </div>

      <button
        type="button"
        onClick={() => reset()}
        className="mt-4 rounded border px-4 py-2"
      >
        Try again
      </button>
    </main>
  );
}
