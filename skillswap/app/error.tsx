
"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section>
      <h1>Something went wrong</h1>
      <p>
        We couldn&apos;t load this page. Please try again.
      </p>
      <button onClick={() => reset()}>
        Try again
      </button>
    </section>
  );
}
