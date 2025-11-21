import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/common/EmptyState'
import { PageHeader } from '@/components/common/PageHeader'
import { libraryApi } from '@/services/libraryApi'
import { queryKeys } from '@/services/queryKeys'

export default function CartPage() {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.cart,
    queryFn: libraryApi.getCart,
  })

  if (isLoading) {
    return <div className="text-sm text-slate-500">Loading cart...</div>
  }

  if (!data || data.items?.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Add books to reserve them before borrowing."
        action={
          <Button asChild>
            <Link to="/">Browse books</Link>
          </Button>
        }
      />
    )
  }

  return (
    <div>
      <PageHeader title="Cart" description="Items reserved before confirming a loan." />
      <div className="rounded-2xl border border-slate-100 bg-white p-6">
        <div className="space-y-4">
          {data.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl border border-slate-50 p-4">
              <div>
                <p className="font-semibold text-slate-900">{item.book?.title ?? `Book #${item.productId}`}</p>
                <p className="text-sm text-slate-500">{item.qty} pcs</p>
              </div>
              <p className="text-sm font-medium text-slate-900">${item.subtotal.toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Subtotal</span>
            <span>${data.subtotal.toFixed(2)}</span>
          </div>
          <div className="mt-4 flex items-center justify-between text-base font-semibold text-slate-900">
            <span>Total</span>
            <span>${data.grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <Button className="mt-6 flex w-full items-center justify-center gap-2">
          <ShoppingCart className="h-4 w-4" />
          Convert to loan request
        </Button>
      </div>
    </div>
  )
}

