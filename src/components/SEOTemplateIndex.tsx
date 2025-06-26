import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Eye, FileText, Users, Phone, Rocket, MessageSquare, Route } from 'lucide-react'
import PasswordProtected from './PasswordProtected'

const templates = [
  {
    id: 'sms-widget',
    title: 'SMS Widget Template',
    description: 'Convert website visitors with instant SMS conversations. Replace slow contact forms with real-time texting.',
    icon: MessageSquare,
    color: 'purple',
    routes: ['/sms-widget', '/website-texting'],
    status: 'Ready',
    features: ['Widget demo', 'ROI calculator', 'Setup instructions', 'Industry use cases']
  },
  {
    id: 'team-inbox',
    title: 'Team Inbox Template',
    description: 'Unified team collaboration for business texts. Stop the chaos of individual team member phones.',
    icon: Users,
    color: 'blue',
    routes: ['/team-inbox', '/shared-inbox'],
    status: 'Ready',
    features: ['Team workflow visualization', 'Size-based solutions', 'Performance metrics', 'ROI calculator']
  },
  {
    id: 'branded-caller-id',
    title: 'Branded Caller ID Template',
    description: 'Display your business name instead of phone number. Build trust and increase answer rates.',
    icon: Phone,
    color: 'green',
    routes: ['/branded-caller-id', '/business-caller-id'],
    status: 'Ready',
    features: ['Trust comparison', 'Phone mockups', 'Industry examples', 'Answer rate stats']
  },
  {
    id: 'business-launch',
    title: 'Business Launch Template',
    description: 'Professional phone system for startups. Look established from day one with zero hardware.',
    icon: Rocket,
    color: 'blue',
    routes: ['/startup-phone', '/business-launch'],
    status: 'Ready',
    features: ['Startup checklist', 'Success stories', 'Mistake prevention', 'Pricing comparison']
  },
  {
    id: 'follow-up-strategy',
    title: 'Follow-Up Strategy Template',
    description: 'Turn prospects into customers with systematic follow-up. Templates and automation included.',
    icon: FileText,
    color: 'green',
    routes: ['/follow-up-strategy', '/customer-follow-up'],
    status: 'Ready',
    features: ['Timeline visualization', 'Industry templates', 'Automation setup', 'ROI calculator']
  },
  {
    id: 'call-routing',
    title: 'Call Routing Template',
    description: 'Smart call routing and IVR system. Route calls like a Fortune 500 company in minutes.',
    icon: Route,
    color: 'blue',
    routes: ['/call-routing', '/ivr-system'],
    status: 'Ready',
    features: ['Flow visualization', 'Routing options', 'Industry setups', 'Performance metrics']
  }
]

const colorClasses = {
  purple: 'bg-purple-100 text-purple-800 border-purple-200',
  blue: 'bg-blue-100 text-blue-800 border-blue-200',
  green: 'bg-green-100 text-green-800 border-green-200',
  orange: 'bg-orange-100 text-orange-800 border-orange-200'
}

export default function SEOTemplateIndex() {
  return (
    <PasswordProtected storageKey="ring4-seo-index-auth">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Ring4 SEO Templates
                  </h1>
                  <p className="text-gray-600">
                    Internal review of programmatic SEO page templates
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Review Guidelines</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Check content accuracy and Ring4 messaging alignment</li>
                  <li>• Verify CTAs and conversion elements are effective</li>
                  <li>• Review SEO optimization (titles, descriptions, structure)</li>
                  <li>• Test responsive design and user experience</li>
                  <li>• Validate industry-specific examples and use cases</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => {
                const IconComponent = template.icon
                return (
                  <Card key={template.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-2 rounded-lg ${colorClasses[template.color as keyof typeof colorClasses]}`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {template.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{template.title}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Features */}
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Key Features:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {template.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Routes */}
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Available Routes:</h4>
                          <div className="flex flex-wrap gap-2">
                            {template.routes.map((route, index) => (
                              <code key={index} className="bg-gray-100 px-2 py-1 rounded text-xs">
                                {route}
                              </code>
                            ))}
                          </div>
                        </div>

                        {/* Preview Buttons */}
                        <div className="pt-4 border-t">
                          <div className="flex gap-2">
                            <Button asChild size="sm" className="flex-1">
                              <a href={template.routes[0]} target="_blank" rel="noopener noreferrer">
                                <Eye className="h-4 w-4 mr-1" />
                                Preview
                              </a>
                            </Button>
                            {template.routes[1] && (
                              <Button asChild variant="outline" size="sm">
                                <a href={template.routes[1]} target="_blank" rel="noopener noreferrer">
                                  Alt URL
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Coming Soon Templates */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Coming Soon</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  'Number Type Decision Template',
                  'Call Screening Template', 
                  'SMS Automation Resource Page',
                  'Remote Team Use Case Template',
                  'Industry ROI Calculator Template'
                ].map((title, index) => (
                  <Card key={index} className="opacity-60">
                    <CardHeader>
                      <CardTitle className="text-lg">{title}</CardTitle>
                      <CardDescription>In development</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary">Coming Soon</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="mt-12 bg-white rounded-lg p-6 border">
              <h3 className="font-semibold mb-4">Implementation Notes</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-medium mb-2">Technical Details:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• All templates use React + TypeScript</li>
                    <li>• Responsive design with Tailwind CSS</li>
                    <li>• SEO optimized with react-helmet-async</li>
                    <li>• Password protected (ring4seo)</li>
                    <li>• Mock data fallback when Supabase unavailable</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Content Strategy:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Problem-first approach</li>
                    <li>• Industry-specific examples</li>
                    <li>• ROI calculators and social proof</li>
                    <li>• Clear conversion paths</li>
                    <li>• Mobile-first design</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PasswordProtected>
  )
}