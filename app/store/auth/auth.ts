import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface User {
  access_token: string,
  username: string,
  email: string,
  id: string
}

interface AuthState {
  user: User | null
  login: (data: {
    user: {
      access_token: string,
      username: string,
      email: string,
      id: string
    }
  }) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: (data) => {
        set({ user: data.user })
      },
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
