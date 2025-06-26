import { Helmet } from 'react-helmet-async'
import { MapPin, Shield, Users, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AreaCodeData {
  area_code: string
  city: string
  state: string
  state_abbr: string
  business_density: 'high' | 'medium' | 'low'
  spam_risk_index: number // 0-100
  population: number
  major_industries: string[]
  competitor_presence: {
    grasshopper: boolean
    openphone: boolean
    ringcentral: boolean
  }
}

interface AreaCodeTemplateProps {
  data: {
    area_code: string
    location_data: AreaCodeData
    content_blocks?: {
      hero?: {
        title?: string
        subtitle?: string
      }
      benefits?: Array<{ title: string; description: string }>
      testimonials?: Array<{ name: string; business: string; quote: string; rating: number }>
      faqs?: Array<{ question: string; answer: string }>
    }
  }
}

export default function AreaCodeTemplate({ data }: AreaCodeTemplateProps) {
  const { area_code, location_data } = data
  const { city, state, state_abbr, business_density, spam_risk_index, population, major_industries } = location_data
  
  const pageTitle = `${area_code} Business Phone Numbers | Local ${city}, ${state_abbr} Numbers`
  const metaDescription = `Get a local ${area_code} business phone number for ${city}, ${state}. Professional SMS, spam caller ID protection, and branded calling for ${city} businesses.`

  const spamRiskLevel = spam_risk_index > 70 ? 'High' : spam_risk_index > 40 ? 'Medium' : 'Low'
  const businessDensityText = business_density === 'high' ? 'Major business hub' : 
                             business_density === 'medium' ? 'Growing business area' : 'Emerging market'

  const localBenefits = [
    {
      title: `Local ${city} Presence`,
      description: `Establish credibility with a local ${area_code} number that ${city} customers recognize and trust.`
    },
    {
      title: 'Spam Caller ID Protection',
      description: `${city} has a ${spamRiskLevel.toLowerCase()} spam risk index. Ring4's branded caller ID ensures your calls get answered.`
    },
    {
      title: 'Professional SMS',
      description: `Text your ${city} customers directly from your ${area_code} business number with two-way messaging.`
    },
    {
      title: 'Multi-User Support',
      description: `Perfect for ${city} teams - share your ${area_code} number across multiple employees and devices.`
    }
  ]

  const industryUseCase = major_industries[0] ? {
    industry: major_industries[0],
    example: major_industries[0] === 'Real Estate' ? 
      `Real estate agents in ${city} use Ring4 to manage property inquiries and client follow-ups with a professional ${area_code} number.` :
    major_industries[0] === 'Healthcare' ?
      `Healthcare practices in ${city} use Ring4 to separate patient communications while maintaining HIPAA compliance.` :
    major_industries[0] === 'Legal' ?
      `Law firms in ${city} use Ring4 to manage client intake and maintain professional communication standards.` :
      `${major_industries[0]} businesses in ${city} use Ring4 to streamline customer communications and improve response times.`
  } : null

  const faqs = data.content_blocks?.faqs || [
    {
      question: `Can I get a ${area_code} number if I'm not in ${city}?`,
      answer: `Yes! You can get a ${area_code} number from anywhere. Many businesses use local ${city} numbers to establish a presence in the ${state} market.`
    },
    {
      question: `How quickly can I get my ${area_code} number active?`,
      answer: `Your ${area_code} Ring4 number is active immediately after signup. Start receiving calls and texts right away.`
    },
    {
      question: `Can I keep my current number and add a ${area_code} number?`,
      answer: `Absolutely! Ring4 works alongside your existing phone. Use your ${area_code} number for business and keep your personal number private.`
    },
    {
      question: `What makes Ring4 better than other ${city} business phone options?`,
      answer: `Ring4 offers spam caller ID protection, professional SMS, and branded calling - features specifically designed for modern ${city} businesses.`
    }
  ]

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <link rel="canonical" href={`https://ring4.com/local-business-number/${area_code}`} />
        
        {/* Local Business Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Service",
            "name": `${area_code} Business Phone Numbers`,
            "description": metaDescription,
            "provider": {
              "@type": "Organization",
              "name": "Ring4"
            },
            "areaServed": {
              "@type": "City",
              "name": city,
              "containedInPlace": {
                "@type": "State",
                "name": state
              }
            },
            "offers": {
              "@type": "Offer",
              "description": `Local ${area_code} business phone numbers`
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
                Get Your {area_code} Business Number
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Professional phone system for {city}, {state} businesses. 
                Local presence, spam protection, and professional SMS.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <MapPin className="w-5 h-5" />
                  <span>{city}, {state_abbr}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <Users className="w-5 h-5" />
                  <span>{businessDensityText}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <Shield className="w-5 h-5" />
                  <span>{spamRiskLevel} spam risk</span>
                </div>
              </div>

              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
                Get Your {area_code} Number Now
              </Button>
              <p className="text-sm mt-4 opacity-80">Active immediately • No setup fees</p>
            </div>
          </div>
        </div>

        {/* Local Stats */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{area_code}</div>
                <div className="text-gray-600">Area Code</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{population.toLocaleString()}</div>
                <div className="text-gray-600">Population</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{spam_risk_index}%</div>
                <div className="text-gray-600">Spam Risk Index</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{major_industries.length}+</div>
                <div className="text-gray-600">Key Industries</div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why {city} Businesses Choose Ring4
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {localBenefits.map((benefit, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Industry Use Case */}
        {industryUseCase && (
          <div className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4 text-center">
                      Popular with {city} {industryUseCase.industry} Businesses
                    </h3>
                    <p className="text-lg text-gray-700 text-center">
                      {industryUseCase.example}
                    </p>
                    <div className="text-center mt-6">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Start Your {industryUseCase.industry} Number
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Major Industries */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Serving {city}'s Key Industries
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {major_industries.map((industry, index) => (
                <div key={index} className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <span className="font-medium text-gray-800">{industry}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              {area_code} Business Number FAQs
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
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
              Ready to Get Your {area_code} Number?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of {city} businesses using Ring4 for professional communication
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
              Start Free Trial - Get {area_code} Number
            </Button>
            <p className="text-sm mt-4 opacity-80">
              No contracts • Cancel anytime • 14-day free trial
            </p>
          </div>
        </div>
      </div>
    </>
  )
}