
import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <h1>404 – Page not found</h1>
      <p>
        Sorry, we couldn&apos;t find the page or skill you were looking for.
      </p>
      <Link href="/">Return to homepage</Link>
    </section>
  );
}
