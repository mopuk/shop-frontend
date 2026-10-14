export default function OrderDetailLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-pulse font-montserrat">
      <div className="mb-6">
        <div className="h-4 w-36 rounded bg-neutral/10 mb-4" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3">
          <div className="space-y-2">
            <div className="h-7 w-52 rounded-md bg-neutral/10" />
            <div className="h-4 w-40 rounded bg-neutral/10" />
          </div>
          <div className="h-11 w-44 rounded-xl bg-neutral/10" />
        </div>
      </div>
      <div className="rounded-xl border border-neutral/15 bg-background p-6 shadow-2xs mb-8">
        <div className="flex items-center justify-between gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <div className="h-8 w-8 rounded-full bg-neutral/10" />
              <div className="h-3 w-16 rounded bg-neutral/10" />
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <section className="lg:col-span-8 rounded-xl border border-neutral/15 bg-background p-6 shadow-2xs">
          <div className="h-5 w-40 rounded bg-neutral/10 mb-6" />
          <div className="divide-y divide-neutral/10">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="h-16 w-16 rounded-lg bg-neutral/10 shrink-0" />
                  <div className="space-y-2">
                    <div className="h-4 w-48 rounded bg-neutral/10" />
                    <div className="h-3 w-24 rounded bg-neutral/10" />
                  </div>
                </div>
                <div className="space-y-1 text-right">
                  <div className="h-4 w-20 rounded bg-neutral/10 ml-auto" />
                  <div className="h-3 w-14 rounded bg-neutral/10 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </section>
        <aside className="lg:col-span-4 sticky top-6">
          <div className="rounded-xl border border-neutral/15 bg-background p-6 shadow-2xs">
            <div className="h-5 w-28 rounded bg-neutral/10 mb-6" />
            <div className="space-y-4 border-b border-neutral/10 pb-4">
              <div className="flex justify-between items-center">
                <div className="h-3.5 w-32 rounded bg-neutral/10" />
                <div className="h-3.5 w-16 rounded bg-neutral/10" />
              </div>
              <div className="flex justify-between items-center">
                <div className="h-3.5 w-20 rounded bg-neutral/10" />
                <div className="h-3.5 w-16 rounded bg-neutral/10" />
              </div>
            </div>
            <div className="flex justify-between items-baseline pt-4">
              <div className="h-4 w-28 rounded bg-neutral/10" />
              <div className="h-6 w-24 rounded bg-neutral/10" />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
