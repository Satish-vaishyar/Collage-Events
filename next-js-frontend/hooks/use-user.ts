"use client"

import { useEffect } from "react"
import { useAuthStore, type AppUser } from "@/lib/store/auth-store"
import { auth, onAuthStateChanged } from "@/lib/firebase"

// Helper to convert Firebase User to AppUser
function mapFirebaseUser(user: import("firebase/auth").User): AppUser {
  return {
    id: user.uid,
    email: user.email,
    name: user.displayName,
    avatar: user.photoURL,
    createdAt: user.metadata.creationTime,
    updatedAt: user.metadata.lastSignInTime,
  }
}

export function useUser() {
  const { user, isAuthenticated, isLoading, setUser, setLoading } = useAuthStore()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(mapFirebaseUser(firebaseUser))
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [setUser, setLoading])

  return {
    user,
    isAuthenticated,
    isLoading,
  }
}
