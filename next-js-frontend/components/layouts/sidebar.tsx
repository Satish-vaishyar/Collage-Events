"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  User,
  Settings,
  ChevronLeft,
  LogOut,
  Calendar,
} from "lucide-react"
import { useLogout } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const { mutate: logout, isPending } = useLogout()

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 240 }}
        className="fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border bg-card"
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
                  <Calendar className="h-4 w-4 text-background" />
                </div>
                <span className="font-semibold text-foreground">CampusFlow</span>
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className={cn("h-8 w-8", collapsed && "mx-auto")}
          >
            <motion.div animate={{ rotate: collapsed ? 180 : 0 }}>
              <ChevronLeft className="h-4 w-4" />
            </motion.div>
          </Button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-1 p-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            const NavItem = (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="overflow-hidden whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && (
                  <motion.div layoutId="activeNav" className="absolute left-0 h-8 w-1 rounded-r-full bg-foreground" />
                )}
              </Link>
            )

            if (collapsed) {
              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>{NavItem}</TooltipTrigger>
                  <TooltipContent side="right">{item.name}</TooltipContent>
                </Tooltip>
              )
            }

            return NavItem
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-border p-3">
          {/* Logout Button */}
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => logout()}
                  disabled={isPending}
                  className="w-full justify-center px-3 py-2.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => logout()}
              disabled={isPending}
              className="w-full justify-start gap-3 px-3 py-2.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Button>
          )}
        </div>
      </motion.aside>
    </TooltipProvider>
  )
}
