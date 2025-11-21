export function BookSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="mb-3 aspect-[3/4] w-full rounded-xl bg-slate-100" />
      <div className="h-4 rounded bg-slate-100" />
      <div className="mt-2 h-4 w-1/2 rounded bg-slate-100" />
      <div className="mt-4 h-3 rounded bg-slate-100" />
      <div className="mt-2 h-3 w-2/3 rounded bg-slate-100" />
      <div className="mt-6 h-9 rounded-lg bg-slate-100" />
    </div>
  )
}

