import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PageHeader } from '@/components/common/PageHeader'
import { StatCard } from '@/components/common/StatCard'
import { useProfileQuery } from '@/hooks/useLibraryQueries'
import { libraryApi } from '@/services/libraryApi'
import { useToast } from '@/hooks/use-toast'

const schema = z.object({
  name: z.string().min(2),
})

type FormValues = z.infer<typeof schema>

export default function ProfilePage() {
  const { data, isLoading } = useProfileQuery()
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '' },
  })

  useEffect(() => {
    if (data?.user?.name) {
      form.reset({ name: data.user.name })
    }
  }, [data, form])

  const mutation = useMutation({
    mutationFn: libraryApi.updateProfile,
    onSuccess: () => {
      toast({ title: 'Profile updated' })
    },
    onError: () =>
      toast({
        title: 'Update failed',
        variant: 'destructive',
      }),
  })

  const onSubmit = (values: FormValues) => mutation.mutate(values)

  if (isLoading || !data) {
    return <div className="text-sm text-slate-500">Loading profile...</div>
  }

  return (
    <div className="space-y-8">
      <PageHeader title="My profile" description="View your account info and update your name." />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total loans" value={data.totalLoans} />
        <StatCard label="Active loans" value={data.activeLoans} />
        <StatCard label="Overdue loans" value={data.overdueLoans} helper="Return them soon to avoid penalties." />
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Profile details</h2>
        <form className="mt-6 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600">Name</label>
            <Input {...form.register('name')} disabled={mutation.isPending} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600">Email</label>
            <Input value={data.user.email} disabled />
          </div>

          <Button type="submit" disabled={mutation.isPending}>
            Save changes
          </Button>
        </form>
      </div>
    </div>
  )
}

