import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import TallyModal from '@/components/TallyModal'
import { 
  MapPin, 
  Phone, 
  TrendingUp,
  Building,
  Users,
  CheckCircle,
  Zap,
  Shield,
  Globe
} from 'lucide-react'
import FAQSection from '../blocks/FAQSection'
import CTABlock from '../blocks/CTABlock'

interface LocationTemplateProps {
  data: {
    h1_text: string
    content_blocks: any
    cta_config: any
    structured_data: any
    location?: {
      city: string
      state: string
      area_code: string
      population?: number
      business_density_score?: number
      pickup_rate_index?: number
      local_competitors?: any
    }
  }
}

export default function LocationTemplate({ data }: LocationTemplateProps) {
  const location = data.location
  const stats = data.content_blocks?.stats || {}
  const localFeatures = data.content_blocks?.local_features || []
  const hero = data.content_blocks?.hero || ''

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge variant="outline" className="mb-4">
              <MapPin className="w-4 h-4 mr-1" />
              {location?.city}, {location?.state}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {data.h1_text}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              {hero}
            </p>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-blue-900">
                    {stats.pickup_rate || location?.pickup_rate_index || 73}%
                  </div>
                  <p className="text-sm text-blue-700">Higher pickup rate</p>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-2">
                    <Building className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-green-900">
                    {stats.businesses || '15,000+'}
                  </div>
                  <p className="text-sm text-green-700">Local businesses</p>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-2">
                    <Zap className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="text-3xl font-bold text-purple-900">
                    30 sec
                  </div>
                  <p className="text-sm text-purple-700">Setup time</p>
                </CardContent>
              </Card>
            </div>

            {/* Primary CTA */}
            <CTABlock config={{
              ...data.cta_config,
              urgency: data.cta_config?.urgency || `Only ${Math.floor(Math.random() * 50) + 20} ${location?.area_code} numbers left today`
            }} />
          </motion.div>
        </div>
      </section>

      {/* Why Local Numbers Matter */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Why {location?.city} Businesses Need Local Numbers
            </h2>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Local Trust Factor</h3>
                    <p className="text-gray-600">
                      {location?.city} residents are {location?.pickup_rate_index || 73}% more likely 
                      to answer calls from {location?.area_code} numbers. Out-of-state numbers 
                      get ignored or blocked.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Spam Protection</h3>
                    <p className="text-gray-600">
                      Local numbers with proper caller ID are rarely flagged as spam. 
                      Your business appears legitimate to carriers and customers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-full flex-shrink-0">
                    <Globe className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Work From Anywhere</h3>
                    <p className="text-gray-600">
                      Get a {location?.area_code} number even if you're not physically in 
                      {location?.city}. Perfect for remote teams or expanding businesses.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle>Local Presence Calculator</CardTitle>
                    <CardDescription>
                      See the impact of a {location?.area_code} number
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Weekly outbound calls</span>
                        <span className="font-semibold">200</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">With out-of-state number</span>
                        <span className="font-semibold text-red-600">54 answered</span>
                      </div>
                      <Progress value={27} className="h-2 bg-red-100" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">With {location?.area_code} number</span>
                        <span className="font-semibold text-green-600">146 answered</span>
                      </div>
                      <Progress value={73} className="h-2 bg-green-100" />
                    </div>
                    
                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-600 mb-2">Additional conversations per week:</p>
                      <p className="text-3xl font-bold text-green-600">+92 calls</p>
                      <p className="text-sm text-gray-500 mt-1">
                        That's {92 * 52} more opportunities per year
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Numbers */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              {location?.area_code} Numbers Available Now
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {localFeatures.map((feature: string, index: number) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
                    <p className="font-medium">{feature}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-2 border-blue-200 mb-8">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Sample {location?.area_code} Numbers
                </h3>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <p className="font-mono text-lg">
                      ({location?.area_code}) 555-0101
                    </p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <p className="font-mono text-lg">
                      ({location?.area_code}) 555-0202
                    </p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <p className="font-mono text-lg">
                      ({location?.area_code}) 555-0303
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Choose from thousands of available numbers or port your existing one
                </p>
                <TallyModal
                  buttonText={`Get Your ${location?.area_code} Number`}
                  buttonClassName="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Everything You Need for {location?.city} Business
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Phone className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Branded Caller ID</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Your business name appears on every call, building trust with 
                    {location?.city} customers instantly.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-green-600 mb-2" />
                  <CardTitle>Team Sharing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Share your {location?.area_code} number with your whole team. 
                    Everyone can call and text from one number.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-purple-600 mb-2" />
                  <CardTitle>Spam Protection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Your {location?.area_code} number stays clean with our carrier 
                    verification and reputation monitoring.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Local Competitors */}
      {location?.local_competitors && (
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                Why {location?.city} Businesses Choose Ring4
              </h2>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left">Feature</th>
                      <th className="px-6 py-3 text-center">Ring4</th>
                      {location.local_competitors.providers.slice(0, 2).map((provider: string) => (
                        <th key={provider} className="px-6 py-3 text-center">{provider}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4">Local {location.area_code} Numbers</td>
                      <td className="px-6 py-4 text-center">✅</td>
                      <td className="px-6 py-4 text-center">⚠️</td>
                      <td className="px-6 py-4 text-center">❌</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4">Instant Setup</td>
                      <td className="px-6 py-4 text-center">✅</td>
                      <td className="px-6 py-4 text-center">❌</td>
                      <td className="px-6 py-4 text-center">❌</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Branded Caller ID</td>
                      <td className="px-6 py-4 text-center">✅</td>
                      <td className="px-6 py-4 text-center">❌</td>
                      <td className="px-6 py-4 text-center">❌</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4">Team Features</td>
                      <td className="px-6 py-4 text-center">✅</td>
                      <td className="px-6 py-4 text-center">Limited</td>
                      <td className="px-6 py-4 text-center">❌</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Common Questions About {location?.area_code} Numbers
            </h2>
            
            <FAQSection faqs={[
              {
                question: `Why do I need a local ${location?.city} phone number?`,
                answer: `Local ${location?.area_code} numbers see ${location?.pickup_rate_index || 73}% higher pickup rates than out-of-state numbers. ${location?.city} residents trust local businesses more and are more likely to answer calls from familiar area codes.`
              },
              {
                question: `Can I get a ${location?.area_code} number if I'm not in ${location?.city}?`,
                answer: `Yes! Ring4 lets you get a ${location?.city} business number from anywhere. Perfect for remote teams, virtual offices, or businesses expanding into the ${location?.city} market.`
              },
              {
                question: `How quickly can I start using my ${location?.area_code} number?`,
                answer: `Your new ${location?.area_code} number is ready to use instantly. Make and receive calls, send texts, and share with your team within 30 seconds of signup.`
              },
              {
                question: `Can I port my existing number to get ${location?.area_code} features?`,
                answer: `Yes! You can port your existing number to Ring4 and add a ${location?.area_code} number as a second line. Or use call forwarding to keep your current number while gaining local presence.`
              }
            ]} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Connect with {location?.city}?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get your {location?.area_code} business number and start building local trust today
            </p>
            <CTABlock config={{
              primary: `Get Your ${location?.area_code} Number Now`,
              secondary: 'See All Features',
              socialProof: `Join ${stats.businesses || '15,000+'} ${location?.city} businesses using Ring4`
            }} />
          </div>
        </div>
      </section>
    </div>
  )
}