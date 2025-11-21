import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User } from '@/types'

interface AuthState {
  token: string | null
  user: User | null
}

const persistedToken = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null

const getPersistedUser = (): User | null => {
  if (typeof localStorage === 'undefined') return null
  
  const userStr = localStorage.getItem('user')
  if (!userStr) return null
  
  try {
    return JSON.parse(userStr) as User
  } catch {
    // Clear invalid user data
    localStorage.removeItem('user')
    return null
  }
}

const persistedUser = getPersistedUser()

const initialState: AuthState = {
  token: persistedToken,
  user: persistedUser,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; user: User }>) {
      state.token = action.payload.token
      state.user = action.payload.user
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('user', JSON.stringify(action.payload.user))
      }
    },
    logout(state) {
      state.token = null
      state.user = null
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer