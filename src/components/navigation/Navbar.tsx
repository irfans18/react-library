import { Link, NavLink, useNavigate } from 'react-router-dom'
import { BookMarked, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/store'
import { logout } from '@/features/auth/authSlice'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/browse', label: 'Browse Books' },
  { to: '/loans', label: 'My Loans' },
  { to: '/profile', label: 'My Profile' },
  { to: '/cart', label: 'Cart' },
  { to: '/admin', label: 'Admin' },
]

export function Navbar() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-blue-600">
          <BookMarked className="h-6 w-6" />
          <span>Booky</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'text-blue-600' : 'hover:text-blue-600')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden text-sm text-slate-600 md:block">{user?.name}</div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={handleLogout}
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}

