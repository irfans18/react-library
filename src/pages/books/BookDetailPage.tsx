import { Link, useParams } from 'react-router-dom'
import { AlertCircle, ArrowLeft, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBookQuery, useBorrowBookMutation } from '@/hooks/useLibraryQueries'
import { useToast } from '@/hooks/use-toast'
import dayjs from 'dayjs'

export default function BookDetailPage() {
  const params = useParams()
  const id = Number(params.id)
  const { data: book, isLoading, isError } = useBookQuery(id, Number.isFinite(id))
  const borrowMutation = useBorrowBookMutation()
  const { toast } = useToast()

  const handleBorrow = () => {
    borrowMutation.mutate(
      { bookId: id, days: 7 },
      {
        onSuccess: () => toast({ title: 'Borrowed successfully' }),
        onError: () =>
          toast({
            title: 'Borrow failed',
            description: 'Please try again later.',
            variant: 'destructive',
          }),
      },
    )
  }

  if (isLoading) {
    return <div className="text-center text-sm text-slate-500">Loading book...</div>
  }

  if (isError || !book) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
        <AlertCircle className="mx-auto mb-4 h-10 w-10 text-slate-400" />
        <p className="text-lg font-semibold text-slate-900">We couldn’t find that book.</p>
        <p className="mt-2 text-sm text-slate-500">It may have been removed or is temporarily unavailable.</p>
        <Button className="mt-6" asChild>
          <Link to="/">Back to list</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Button variant="ghost" asChild className="group px-0 text-slate-600">
        <Link to="/" className="inline-flex items-center gap-2 text-sm">
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
          Back to books
        </Link>
      </Button>

      <div className="grid gap-8 md:grid-cols-[320px,1fr]">
        <div className="rounded-3xl border border-slate-100 bg-gradient-to-br from-blue-50 to-white p-6">
          {book.coverImage ? (
            <img src={book.coverImage} alt={book.title} className="w-full rounded-2xl object-cover" />
          ) : (
            <div className="flex aspect-[3/4] items-center justify-center rounded-2xl bg-white text-5xl font-semibold text-blue-500">
              {book.title.charAt(0)}
            </div>
          )}
        </div>

        <div>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">{book.title}</h1>
              <p className="mt-2 text-sm text-slate-500">ISBN {book.isbn}</p>
            </div>
            <div className="rounded-2xl bg-amber-50 px-4 py-2 text-amber-700">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Star className="h-4 w-4 fill-current" />
                {book.rating.toFixed(1)}
              </div>
              <p className="text-xs text-amber-600">{book.reviewCount} reviews</p>
            </div>
          </div>

          <p className="mt-6 text-base text-slate-600">{book.description ?? 'No description yet.'}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 bg-white p-4">
              <p className="text-xs uppercase text-slate-400">Published</p>
              <p className="text-lg font-semibold text-slate-900">{book.publishedYear ?? '—'}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-4">
              <p className="text-xs uppercase text-slate-400">Available copies</p>
              <p className="text-lg font-semibold text-slate-900">{book.availableCopies}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-4">
              <p className="text-xs uppercase text-slate-400">Borrowed</p>
              <p className="text-lg font-semibold text-slate-900">{book.borrowCount} times</p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button onClick={handleBorrow} disabled={book.availableCopies <= 0 || borrowMutation.isPending}>
              Borrow for 7 days
            </Button>
            <div className="text-sm text-slate-500">
              Next due date: {dayjs().add(7, 'day').format('MMM DD, YYYY')}
            </div>
          </div>
        </div>
      </div>

      {book.reviews?.length ? (
        <div className="rounded-3xl border border-slate-100 bg-white p-6">
          <h2 className="text-xl font-semibold text-slate-900">Recent reviews</h2>
          <div className="mt-4 space-y-4">
            {book.reviews?.slice(0, 3).map((review) => (
              <div key={review.id} className="rounded-2xl border border-slate-100 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-slate-900">{review.user?.name}</p>
                  <span className="text-sm text-slate-500">{dayjs(review.createdAt).format('MMM D, YYYY')}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

