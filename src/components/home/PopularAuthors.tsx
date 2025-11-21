import { useAuthorsQuery } from '@/hooks/useLibraryQueries'
import type { Author } from '@/types'

function AuthorCard({ author }: { author: Author }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm transition-all hover:shadow-lg">
      <div className="h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
        <span className="text-lg font-bold text-white">
          {author.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </span>
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-slate-900 truncate">{author.name}</h3>
        <p className="text-sm text-slate-500">📚 5 books</p>
      </div>
    </div>
  )
}

function AuthorSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
      <div className="h-12 w-12 animate-pulse rounded-full bg-slate-200"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 animate-pulse rounded bg-slate-200"></div>
        <div className="h-3 w-2/3 animate-pulse rounded bg-slate-200"></div>
      </div>
    </div>
  )
}

export function PopularAuthors() {
  const { data: authorsResponse, isLoading } = useAuthorsQuery()
  const authors = authorsResponse?.authors?.slice(0, 4) || []

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Popular Authors</h2>
      
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <AuthorSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      )}
    </section>
  )
}
