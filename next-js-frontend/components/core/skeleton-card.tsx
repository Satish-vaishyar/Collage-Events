"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SkeletonCardProps {
  className?: string
  lines?: number
}

export function SkeletonCard({ className, lines = 3 }: SkeletonCardProps) {
  return (
    <div className={cn("rounded-lg border border-border bg-card p-6", className)}>
      <motion.div
        className="mb-4 h-5 w-1/3 rounded bg-muted"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
      />
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <motion.div
            key={i}
            className={cn("h-4 rounded bg-muted", i === lines - 1 ? "w-2/3" : "w-full")}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: i * 0.1 }}
          />
        ))}
      </div>
    </div>
  )
}
