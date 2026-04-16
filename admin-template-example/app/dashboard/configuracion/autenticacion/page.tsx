"use client"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Mail, Gem, Lock } from "lucide-react"

const authProviders = [
  {
    id: "email",
    name: "Email and password authentication",
    description: "Members can log in with email and password",
    icon: (
      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
        <Mail className="h-5 w-5" />
      </div>
    ),
    enabled: true,
  },
  {
    id: "google",
    name: "Google authentication",
    description: "Members can log in with a Google account",
    icon: (
      <div className="w-10 h-10 rounded-lg bg-white border flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="h-5 w-5">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      </div>
    ),
    enabled: true,
    hasOptions: true,
  },
  {
    id: "microsoft",
    name: "Microsoft authentication",
    description: "Members can log in with a Microsoft account",
    icon: (
      <div className="w-10 h-10 rounded-lg bg-white border flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="h-5 w-5">
          <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
          <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
          <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
          <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
        </svg>
      </div>
    ),
    enabled: false,
  },
  {
    id: "facebook",
    name: "Facebook authentication",
    description: "Members can log in with a Facebook account",
    icon: (
      <div className="w-10 h-10 rounded-lg bg-[#1877F2] flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </div>
    ),
    enabled: false,
  },
  {
    id: "apple",
    name: "Apple authentication",
    description: "Members can log in with an Apple account",
    icon: (
      <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
        </svg>
      </div>
    ),
    enabled: false,
  },
]

export default function AuthConfigPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader 
        title="Autenticacion"
        description="Configure the authentication methods that members of your app can use to log in to ZenPilates Flow."
      />

      <div className="space-y-4">
        {authProviders.map((provider) => (
          <Card key={provider.id} className="border">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {provider.icon}
                  <div>
                    <p className="font-medium">{provider.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {provider.description}
                    </p>
                  </div>
                </div>
                <Switch defaultChecked={provider.enabled} />
              </div>

              {provider.hasOptions && provider.enabled && (
                <div className="mt-6 ml-14 space-y-4">
                  <RadioGroup defaultValue="default">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="default" id="default" />
                      <label htmlFor="default" className="text-sm">
                        Use the default Base44 OAuth
                      </label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="custom" id="custom" className="mt-1" />
                      <div>
                        <div className="flex items-center gap-2">
                          <label htmlFor="custom" className="text-sm">
                            Use a custom OAuth from Google console
                          </label>
                          <Badge className="bg-orange-100 text-orange-700 text-xs">
                            Builder+
                          </Badge>
                          <a href="#" className="text-[#c4856c] text-sm font-medium">
                            Upgrade now
                          </a>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Ensure users log in using your custom Google authentication.{" "}
                          <a href="#" className="text-[#c4856c] underline">
                            {"Here's how to set it up"}
                          </a>
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                  <div className="flex justify-end">
                    <Button className="bg-foreground text-background">
                      Update
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">or</span>
          </div>
        </div>

        {/* SSO */}
        <Card className="border">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Lock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">Single Sign-on (SSO)</p>
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      Elite Early Preview
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {"Allow members to log in using a custom SSO that fits your organization's needs."}
                  </p>
                  <a href="#" className="text-[#c4856c] text-sm font-medium">
                    Learn more about SSO
                  </a>
                </div>
              </div>
              <Button variant="outline">Set Up</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
