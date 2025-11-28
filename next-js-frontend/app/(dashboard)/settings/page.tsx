"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Globe, Lock, Palette, Shield, Smartphone, User, Loader2 } from "lucide-react"
import { useTheme } from "next-themes"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { PageHeader } from "@/components/core/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

const settingsSections = [
  { id: "account", label: "Account", icon: User },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
]

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [activeSection, setActiveSection] = useState("account")
  const [isLoading, setIsLoading] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    updates: true,
  })

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success("Settings saved successfully!")
    setIsLoading(false)
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl space-y-6">
        <PageHeader title="Settings" description="Manage your account settings and preferences" />

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar Navigation */}
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full space-y-1 lg:w-56"
          >
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                }`}
              >
                <section.icon className="h-4 w-4" />
                {section.label}
              </button>
            ))}
          </motion.nav>

          {/* Settings Content */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 space-y-6">
            {/* Account Settings */}
            {activeSection === "account" && (
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account information and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" placeholder="@username" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger id="language">
                          <Globe className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="utc">
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc">UTC</SelectItem>
                          <SelectItem value="est">Eastern Time (EST)</SelectItem>
                          <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                          <SelectItem value="gmt">GMT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-foreground">Danger Zone</h4>
                    <div className="flex items-center justify-between rounded-lg border border-destructive/50 bg-destructive/5 p-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">Delete Account</p>
                        <p className="text-xs text-muted-foreground">Permanently delete your account and all data</p>
                      </div>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Appearance Settings */}
            {activeSection === "appearance" && (
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize how CampusFlow looks on your device</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <div className="grid grid-cols-3 gap-3">
                        {["light", "dark", "system"].map((t) => (
                          <button
                            key={t}
                            onClick={() => setTheme(t)}
                            className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${
                              theme === t
                                ? "border-foreground bg-secondary"
                                : "border-border hover:border-foreground/50"
                            }`}
                          >
                            {t === "light" ? (
                              <div className="h-10 w-10 rounded-lg bg-white border shadow-sm" />
                            ) : t === "dark" ? (
                              <div className="h-10 w-10 rounded-lg bg-zinc-900 border border-zinc-800" />
                            ) : (
                              <div className="h-10 w-10 rounded-lg bg-linear-to-br from-white to-zinc-900 border" />
                            )}
                            <span className="text-xs font-medium capitalize">{t}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">Reduced Motion</p>
                        <p className="text-xs text-muted-foreground">Reduce animations and motion effects</p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">Compact Mode</p>
                        <p className="text-xs text-muted-foreground">Use smaller spacing and elements</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notification Settings */}
            {activeSection === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Choose what notifications you want to receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                          <Bell className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Email Notifications</p>
                          <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                          <Smartphone className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Push Notifications</p>
                          <p className="text-xs text-muted-foreground">Receive push notifications on your device</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">Marketing Emails</p>
                        <p className="text-xs text-muted-foreground">Receive emails about new features and offers</p>
                      </div>
                      <Switch
                        checked={notifications.marketing}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">Product Updates</p>
                        <p className="text-xs text-muted-foreground">Get notified about product updates and releases</p>
                      </div>
                      <Switch
                        checked={notifications.updates}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, updates: checked })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security Settings */}
            {activeSection === "security" && (
              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>Manage your security settings and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border border-border p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                          <Lock className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Change Password</p>
                          <p className="text-xs text-muted-foreground">Update your password regularly</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Change
                      </Button>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-border p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                          <Shield className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                          <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Enable
                      </Button>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="mb-3 text-sm font-medium text-foreground">Active Sessions</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-success" />
                            <div>
                              <p className="text-sm font-medium text-foreground">Current Device</p>
                              <p className="text-xs text-muted-foreground">Chrome on macOS • Active now</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium text-foreground">iPhone 14 Pro</p>
                              <p className="text-xs text-muted-foreground">Safari on iOS • Last active 2 hours ago</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            Revoke
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Save Button */}
            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save changes"
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  )
}
