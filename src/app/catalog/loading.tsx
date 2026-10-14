export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-8rem)] w-full px-10 py-5">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_3fr]">
        <div className="m-6">
          <h2 className="mb-2 ml-6 font-hanken text-sm font-semibold text-primary">
            Фильтры
          </h2>
          <div className="flex min-h-80 items-center justify-center rounded-lg bg-background p-6 shadow-sm">
            <div
              className="spinner-container"
              role="status"
              aria-label="Loading catalog filters"
            >
              <div className="spinner" />
            </div>
          </div>
        </div>
        <div className="flex min-h-[60vh] items-center justify-center rounded-lg bg-background p-6 shadow-sm">
          <div
            className="spinner-container"
            role="status"
            aria-label="Loading catalog products"
          >
            <div className="spinner" />
          </div>
        </div>
      </div>
    </div>
  );
}
