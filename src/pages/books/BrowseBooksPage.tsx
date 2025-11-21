import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { useAuthorsQuery, useBooksQuery, useBorrowBookMutation, useCategoriesQuery } from '@/hooks/useLibraryQueries'
import { BookCard } from '@/components/books/BookCard'
import { BookSkeleton } from '@/components/books/BookSkeleton'
import { EmptyState } from '@/components/common/EmptyState'
import { PageHeader } from '@/components/common/PageHeader'

export default function BrowseBooksPage() {
  const [searchParams] = useSearchParams()
  
  // Initialize state from URL params
  const [search, setSearch] = useState(() => searchParams.get('q') || '')
  const [categoryId, setCategoryId] = useState<string | undefined>(() => searchParams.get('categoryId') || undefined)
  const [authorId, setAuthorId] = useState<string | undefined>(() => searchParams.get('authorId') || undefined)

  const { data: booksResponse, isLoading, isError } = useBooksQuery({
    q: search || undefined,
    categoryId: categoryId ? Number(categoryId) : undefined,
    authorId: authorId ? Number(authorId) : undefined,
  })
  const { data: categoriesResponse } = useCategoriesQuery()
  const { data: authorsResponse } = useAuthorsQuery()
  const { toast } = useToast()

  const borrowMutation = useBorrowBookMutation()

  const books = booksResponse?.books ?? []
  const categories = categoriesResponse?.categories ?? []
  const authors = authorsResponse?.authors ?? []

  const filtersApplied = useMemo(() => Boolean(search || categoryId || authorId), [search, categoryId, authorId])

  const clearFilters = () => {
    setSearch('')
    setCategoryId(undefined)
    setAuthorId(undefined)
  }

  const handleBorrow = (bookId: number) => {
    borrowMutation.mutate(
      { bookId, days: 7 },
      {
        onSuccess: () => {
          toast({ title: 'Borrowed', description: 'Enjoy your reading!' })
        },
        onError: () => {
          toast({
            title: 'Borrow failed',
            description: 'Please try again later.',
            variant: 'destructive',
          })
        },
      },
    )
  }

  if (isError) {
    return (
      <div className="text-center">
        <PageHeader title="Browse books" description="Search across categories, authors, and ratings." />
        <EmptyState 
          title="Unable to load books" 
          description="Please check your API connection and try again." 
        />
      </div>
    )
  }

  return (
    <>
      <PageHeader
        title="Browse books"
        description="Search across categories, authors, and ratings."
        actions={
          filtersApplied ? (
            <Button variant="ghost" onClick={clearFilters}>
              Clear filters
            </Button>
          ) : null
        }
      />

      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-600">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="pl-9"
              placeholder="Title, keyword, ISBN"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Category</label>
          <select
            value={categoryId ?? ''}
            onChange={(event) => setCategoryId(event.target.value || undefined)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            {categories.length > 0 && categories?.map((category) => (
              <option key={category.id} value={String(category.id)}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Author</label>
          <select
            value={authorId ?? ''}
            onChange={(event) => setAuthorId(event.target.value || undefined)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            {authors.length > 0 && authors?.map((author) => (
              <option key={author.id} value={String(author.id)}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
        <SlidersHorizontal className="h-4 w-4" />
        Showing {books.length} books
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <BookSkeleton key={index} />
          ))}
        </div>
      ) : books.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onBorrow={handleBorrow}
              isBorrowing={borrowMutation.isPending}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No books found"
          description="Try a different keyword or remove filters."
          action={<Button onClick={() => setSearch('')}>Reset search</Button>}
        />
      )}
    </>
  )
}
