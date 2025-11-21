import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import type { Book } from '@/types'
import { Button } from '@/components/ui/button'

interface BookCardProps {
  book: Book
  onBorrow?: (bookId: number) => void
  isBorrowing?: boolean
}

export function BookCard({ book, onBorrow, isBorrowing }: BookCardProps) {
  const handleBorrow = () => {
    if (onBorrow) {
      onBorrow(book.id)
    }
  }

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-3 aspect-[3/4] w-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-100 to-white">
        {book.coverImage ? (
          <img src={book.coverImage} alt={book.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl font-semibold text-blue-500">
            {book.title.charAt(0)}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <Link to={`/books/${book.id}`} className="text-lg font-semibold text-slate-900 hover:text-blue-600">
          {book.title}
        </Link>
        <p className="mt-1 text-sm text-slate-500">ISBN {book.isbn}</p>

        <div className="mt-4 flex items-center gap-2 text-sm text-amber-500">
          <Star className="h-4 w-4 fill-current" />
          <span>{book.rating.toFixed(1)}</span>
          <span className="text-slate-400">({book.reviewCount} reviews)</span>
        </div>

        <p className="mt-4 text-sm text-slate-600 line-clamp-2">{book.description ?? 'No description yet.'}</p>

        <div className="mt-auto flex items-center justify-between border-t pt-4">
          <div className="text-sm text-slate-500">
            <span className="font-semibold text-slate-900">{book.availableCopies}</span> copies
            available
          </div>
          {onBorrow ? (
            <Button size="sm" onClick={handleBorrow} disabled={book.availableCopies <= 0 || isBorrowing}>
              {book.availableCopies <= 0 ? 'Unavailable' : 'Borrow'}
            </Button>
          ) : (
            <Button asChild size="sm" variant="outline">
              <Link to={`/books/${book.id}`}>View</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

