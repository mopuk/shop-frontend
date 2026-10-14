export default function BrandsLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 w-full font-montserrat animate-pulse">
      <div className="mb-8 pb-4 border-b border-neutral/10">
        <div className="h-4 w-36 rounded bg-neutral/10 mb-4" />
        <div className="h-8 w-48 rounded bg-neutral/10 mb-2" />
        <div className="h-4 w-80 rounded bg-neutral/10" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-neutral/15 bg-tertiary h-48"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="h-6 w-32 rounded bg-neutral/10" />
              <div className="h-9 w-9 rounded-xl bg-neutral/10" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="h-3 w-full rounded bg-neutral/10" />
              <div className="h-3 w-2/3 rounded bg-neutral/10" />
            </div>

            <div className="pt-4 border-t border-neutral/10 flex items-center justify-between">
              <div className="h-4 w-24 rounded bg-neutral/10" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
