export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupCredentials {
  name: string
  email: string
  password: string
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface SessionResponse {
  user: User | null
  isAuthenticated: boolean
}

export interface DashboardStats {
  totalUsers: number
  activeProjects: number
  revenue: number
  growth: number
}

export interface Activity {
  id: string
  type: "project" | "user" | "payment" | "system"
  title: string
  description: string
  timestamp: string
}
