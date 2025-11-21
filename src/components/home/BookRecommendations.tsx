import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRecommendedBooksQuery } from '@/hooks/useLibraryQueries'
import type { Book } from '@/types'

interface BookRecommendationsProps {
  title: string
  by?: 'rating' | 'popular'
}

function BookCard({ book }: { book: Book }) {
  return (
    <Link 
      to={`/books/${book.id}`}
      className="group block rounded-2xl bg-white p-4 shadow-sm transition-all hover:shadow-lg"
    >
      <div className="aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 mb-3">
        {book.coverImage ? (
          <img 
            src={book.coverImage} 
            alt={book.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-slate-400">
            {book.title.charAt(0)}
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="font-semibold text-slate-900 text-sm leading-tight" style={{ 
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>{book.title}</h3>
        <p className="text-xs text-slate-500">{book.author?.name || 'Unknown Author'}</p>
        
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium text-slate-700">{book.rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  )
}

function BookSkeleton() {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="aspect-3/4 animate-pulse rounded-xl bg-slate-200 mb-3"></div>
      <div className="space-y-2">
        <div className="h-4 animate-pulse rounded bg-slate-200"></div>
        <div className="h-3 w-2/3 animate-pulse rounded bg-slate-200"></div>
        <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200"></div>
      </div>
    </div>
  )
}

export function BookRecommendations({ title, by = 'rating' }: BookRecommendationsProps) {
  const [limit, setLimit] = useState(10)
  const { data: booksResponse, isLoading } = useRecommendedBooksQuery({ by, limit })

  const books = booksResponse?.books ?? []

  const handleLoadMore = () => {
    setLimit(prev => prev + 10)
  }

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      
      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <BookSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          
          {books.length >= limit && (
            <div className="flex justify-center">
              <Button 
                variant="outline" 
                onClick={handleLoadMore}
                className="rounded-full px-8"
              >
                Load More
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  )
}
