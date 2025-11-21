// Based on swagger.json

export interface Book {
  id: number
  title: string
  description?: string
  isbn: string
  publishedYear?: number
  coverImage?: string
  rating: number
  reviewCount: number
  totalCopies: number
  availableCopies: number
  borrowCount: number
  authorId: number
  categoryId: number
  createdAt: string // date-time
  updatedAt: string // date-time
  author?: Author
  category?: Category
  reviews?: Review[]
}

export interface Author {
  id: number
  name: string
  bio?: string
}

export interface Category {
  id: number
  name: string
}

export interface Loan {
  id: number
  userId: number
  bookId: number
  borrowedAt: string // date-time
  dueAt: string // date-time
  returnedAt?: string // date-time
  status: 'BORROWED' | 'LATE' | 'RETURNED'
  book?: Book
}

export interface Review {
  id: number
  userId: number
  bookId: number
  rating: number
  comment?: string
  createdAt: string // date-time
  user?: { id: number; name: string }
}

export interface User {
  id: number
  name: string
  email: string
  role: 'ADMIN' | 'USER'
}

export interface LoginResponse {
  token: string
  user: User
}

export type CommonResponse<T> = {
  success: boolean;
  message: string;
  data: T;
}

export type PaginatedResponse<T, K extends string = 'data'> = 
Record<K, T> & {
  pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
  }
};

export interface BooksQueryParams {
  q?: string
  categoryId?: number
  authorId?: number
  page?: number
  limit?: number
}

export interface BorrowBookPayload {
  bookId: number
  days: number
}

export interface ProfileSummary {
  user: User
  totalLoans: number
  activeLoans: number
  overdueLoans: number
}

export interface ReviewPayload {
  bookId: number
  star: number
  comment?: string
}

export interface CartItem {
  id: number
  productId: number
  qty: number
  subtotal: number
  title?: string
  book?: Book
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  grandTotal: number
}