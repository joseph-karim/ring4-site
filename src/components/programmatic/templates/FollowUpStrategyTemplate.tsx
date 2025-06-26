import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Clock, 
  Users,
  TrendingUp,
  Target,
  Repeat,
  Star,
  AlertTriangle,
  Zap,
  Phone
} from 'lucide-react'
import FAQSection from '../blocks/FAQSection'
import CTABlock from '../blocks/CTABlock'

interface FollowUpStrategyTemplateProps {
  data: {
    h1_text: string
    content_blocks: any
    cta_config: any
    structured_data: any
  }
}

export default function FollowUpStrategyTemplate({ data }: FollowUpStrategyTemplateProps) {

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
              <Repeat className="w-4 h-4 mr-1" />
              Follow-Up Strategy
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {data.h1_text}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Turn one-time customers into lifetime clients with systematic follow-up 
              that keeps your business top-of-mind.
            </p>

            {/* Problem Statement */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <h3 className="font-semibold text-red-900">
                  The Follow-Up Gap That's Costing You Money
                </h3>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-red-600">80%</div>
                  <div className="text-sm text-red-700">Of sales require 5+ follow-ups</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">44%</div>
                  <div className="text-sm text-red-700">Of salespeople give up after 1 follow-up</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">$67K</div>
                  <div className="text-sm text-red-700">Lost revenue per salesperson annually</div>
                </div>
              </div>
            </div>

            <CTABlock config={data.cta_config} />
          </motion.div>
        </div>
      </section>

      {/* Follow-Up Timeline */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              The Perfect Follow-Up Timeline
            </h2>

            <div className="space-y-8">
              {/* Immediate Follow-Up */}
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-4 gap-6 items-center">
                    <div className="text-center">
                      <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Zap className="h-8 w-8 text-green-600" />
                      </div>
                      <div className="font-bold text-green-700">Immediate</div>
                      <div className="text-sm text-gray-600">0-5 minutes</div>
                    </div>
                    <div className="md:col-span-3">
                      <h3 className="text-xl font-bold mb-2">Instant Confirmation</h3>
                      <p className="text-gray-600 mb-4">
                        Send automatic SMS confirmation immediately after initial contact. 
                        Sets expectations and confirms you received their inquiry.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg text-sm">
                        <strong>Template:</strong> "Hi [Name]! Thanks for reaching out. I got your message about [topic] and will have a detailed response for you within 2 hours. - [Your Name]"
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Day 1 Follow-Up */}
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-4 gap-6 items-center">
                    <div className="text-center">
                      <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Phone className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="font-bold text-blue-700">Day 1</div>
                      <div className="text-sm text-gray-600">Same day</div>
                    </div>
                    <div className="md:col-span-3">
                      <h3 className="text-xl font-bold mb-2">Personal Response</h3>
                      <p className="text-gray-600 mb-4">
                        Call or send a personalized message with specific information they requested. 
                        Show you understand their needs.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg text-sm">
                        <strong>Template:</strong> "Hi [Name], here's the [pricing/info] you requested for [specific need]. I also noticed [personalized observation]. Would you like to discuss this over a quick call?"
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 1 Follow-Up */}
              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-4 gap-6 items-center">
                    <div className="text-center">
                      <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Star className="h-8 w-8 text-purple-600" />
                      </div>
                      <div className="font-bold text-purple-700">Week 1</div>
                      <div className="text-sm text-gray-600">3-7 days</div>
                    </div>
                    <div className="md:col-span-3">
                      <h3 className="text-xl font-bold mb-2">Value Addition</h3>
                      <p className="text-gray-600 mb-4">
                        Share helpful resources, case studies, or tips related to their industry. 
                        Build trust by providing value without asking for anything.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg text-sm">
                        <strong>Template:</strong> "Hi [Name], saw this article about [their industry challenge] and thought of your situation. Here's how [similar client] solved this: [link/story]"
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Month 1 Follow-Up */}
              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-4 gap-6 items-center">
                    <div className="text-center">
                      <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Target className="h-8 w-8 text-orange-600" />
                      </div>
                      <div className="font-bold text-orange-700">Month 1</div>
                      <div className="text-sm text-gray-600">2-4 weeks</div>
                    </div>
                    <div className="md:col-span-3">
                      <h3 className="text-xl font-bold mb-2">Status Check</h3>
                      <p className="text-gray-600 mb-4">
                        Check in on their original need. Offer new solutions or limited-time offers. 
                        Show you're still thinking about their success.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg text-sm">
                        <strong>Template:</strong> "Hi [Name], checking in on your [original need]. We just launched [new solution/offer] that might be perfect timing for your [specific situation]."
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Follow-Up Statistics */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Why Follow-Up Works
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-green-600 mb-2">300%</div>
                  <p className="text-sm text-gray-600">Higher conversion rate with systematic follow-up</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <Clock className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-blue-600 mb-2">12x</div>
                  <p className="text-sm text-gray-600">More effective than one-time outreach</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <Users className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-purple-600 mb-2">91%</div>
                  <p className="text-sm text-gray-600">Of customers prefer businesses that follow up</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Follow-Up Templates by Industry */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Industry-Specific Follow-Up Templates
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Real Estate Follow-Up</CardTitle>
                  <CardDescription>
                    Perfect for agents nurturing leads and past clients
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold mb-2">Market Update Template</div>
                      <p className="text-sm text-gray-700">
                        "Hi [Name], just saw that homes in [neighborhood] are up 8% this month. 
                        Perfect time to discuss your [buying/selling] goals. Quick call this week?"
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold mb-2">Anniversary Follow-Up</div>
                      <p className="text-sm text-gray-700">
                        "Hi [Name], can't believe it's been a year since we closed on [address]! 
                        How are you loving the home? Here's what your property is worth today..."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Business Follow-Up</CardTitle>
                  <CardDescription>
                    For contractors, consultants, and service providers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold mb-2">Project Completion</div>
                      <p className="text-sm text-gray-700">
                        "Hi [Name], hope you're loving your new [project result]. Would you mind 
                        leaving a quick review? Also, remember we offer [related service] too!"
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold mb-2">Seasonal Check-In</div>
                      <p className="text-sm text-gray-700">
                        "[Season] is here! Time for your [maintenance/inspection/tune-up]. 
                        I have openings next week - should I reserve your spot?"
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>E-commerce Follow-Up</CardTitle>
                  <CardDescription>
                    Boost repeat purchases and customer loyalty
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold mb-2">Product Satisfaction</div>
                      <p className="text-sm text-gray-700">
                        "Hi [Name], how are you liking your [product]? Since you loved that, 
                        you might also like [complementary product] - 20% off for you!"
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold mb-2">Reorder Reminder</div>
                      <p className="text-sm text-gray-700">
                        "Time for a refill? You ordered [product] [time period] ago. 
                        Reorder now and get free shipping + 10% loyalty discount."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Professional Services</CardTitle>
                  <CardDescription>
                    For lawyers, accountants, and consultants
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold mb-2">Regulatory Update</div>
                      <p className="text-sm text-gray-700">
                        "Hi [Name], new [regulations/tax laws] may affect your [business/situation]. 
                        Let's schedule a brief call to review how this impacts you."
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-semibold mb-2">Annual Review</div>
                      <p className="text-sm text-gray-700">
                        "Hi [Name], time for your annual [service] review. I've prepared some 
                        insights about your [situation] and opportunities for next year."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Automation Setup */}
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Set Up Automated Follow-Up with Ring4
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                  <CardTitle>Create Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Save your best follow-up messages as templates. Personalize 
                    with customer names and details.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-blue-600">2</span>
                  </div>
                  <CardTitle>Set Reminders</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Schedule follow-up reminders in Ring4. Never forget to 
                    follow up with important prospects.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-blue-600">3</span>
                  </div>
                  <CardTitle>Track Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Monitor response rates and adjust your follow-up strategy 
                    based on what works best.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* ROI Calculator */}
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle>Follow-Up ROI Calculator</CardTitle>
                <CardDescription>
                  See how systematic follow-up impacts your revenue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium mb-4">Without Systematic Follow-Up</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Monthly leads:</span>
                        <span className="font-bold">100</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Follow-up rate:</span>
                        <span className="font-bold text-red-600">30%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conversion rate:</span>
                        <span className="font-bold text-red-600">8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly sales:</span>
                        <span className="font-bold">2.4</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-4">With Ring4 Follow-Up System</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Monthly leads:</span>
                        <span className="font-bold">100</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Follow-up rate:</span>
                        <span className="font-bold text-green-600">95%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conversion rate:</span>
                        <span className="font-bold text-green-600">24%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly sales:</span>
                        <span className="font-bold text-green-600">22.8</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t text-center">
                  <div className="text-sm text-gray-600 mb-2">Additional sales per month</div>
                  <div className="text-4xl font-bold text-green-600 mb-4">+20.4 sales</div>
                  <div className="text-sm text-gray-600">
                    At $1,000 average sale = <span className="font-bold text-green-600">$20,400/month</span> extra revenue
                  </div>
                  <div className="text-lg font-bold text-green-600 mt-2">
                    $244,800 additional revenue per year
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
              Follow-Up Strategy FAQ
            </h2>
            
            <FAQSection faqs={[
              {
                question: "How often should I follow up with prospects?",
                answer: "Follow the 1-3-7-30 rule: 1 day (immediate), 3 days (personal response), 7 days (value addition), and 30 days (status check). After that, follow up monthly or quarterly depending on their engagement level."
              },
              {
                question: "What's the best way to personalize follow-up messages?",
                answer: "Reference specific details from your conversation, mention their industry challenges, include their name and company, and tie your follow-up to their original need or goal. Avoid generic templates."
              },
              {
                question: "Should I follow up via phone, email, or text?",
                answer: "Text messages have the highest open rates (98%), followed by phone calls for urgent matters, then email for detailed information. Use Ring4 to coordinate all channels from one platform."
              },
              {
                question: "How do I know when to stop following up?",
                answer: "Stop when they explicitly ask you to, after 6-8 attempted contacts with no response, or if they've chosen a competitor. Always leave the door open with a final 'feel free to reach out' message."
              },
              {
                question: "Can I automate follow-ups without losing the personal touch?",
                answer: "Yes! Create templates with personalization fields, schedule reminders (not automatic sends), and always review messages before sending. Automation should prompt you to send personal messages, not replace personal outreach."
              },
              {
                question: "What's the biggest follow-up mistake businesses make?",
                answer: "Only following up once or twice, then giving up. Studies show 80% of sales require 5+ follow-ups, but 44% of salespeople give up after just one attempt. Persistence (not pestering) is key."
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
              Stop Losing Sales to Poor Follow-Up
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Start converting more prospects with systematic follow-up. Your 
              sales numbers will thank you.
            </p>
            
            <CTABlock config={{
              primary: 'Get Follow-Up Templates',
              secondary: 'See Success Stories',
              socialProof: 'Join 8,500+ businesses using Ring4 for better follow-up'
            }} />

            <p className="text-sm text-green-200 mt-6">
              Ready-to-use templates • Automated reminders • 14-day free trial
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}