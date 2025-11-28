"use client"

import { useEffect } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  auth,
  googleProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "@/lib/firebase"
import { useAuthStore, type AppUser } from "@/lib/store/auth-store"
import type { LoginCredentials, SignupCredentials } from "@/types"

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

// Hook to sync Firebase auth state with our store
export function useAuthStateSync() {
  const { setUser, setLoading } = useAuthStore()

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
}

export function useLogin() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { setUser, setLoading } = useAuthStore()

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
      return userCredential.user
    },
    onMutate: () => {
      setLoading(true)
    },
    onSuccess: (firebaseUser) => {
      setUser(mapFirebaseUser(firebaseUser))
      queryClient.invalidateQueries({ queryKey: ["session"] })
      toast.success("Welcome back!")
      router.push("/dashboard")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to login")
    },
    onSettled: () => {
      setLoading(false)
    },
  })
}

export function useSignup() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { setUser, setLoading } = useAuthStore()

  return useMutation({
    mutationFn: async (credentials: SignupCredentials) => {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
      return userCredential.user
    },
    onMutate: () => {
      setLoading(true)
    },
    onSuccess: (firebaseUser) => {
      setUser(mapFirebaseUser(firebaseUser))
      queryClient.invalidateQueries({ queryKey: ["session"] })
      toast.success("Account created successfully!")
      router.push("/dashboard")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create account")
    },
    onSettled: () => {
      setLoading(false)
    },
  })
}

export function useGoogleSignIn() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { setUser, setLoading } = useAuthStore()

  return useMutation({
    mutationFn: async () => {
      const userCredential = await signInWithPopup(auth, googleProvider)
      return userCredential.user
    },
    onMutate: () => {
      setLoading(true)
    },
    onSuccess: (firebaseUser) => {
      setUser(mapFirebaseUser(firebaseUser))
      queryClient.invalidateQueries({ queryKey: ["session"] })
      toast.success("Welcome!")
      router.push("/dashboard")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to sign in with Google")
    },
    onSettled: () => {
      setLoading(false)
    },
  })
}

export function useLogout() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { logout } = useAuthStore()

  return useMutation({
    mutationFn: () => signOut(auth),
    onSuccess: () => {
      logout()
      queryClient.clear()
      toast.success("Logged out successfully")
      router.push("/login")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to logout")
    },
  })
}
