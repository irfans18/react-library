import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { BookMarked } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { libraryApi } from '@/services/libraryApi'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
})

type FormValues = z.infer<typeof schema>

export default function RegisterPage() {
  const { toast } = useToast()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', password: '' },
  })

  const mutation = useMutation({
    mutationFn: libraryApi.register,
    onSuccess: () => {
      toast({ title: 'Account created', description: 'You can now sign in.' })
      navigate('/login')
    },
    onError: () => {
      toast({
        title: 'Registration failed',
        description: 'Please try again.',
        variant: 'destructive',
      })
    },
  })

  const onSubmit = (values: FormValues) => mutation.mutate(values)

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      <div className="mb-8 text-center">
        <div className="mb-4 flex items-center justify-center gap-2 text-2xl font-bold text-blue-600">
          <BookMarked className="h-8 w-8" />
          <span>Booky</span>
        </div>
        <h1 className="text-3xl font-semibold text-gray-900">Create account</h1>
        <p className="mt-2 text-gray-600">Join and start borrowing books in seconds.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register('name')} aria-invalid={errors.name ? 'true' : 'false'} disabled={mutation.isPending} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
            disabled={mutation.isPending}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register('password')}
            aria-invalid={errors.password ? 'true' : 'false'}
            disabled={mutation.isPending}
          />
        </div>

        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? 'Creating account...' : 'Register'}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  )
}

