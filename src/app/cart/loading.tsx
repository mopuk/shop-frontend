export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-8rem)] w-full px-10 py-5">
      <h1 className="mb-2 ml-6 font-hanken text-xl font-semibold text-primary">
        Корзина
      </h1>
      <div className="grid grid-cols-[2fr_1fr] gap-4">
        <div className="flex min-h-80 items-center justify-center rounded-lg bg-background p-6 shadow-sm">
          <div
            className="spinner-container"
            role="status"
            aria-label="Loading cart items"
          >
            <div className="spinner" />
          </div>
        </div>
        <div className="flex min-h-80 items-center justify-center rounded-lg bg-background p-6 shadow-sm">
          <div
            className="spinner-container"
            role="status"
            aria-label="Loading order summary"
          >
            <div className="spinner" />
          </div>
        </div>
      </div>
    </div>
  );
}
