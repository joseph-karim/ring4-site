import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import TallyModal from '@/components/TallyModal'
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Clock,
  MessageSquare,
  Shield,
  Users,
  Zap
} from 'lucide-react'
import ReviewQuotes from '../blocks/ReviewQuotes'
import FAQSection from '../blocks/FAQSection'
import CTABlock from '../blocks/CTABlock'

interface ComparisonTemplateProps {
  data: {
    h1_text: string
    content_blocks: any
    cta_config: any
    structured_data: any
    reviews?: any[]
  }
}

export default function ComparisonTemplate({ data }: ComparisonTemplateProps) {
  const comparisonMatrix = data.content_blocks?.comparison_matrix || {}
  const competitor = data.h1_text.match(/vs (.+?):/)?.[1] || 'Competitor'
  
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
              Honest Comparison
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {data.h1_text}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Sick of spam flags or delayed SMS approvals? You're not alone. Let's break it down.
            </p>

            <CTABlock config={data.cta_config} />
          </motion.div>
        </div>
      </section>

      {/* Quick Comparison Table */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Feature</th>
                    <th className="px-6 py-4 text-center font-semibold">Ring4</th>
                    <th className="px-6 py-4 text-center font-semibold">{competitor}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Object.entries(comparisonMatrix).map(([feature, values]: [string, any], index) => (
                    <tr key={feature} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="px-6 py-4 font-medium">
                        {feature.split('_').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {typeof values.ring4 === 'string' && values.ring4.includes('✓') ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="font-semibold text-green-600">{values.ring4}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {typeof values[competitor.toLowerCase()] === 'string' && 
                         values[competitor.toLowerCase()].includes('✗') ? (
                          <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                        ) : (
                          <span className="text-gray-600">{values[competitor.toLowerCase()]}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points from Reviews */}
      {data.reviews && data.reviews.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">
                What {competitor} Users Are Saying
              </h2>
              <p className="text-center text-gray-600 mb-8">
                Real reviews from verified users who made the switch
              </p>
              <ReviewQuotes reviews={data.reviews} />
            </div>
          </div>
        </section>
      )}

      {/* Feature Deep Dives */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              The Differences That Matter
            </h2>

            <div className="space-y-12">
              {/* SMS Activation */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <MessageSquare className="h-8 w-8 text-blue-600" />
                    <h3 className="text-2xl font-bold">SMS Activation: Hours vs. Weeks</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    With Ring4, you can start texting right away. {competitor} users often wait 
                    7-21 days for 10DLC approval, crippling your sales velocity.
                  </p>
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Every day without SMS means lost follow-ups and dead deals.
                    </AlertDescription>
                  </Alert>
                </div>
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle>Time to First Text</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">Ring4</span>
                          <span className="text-green-600 font-bold">Instant</span>
                        </div>
                        <div className="w-full bg-green-100 rounded-full h-3">
                          <div className="bg-green-500 h-3 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{competitor}</span>
                          <span className="text-red-600 font-bold">7-21 days</span>
                        </div>
                        <div className="w-full bg-red-100 rounded-full h-3">
                          <div className="bg-red-500 h-3 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Spam Protection */}
              <div className="grid md:grid-cols-2 gap-8 items-center flex-row-reverse">
                <div className="order-2 md:order-1">
                  <Card className="border-2 border-green-200">
                    <CardHeader>
                      <CardTitle>Spam Protection Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span>Branded Caller ID</span>
                          <div className="flex gap-4">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <XCircle className="h-5 w-5 text-red-500" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Clean Number Pool</span>
                          <div className="flex gap-4">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <XCircle className="h-5 w-5 text-red-500" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Reputation Monitoring</span>
                          <div className="flex gap-4">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <XCircle className="h-5 w-5 text-red-500" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Carrier Verification</span>
                          <div className="flex gap-4">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <XCircle className="h-5 w-5 text-red-500" />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-4 pt-4 border-t">
                        <span>Ring4</span>
                        <span>{competitor}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="h-8 w-8 text-green-600" />
                    <h3 className="text-2xl font-bold">Real Spam Protection</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {competitor} users report constant spam labeling issues with no support. 
                    Ring4 actively monitors and protects your caller reputation.
                  </p>
                  <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700">
                    "Our number was flagged as spam and there was no support to fix it."
                    <cite className="block text-sm text-gray-500 mt-2">- {competitor} User</cite>
                  </blockquote>
                </div>
              </div>

              {/* Support */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="h-8 w-8 text-purple-600" />
                    <h3 className="text-2xl font-bold">Support When You Need It</h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    When your business phone has issues, you need help fast. See the difference 
                    in support response times.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Clock className="h-8 w-8 text-green-500 mx-auto mb-2" />
                        <p className="font-bold text-green-600">5 min</p>
                        <p className="text-sm text-gray-600">Ring4 Support</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Clock className="h-8 w-8 text-red-500 mx-auto mb-2" />
                        <p className="font-bold text-red-600">48+ hrs</p>
                        <p className="text-sm text-gray-600">{competitor} Support</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div>
                  <Card className="bg-purple-50 border-purple-200">
                    <CardHeader>
                      <CardTitle>Support Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Live Chat</span>
                          <div className="flex gap-2">
                            <Badge className="bg-green-100 text-green-800">Ring4</Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Phone Support</span>
                          <div className="flex gap-2">
                            <Badge className="bg-green-100 text-green-800">Ring4</Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Email Only</span>
                          <div className="flex gap-2">
                            <Badge className="bg-red-100 text-red-800">{competitor}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Setup Help</span>
                          <div className="flex gap-2">
                            <Badge className="bg-green-100 text-green-800">Ring4</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Migration Offer */}
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-blue-300 bg-white">
              <CardHeader className="text-center">
                <Badge className="mb-4 bg-blue-100 text-blue-800">
                  <Zap className="h-4 w-4 mr-1" />
                  Limited Time Offer
                </Badge>
                <CardTitle className="text-3xl">
                  Switching from {competitor}? We'll Make It Easy
                </CardTitle>
                <CardDescription className="text-lg">
                  Get exclusive benefits when you switch to Ring4
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Free Number Port</h4>
                    <p className="text-sm text-gray-600">
                      We'll port your existing number at no charge
                    </p>
                  </div>
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Setup Assistance</h4>
                    <p className="text-sm text-gray-600">
                      White-glove onboarding to get you started fast
                    </p>
                  </div>
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">30-Day Guarantee</h4>
                    <p className="text-sm text-gray-600">
                      Not happy? Get a full refund, no questions asked
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <TallyModal
                    buttonText="Switch to Ring4 Now"
                    buttonClassName="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-lg font-semibold inline-flex items-center gap-2"
                  />
                  <p className="text-sm text-gray-600 mt-4">
                    Join 2,341 businesses who switched from {competitor} this month
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Common Questions About Switching
            </h2>
            <FAQSection faqs={[
              {
                question: `Is Ring4 really better than ${competitor}?`,
                answer: `Ring4 offers instant SMS activation, branded caller ID, and live support - critical features ${competitor} lacks. Our numbers are actively protected from spam labeling, and setup takes minutes instead of weeks.`
              },
              {
                question: `Can I keep my existing phone number when switching?`,
                answer: `Yes! We'll port your number from ${competitor} for free. The process usually takes 24-48 hours, and you won't miss any calls during the transition.`
              },
              {
                question: `What if I'm locked into a contract with ${competitor}?`,
                answer: `Many of our customers run Ring4 alongside their existing service until their contract ends. You can forward calls or use Ring4 for new campaigns while transitioning.`
              },
              {
                question: `How is Ring4's pricing compared to ${competitor}?`,
                answer: `Ring4 offers transparent, all-inclusive pricing with no hidden fees. Most businesses save 30-40% compared to ${competitor} while getting more features and better support.`
              }
            ]} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Leave {competitor} Behind?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of businesses who made the switch and never looked back
            </p>
            <CTABlock config={{
              primary: 'Start Your Free Trial',
              secondary: 'Talk to Sales',
              socialProof: '14-day trial • No credit card required • Cancel anytime'
            }} />
          </div>
        </div>
      </section>
    </div>
  )
}