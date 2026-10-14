export default function ProductLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-pulse">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <section className="lg:col-span-7">
          <div className="relative aspect-4/3 w-full rounded-2xl border border-neutral/15 bg-tertiary flex items-center justify-center shadow-xs">
            <div className="h-44 w-44 rounded-full bg-neutral/10" />
            <div className="absolute bottom-6 h-4 w-40 rounded bg-neutral/10" />
          </div>
        </section>
        <section className="flex flex-col lg:col-span-5">
          <div className="flex items-center gap-2">
            <div className="h-4 w-24 rounded bg-neutral/10" />
            <div className="h-4 w-4 rounded-full bg-neutral/10" />
            <div className="h-4 w-28 rounded bg-neutral/10" />
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <div className="h-7 w-4/5 rounded-md bg-neutral/10" />
            <div className="h-7 w-1/2 rounded-md bg-neutral/10" />
          </div>
          <div className="mt-4 h-8 w-36 rounded-md bg-neutral/10" />

          <hr className="my-6 border-neutral/10" />
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="h-4 w-12 rounded bg-neutral/10" />
              <div className="h-4 w-20 rounded bg-neutral/10" />
            </div>

            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-10 w-10 rounded-full bg-neutral/10 border border-neutral/15"
                />
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <div className="h-4 w-16 rounded bg-neutral/10" />
            <div className="h-11 w-16 rounded-lg bg-neutral/10 border border-neutral/15" />
          </div>
          <div className="mt-8">
            <div className="h-14 w-full rounded-xl bg-neutral/10 border border-neutral/15" />
          </div>
          <div className="mt-10 border-t border-neutral/10 pt-6">
            <div className="h-4 w-36 rounded bg-neutral/10 mb-4" />
            <div className="space-y-2.5">
              <div className="h-3.5 w-full rounded bg-neutral/10" />
              <div className="h-3.5 w-11/12 rounded bg-neutral/10" />
              <div className="h-3.5 w-4/5 rounded bg-neutral/10" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
