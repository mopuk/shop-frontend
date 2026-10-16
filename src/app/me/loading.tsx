export default function ProfileLoading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 font-montserrat animate-pulse">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-2xl border border-neutral/15 bg-white p-6 sm:p-8 shadow-xs mb-10">
        <div className="flex items-center gap-5">
          <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-2xl bg-neutral/10" />

          <div className="flex flex-col gap-2">
            <div className="h-6 w-40 rounded-md bg-neutral/10" />
            <div className="h-3.5 w-52 rounded bg-neutral/10" />
            <div className="h-3.5 w-36 rounded bg-neutral/10 mt-1" />
          </div>
        </div>

        <div className="h-11 w-44 rounded-md bg-neutral/10 self-start sm:self-center" />
      </header>

      <div className="flex flex-col gap-12">
        <section className="flex flex-col gap-5">
          <div className="flex items-baseline justify-between border-b border-neutral/10 pb-3">
            <div className="h-5 w-44 rounded bg-neutral/10" />
            <div className="h-3.5 w-16 rounded bg-neutral/10" />
          </div>

          <div className="overflow-hidden rounded-2xl border border-neutral/15 bg-background shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral/10 bg-tertiary px-6 py-4">
              <div className="flex flex-wrap items-center gap-6">
                <div className="space-y-1.5">
                  <div className="h-3 w-16 rounded bg-neutral/10" />
                  <div className="h-4 w-24 rounded bg-neutral/10" />
                </div>
                <div className="space-y-1.5">
                  <div className="h-3 w-14 rounded bg-neutral/10" />
                  <div className="h-4 w-20 rounded bg-neutral/10" />
                </div>
                <div className="space-y-1.5">
                  <div className="h-3 w-12 rounded bg-neutral/10" />
                  <div className="h-4 w-16 rounded bg-neutral/10" />
                </div>
              </div>
              <div className="h-7 w-28 rounded-full bg-neutral/10" />
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    <div className="h-7 w-7 rounded-full bg-neutral/10" />
                    <div className="h-3 w-14 rounded bg-neutral/10" />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-4 rounded-xl border border-neutral/10 bg-tertiary/50 p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-lg bg-neutral/10 shrink-0" />
                    <div className="space-y-2">
                      <div className="h-4 w-44 rounded bg-neutral/10" />
                      <div className="h-3 w-28 rounded bg-neutral/10" />
                    </div>
                  </div>
                  <div className="h-4 w-24 rounded bg-neutral/10" />
                </div>
              </div>
            </div>

            <div className="border-t border-neutral/10 bg-background px-6 py-4">
              <div className="h-4 w-32 rounded bg-neutral/10" />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-baseline justify-between border-b border-neutral/10 pb-3">
            <div className="h-5 w-36 rounded bg-neutral/10" />
            <div className="h-3.5 w-16 rounded bg-neutral/10" />
          </div>

          <div className="overflow-hidden rounded-2xl border border-neutral/15 bg-background shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral/10 bg-tertiary px-6 py-4">
              <div className="flex flex-wrap items-center gap-6">
                <div className="space-y-1.5">
                  <div className="h-3 w-16 rounded bg-neutral/10" />
                  <div className="h-4 w-24 rounded bg-neutral/10" />
                </div>
                <div className="space-y-1.5">
                  <div className="h-3 w-14 rounded bg-neutral/10" />
                  <div className="h-4 w-20 rounded bg-neutral/10" />
                </div>
                <div className="space-y-1.5">
                  <div className="h-3 w-12 rounded bg-neutral/10" />
                  <div className="h-4 w-16 rounded bg-neutral/10" />
                </div>
              </div>
              <div className="h-7 w-24 rounded-full bg-neutral/10" />
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between gap-4 rounded-xl border border-neutral/10 bg-tertiary/50 p-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-lg bg-neutral/10 shrink-0" />
                  <div className="space-y-2">
                    <div className="h-4 w-44 rounded bg-neutral/10" />
                    <div className="h-3 w-28 rounded bg-neutral/10" />
                  </div>
                </div>
                <div className="h-4 w-24 rounded bg-neutral/10" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-neutral/10 bg-white px-6 py-4">
              <div className="h-4 w-32 rounded bg-neutral/10" />
              <div className="flex items-center gap-3">
                <div className="h-9 w-28 rounded-md bg-neutral/10" />
                <div className="h-9 w-32 rounded-md bg-neutral/10" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
