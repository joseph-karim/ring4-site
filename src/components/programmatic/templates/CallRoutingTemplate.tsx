import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Phone, 
  ArrowRight, 
  Users,
  CheckCircle,
  Clock,
  Route,
  Headphones,
  Building,
  AlertTriangle,
  Zap,
  Target,
  Volume2
} from 'lucide-react'
import FAQSection from '../blocks/FAQSection'
import CTABlock from '../blocks/CTABlock'

interface CallRoutingTemplateProps {
  data: {
    h1_text: string
    content_blocks: any
    cta_config: any
    structured_data: any
  }
}

export default function CallRoutingTemplate({ data }: CallRoutingTemplateProps) {

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
              <Route className="w-4 h-4 mr-1" />
              Call Routing
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {data.h1_text}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Route calls like a Fortune 500 company. Ensure every customer reaches 
              the right person instantly with smart call routing.
            </p>

            {/* Problem Statement */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <h3 className="font-semibold text-red-900">
                  Poor Call Routing Costs You Customers
                </h3>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-red-600">67%</div>
                  <div className="text-sm text-red-700">Hang up if transferred more than once</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">90 sec</div>
                  <div className="text-sm text-red-700">Average hold time before hanging up</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">$62</div>
                  <div className="text-sm text-red-700">Cost of each lost customer call</div>
                </div>
              </div>
            </div>

            <CTABlock config={data.cta_config} />
          </motion.div>
        </div>
      </section>

      {/* Call Flow Visualization */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              How Smart Call Routing Works
            </h2>

            <div className="relative">
              {/* Main Phone Line */}
              <div className="text-center mb-8">
                <Card className="inline-block">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <Phone className="h-8 w-8 text-blue-600" />
                      <div>
                        <div className="font-bold text-lg">Your Business Number</div>
                        <div className="text-sm text-gray-600">(555) 123-RING</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center mb-8">
                <ArrowRight className="h-6 w-6 text-gray-400 rotate-90" />
              </div>

              {/* IVR Menu */}
              <div className="text-center mb-8">
                <Card className="inline-block max-w-md">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Volume2 className="h-6 w-6 text-green-600" />
                      <div className="font-bold">Smart IVR Menu</div>
                    </div>
                    <div className="text-sm text-left space-y-2">
                      <div>Press 1 for Sales</div>
                      <div>Press 2 for Support</div>
                      <div>Press 3 for Billing</div>
                      <div>Press 0 for Reception</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center mb-8">
                <ArrowRight className="h-6 w-6 text-gray-400 rotate-90" />
              </div>

              {/* Department Routing */}
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="font-semibold mb-2">Sales Team</div>
                    <div className="text-sm text-gray-600">Round-robin to available reps</div>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Headphones className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="font-semibold mb-2">Support Team</div>
                    <div className="text-sm text-gray-600">Priority routing by issue type</div>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Building className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="font-semibold mb-2">Billing Dept</div>
                    <div className="text-sm text-gray-600">Direct to accounts specialist</div>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="font-semibold mb-2">Reception</div>
                    <div className="text-sm text-gray-600">Personal assistance</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Routing Options */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Advanced Routing Options
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Time-Based Routing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Business Hours</div>
                        <div className="text-sm text-gray-600">Route to available team members during work hours</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">After Hours</div>
                        <div className="text-sm text-gray-600">Send to voicemail or emergency contact</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Holiday Routing</div>
                        <div className="text-sm text-gray-600">Special messages and emergency-only routing</div>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    Skill-Based Routing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Language Preferences</div>
                        <div className="text-sm text-gray-600">Route to bilingual staff automatically</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Expertise Areas</div>
                        <div className="text-sm text-gray-600">Connect customers to specialists</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">VIP Customers</div>
                        <div className="text-sm text-gray-600">Priority routing to senior team members</div>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-600" />
                    Geographic Routing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Local Presence</div>
                        <div className="text-sm text-gray-600">Route to regional offices automatically</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Time Zone Aware</div>
                        <div className="text-sm text-gray-600">Route to available offices in appropriate time zones</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Area Code Matching</div>
                        <div className="text-sm text-gray-600">Connect callers to local representatives</div>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-orange-600" />
                    Smart Overflow
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Queue Management</div>
                        <div className="text-sm text-gray-600">Automatic overflow when hold times get long</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Backup Routing</div>
                        <div className="text-sm text-gray-600">Route to available team when primary is busy</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Voicemail Fallback</div>
                        <div className="text-sm text-gray-600">Intelligent voicemail with SMS notifications</div>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Use Cases */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Call Routing by Industry
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Medical Practice</CardTitle>
                  <CardDescription>
                    Patient-focused routing for better care
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="font-semibold mb-2">Emergency Line</div>
                      <p className="text-sm text-gray-700">
                        "Press 1 for medical emergencies" → Routes to on-call doctor immediately
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="font-semibold mb-2">Appointment Scheduling</div>
                      <p className="text-sm text-gray-700">
                        "Press 2 for appointments" → Routes to scheduling team with calendar access
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="font-semibold mb-2">Prescription Refills</div>
                      <p className="text-sm text-gray-700">
                        "Press 3 for prescriptions" → Routes to pharmacy team with patient records
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Legal Firm</CardTitle>
                  <CardDescription>
                    Confidential routing for attorney specialties
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="font-semibold mb-2">Practice Area Routing</div>
                      <p className="text-sm text-gray-700">
                        Routes by legal specialty: family law, corporate, criminal defense
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="font-semibold mb-2">Existing Client Priority</div>
                      <p className="text-sm text-gray-700">
                        Caller ID recognition routes existing clients directly to their attorney
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="font-semibold mb-2">Consultation Screening</div>
                      <p className="text-sm text-gray-700">
                        New clients route to intake specialists for conflict checks
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Real Estate Agency</CardTitle>
                  <CardDescription>
                    Territory and specialty-based routing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="font-semibold mb-2">Geographic Routing</div>
                      <p className="text-sm text-gray-700">
                        Auto-route by ZIP code to agents specializing in that area
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="font-semibold mb-2">Buy vs Sell Routing</div>
                      <p className="text-sm text-gray-700">
                        "Press 1 to buy, 2 to sell" routes to specialized buyer/listing agents
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="font-semibold mb-2">Lead Source Tracking</div>
                      <p className="text-sm text-gray-700">
                        Different numbers for different marketing sources with custom routing
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tech Support</CardTitle>
                  <CardDescription>
                    Skill and urgency-based routing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="font-semibold mb-2">Tier-Based Support</div>
                      <p className="text-sm text-gray-700">
                        Level 1 → General support, Level 2 → Technical specialists
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="font-semibold mb-2">Product Specialization</div>
                      <p className="text-sm text-gray-700">
                        Route by product line to specialists familiar with specific software/hardware
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="font-semibold mb-2">Enterprise Priority</div>
                      <p className="text-sm text-gray-700">
                        VIP routing for enterprise customers to dedicated success managers
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits & Stats */}
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Call Routing Results
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">89%</div>
                  <p className="text-blue-800 font-medium">Faster Resolution Times</p>
                  <p className="text-sm text-blue-600 mt-2">
                    Customers reach the right person on first try
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-green-600 mb-2">94%</div>
                  <p className="text-green-800 font-medium">Customer Satisfaction</p>
                  <p className="text-sm text-green-600 mt-2">
                    No more frustrating transfers and hold times
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-purple-600 mb-2">67%</div>
                  <p className="text-purple-800 font-medium">Reduced Hold Time</p>
                  <p className="text-sm text-purple-600 mt-2">
                    Smart routing eliminates bottlenecks
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* ROI Calculator */}
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle>Call Routing ROI Calculator</CardTitle>
                <CardDescription>
                  See how professional routing improves efficiency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium mb-4">Without Call Routing</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Daily incoming calls:</span>
                        <span className="font-bold">100</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wrong department transfers:</span>
                        <span className="font-bold text-red-600">45%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average handle time:</span>
                        <span className="font-bold text-red-600">8 minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Customer satisfaction:</span>
                        <span className="font-bold text-red-600">72%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-4">With Ring4 Smart Routing</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Daily incoming calls:</span>
                        <span className="font-bold">100</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wrong department transfers:</span>
                        <span className="font-bold text-green-600">8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average handle time:</span>
                        <span className="font-bold text-green-600">5.2 minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Customer satisfaction:</span>
                        <span className="font-bold text-green-600">94%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t text-center">
                  <div className="text-sm text-gray-600 mb-2">Time saved per day</div>
                  <div className="text-3xl font-bold text-green-600 mb-4">4.7 hours</div>
                  <div className="text-sm text-gray-600">
                    At $25/hour staff cost = <span className="font-bold text-green-600">$117/day</span> in productivity gains
                  </div>
                  <div className="text-lg font-bold text-green-600 mt-2">
                    $30,420 annual savings
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Call Routing FAQ
            </h2>
            
            <FAQSection faqs={[
              {
                question: "How complex can my call routing setup be?",
                answer: "Ring4 supports unlimited routing rules with multiple conditions: time of day, caller location, department selection, agent availability, and custom business logic. You can create simple or highly sophisticated routing flows."
              },
              {
                question: "Can I change routing rules on the fly?",
                answer: "Yes! Update routing rules instantly through the Ring4 dashboard. Perfect for emergencies, staff changes, or seasonal business adjustments. Changes take effect immediately."
              },
              {
                question: "What happens if no one is available to take calls?",
                answer: "Set up intelligent overflow: calls can go to voicemail with SMS notifications, forward to mobile phones, or route to a partner/answering service. You choose the backup plan."
              },
              {
                question: "Does call routing work with my existing phone system?",
                answer: "Ring4 can integrate with most existing systems or replace them entirely. Our routing works whether you're using traditional desk phones, mobile devices, or softphone applications."
              },
              {
                question: "Can I see analytics on how calls are being routed?",
                answer: "Absolutely! View detailed reports on call volumes by department, average wait times, transfer rates, and agent performance. Use data to optimize your routing strategy."
              },
              {
                question: "How do customers experience the call routing?",
                answer: "Professional IVR menu with your custom greetings, hold music, and estimated wait times. Customers get connected to the right person quickly without multiple transfers."
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
              Route Calls Like a Pro
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Stop losing customers to poor call handling. Set up professional 
              routing in minutes.
            </p>
            
            <CTABlock config={{
              primary: 'Set Up Call Routing',
              secondary: 'See Routing Demo',
              socialProof: 'Join 12,000+ businesses with professional call routing'
            }} />

            <p className="text-sm text-blue-200 mt-6">
              No hardware required • Setup in minutes • 14-day free trial
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}