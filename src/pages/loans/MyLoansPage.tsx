import dayjs from 'dayjs'
import { Badge } from '@/components/ui/badge'
import { useMyLoansQuery } from '@/hooks/useLibraryQueries'
import { PageHeader } from '@/components/common/PageHeader'
import { EmptyState } from '@/components/common/EmptyState'

export default function MyLoansPage() {
  const { data, isLoading } = useMyLoansQuery()

  if (isLoading) {
    return <div className="text-sm text-slate-500">Loading your loans...</div>
  }

  const loans = data?.data ?? []

  return (
    <div>
      <PageHeader title="My loans" description="Active and past loans linked to your account." />

      {loans.length === 0 ? (
        <EmptyState title="No loans yet" description="Borrow a book to see it listed here." />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-3">Book</th>
                <th className="px-6 py-3">Borrowed</th>
                <th className="px-6 py-3">Due</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.id} className="border-t border-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{loan.book?.title ?? `Book #${loan.bookId}`}</td>
                  <td className="px-6 py-4 text-slate-600">{dayjs(loan.borrowedAt).format('MMM D, YYYY')}</td>
                  <td className="px-6 py-4 text-slate-600">{dayjs(loan.dueAt).format('MMM D, YYYY')}</td>
                  <td className="px-6 py-4">
                    <Badge variant={loan.status === 'LATE' ? 'destructive' : loan.status === 'RETURNED' ? 'outline' : 'default'}>
                      {loan.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

