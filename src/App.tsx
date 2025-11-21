import { Route, Routes } from 'react-router-dom'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import BookListPage from '@/pages/books/BookListPage'
import BrowseBooksPage from '@/pages/books/BrowseBooksPage'
import BookDetailPage from '@/pages/books/BookDetailPage'
import MyLoansPage from '@/pages/loans/MyLoansPage'
import ProfilePage from '@/pages/profile/ProfilePage'
import CartPage from '@/pages/cart/CartPage'
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage'
import NotFoundPage from '@/pages/not-found/NotFoundPage'
import { ProtectedRoute } from '@/components/navigation/ProtectedRoute'
import { AppLayout } from '@/components/layout/AppLayout'
import { AuthLayout } from '@/components/layout/AuthLayout'

function App() {
  return (
    <Routes>
      <Route
        element={
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        }
        path="/login"
      />
      <Route
        element={
          <AuthLayout>
            <RegisterPage />
          </AuthLayout>
        }
        path="/register"
      />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<BookListPage />} />
        <Route path="/browse" element={<BrowseBooksPage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/loans" element={<MyLoansPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
