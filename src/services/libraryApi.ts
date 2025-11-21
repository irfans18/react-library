import api from './api'
import type {
  Author,
  Book,
  BooksQueryParams,
  BorrowBookPayload,
  Cart,
  Category,
  Loan,
  PaginatedResponse,
  ProfileSummary,
  Review,
  ReviewPayload,
} from '@/types'

export const libraryApi = {
  login: async (payload: { email: string; password: string }) => {
    const { data } = await api.post('/api/auth/login', payload)
    return data.data
  },
  register: async (payload: { name: string; email: string; password: string }) => {
    const { data } = await api.post('/api/auth/register', payload)
    return data.data
  },
  getBooks: async (params?: BooksQueryParams): Promise<PaginatedResponse<Book[], "books">> => {
    const { data } = await api.get('/api/books', { params })
    return data.data
  },
  getBook: async (id: number): Promise<Book> => {
    const { data } = await api.get(`/api/books/${id}`)
    return data.data
  },
  getCategories: async (): Promise<PaginatedResponse<Category[], "categories">> => {
    const { data } = await api.get('/api/categories')
    return data.data
  },
  getAuthors: async (): Promise<PaginatedResponse<Author[], "authors">> => {
    const { data } = await api.get('/api/authors')
    return data.data
  },
  getRecommendedBooks: async (params?: { by?: 'popular' | 'popular'; categoryId?: number; limit?: number }): Promise<PaginatedResponse<Book[], "books">> => {
    const { data } = await api.get('/api/books/recommend', { params })
    return data.data
  },
  borrowBook: async (payload: BorrowBookPayload) => {
    const { data } = await api.post('/api/loans', payload)
    return data.data
  },
  getMyLoans: async (params?: { status?: Loan['status']; page?: number; limit?: number }) => {
    const { data } = await api.get('/api/me/loans', { params })
    return data as PaginatedResponse<Loan>
  },
  getProfile: async (): Promise<ProfileSummary> => {
    const { data } = await api.get('/api/me')
    return data.data
  },
  updateProfile: async (payload: { name: string }) => {
    const { data } = await api.patch('/api/me', payload)
    return data.data
  },
  getReviewsForBook: async (bookId: number, params?: { page?: number; limit?: number }) => {
    const { data } = await api.get(`/api/reviews/book/${bookId}`, { params })
    return data as PaginatedResponse<Review>
  },
  createReview: async (payload: ReviewPayload) => {
    const { data } = await api.post('/api/reviews', payload)
    return data
  },
  getCart: async (): Promise<Cart> => {
    const { data } = await api.get('/api/cart')
    return data
  },
  clearCart: async () => {
    const { data } = await api.delete('/api/cart')
    return data
  },
}

