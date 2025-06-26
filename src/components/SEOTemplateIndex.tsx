import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Eye, FileText, Users, Phone, Rocket, MessageSquare, Route, MapPin, Briefcase, TrendingUp } from 'lucide-react'
import PasswordProtected from './PasswordProtected'

// True programmatic templates with variable substitution
const programmaticTemplates = [
  {
    id: 'area-code',
    title: 'Area Code Template',
    description: 'Local business phone numbers by area code. Scales to 300+ US area codes with localized content.',
    icon: MapPin,
    color: 'purple',
    pattern: '/local-business-number/{area_code}',
    examples: ['/local-business-number/312', '/local-business-number/415', '/local-business-number/713'],
    status: 'Ready',
    variables: ['area_code', 'city', 'state', 'business_density', 'spam_risk_index', 'population', 'major_industries'],
    scale: '300+ pages'
  },
  {
    id: 'competitor-comparison',
    title: 'Competitor Comparison Template',
    description: 'Compare Ring4 vs competitors. Dynamically generates feature comparisons and migration guides.',
    icon: TrendingUp,
    color: 'blue',
    pattern: '/compare/ring4-vs-{competitor}',
    examples: ['/compare/ring4-vs-openphone', '/compare/ring4-vs-grasshopper', '/compare/ring4-vs-ringcentral'],
    status: 'Ready',
    variables: ['competitor_name', 'pricing', 'features', 'limitations', 'user_complaints', 'review_score'],
    scale: '25-30 pages'
  },
  {
    id: 'industry',
    title: 'Industry Template',
    description: 'Business phone solutions by industry. Tailored pain points, use cases, and ROI metrics.',
    icon: Briefcase,
    color: 'green',
    pattern: '/business-phone-for-{industry}',
    examples: ['/business-phone-for-realtors', '/business-phone-for-lawyers', '/business-phone-for-contractors'],
    status: 'Ready',
    variables: ['industry', 'display_name', 'pain_points', 'use_cases', 'common_scenarios', 'roi_metrics', 'testimonial'],
    scale: '50+ pages'
  }
]

// Editorial templates (not suitable for programmatic SEO)
const editorialTemplates = [
  {
    id: 'sms-widget',
    title: 'SMS Widget (Editorial)',
    description: 'Website texting widget feature page. Better as manual landing page.',
    icon: MessageSquare,
    color: 'gray',
    routes: ['/sms-widget', '/website-texting'],
    status: 'Not Programmatic',
    reason: 'Single feature focus, no variable substitution'
  },
  {
    id: 'team-inbox',
    title: 'Team Inbox (Editorial)',
    description: 'Shared inbox feature page. Better as product feature page.',
    icon: Users,
    color: 'gray',
    routes: ['/team-inbox', '/shared-inbox'],
    status: 'Not Programmatic',
    reason: 'Feature-specific, not scalable with variables'
  },
  {
    id: 'branded-caller-id',
    title: 'Branded Caller ID (Editorial)',
    description: 'Caller ID feature explanation. Better as feature landing page.',
    icon: Phone,
    color: 'gray',
    routes: ['/branded-caller-id', '/business-caller-id'],
    status: 'Not Programmatic',
    reason: 'Single feature narrative, not variable-driven'
  },
  {
    id: 'business-launch',
    title: 'Business Launch (Editorial)',
    description: 'Startup phone system guide. Better as content marketing.',
    icon: Rocket,
    color: 'gray',
    routes: ['/startup-phone', '/business-launch'],
    status: 'Not Programmatic',
    reason: 'Story-based content, not data-driven'
  },
  {
    id: 'follow-up-strategy',
    title: 'Follow-Up Strategy (Editorial)',
    description: 'Customer follow-up guide. Better as educational content.',
    icon: FileText,
    color: 'gray',
    routes: ['/follow-up-strategy', '/customer-follow-up'],
    status: 'Not Programmatic',
    reason: 'Strategy guide, not scalable template'
  },
  {
    id: 'call-routing',
    title: 'Call Routing (Editorial)',
    description: 'IVR system setup guide. Better as technical documentation.',
    icon: Route,
    color: 'gray',
    routes: ['/call-routing', '/ivr-system'],
    status: 'Not Programmatic',
    reason: 'Feature explanation, not variable-based'
  }
]

