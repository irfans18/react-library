import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-slate-100 bg-white p-8 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-slate-900">Page not found</h1>
      <p className="mt-2 text-sm text-slate-600">We couldn’t find what you were looking for.</p>
      <Button className="mt-6" asChild>
        <Link to="/">Go home</Link>
      </Button>
    </div>
  )
}

