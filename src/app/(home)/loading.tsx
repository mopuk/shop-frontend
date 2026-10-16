export default function HomeLoading() {
  return (
    <div className="flex flex-col w-full gap-16 sm:gap-24 overflow-hidden pb-12 animate-pulse">
      <section className="relative w-full overflow-hidden bg-tertiary border-b border-neutral/10 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="h-4 w-36 rounded bg-neutral/10 mb-4" />
            <div className="h-10 w-full sm:w-96 rounded bg-neutral/10 mb-2" />
            <div className="h-10 w-3/4 rounded bg-neutral/10 mb-6" />
            <div className="h-4 w-full sm:w-80 rounded bg-neutral/10 mb-2" />
            <div className="h-4 w-2/3 rounded bg-neutral/10 mb-8" />
            <div className="flex items-center gap-4">
              <div className="h-12 w-36 rounded-xl bg-neutral/15" />
              <div className="h-12 w-44 rounded-xl bg-neutral/10" />
            </div>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-neutral/10" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-neutral/10">
          <div>
            <div className="h-6 w-44 rounded bg-neutral/10 mb-2" />
            <div className="h-1 w-12 rounded-full bg-neutral/10" />
          </div>
          <div className="h-4 w-24 rounded bg-neutral/10" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col rounded-2xl border border-neutral/15 bg-background overflow-hidden"
            >
              <div className="h-56 w-full bg-tertiary border-b border-neutral/10" />
              <div className="p-5 flex flex-col gap-2">
                <div className="h-4 w-3/4 rounded bg-neutral/10" />
                <div className="h-4 w-1/3 rounded bg-neutral/10" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-neutral/10">
          <div>
            <div className="h-6 w-32 rounded bg-neutral/10 mb-2" />
            <div className="h-1 w-12 rounded-full bg-neutral/10" />
          </div>
          <div className="h-4 w-24 rounded bg-neutral/10" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-24 w-full rounded-2xl border border-neutral/15 bg-tertiary p-6 flex items-center justify-between"
            >
              <div className="h-5 w-28 rounded bg-neutral/10" />
              <div className="h-10 w-10 rounded-xl bg-neutral/10" />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-neutral/10">
          <div>
            <div className="h-6 w-24 rounded bg-neutral/10 mb-2" />
            <div className="h-1 w-12 rounded-full bg-neutral/10" />
          </div>
          <div className="h-4 w-24 rounded bg-neutral/10" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-20 w-full rounded-2xl border border-neutral/15 bg-tertiary p-6 flex items-center justify-center"
            >
              <div className="h-4 w-24 rounded bg-neutral/10" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
