"use client"

import { motion } from "framer-motion"
import { Calendar, Users, Ticket, TrendingUp, Activity, ArrowUpRight, MoreHorizontal, Plus } from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { PageHeader } from "@/components/core/page-header"
import { StatCard } from "@/components/core/stat-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useEvents } from "@/hooks/use-events"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function DashboardPage() {
  const { data: events, isLoading } = useEvents()
  
  const stats = [
    {
      title: "Total Events",
      value: events?.length.toString() || "0",
      change: 12.5,
      changeLabel: "from last month",
      icon: Calendar,
    },
    {
      title: "Active Events",
      value: events?.filter(e => new Date(e.date) >= new Date()).length.toString() || "0",
      change: 8.2,
      changeLabel: "from last month",
      icon: Activity,
    },
    {
      title: "Total Registrations",
      value: "0",
      change: 23.1,
      changeLabel: "from last month",
      icon: Users,
    },
    {
      title: "Support Tickets",
      value: "0",
      change: -2.4,
      changeLabel: "from last month",
      icon: Ticket,
    },
  ]

  const recentEvents = events?.slice(0, 5) || []

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader title="Dashboard" description="Welcome back! Here's an overview of your events.">
          <Button asChild>
            <Link href="/events/create">
              <Plus className="mr-2 h-4 w-4" />
              New Event
            </Link>
          </Button>
        </PageHeader>

        {/* Stats Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div key={stat.title} variants={item}>
              <StatCard {...stat} />
            </motion.div>
          ))}
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Events */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Recent Events</CardTitle>
                  <CardDescription>Your latest created events</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <Activity className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <p className="text-sm text-muted-foreground">Loading events...</p>
                ) : recentEvents.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No events yet. Create your first event!</p>
                ) : (
                  recentEvents.map((event) => (
                    <div key={event.code} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium text-foreground">{event.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleDateString()} • {event.code}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <Link href={`/events/${event.code}/manage`}>
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
                  <CardDescription>Common tasks for event management</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/events/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Event
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/events">
                    <Calendar className="mr-2 h-4 w-4" />
                    View All Events
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/profile">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Profile
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/settings">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  )
}
