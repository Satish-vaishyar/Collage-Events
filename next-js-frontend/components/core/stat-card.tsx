"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon: LucideIcon
  className?: string
}

export function StatCard({ title, value, change, changeLabel, icon: Icon, className }: StatCardProps) {
  const isPositive = change && change > 0
  const isNegative = change && change < 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={cn("rounded-lg border border-border bg-card p-6 transition-colors hover:bg-card/80", className)}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="mt-3">
        <p className="text-2xl font-semibold text-foreground">{value}</p>
        {change !== undefined && (
          <div className="mt-1 flex items-center gap-1">
            {isPositive ? (
              <TrendingUp className="h-3 w-3 text-success" />
            ) : isNegative ? (
              <TrendingDown className="h-3 w-3 text-destructive" />
            ) : null}
            <span
              className={cn(
                "text-xs font-medium",
                isPositive && "text-success",
                isNegative && "text-destructive",
                !isPositive && !isNegative && "text-muted-foreground",
              )}
            >
              {isPositive ? "+" : ""}
              {change}%
            </span>
            {changeLabel && <span className="text-xs text-muted-foreground">{changeLabel}</span>}
          </div>
        )}
      </div>
    </motion.div>
  )
}
