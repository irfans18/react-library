export const queryKeys = {
  books: (params?: unknown) => ['books', params] as const,
  book: (id: number) => ['book', id] as const,
  categories: ['categories'] as const,
  authors: ['authors'] as const,
  recommendations: (params?: unknown) => ['recommendations', params] as const,
  profile: ['profile'] as const,
  loans: (params?: unknown) => ['loans', params] as const,
  meLoans: (params?: unknown) => ['me', 'loans', params] as const,
  cart: ['cart'] as const,
}

