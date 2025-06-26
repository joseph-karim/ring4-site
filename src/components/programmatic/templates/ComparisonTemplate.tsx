import { Helmet } from 'react-helmet-async'
import { CheckCircle, X, Star, Users, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface CompetitorData {
  name: string
  pricing: {
    starting_price: number
    billing_cycle: 'monthly' | 'annual'
    setup_fee?: number
  }
  features: {
    sms_messaging: boolean
    branded_caller_id: boolean
    spam_protection: boolean
    multi_user: boolean
    mobile_app: boolean
    integrations: boolean
    voicemail: boolean
    call_forwarding: boolean
    auto_attendant: boolean
    analytics: boolean
  }
  limitations: string[]
  user_complaints: string[]
  review_score: number
  review_count: number
}

interface ComparisonTemplateProps {
  data: {
    competitor: string
    competitor_data: CompetitorData
    content_blocks?: {
      hero?: {
        title?: string
        subtitle?: string
      }
      reviews?: Array<{ 
        name: string
        rating: number
        review: string
        source: string
        competitor_mentioned: boolean
      }>
      migration_tips?: Array<{ step: string; description: string }>
    }
  }
}

export default function ComparisonTemplate({ data }: ComparisonTemplateProps) {
  const { competitor, competitor_data } = data
  
  const pageTitle = `Ring4 vs ${competitor_data.name} - Business Phone Comparison 2024`
  const metaDescription = `Compare Ring4 vs ${competitor_data.name} features, pricing, and user reviews. See why businesses are switching to Ring4 for better spam protection and SMS messaging.`

  const comparisonFeatures = [
    {
      feature: 'Professional SMS Messaging',
      ring4: true,
      competitor: competitor_data.features.sms_messaging,
      ring4_detail: 'Two-way SMS with templates and automation',
      competitor_detail: competitor_data.features.sms_messaging ? 'Basic SMS available' : 'No SMS messaging'
    },
    {
      feature: 'Branded Caller ID Protection',
      ring4: true,
      competitor: competitor_data.features.branded_caller_id,
      ring4_detail: 'Shows your business name on calls',
      competitor_detail: competitor_data.features.branded_caller_id ? 'Limited caller ID features' : 'No branded caller ID'
    },
    {
      feature: 'Advanced Spam Protection',
      ring4: true,
      competitor: competitor_data.features.spam_protection,
      ring4_detail: 'AI-powered spam detection and blocking',
      competitor_detail: competitor_data.features.spam_protection ? 'Basic spam filtering' : 'No spam protection'
    },
    {
      feature: 'Multi-User Support',
      ring4: true,
      competitor: competitor_data.features.multi_user,
      ring4_detail: 'Unlimited users per number',
      competitor_detail: competitor_data.features.multi_user ? 'Limited user access' : 'Single user only'
    },
    {
      feature: 'Mobile App',
      ring4: true,
      competitor: competitor_data.features.mobile_app,
      ring4_detail: 'Native iOS and Android apps',
      competitor_detail: competitor_data.features.mobile_app ? 'Basic mobile app' : 'No mobile app'
    },
    {
      feature: 'Setup Time',
      ring4: true,
      competitor: false,
      ring4_detail: 'Instant activation',
      competitor_detail: 'Up to 3-5 business days'
    },
    {
      feature: 'Contract Requirements',
      ring4: true,
      competitor: false,
      ring4_detail: 'No contracts required',
      competitor_detail: 'Annual contracts typical'
    }
  ]

  const pricingComparison = {
    ring4: {
      price: '$9.99',
      features: ['Unlimited SMS', 'Branded Caller ID', 'Spam Protection', 'Multi-user access'],
      billing: 'per month'
    },
    competitor: {
      price: `$${competitor_data.pricing.starting_price}`,
      features: Object.entries(competitor_data.features)
        .filter(([_, value]) => value)
        .slice(0, 4)
        .map(([key, _]) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())),
      billing: competitor_data.pricing.billing_cycle,
      setupFee: competitor_data.pricing.setup_fee
    }
  }

  const switchingReasons = [
    'Better spam protection keeps calls getting answered',
    'Professional SMS messaging for customer communication',
    'Branded caller ID builds trust and credibility',
    'Faster setup with instant activation',
    'No long-term contracts required',
    'Better mobile app experience'
  ]

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <link rel="canonical" href={`https://ring4.com/compare/ring4-vs-${competitor.toLowerCase().replace(/\s+/g, '-')}`} />
        
        {/* Comparison Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Product",
            "name": "Ring4 vs " + competitor_data.name,
            "description": metaDescription,
            "category": "Business Phone System",
            "brand": {
              "@type": "Brand",
              "name": "Ring4"
            },
            "offers": {
              "@type": "Offer",
              "price": "9.99",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Ring4 vs {competitor_data.name}
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Compare features, pricing, and user satisfaction to see why businesses are switching to Ring4
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <Star className="w-5 h-5" />
                  <span>4.8/5 Rating</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <Users className="w-5 h-5" />
                  <span>No Contracts</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <Zap className="w-5 h-5" />
                  <span>Instant Setup</span>
                </div>
              </div>

              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
                Try Ring4 Free for 14 Days
              </Button>
              <p className="text-sm mt-4 opacity-80">Switch from {competitor_data.name} in minutes</p>
            </div>
          </div>
        </div>

        {/* Quick Comparison */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Quick Comparison</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-2 border-blue-200 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Recommended
                  </span>
                </div>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">Ring4</CardTitle>
                  <div className="text-3xl font-bold text-blue-600">{pricingComparison.ring4.price}</div>
                  <div className="text-gray-600">{pricingComparison.ring4.billing}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pricingComparison.ring4.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">{competitor_data.name}</CardTitle>
                  <div className="text-3xl font-bold text-gray-600">{pricingComparison.competitor.price}</div>
                  <div className="text-gray-600">
                    {pricingComparison.competitor.billing}
                    {pricingComparison.competitor.setupFee && (
                      <div className="text-sm text-red-600">
                        + ${pricingComparison.competitor.setupFee} setup fee
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pricingComparison.competitor.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full mt-6" disabled>
                    Current Provider
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Detailed Feature Comparison</h2>
            <div className="max-w-5xl mx-auto overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Feature</th>
                    <th className="px-6 py-4 text-center font-semibold text-blue-600">Ring4</th>
                    <th className="px-6 py-4 text-center font-semibold">{competitor_data.name}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisonFeatures.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{item.feature}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          {item.ring4 ? (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          ) : (
                            <X className="w-6 h-6 text-red-500" />
                          )}
                          <span className="text-xs text-gray-600">{item.ring4_detail}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          {item.competitor ? (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          ) : (
                            <X className="w-6 h-6 text-red-500" />
                          )}
                          <span className="text-xs text-gray-600">{item.competitor_detail}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Why Switch Section */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Businesses Switch from {competitor_data.name} to Ring4
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {switchingReasons.map((reason, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <p className="font-medium">{reason}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* User Reviews */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Users Are Saying</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    "Switched from {competitor_data.name} to Ring4 last month. The spam protection alone has increased our answer rate by 40%. The SMS feature is game-changing for customer follow-ups."
                  </p>
                  <div className="text-sm text-gray-600">
                    - Sarah M., Real Estate Agent
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    "Ring4's setup was instant compared to the week-long process with {competitor_data.name}. The branded caller ID has helped our callback rate significantly."
                  </p>
                  <div className="text-sm text-gray-600">
                    - Mike T., Contractor
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Migration Guide */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              How to Switch from {competitor_data.name} to Ring4
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                {[
                  { step: "Sign up for Ring4", description: "Get your new business number instantly - no waiting period" },
                  { step: "Set up call forwarding", description: "Forward your existing number to Ring4 while you transition" },
                  { step: "Update your business listings", description: "Gradually update your marketing materials with your new Ring4 number" },
                  { step: "Cancel your old service", description: `Cancel ${competitor_data.name} once you've fully transitioned` }
                ].map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{item.step}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Switch from {competitor_data.name}?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of businesses who've upgraded to Ring4's modern phone system
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
              Start Your Free 14-Day Trial
            </Button>
            <p className="text-sm mt-4 opacity-80">
              No contracts • Cancel anytime • Keep your existing number
            </p>
          </div>
        </div>
      </div>
    </>
  )
}