"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SkeletonListProps {
  className?: string
  items?: number
}

export function SkeletonList({ className, items = 5 }: SkeletonListProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: items }).map((_, i) => (
        <motion.div
          key={i}
          className="flex items-center gap-4 rounded-lg border border-border bg-card p-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: i * 0.1 }}
        >
          <div className="h-10 w-10 rounded-full bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/3 rounded bg-muted" />
            <div className="h-3 w-1/2 rounded bg-muted" />
          </div>
          <div className="h-8 w-20 rounded bg-muted" />
        </motion.div>
      ))}
    </div>
  )
}
