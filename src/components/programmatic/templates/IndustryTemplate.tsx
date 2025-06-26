import { Helmet } from 'react-helmet-async'
import { Phone, MessageSquare, Shield, Users, CheckCircle, Star, TrendingUp, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface IndustryData {
  name: string
  display_name: string
  pain_points: string[]
  use_cases: {
    primary: string
    secondary: string[]
  }
  common_scenarios: Array<{
    scenario: string
    ring4_solution: string
  }>
  competitors: string[]
  roi_metrics: {
    response_rate_improvement: number
    lead_conversion_increase: number
    customer_satisfaction_boost: number
  }
  testimonial: {
    quote: string
    author: string
    company: string
    result: string
  }
}

interface IndustryTemplateProps {
  data: {
    industry: string
    industry_data: IndustryData
    content_blocks?: {
      hero?: {
        title?: string
        subtitle?: string
      }
      features?: Array<{ title: string; description: string; icon: string }>
      case_studies?: Array<{ business: string; challenge: string; solution: string; result: string }>
    }
  }
}

export default function IndustryTemplate({ data }: IndustryTemplateProps) {
  const { industry, industry_data } = data
  
  const pageTitle = `Business Phone for ${industry_data.display_name} | Ring4`
  const metaDescription = `Professional phone system designed for ${industry_data.display_name}. Get branded caller ID, SMS messaging, and spam protection. Trusted by ${industry_data.display_name} professionals nationwide.`

  const industryFeatures = [
    {
      icon: Phone,
      title: 'Professional Presence',
      description: `Build trust with ${industry_data.display_name} clients through branded caller ID that shows your business name on every call.`
    },
    {
      icon: MessageSquare,
      title: 'Client Communication',
      description: `Text clients directly from your business number. Perfect for ${industry_data.use_cases.primary} and follow-ups.`
    },
    {
      icon: Shield,
      title: 'Spam Protection',
      description: `Ensure your calls get answered with advanced spam protection - critical for ${industry_data.display_name} outreach.`
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: `Share your business number across your ${industry_data.display_name} team without missing important client calls.`
    }
  ]

  const pricingBenefits = [
    'No setup fees or hidden costs',
    'Instant activation - no waiting',
    'Professional SMS messaging included',
    'Branded caller ID protection',
    'Multi-user access for teams',
    '14-day free trial'
  ]

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <link rel="canonical" href={`https://ring4.com/business-phone-for-${industry.toLowerCase().replace(/\s+/g, '-')}`} />
        
        {/* Industry Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Service",
            "name": `Business Phone for ${industry_data.display_name}`,
            "description": metaDescription,
            "provider": {
              "@type": "Organization",
              "name": "Ring4"
            },
            "serviceType": "Business Phone System",
            "audience": {
              "@type": "BusinessAudience",
              "name": industry_data.display_name
            },
            "offers": {
              "@type": "Offer",
              "price": "9.99",
              "priceCurrency": "USD",
              "description": "Professional business phone system"
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
                Business Phone for {industry_data.display_name}
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Professional communication tools designed specifically for {industry_data.display_name} professionals. 
                Get branded caller ID, SMS messaging, and spam protection.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <Star className="w-5 h-5" />
                  <span>4.8/5 Rating</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <TrendingUp className="w-5 h-5" />
                  <span>+{industry_data.roi_metrics.response_rate_improvement}% Response Rate</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <Clock className="w-5 h-5" />
                  <span>Instant Setup</span>
                </div>
              </div>

              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
                Start Free Trial - Get Your Number Now
              </Button>
              <p className="text-sm mt-4 opacity-80">Trusted by {industry_data.display_name} professionals nationwide</p>
            </div>
          </div>
        </div>

        {/* Industry Pain Points */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              {industry_data.display_name} Communication Challenges
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {industry_data.pain_points.map((pain, index) => (
                <Card key={index} className="text-center border-red-200">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">❌</span>
                    </div>
                    <p className="font-medium text-gray-800">{pain}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Ring4 Solutions for {industry_data.display_name}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {industryFeatures.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <Card key={index} className="text-center">
                    <CardHeader>
                      <IconComponent className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>

        {/* Use Case Scenarios */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              How {industry_data.display_name} Use Ring4
            </h2>
            <div className="max-w-4xl mx-auto space-y-8">
              {industry_data.common_scenarios.map((scenario, index) => (
                <Card key={index}>
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <h3 className="text-xl font-bold mb-4 text-gray-800">
                          Scenario: {scenario.scenario}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Common challenge faced by {industry_data.display_name} professionals.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-3 text-blue-600">
                          Ring4 Solution:
                        </h4>
                        <p className="text-gray-700">
                          {scenario.ring4_solution}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* ROI Metrics */}
        <div className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Results for {industry_data.display_name} Professionals
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    +{industry_data.roi_metrics.response_rate_improvement}%
                  </div>
                  <p className="text-gray-600">Response Rate Improvement</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    +{industry_data.roi_metrics.lead_conversion_increase}%
                  </div>
                  <p className="text-gray-600">Lead Conversion Increase</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    +{industry_data.roi_metrics.customer_satisfaction_boost}%
                  </div>
                  <p className="text-gray-600">Customer Satisfaction</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <CardContent className="p-8 text-center">
                  <div className="flex items-center justify-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-xl md:text-2xl mb-6 italic">
                    "{industry_data.testimonial.quote}"
                  </blockquote>
                  <div className="mb-4">
                    <cite className="text-lg font-semibold not-italic">
                      {industry_data.testimonial.author}
                    </cite>
                    <p className="opacity-90">{industry_data.testimonial.company}</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 inline-block">
                    <p className="font-semibold">Result: {industry_data.testimonial.result}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Pricing for {industry_data.display_name}
            </h2>
            <div className="max-w-md mx-auto">
              <Card className="border-2 border-blue-200 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">Professional Plan</CardTitle>
                  <div className="text-4xl font-bold text-blue-600">$9.99</div>
                  <div className="text-gray-600">per month</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {pricingBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
                    Start Free Trial
                  </Button>
                  <p className="text-center text-sm text-gray-600 mt-4">
                    Perfect for {industry_data.display_name} professionals
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Common Questions from {industry_data.display_name}
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: `How quickly can I start using Ring4 for my ${industry_data.display_name} business?`,
                  answer: `Ring4 activates instantly. You can get your professional number and start making calls/sending texts immediately - no waiting periods like traditional business phone services.`
                },
                {
                  question: `Will my clients recognize that it's my ${industry_data.display_name} business calling?`,
                  answer: `Yes! Ring4's branded caller ID shows your business name on client phones, building immediate trust and increasing answer rates by up to ${industry_data.roi_metrics.response_rate_improvement}%.`
                },
                {
                  question: `Can my ${industry_data.display_name} team share the same business number?`,
                  answer: `Absolutely. Ring4 supports multiple users on the same number, perfect for ${industry_data.display_name} teams who need to collaborate on client communications while maintaining a professional presence.`
                },
                {
                  question: `Is Ring4 better than other business phone options for ${industry_data.display_name}?`,
                  answer: `Ring4 is specifically designed for modern businesses like ${industry_data.display_name}. Unlike traditional systems, you get instant SMS, spam protection, and branded calling - all critical for ${industry_data.use_cases.primary}.`
                }
              ].map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3 text-lg">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Upgrade Your {industry_data.display_name} Communications?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of {industry_data.display_name} professionals using Ring4
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
              Start Your Free 14-Day Trial
            </Button>
            <p className="text-sm mt-4 opacity-80">
              No contracts • Instant activation • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </>
  )
}