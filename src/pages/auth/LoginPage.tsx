import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Eye, EyeOff, BookMarked } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import api from '@/services/api'
import type { LoginResponse } from '@/types'
import { useAppDispatch } from '@/store'
import { loginSuccess } from '@/features/auth/authSlice'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type FormValues = z.infer<typeof schema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  })

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const res = await api.post<LoginResponse>('/api/auth/login', values)
      return res.data
    },
    onSuccess: (data) => {
      dispatch(loginSuccess({ token: data.token, user: data.user }))
      toast({ title: 'Login Successful', description: 'Welcome back!' })
      navigate('/')
    },
    onError: () => {
      toast({
        title: 'Login Failed',
        description: 'Please check your credentials and try again.',
        variant: 'destructive',
      })
    },
  })

  const onSubmit = (values: FormValues) => mutation.mutate(values)

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
      <div className="mb-8 flex flex-col items-center">
        <div className="mb-4 flex items-center gap-2 text-2xl font-bold text-blue-600">
          <BookMarked className="h-8 w-8" />
          <span>Booky</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Login</h1>
        <p className="mt-2 text-gray-600">Sign in to manage your library account.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            {...register('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
            disabled={mutation.isPending}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              {...register('password')}
              aria-invalid={errors.password ? 'true' : 'false'}
              disabled={mutation.isPending}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
              disabled={mutation.isPending}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? 'Logging in...' : 'Login'}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  )
}