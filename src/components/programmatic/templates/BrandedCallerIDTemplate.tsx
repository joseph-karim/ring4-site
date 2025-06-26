import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Shield, 
  Phone, 
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Users,
  Clock,
  Building,
  Star,
  X
} from 'lucide-react'
import FAQSection from '../blocks/FAQSection'
import CTABlock from '../blocks/CTABlock'

interface BrandedCallerIDTemplateProps {
  data: {
    h1_text: string
    content_blocks: any
    cta_config: any
    structured_data: any
  }
}

export default function BrandedCallerIDTemplate({ data }: BrandedCallerIDTemplateProps) {

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge variant="outline" className="mb-4">
              <Shield className="w-4 h-4 mr-1" />
              Branded Caller ID
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {data.h1_text}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Stop showing up as "Unknown Number" or getting ignored. Get branded caller ID 
              that displays your business name on every call.
            </p>

            {/* Problem Highlight */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <h3 className="font-semibold text-red-900">
                  The Hidden Cost of Anonymous Calls
                </h3>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-red-600">67%</div>
                  <div className="text-sm text-red-700">Calls ignored from unknown numbers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">43%</div>
                  <div className="text-sm text-red-700">Lower callback rates</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">$2,400</div>
                  <div className="text-sm text-red-700">Lost revenue per month (avg business)</div>
                </div>
              </div>
            </div>

            <CTABlock config={data.cta_config} />
          </motion.div>
        </div>
      </section>

      {/* Trust Comparison */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              See the Difference Trust Makes
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Without Branded ID */}
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-800">
                    <X className="h-5 w-5" />
                    Without Branded Caller ID
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Phone mockup showing unknown caller */}
                  <div className="bg-gray-900 rounded-2xl p-6 text-white relative mx-auto max-w-xs">
                    <div className="text-center space-y-4">
                      <div className="text-sm text-gray-400">Incoming call...</div>
                      <div className="w-20 h-20 bg-gray-600 rounded-full mx-auto flex items-center justify-center">
                        <Phone className="h-8 w-8" />
                      </div>
                      <div>
                        <div className="text-xl font-semibold text-red-400">(555) 123-4567</div>
                        <div className="text-sm text-gray-400">Unknown Number</div>
                        <div className="text-xs text-red-400 mt-1">Possible spam</div>
                      </div>
                      
                      <div className="flex justify-between mt-6">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                          <X className="h-6 w-6" />
                        </div>
                        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                          <Phone className="h-6 w-6" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <div className="text-sm font-medium text-red-800 mb-2">Customer Thoughts:</div>
                    <div className="text-sm text-red-700 italic">
                      "Unknown number? Probably spam. I'll ignore it."
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* With Branded ID */}
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <CheckCircle className="h-5 w-5" />
                    With Ring4 Branded Caller ID
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Phone mockup showing branded caller */}
                  <div className="bg-gray-900 rounded-2xl p-6 text-white relative mx-auto max-w-xs">
                    <div className="text-center space-y-4">
                      <div className="text-sm text-gray-400">Incoming call...</div>
                      <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto flex items-center justify-center">
                        <Building className="h-8 w-8" />
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-white">ABC Consulting</div>
                        <div className="text-sm text-gray-300">(555) 123-4567</div>
                        <div className="flex items-center justify-center gap-1 text-xs text-green-400 mt-1">
                          <Shield className="h-3 w-3" />
                          Verified Business
                        </div>
                      </div>
                      
                      <div className="flex justify-between mt-6">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                          <X className="h-6 w-6" />
                        </div>
                        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                          <Phone className="h-6 w-6" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <div className="text-sm font-medium text-green-800 mb-2">Customer Thoughts:</div>
                    <div className="text-sm text-green-700 italic">
                      "Oh, it's ABC Consulting! I should answer this."
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Statistics */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              The Trust Factor Numbers
            </h2>

            <div className="grid md:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-green-600 mb-2">84%</div>
                  <p className="text-sm text-gray-600">Higher answer rate with branded caller ID</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <Users className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-blue-600 mb-2">92%</div>
                  <p className="text-sm text-gray-600">Of customers trust calls from known businesses</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <Clock className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-purple-600 mb-2">3x</div>
                  <p className="text-sm text-gray-600">Faster callback response times</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <Star className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-yellow-600 mb-2">97%</div>
                  <p className="text-sm text-gray-600">Customer satisfaction with branded calls</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              How Branded Caller ID Works
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                  <CardTitle>Business Verification</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We verify your business with major carriers and register your company 
                    name with caller ID databases.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-blue-600">2</span>
                  </div>
                  <CardTitle>Carrier Registration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Your business name gets submitted to Verizon, AT&T, T-Mobile, and other 
                    major carriers' caller ID systems.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-blue-600">3</span>
                  </div>
                  <CardTitle>Instant Recognition</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    When you call customers, your business name appears on their phone 
                    instead of just a number.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 bg-blue-50 rounded-lg p-8">
              <h3 className="text-xl font-bold text-center mb-4">
                What Your Customers See
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h4 className="font-semibold mb-3 text-red-700">❌ Before (Generic Number)</h4>
                  <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <div className="text-lg font-semibold">(555) 123-4567</div>
                    <div className="text-sm text-gray-500">Unknown Caller</div>
                    <div className="text-xs text-red-500 mt-1">Potential Spam</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-green-700">✅ After (Branded ID)</h4>
                  <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <div className="text-lg font-semibold text-blue-600">Your Business Name</div>
                    <div className="text-sm text-gray-500">(555) 123-4567</div>
                    <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                      <Shield className="h-3 w-3" />
                      Verified Business
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Use Cases */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Essential for Every Industry
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Real Estate Agents</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    When calling leads about properties, having your name show up builds 
                    immediate trust and increases answer rates by 89%.
                  </p>
                  <div className="bg-green-50 p-3 rounded text-sm">
                    <strong>Before:</strong> "(555) 123-4567" - 34% answer rate<br/>
                    <strong>After:</strong> "Smith Realty" - 63% answer rate
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Healthcare Providers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Patients need to know their doctor's office is calling, not a 
                    potential scammer. Branded ID ensures important calls get answered.
                  </p>
                  <div className="bg-green-50 p-3 rounded text-sm">
                    <strong>Before:</strong> "Unknown" - Patients ignore calls<br/>
                    <strong>After:</strong> "ABC Medical" - 94% answer rate
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Financial Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    In finance, trust is everything. Unknown numbers look suspicious. 
                    Branded caller ID shows you're a legitimate financial institution.
                  </p>
                  <div className="bg-green-50 p-3 rounded text-sm">
                    <strong>Before:</strong> Flagged as spam - 18% answer rate<br/>
                    <strong>After:</strong> "Trusted Financial" - 81% answer rate
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Professional Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Lawyers, accountants, and consultants need to project professionalism. 
                    Branded caller ID reinforces your credibility.
                  </p>
                  <div className="bg-green-50 p-3 rounded text-sm">
                    <strong>Before:</strong> "Possible spam" - Clients don't answer<br/>
                    <strong>After:</strong> "Law Firm Name" - Professional image
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Calculate Your Branded Caller ID ROI
            </h2>

            <Card className="border-2 border-green-200">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Without Branded Caller ID</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Weekly outbound calls</span>
                          <span className="font-bold">100</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Answer rate (unknown number)</span>
                          <span className="font-bold text-red-600">33%</span>
                        </div>
                        <Progress value={33} className="h-2 bg-red-100" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Calls answered</span>
                          <span className="font-bold">33</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Conversion rate</span>
                          <span className="font-bold">15%</span>
                        </div>
                      </div>
                      <div className="pt-4 border-t">
                        <div className="flex justify-between">
                          <span>Weekly deals closed</span>
                          <span className="font-bold text-red-600">5 deals</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4">With Branded Caller ID</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Weekly outbound calls</span>
                          <span className="font-bold">100</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Answer rate (branded caller)</span>
                          <span className="font-bold text-green-600">61%</span>
                        </div>
                        <Progress value={61} className="h-2 bg-green-100" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Calls answered</span>
                          <span className="font-bold text-green-600">61</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Conversion rate</span>
                          <span className="font-bold">15%</span>
                        </div>
                      </div>
                      <div className="pt-4 border-t">
                        <div className="flex justify-between">
                          <span>Weekly deals closed</span>
                          <span className="font-bold text-green-600">9 deals</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t text-center">
                  <div className="text-sm text-gray-600 mb-2">Extra deals per week</div>
                  <div className="text-4xl font-bold text-green-600 mb-4">+4 deals</div>
                  <div className="text-sm text-gray-600">
                    At $1,000 average deal value = <span className="font-bold text-green-600">$4,000/week</span> additional revenue
                  </div>
                  <div className="text-lg font-bold text-green-600 mt-2">
                    $208,000 extra per year
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Branded Caller ID FAQ
            </h2>
            
            <FAQSection faqs={[
              {
                question: "How long does it take to set up branded caller ID?",
                answer: "Ring4's branded caller ID is active immediately for new numbers. For existing numbers, it typically takes 1-3 business days for the branding to appear across all carrier networks."
              },
              {
                question: "Will my business name show up on all phones?",
                answer: "Yes! Our branded caller ID works across all major carriers (Verizon, AT&T, T-Mobile, etc.) and appears on both iPhone and Android devices, as well as landlines."
              },
              {
                question: "Can I customize what appears as my business name?",
                answer: "Absolutely! You can customize your business name (up to 15 characters), and we'll register it with carrier databases. You can use your official business name or a shorter version."
              },
              {
                question: "Is there an extra cost for branded caller ID?",
                answer: "Branded caller ID is included free with all Ring4 business plans. There are no hidden fees or per-call charges for this feature."
              },
              {
                question: "What if my number gets flagged as spam?",
                answer: "Ring4 actively monitors your number's reputation and works with carriers to prevent false spam flagging. Our branded caller ID actually helps protect against spam labels."
              },
              {
                question: "Can I see when my branded caller ID is working?",
                answer: "Yes! Our call logs show you when your branded name appeared to recipients, and you can track answer rates to see the impact on your business."
              }
            ]} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-b from-green-600 to-green-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Start Building Trust with Every Call
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Get branded caller ID and watch your answer rates soar. Your customers will 
              finally know it's you calling.
            </p>
            
            <CTABlock config={{
              primary: 'Get Branded Caller ID',
              secondary: 'See a Demo',
              socialProof: 'Trusted by 25,000+ businesses worldwide'
            }} />

            <p className="text-sm text-green-200 mt-6">
              Active immediately • No setup fees • 14-day free trial
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}