import { ShieldCheck } from 'lucide-react'
import { EmptyState } from '@/components/common/EmptyState'
import { PageHeader } from '@/components/common/PageHeader'

export default function AdminDashboardPage() {
  return (
    <div>
      <PageHeader
        title="Admin console"
        description="Lightweight placeholder until the full admin suite is delivered."
      />
      <EmptyState
        title="Admin area coming soon"
        description="We are tracking overdue loans, totals, and CRUD tools for authors, categories, and books."
        action={
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600">
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            Role based access will be enforced.
          </div>
        }
      />
    </div>
  )
}

