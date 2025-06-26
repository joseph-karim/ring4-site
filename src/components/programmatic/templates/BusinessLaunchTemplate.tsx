import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import TallyModal from '@/components/TallyModal'
import { 
  Rocket, 
  Phone, 
  Building2,
  CheckCircle,
  Star,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  Shield,
  Smartphone,
  Target,
  AlertTriangle,
  Zap
} from 'lucide-react'
import FAQSection from '../blocks/FAQSection'
import CTABlock from '../blocks/CTABlock'

interface BusinessLaunchTemplateProps {
  data: {
    h1_text: string
    content_blocks: any
    cta_config: any
    structured_data: any
  }
}

export default function BusinessLaunchTemplate({ data }: BusinessLaunchTemplateProps) {
  const challenges = data.content_blocks?.challenges || []
  const benefits = data.content_blocks?.benefits || []
  const stats = data.content_blocks?.stats || {}

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
              <Rocket className="w-4 h-4 mr-1" />
              Business Launch
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {data.h1_text}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Launch your business with a professional phone system from day one. 
              No contracts, no hardware, instant credibility.
            </p>

            {/* Urgency Call-out */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
                <h3 className="font-semibold text-yellow-900">
                  Don't Make These Common Startup Phone Mistakes
                </h3>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-yellow-700">Using Personal Phone</div>
                  <div className="text-sm text-yellow-600">Looks unprofessional, no separation</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-yellow-700">Expensive PBX Systems</div>
                  <div className="text-sm text-yellow-600">$500+ setup, long contracts</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-yellow-700">Google Voice</div>
                  <div className="text-sm text-yellow-600">Unreliable, no business features</div>
                </div>
              </div>
            </div>

            <CTABlock config={data.cta_config} />
          </motion.div>
        </div>
      </section>

      {/* Startup Challenges vs Ring4 Solutions */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Every Startup Faces These Phone Challenges
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Challenge Side */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-red-700 mb-6">Common Problems</h3>
                
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-red-100 p-2 rounded-full">
                        <Phone className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-900 mb-2">Unprofessional Image</h4>
                        <p className="text-red-800 text-sm">
                          Customers don't trust businesses that use personal phone numbers. 
                          First impressions matter.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-red-100 p-2 rounded-full">
                        <DollarSign className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-900 mb-2">Expensive Traditional Systems</h4>
                        <p className="text-red-800 text-sm">
                          Traditional PBX systems cost $500+ to set up, plus monthly fees and 
                          long-term contracts you can't afford.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-red-100 p-2 rounded-full">
                        <Clock className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-900 mb-2">Missed Opportunities</h4>
                        <p className="text-red-800 text-sm">
                          No voicemail, call forwarding, or professional features means 
                          you're losing potential customers every day.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Solution Side */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-green-700 mb-6">Ring4 Solutions</h3>
                
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Building2 className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-900 mb-2">Instant Business Credibility</h4>
                        <p className="text-green-800 text-sm">
                          Get a professional business number with branded caller ID. 
                          Your business name appears when you call customers.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Zap className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-900 mb-2">Instant Setup, Zero Hardware</h4>
                        <p className="text-green-800 text-sm">
                          Get your business phone number in 30 seconds. No installation, 
                          no hardware, no waiting weeks for setup.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Target className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-900 mb-2">Never Miss a Lead</h4>
                        <p className="text-green-800 text-sm">
                          Smart voicemail, call forwarding, SMS, and auto-reply ensure 
                          every potential customer gets a response.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Startup Success Stats */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Why New Businesses Choose Ring4
            </h2>

            <div className="grid md:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Rocket className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-blue-600 mb-2">47%</div>
                  <p className="text-sm text-gray-600">Of our customers are startups under 2 years old</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-green-600 mb-2">3x</div>
                  <p className="text-sm text-gray-600">More professional appearance vs personal numbers</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <Clock className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-purple-600 mb-2">30 sec</div>
                  <p className="text-sm text-gray-600">Average setup time for new businesses</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <DollarSign className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-orange-600 mb-2">$89/mo</div>
                  <p className="text-sm text-gray-600">Average savings vs traditional phone systems</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Business Launch Checklist */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Your Business Phone Launch Checklist
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Essential Setup (Week 1)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <span>Choose your business phone number</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <span>Set up branded caller ID</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <span>Record professional voicemail</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <span>Add number to business cards</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <span>Update website and marketing</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-blue-600" />
                      Growth Features (Month 1)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <Star className="h-4 w-4 text-blue-600" />
                        </div>
                        <span>Add SMS widget to website</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <Star className="h-4 w-4 text-blue-600" />
                        </div>
                        <span>Set up team inbox (when hiring)</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <Star className="h-4 w-4 text-blue-600" />
                        </div>
                        <span>Create customer follow-up sequences</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <Star className="h-4 w-4 text-blue-600" />
                        </div>
                        <span>Integrate with CRM/sales tools</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <Star className="h-4 w-4 text-blue-600" />
                        </div>
                        <span>Add local numbers for expansion</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Startup Success Stories */}
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Real Startup Success Stories
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">TechStart Solutions</h4>
                      <p className="text-sm text-gray-500">Software Startup, 6 months old</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "Ring4 made us look like an established company from day one. 
                    Clients never knew we were working from our garage!"
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">156%</div>
                      <div className="text-xs text-gray-600">Increase in callbacks</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">$50K</div>
                      <div className="text-xs text-gray-600">First month revenue</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">GreenLeaf Consulting</h4>
                      <p className="text-sm text-gray-500">Marketing Agency, 3 months old</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "The SMS widget on our website converted 8 visitors into clients 
                    in the first week. Best $10/month we spend!"
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">400%</div>
                      <div className="text-xs text-gray-600">Website conversion boost</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">8</div>
                      <div className="text-xs text-gray-600">New clients in week 1</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing for Startups */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Startup-Friendly Pricing
            </h2>

            <Card className="border-2 border-blue-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-sm font-medium">
                Most Popular
              </div>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Starter Plan</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    $10<span className="text-lg text-gray-500">/month</span>
                  </div>
                  <p className="text-gray-600">Everything a new business needs</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-4">Core Features</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Professional business number</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Branded caller ID</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">SMS & voice calls</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Professional voicemail</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Website SMS widget</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">Growth Features</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Auto-reply messages</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Business hours settings</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Call forwarding</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Mobile & desktop app</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">30-day free trial</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    Compare to traditional systems: $500+ setup + $49-99/month
                  </p>
                  <div className="text-3xl font-bold text-green-600">
                    You save $89+/month
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
              Startup Phone System FAQ
            </h2>
            
            <FAQSection faqs={[
              {
                question: "Can I get a business phone number before my business is officially registered?",
                answer: "Yes! You can get a Ring4 business number immediately, even before your business registration is complete. Many entrepreneurs use Ring4 while they're still in the planning stages."
              },
              {
                question: "What happens if my startup doesn't work out?",
                answer: "No worries! Ring4 has no long-term contracts. You can cancel anytime without penalties. We understand startups need flexibility, which is why we don't lock you into expensive multi-year agreements."
              },
              {
                question: "Can I scale up as my business grows?",
                answer: "Absolutely! Start with one number and add team members, additional numbers, and advanced features as you grow. Our plans scale with your business from solo founder to enterprise team."
              },
              {
                question: "How quickly can I get my business number active?",
                answer: "Your Ring4 business number is active immediately after signup. No waiting days or weeks like traditional phone systems. You can start taking professional business calls in under 2 minutes."
              },
              {
                question: "Do I need any special equipment or installation?",
                answer: "No equipment needed! Ring4 works on your existing smartphone, computer, or tablet. No PBX boxes, no installation appointments, no hardware costs. Just download the app and you're ready."
              },
              {
                question: "Can I port my number later if I switch to a different system?",
                answer: "Yes, your Ring4 number is fully portable. If you ever need to transfer to another service, you own the number and can take it with you. We make it easy with no transfer fees."
              }
            ]} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Launch Your Business With Confidence
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of successful startups who chose Ring4 for their business phone system. 
              Professional from day one.
            </p>
            
            <CTABlock config={{
              primary: 'Get Your Business Number',
              secondary: 'See Success Stories',
              socialProof: 'Join 15,000+ startups already using Ring4'
            }} />

            <p className="text-sm text-blue-200 mt-6">
              30-day free trial • No setup fees • Cancel anytime • Active in 30 seconds
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}