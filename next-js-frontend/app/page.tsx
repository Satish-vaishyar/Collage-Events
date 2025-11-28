"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, Zap, Shield, BarChart3, Users, MessageSquare, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

const features = [
  {
    icon: Calendar,
    title: "Event Management",
    description: "Create and manage events with ease. Track registrations, handle tickets, and monitor attendance.",
  },
  {
    icon: MessageSquare,
    title: "AI-Powered Support",
    description: "Telegram bot with AI auto-answers for attendee queries. Smart document retrieval system.",
  },
  {
    icon: CreditCard,
    title: "Seamless Payments",
    description: "Integrated Razorpay payments for instant registration and secure transactions.",
  },
  {
    icon: Users,
    title: "Registration Tracking",
    description: "Real-time registration tracking with payment status and attendee management.",
  },
  {
    icon: Zap,
    title: "Indoor Navigation",
    description: "Upload floor plans and add POI markers to help attendees navigate your venue.",
  },
  {
    icon: BarChart3,
    title: "Telegram Polls",
    description: "Engage attendees with interactive polls directly in your Telegram group.",
  },
]

export default function HomePage() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
              <Calendar className="h-4 w-4 text-background" />
            </div>
            <span className="font-semibold text-foreground">CampusFlow</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground"
            >
              <Calendar className="h-4 w-4" />
              <span>The future of campus events</span>
            </motion.div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl text-balance">
              Effortless Event Management for <span className="text-primary">Campus Communities</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
              Create events, manage registrations, handle payments, and engage attendees with AI-powered support. 
              Everything you need to run successful campus events.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Start Creating Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Sign in to Dashboard</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border bg-secondary/20 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Everything you need to run events</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From event creation to post-event analytics, we've got you covered.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-lg border border-border bg-card p-8 transition-colors hover:bg-card/80"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                  <feature.icon className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">How it works</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get your event up and running in three simple steps.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {[
              {
                step: "01",
                title: "Create Your Event",
                description: "Set up your event with details, location, pricing, and connect your Telegram group for support.",
              },
              {
                step: "02",
                title: "Share & Collect Registrations",
                description: "Share your event page. Attendees register and pay securely via Razorpay.",
              },
              {
                step: "03",
                title: "Manage & Engage",
                description: "Track registrations, answer queries via AI bot, and send polls to your attendees.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative text-center"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-foreground p-12 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-background sm:text-4xl">Ready to host your next event?</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-background/70">
              Join campus communities already using CampusFlow to create amazing event experiences.
            </p>
            <Button size="lg" className="mt-8 bg-background text-foreground hover:bg-background/90" asChild>
              <Link href="/signup">
                Create your first event
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
                <Calendar className="h-4 w-4 text-background" />
              </div>
              <span className="font-semibold text-foreground">CampusFlow</span>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} CampusFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
