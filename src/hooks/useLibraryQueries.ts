import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { libraryApi } from '@/services/libraryApi'
import { queryKeys } from '@/services/queryKeys'
import type { BooksQueryParams, BorrowBookPayload, Loan, ReviewPayload } from '@/types'

export const useBooksQuery = (params?: BooksQueryParams) => {
  return useQuery({
    queryKey: queryKeys.books(params),
    queryFn: () => libraryApi.getBooks(params),
    placeholderData: (previous) => previous,
  })
}

export const useBookQuery = (id: number, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.book(id),
    enabled,
    queryFn: () => libraryApi.getBook(id),
  })
}

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: libraryApi.getCategories,
  })
}

export const useAuthorsQuery = () => {
  return useQuery({
    queryKey: queryKeys.authors,
    queryFn: libraryApi.getAuthors,
  })
}

export const useRecommendedBooksQuery = (params?: { by?: 'rating' | 'popular'; categoryId?: number; limit?: number }) => {
  return useQuery({
    queryKey: queryKeys.recommendations(params),
    queryFn: () => libraryApi.getRecommendedBooks(params),
  })
}

export const useProfileQuery = () => {
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: libraryApi.getProfile,
  })
}

export const useMyLoansQuery = (params?: { status?: Loan['status']; page?: number; limit?: number }) => {
  return useQuery({
    queryKey: queryKeys.meLoans(params),
    queryFn: () => libraryApi.getMyLoans(params),
  })
}

export const useBorrowBookMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: BorrowBookPayload) => libraryApi.borrowBook(payload),
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.book(payload.bookId) })
      type BookData = Awaited<ReturnType<typeof libraryApi.getBook>>
      const previousBook = queryClient.getQueryData<BookData>(queryKeys.book(payload.bookId))

      queryClient.setQueryData<BookData | undefined>(queryKeys.book(payload.bookId), (oldBook) => {
        if (!oldBook) return oldBook
        return {
          ...oldBook,
          availableCopies: Math.max(oldBook.availableCopies - 1, 0),
        }
      })

      return { previousBook }
    },
    onError: (_, payload, context) => {
      if (context?.previousBook) {
        queryClient.setQueryData(queryKeys.book(payload.bookId), context.previousBook)
      }
    },
    onSettled: (_, __, payload) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.book(payload.bookId) })
      queryClient.invalidateQueries({ queryKey: ['books'] })
      queryClient.invalidateQueries({ queryKey: ['me', 'loans'] })
    },
  })
}

export const useReviewMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: ReviewPayload) => libraryApi.createReview(payload),
    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.book(payload.bookId) })
    },
  })
}

