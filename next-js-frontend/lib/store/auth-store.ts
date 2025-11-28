import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

// Firebase User type mapped to our app's user type
export interface AppUser {
  id: string
  email: string | null
  name: string | null
  avatar?: string | null
  createdAt?: string
  updatedAt?: string
}

interface AuthStore {
  user: AppUser | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: AppUser | null) => void
  setAuthenticated: (isAuthenticated: boolean) => void
  setLoading: (isLoading: boolean) => void
  logout: () => void
  reset: () => void
}

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ user: null, isAuthenticated: false }),
      reset: () => set(initialState),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
