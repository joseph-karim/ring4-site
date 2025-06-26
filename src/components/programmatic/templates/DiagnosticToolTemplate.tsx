import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import TallyModal from '@/components/TallyModal'
import { 
  Phone, 
  AlertTriangle, 
  CheckCircle, 
  ShieldX,
  TrendingDown,
  Users
} from 'lucide-react'
import SpamCheckerTool from '../tools/SpamCheckerTool'
import ReviewQuotes from '../blocks/ReviewQuotes'
import FAQSection from '../blocks/FAQSection'
import CTABlock from '../blocks/CTABlock'

interface DiagnosticToolTemplateProps {
  data: {
    h1_text: string
    content_blocks: any
    cta_config: any
    structured_data: any
    reviews?: any[]
  }
}

export default function DiagnosticToolTemplate({ data }: DiagnosticToolTemplateProps) {
  const trustSignals = data.content_blocks?.trust_signals || []
  const intro = data.content_blocks?.intro || ''

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <Badge variant="destructive" className="mb-4">
            <AlertTriangle className="w-4 h-4 mr-1" />
            Urgent Issue
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {data.h1_text}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            {intro}
          </p>

          {/* Trust Signals */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {trustSignals.map((signal: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="p-4">
                    <p className="text-sm font-medium text-red-900">{signal}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Primary CTA */}
          <CTABlock config={data.cta_config} />
        </motion.div>
      </section>

      {/* Diagnostic Tool Section */}
      <section className="container mx-auto px-4 py-12 bg-white rounded-t-3xl">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Check Your Number's Reputation
          </h2>
          
          <SpamCheckerTool />
        </div>
      </section>

      {/* Problem Explanation */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Why This Happens</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <ShieldX className="w-8 h-8 text-red-500 mb-2" />
                <CardTitle>Carrier Algorithms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Major carriers use AI to flag numbers based on call patterns, 
                  volume, and user reports. Even legitimate businesses get caught.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Phone className="w-8 h-8 text-red-500 mb-2" />
                <CardTitle>Shared VoIP Lines</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Most business phone providers use shared number pools. If one 
                  user spams, everyone on that pool gets flagged.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingDown className="w-8 h-8 text-red-500 mb-2" />
                <CardTitle>No Caller ID</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Numbers without proper business identification are 3x more likely 
                  to be marked as spam by carrier networks.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">The Real Cost of Spam Labels</h2>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-red-100 p-2 rounded-full">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">79% of calls ignored</h3>
                      <p className="text-gray-600">
                        When your number shows "Spam Likely", nearly 8 out of 10 
                        recipients won't answer - even warm leads.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-red-100 p-2 rounded-full">
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">42% lower conversion rates</h3>
                      <p className="text-gray-600">
                        Businesses with spam-flagged numbers see dramatic drops in 
                        sales conversions and customer trust.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-red-100 p-2 rounded-full">
                      <Users className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Lost revenue daily</h3>
                      <p className="text-gray-600">
                        Every day with a spam label means missed opportunities, 
                        lost deals, and damaged reputation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Card className="border-2 border-red-200">
                  <CardHeader>
                    <CardTitle>Calculate Your Loss</CardTitle>
                    <CardDescription>
                      Based on average business metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Daily outbound calls</span>
                        <span className="font-semibold">50</span>
                      </div>
                      <Progress value={50} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Calls ignored (79%)</span>
                        <span className="font-semibold text-red-600">40</span>
                      </div>
                      <Progress value={79} className="h-2 bg-red-100" />
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-600 mb-2">Estimated monthly loss:</p>
                      <p className="text-3xl font-bold text-red-600">$12,400</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">The Ring4 Solution</h2>
            <p className="text-xl text-gray-600">
              Get a clean number with branded caller ID in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
                <CardTitle>Clean Numbers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Every Ring4 number is carrier-verified and starts with a 
                  perfect reputation score.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
                <CardTitle>Branded Caller ID</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Your business name appears on every call, building instant 
                  trust with recipients.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
                <CardTitle>Reputation Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We actively monitor and protect your number's reputation 
                  across all carriers.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <TallyModal
              buttonText="Fix My Caller ID Now"
              buttonClassName="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 rounded-lg font-semibold inline-flex items-center gap-2"
              modalOptions={{
                width: 500,
                overlay: true
              }}
            />
            <p className="text-sm text-gray-600 mt-4">
              No credit card required • Setup in 5 minutes • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      {data.reviews && data.reviews.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                Why Businesses Switch to Ring4
              </h2>
              <ReviewQuotes reviews={data.reviews} />
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <FAQSection faqs={[
            {
              question: "Why does my business number show 'Spam Likely'?",
              answer: "Carriers flag numbers based on call patterns, volume, and user reports. Even legitimate businesses can get flagged if they use shared VoIP lines or lack proper caller ID verification."
            },
            {
              question: "How quickly can Ring4 fix my spam label?",
              answer: "You can get a clean Ring4 number instantly. If you want to port your existing number, we can help clean its reputation within 24-48 hours."
            },
            {
              question: "Will my new Ring4 number get flagged as spam?",
              answer: "No. Ring4 numbers come with branded caller ID and are actively monitored to maintain their reputation. We guarantee clean delivery across all major carriers."
            },
            {
              question: "Can I keep my existing phone number?",
              answer: "Yes! You can port your existing number to Ring4, and we'll help restore its reputation. Or get a new local number and forward calls from your old one."
            }
          ]} />
        </div>
      </section>
    </div>
  )
}