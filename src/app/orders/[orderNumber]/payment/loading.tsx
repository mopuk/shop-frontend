export default function PaymentLoading() {
  return (
    <main className="mx-auto max-w-xl px-4 py-12 font-montserrat animate-pulse">
      <div className="mb-6 space-y-3">
        <div className="h-4 w-36 rounded bg-neutral/10" />
        <div className="h-7 w-64 rounded-md bg-neutral/10" />
      </div>
      <div className="rounded-2xl border border-neutral/15 bg-background p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <div className="h-3.5 w-28 rounded bg-neutral/10" />
            <div className="h-11 w-full rounded-lg bg-neutral/10 border border-neutral/15" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-3.5 w-24 rounded bg-neutral/10" />
              <div className="h-11 w-full rounded-lg bg-neutral/10 border border-neutral/15" />
            </div>
            <div className="space-y-2">
              <div className="h-3.5 w-16 rounded bg-neutral/10" />
              <div className="h-11 w-full rounded-lg bg-neutral/10 border border-neutral/15" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3.5 w-32 rounded bg-neutral/10" />
            <div className="h-11 w-full rounded-lg bg-neutral/10 border border-neutral/15" />
          </div>
          <div className="h-12 w-full rounded-xl bg-neutral/15 mt-2" />
          <div className="flex items-center justify-center gap-2 pt-1">
            <div className="h-3.5 w-3.5 rounded-full bg-neutral/10" />
            <div className="h-3 w-64 rounded bg-neutral/10" />
          </div>
        </div>
      </div>
    </main>
  );
}
