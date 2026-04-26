"use client"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Pencil, Globe, Copy, Lightbulb, Gem, Trash2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AppConfigPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="App Settings" />

      {/* App Info Card */}
      <Card className="border">
        <CardHeader>
          <CardTitle className="text-base font-medium">App Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* App Logo */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#c4856c]/20 flex items-center justify-center">
                <div className="w-8 h-8 rounded-lg bg-[#c4856c] flex items-center justify-center text-white text-sm">
                  P
                </div>
              </div>
              <span className="font-medium">App Logo</span>
            </div>
            <Button variant="outline">Edit Logo</Button>
          </div>

          {/* App Description */}
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-sm">App Description</p>
              <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{""}</p>
            </div>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* General Settings Card */}
      <Card className="border">
        <CardHeader>
          <CardTitle className="text-base font-medium">General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Page */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Main Page</p>
                <p className="text-sm text-muted-foreground">
                  Esta configuracion ahora solo esta disponible a traves del chat.
                </p>
              </div>
              <Select defaultValue="usuarios">
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usuarios">Usuarios</SelectItem>
                  <SelectItem value="dashboard">Dashboard</SelectItem>
                  <SelectItem value="clases">Clases</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Alert className="bg-blue-50 border-blue-200">
              <Lightbulb className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Para cambiar esto, escribe en el chat:</strong> Cambia la pagina
                principal a {"{PageName}"}
              </AlertDescription>
            </Alert>
          </div>

          {/* App Visibility */}
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-sm">App Visibility</p>
              <p className="text-sm text-muted-foreground">
                Control who can access your application
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Select defaultValue="public">
                <SelectTrigger className="w-36">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Checkbox id="require-login" defaultChecked />
                <label htmlFor="require-login" className="text-sm">
                  Require login to access
                </label>
              </div>
            </div>
          </div>

          {/* Platform Badge */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Platform Badge</p>
                <p className="text-sm text-muted-foreground">
                  {"Show or hide the \"Edit with Base44\" badge on your app."}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Visible</span>
                <Switch />
              </div>
            </div>
            <Alert className="bg-orange-50 border-orange-200">
              <Gem className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                Hiding this badge is available on paid plans.{" "}
                <a href="#" className="text-[#c4856c] font-medium underline">
                  Upgrade plan
                </a>
              </AlertDescription>
            </Alert>
          </div>

          {/* Entity Creator Visibility */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Entity Creator Visibility</p>
              <p className="text-sm text-muted-foreground">
                {"Show or hide who created each record in your app's data tables."}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Visible</span>
              <Switch defaultChecked />
            </div>
          </div>

          {/* Clone App */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Clone App</p>
              <p className="text-sm text-muted-foreground">
                Create a duplicate of this app
              </p>
            </div>
            <Button variant="outline" className="gap-2">
              <Copy className="h-4 w-4" />
              Create Copy
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Capabilities */}
      <Card className="border">
        <CardHeader>
          <CardTitle className="text-base font-medium">Advanced Capabilities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* AI Agents */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">AI Agents</p>
                <p className="text-sm text-muted-foreground">
                  {"Build AI agents into your app using Base44's AI agents infrastructure"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Enabled</span>
                <Switch defaultChecked />
              </div>
            </div>
            <Alert className="bg-blue-50 border-blue-200">
              <AlertDescription className="text-blue-800">
                <div className="flex items-start gap-2">
                  <div className="p-1 rounded bg-blue-100">
                    <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                      <path d="M12 6v6l4 2" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">AI Agents Enabled</p>
                    <p className="text-sm mt-1">
                      {"Your app now has access to Base44's AI agents infrastructure. You can create intelligent agents that can help users with various tasks, answer questions, and interact with your app's data. Use the chat to build and configure your agents."}
                    </p>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          </div>

          {/* Test Data */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Test Data</p>
                <p className="text-sm text-muted-foreground">
                  Use test data to safely test changes without affecting live data.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Disabled</span>
                <Switch />
              </div>
            </div>
            <Alert className="bg-orange-50 border-orange-200">
              <Gem className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                Available only for Builder plan and above.{" "}
                <a href="#" className="text-[#c4856c] font-medium underline">
                  Upgrade plan
                </a>
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border border-destructive/30">
        <CardHeader>
          <CardTitle className="text-base font-medium">Danger Zone</CardTitle>
          <p className="text-sm text-muted-foreground">
            Irreversible actions that affect your app
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Delete App</p>
              <p className="text-sm text-muted-foreground">
                Permanently remove this app and all its data
              </p>
            </div>
            <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground gap-2">
              <Trash2 className="h-4 w-4" />
              Delete App
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
