import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info, AlertCircle } from "lucide-react"
import ColorPalette from "./branding/color-palette"
import Typography from "./branding/typography"
import Logo from "./branding/logo"
import Components from "./branding/components"
import Animations from "./branding/animations"

export default function BrandingGuide() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2">Ring4 Branding & Design Strategy</h1>
        <p className="text-muted-foreground text-lg">
          A comprehensive guide to maintain visual consistency across the Ring4 website and dashboard.
        </p>
      </div>

      <Alert className="mb-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          This document serves as the central reference for all design decisions in the Ring4 project. Always refer back to ensure brand consistency.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="logo">Logo Usage</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="animations">Animations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Brand Vision</CardTitle>
              <CardDescription>The core principles that define Ring4's visual identity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Professional & Trustworthy</h3>
                  <p>
                    Ring4's visual identity is designed to instill confidence and trust, appealing directly to sales managers and operations leaders. The clean, structured layouts coupled with a professional blue-dominant color scheme reinforces reliability and competence.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Modern & Innovative</h3>
                  <p>
                    While projecting professionalism, the design also communicates innovation through contemporary typography, subtle animations, and an intuitive interface that feels cutting-edge without being overwhelming.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Clear & Actionable</h3>
                  <p>
                    Every element of the design supports clear communication and drives users toward key conversion actions. High contrast, strategic whitespace, and prominent CTAs ensure that users can quickly understand Ring4's value proposition and take the next step.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Design System Foundation</CardTitle>
              <CardDescription>The technical building blocks of our visual language</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Component-Based Architecture</h3>
                  <p>
                    Ring4's interface is built on a system of reusable components using React, Tailwind CSS, and Shadcn UI. This approach ensures visual consistency while accelerating development and simplifying maintenance.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Responsive Design Strategy</h3>
                  <p>
                    All design elements are implemented with a mobile-first approach, ensuring optimal experiences across devices. Layouts intelligently adapt using CSS Grid and Flexbox, maintaining both aesthetic appeal and functional usability at all screen sizes.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Accessibility Focus</h3>
                  <p>
                    The design system incorporates accessibility best practices including proper contrast ratios, keyboard navigation support, semantic HTML, and screen reader compatibility—making Ring4 usable for all potential customers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="colors">
          <ColorPalette />
        </TabsContent>
        
        <TabsContent value="typography">
          <Typography />
        </TabsContent>
        
        <TabsContent value="logo">
          <Logo />
        </TabsContent>
        
        <TabsContent value="components">
          <Components />
        </TabsContent>
        
        <TabsContent value="animations">
          <Animations />
        </TabsContent>
      </Tabs>

      <div className="rounded-lg border p-6">
        <div className="flex items-start gap-4">
          <Info className="h-6 w-6 text-blue-600 mt-1" />
          <div>
            <h2 className="text-xl font-semibold mb-2">Implementation Notes</h2>
            <p className="mb-4">
              This branding and design strategy document is implemented using the same tech stack as the main Ring4 project:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>React with TypeScript for component architecture</li>
              <li>Vite for fast development and optimized production builds</li>
              <li>Tailwind CSS for utility-first styling</li>
              <li>Shadcn UI for consistent, accessible UI components</li>
              <li>Custom animations using recommended libraries for interactive elements</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}