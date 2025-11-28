"use client"

import { useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/hooks/use-user"
import { LoadingScreen } from "@/components/core/loading-screen"

interface ProtectedRouteProps {
  children: ReactNode
  fallback?: ReactNode
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useUser()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return fallback || <LoadingScreen />
  }

  if (!isAuthenticated) {
    return fallback || <LoadingScreen />
  }

  return <>{children}</>
}
