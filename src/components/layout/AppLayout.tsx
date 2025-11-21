import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/navigation/Navbar'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

