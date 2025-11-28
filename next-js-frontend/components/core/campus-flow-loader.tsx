"use client"

import { motion } from "framer-motion"

export const CampusFlowLoader = () => {
  const text = "CampusFlow"

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const letterVariants = {
    initial: { opacity: 0, y: 20, scale: 0.8 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: i * 0.08,
      },
    }),
  }

  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  const glowVariants = {
    initial: { opacity: 0.5 },
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Logo Icon */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl"
          variants={glowVariants}
          initial="initial"
          animate="animate"
        />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground shadow-lg">
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-background"
            variants={pulseVariants}
            initial="initial"
            animate="animate"
          >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
            <path d="m9 16 2 2 4-4" />
          </motion.svg>
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        className="flex items-center"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <svg width="220" height="50" viewBox="0 0 220 50">
          <defs>
            <linearGradient id="campusGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--foreground))" />
              <stop offset="50%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--foreground))" />
              <animate
                attributeName="x1"
                values="0%;100%;0%"
                dur="3s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="x2"
                values="100%;200%;100%"
                dur="3s"
                repeatCount="indefinite"
              />
            </linearGradient>
          </defs>

          {text.split("").map((letter, i) => (
            <motion.text
              key={i}
              x={10 + i * 21}
              y="35"
              fontSize="28"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="700"
              fill="url(#campusGradient)"
              custom={i}
              variants={letterVariants}
            >
              {letter}
            </motion.text>
          ))}
        </svg>
      </motion.div>

      {/* Loading Dots */}
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-2 w-2 rounded-full bg-foreground"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15,
            }}
          />
        ))}
      </motion.div>

      {/* Subtitle */}
      <motion.p
        className="text-sm text-muted-foreground"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Loading your events...
      </motion.p>
    </div>
  )
}

// Full screen loader wrapper
export const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <CampusFlowLoader />
    </div>
  )
}

// Inline loader for smaller areas
export const InlineLoader = ({ text = "Loading..." }: { text?: string }) => {
  return (
    <div className="flex items-center justify-center gap-3 py-8">
      <motion.div
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-background"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
      </motion.div>
      <div className="flex items-center gap-1">
        <span className="text-sm font-medium text-muted-foreground">{text}</span>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="inline-block h-1 w-1 rounded-full bg-muted-foreground"
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  )
}
