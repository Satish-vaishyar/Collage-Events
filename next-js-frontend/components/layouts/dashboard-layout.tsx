"use client"

import { useState, type ReactNode } from "react"
import { Sidebar } from "./sidebar"
import { Navbar } from "./navbar"
import { MobileSidebar } from "./mobile-sidebar"
import { ProtectedRoute } from "@/components/core/protected-route"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

        {/* Main Content */}
        <div className="lg:pl-60">
          <Navbar onMenuClick={() => setMobileOpen(true)} />
          <main className="p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
