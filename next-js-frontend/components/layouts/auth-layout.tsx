"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

interface AuthLayoutProps {
  children: ReactNode
  title: string
  description: string
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Decorative */}
      <div className="relative hidden w-1/2 lg:block">
        <div className="absolute inset-0 bg-foreground">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>
        <div className="relative flex h-full flex-col justify-between p-12">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background">
              <Calendar className="h-5 w-5 text-foreground" />
            </div>
            <span className="text-xl font-semibold text-background">CampusFlow</span>
          </Link>

          <div className="max-w-lg">
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <p className="text-lg text-background/90 leading-relaxed">
                &ldquo;CampusFlow has transformed how we manage campus events. The AI-powered support and seamless 
                registration process make it incredibly easy to engage with attendees.&rdquo;
              </p>
              <footer className="text-sm text-background/60">
                <cite className="not-italic">
                  <span className="font-medium text-background/80">Event Coordinator</span>
                  <br />
                  University Events Team
                </cite>
              </footer>
            </motion.blockquote>
          </div>

          <p className="text-sm text-background/40">
            &copy; {new Date().getFullYear()} CampusFlow. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex w-full flex-col lg:w-1/2">
        <div className="flex items-center justify-between p-4 lg:p-6">
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
              <Calendar className="h-4 w-4 text-background" />
            </div>
            <span className="font-semibold text-foreground">CampusFlow</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-auto"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md space-y-8"
          >
            <div className="text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            </div>
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
