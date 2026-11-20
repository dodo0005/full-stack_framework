
export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <aside
        aria-label="Notes"
        className="mx-auto w-full max-w-2xl px-8 pt-6"
      >
        <label className="flex items-center gap-2 text-sm">
          Notes for tonight
          <input
            type="text"
            className="rounded border px-2 py-1"
          />
        </label>
      </aside>

      {children}
    </>
  );
}