const colorClasses = {
  purple: 'bg-purple-100 text-purple-800 border-purple-200',
  blue: 'bg-blue-100 text-blue-800 border-blue-200',
  green: 'bg-green-100 text-green-800 border-green-200',
  orange: 'bg-orange-100 text-orange-800 border-orange-200',
  gray: 'bg-gray-100 text-gray-600 border-gray-200'
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
                    Ring4 Programmatic SEO Templates
                  </h1>
                  <p className="text-gray-600">
                    True programmatic templates that scale with variable substitution
                  </p>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">✅ What Makes These Programmatic?</h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Single template generates hundreds of pages</li>
                  <li>• Content changes based on input variables</li>
                  <li>• Structured data fields drive page generation</li>
                  <li>• SEO elements (title, meta, schema) are dynamic</li>
                  <li>• Can be fed from database or CSV at scale</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Programmatic Templates */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Programmatic Templates (Variable-Driven)</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programmaticTemplates.map((template) => {
                const IconComponent = template.icon
                return (
                  <Card key={template.id} className="hover:shadow-lg transition-shadow border-2">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-2 rounded-lg ${colorClasses[template.color as keyof typeof colorClasses]}`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {template.scale}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{template.title}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Pattern */}
                        <div>
                          <h4 className="font-semibold text-sm mb-2">URL Pattern:</h4>
                          <code className="bg-gray-100 px-2 py-1 rounded text-xs block">
                            {template.pattern}
                          </code>
                        </div>

                        {/* Variables */}
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Variables:</h4>
                          <div className="flex flex-wrap gap-1">
                            {template.variables.map((variable, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {variable}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Examples */}
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Example Pages:</h4>
                          <div className="space-y-1">
                            {template.examples.map((example, index) => (
                              <a
                                key={index}
                                href={example}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 hover:underline block"
                              >
                                {example}
                              </a>
                            ))}
                          </div>
                        </div>

                        {/* Status */}
                        <div className="pt-4 border-t">
                          <div className="flex items-center justify-between">
                            <Badge variant="default" className="bg-green-600">
                              {template.status}
                            </Badge>
                            <Button asChild size="sm">
                              <a href={template.examples[0]} target="_blank" rel="noopener noreferrer">
                                <Eye className="h-4 w-4 mr-1" />
                                Preview
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Editorial Templates (Not Programmatic) */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Editorial Templates (Not Suitable for Programmatic SEO)</h2>
              <p className="text-gray-600 mb-6">These templates are better suited as standalone landing pages or feature documentation</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {editorialTemplates.map((template) => {
                  const IconComponent = template.icon
                  return (
                    <Card key={template.id} className="opacity-75">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-3">
                          <div className={`p-2 rounded-lg ${colorClasses[template.color as keyof typeof colorClasses]}`}>
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <Badge variant="secondary">
                            {template.status}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{template.title}</CardTitle>
                        <CardDescription className="text-sm">{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-sm mb-1">Why Not Programmatic:</h4>
                            <p className="text-xs text-gray-600">{template.reason}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm mb-1">Current Routes:</h4>
                            <div className="flex flex-wrap gap-1">
                              {template.routes.map((route, index) => (
                                <code key={index} className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                                  {route}
                                </code>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Coming Soon - True Programmatic Templates */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Coming Soon - More Programmatic Templates</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Persona Template',
                    pattern: '/business-phone-for-{persona}',
                    variables: ['consultants', 'freelancers', 'agencies'],
                    scale: '20-50 pages'
                  },
                  {
                    title: 'Spam Checker Localized',
                    pattern: '/fix-spam-caller-id-in-{location}',
                    variables: ['state', 'city', 'industry'],
                    scale: '250+ pages'
                  },
                  {
                    title: 'Phone System Comparison',
                    pattern: '/voip-comparison/{use_case}-{team_size}',
                    variables: ['use_case', 'team_size'],
                    scale: '50-100 pages'
                  }
                ].map((template, index) => (
                  <Card key={index} className="opacity-60 border-dashed">
                    <CardHeader>
                      <CardTitle className="text-lg">{template.title}</CardTitle>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {template.pattern}
                      </code>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Badge variant="outline" className="text-xs">
                          {template.scale}
                        </Badge>
                        <div className="flex flex-wrap gap-1">
                          {template.variables.map((v, i) => (
                            <span key={i} className="text-xs text-gray-500">
                              {`{${v}}`}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Implementation Guide */}
            <div className="mt-12 bg-white rounded-lg p-6 border">
              <h3 className="font-semibold mb-4">Programmatic SEO Implementation Guide</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-medium mb-2">Data Requirements:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• CSV or database with all variable values</li>
                    <li>• Consistent data structure for each template type</li>
                    <li>• Quality scores for filtering low-value pages</li>
                    <li>• Regular data updates for freshness</li>
                    <li>• Validation rules for data integrity</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Scaling Strategy:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Start with highest-value templates (area codes)</li>
                    <li>• Use Supabase for dynamic content</li>
                    <li>• Implement static generation for speed</li>
                    <li>• Monitor indexation and rankings</li>
                    <li>• A/B test conversion elements</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-900 mb-2">⚠️ Important Distinction</h4>
                <p className="text-sm text-yellow-800">
                  True programmatic SEO requires templates that accept variables and generate unique content at scale. 
                  Editorial pages (even if they target SEO keywords) are not programmatic if they don't scale with data inputs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PasswordProtected>
  )
}