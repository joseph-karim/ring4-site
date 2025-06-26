import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  TrendingUp,
  X,
  UserPlus,
  Settings
} from 'lucide-react'
import FAQSection from '../blocks/FAQSection'
import CTABlock from '../blocks/CTABlock'

interface TeamInboxTemplateProps {
  data: {
    h1_text: string
    content_blocks: any
    cta_config: any
    structured_data: any
  }
}

export default function TeamInboxTemplate({ data }: TeamInboxTemplateProps) {

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
              <Users className="w-4 h-4 mr-1" />
              Team Collaboration
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {data.h1_text}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Stop the chaos of team texting. Get one shared inbox where your whole team 
              can collaborate on customer conversations.
            </p>

            {/* Pain Point Alert */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-semibold text-red-900 mb-2">
                    Sound familiar? Your team is probably struggling with:
                  </h3>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Customers texting different team members with the same question</li>
                    <li>• Important messages getting lost in personal phones</li>
                    <li>• No visibility into who's handling which conversation</li>
                    <li>• Duplicate responses confusing customers</li>
                  </ul>
                </div>
              </div>
            </div>

            <CTABlock config={data.cta_config} />
          </motion.div>
        </div>
      </section>

      {/* Problem vs Solution */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Before vs After Ring4
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Before - Chaos */}
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-800">
                    <X className="h-5 w-5" />
                    Without Shared Inbox
                  </CardTitle>
                  <CardDescription className="text-red-700">
                    Team texting chaos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Simulated chaotic messages */}
                    <div className="space-y-2">
                      <div className="bg-white p-3 rounded-lg border-l-4 border-red-400">
                        <div className="text-xs text-gray-500">Sarah's Phone</div>
                        <div className="text-sm">"Hi, what are your pricing options?"</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border-l-4 border-orange-400">
                        <div className="text-xs text-gray-500">Mike's Phone</div>
                        <div className="text-sm">"Same customer: Still waiting for pricing info..."</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border-l-4 border-yellow-400">
                        <div className="text-xs text-gray-500">John's Phone</div>
                        <div className="text-sm">"Customer called upset about no response!"</div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-red-200">
                      <h4 className="font-medium text-red-800 mb-2">The Problems:</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• Customer confusion</li>
                        <li>• Missed messages</li>
                        <li>• Duplicate work</li>
                        <li>• No accountability</li>
                        <li>• Lost opportunities</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* After - Organized */}
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <CheckCircle className="h-5 w-5" />
                    With Ring4 Shared Inbox
                  </CardTitle>
                  <CardDescription className="text-green-700">
                    Organized team collaboration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Simulated organized conversation */}
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-sm font-medium">Customer: Alex Johnson</div>
                        <Badge variant="outline" className="text-xs">Sarah assigned</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm bg-gray-100 p-2 rounded">
                          "Hi, what are your pricing options?"
                        </div>
                        <div className="text-sm bg-blue-100 p-2 rounded">
                          "Hi Alex! I'd be happy to help with pricing. Let me send you our options..."
                        </div>
                        <div className="text-xs text-green-600 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Resolved in 3 minutes
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-green-200">
                      <h4 className="font-medium text-green-800 mb-2">The Benefits:</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• One conversation thread</li>
                        <li>• Clear assignment</li>
                        <li>• Full team visibility</li>
                        <li>• No duplicate responses</li>
                        <li>• Faster resolution</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Shared Inbox Features
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <UserPlus className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Smart Assignment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Automatically assign conversations to team members based on availability, 
                    expertise, or custom rules.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-green-600 mb-2" />
                  <CardTitle>Team Collaboration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Add internal notes, @mention colleagues, and collaborate on responses 
                    without the customer seeing.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Clock className="h-8 w-8 text-purple-600 mb-2" />
                  <CardTitle>Response Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    See response times, resolution rates, and team performance metrics 
                    to improve customer service.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-orange-600 mb-2" />
                  <CardTitle>Message Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Create shared templates for common responses. Ensure consistent 
                    messaging across your team.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Settings className="h-8 w-8 text-indigo-600 mb-2" />
                  <CardTitle>Custom Workflows</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Set up custom tags, priorities, and escalation rules to match 
                    your team's workflow.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <TrendingUp className="h-8 w-8 text-pink-600 mb-2" />
                  <CardTitle>Analytics Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Track team performance, customer satisfaction, and conversation 
                    volume with detailed analytics.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Results & ROI */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Teams See Immediate Results
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">73%</div>
                  <p className="text-blue-800 font-medium">Faster Response Times</p>
                  <p className="text-sm text-blue-600 mt-2">
                    Average response time drops from 4 hours to 1 hour
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">89%</div>
                  <p className="text-green-800 font-medium">Fewer Missed Messages</p>
                  <p className="text-sm text-green-600 mt-2">
                    Visibility ensures no customer message goes unanswered
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">156%</div>
                  <p className="text-purple-800 font-medium">Customer Satisfaction</p>
                  <p className="text-sm text-purple-600 mt-2">
                    Customers love the fast, consistent responses
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* ROI Calculator */}
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle>Calculate Your Team's Time Savings</CardTitle>
                <CardDescription>
                  See how much time your team will save with organized conversations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium mb-4">Current Situation</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Team members handling texts:</span>
                        <span className="font-bold">5 people</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time spent coordinating daily:</span>
                        <span className="font-bold text-red-600">2 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Messages missed weekly:</span>
                        <span className="font-bold text-red-600">15 messages</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duplicate responses daily:</span>
                        <span className="font-bold text-red-600">8 responses</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-4">With Shared Inbox</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Team coordination time:</span>
                        <span className="font-bold text-green-600">15 minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Messages missed weekly:</span>
                        <span className="font-bold text-green-600">1 message</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duplicate responses daily:</span>
                        <span className="font-bold text-green-600">0 responses</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time saved per day:</span>
                        <span className="font-bold text-green-600">1h 45min</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t text-center">
                  <div className="text-sm text-gray-600 mb-2">Weekly time savings</div>
                  <div className="text-3xl font-bold text-green-600 mb-2">8.75 hours</div>
                  <div className="text-sm text-gray-500">
                    At $25/hour = <span className="font-bold text-green-600">$218/week</span> in productivity gains
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases by Team Size */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Perfect for Teams of Any Size
            </h2>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Small Teams (2-5 people)</CardTitle>
                  <CardDescription>
                    Simple coordination, maximum efficiency
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Common Challenges:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Everyone handling their own customer texts</li>
                        <li>• No backup when someone's unavailable</li>
                        <li>• Inconsistent response quality</li>
                        <li>• No visibility into team workload</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Ring4 Solution:</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Shared access to all conversations</li>
                        <li>• Automatic assignment and backup</li>
                        <li>• Shared templates for consistency</li>
                        <li>• Simple team dashboard</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Medium Teams (6-20 people)</CardTitle>
                  <CardDescription>
                    Structured workflows, clear accountability
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Common Challenges:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Messages getting lost between departments</li>
                        <li>• No clear ownership of conversations</li>
                        <li>• Difficult to track team performance</li>
                        <li>• Escalation confusion</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Ring4 Solution:</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Department-based assignment rules</li>
                        <li>• Clear conversation ownership</li>
                        <li>• Performance analytics dashboard</li>
                        <li>• Custom escalation workflows</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Large Teams (20+ people)</CardTitle>
                  <CardDescription>
                    Enterprise-grade organization and controls
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Common Challenges:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Complex routing and permissions</li>
                        <li>• Need for detailed reporting</li>
                        <li>• Compliance and audit requirements</li>
                        <li>• Multiple teams and specializations</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Ring4 Solution:</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Advanced routing and permissions</li>
                        <li>• Comprehensive analytics and reporting</li>
                        <li>• Message archiving and compliance</li>
                        <li>• Multi-team organization tools</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Shared Inbox FAQ
            </h2>
            
            <FAQSection faqs={[
              {
                question: "How do team members access the shared inbox?",
                answer: "Team members can access the shared inbox through the Ring4 mobile app, web dashboard, or desktop application. Each team member gets their own login with appropriate permissions."
              },
              {
                question: "Can I control who sees which conversations?",
                answer: "Yes! You can set up departments, assign specific conversations to team members, and control visibility based on roles and permissions."
              },
              {
                question: "What happens when multiple people try to respond at once?",
                answer: "Ring4 prevents duplicate responses with real-time typing indicators and conversation locking. Team members can see when someone else is responding."
              },
              {
                question: "Can I add internal notes that customers don't see?",
                answer: "Absolutely! Team members can add internal notes, @mention colleagues, and collaborate on responses without customers seeing the internal discussion."
              },
              {
                question: "How do I track team performance?",
                answer: "The analytics dashboard shows response times, resolution rates, customer satisfaction scores, and individual team member performance metrics."
              },
              {
                question: "Can I use templates for common responses?",
                answer: "Yes! Create shared templates for frequently asked questions, onboarding sequences, and common responses. Templates ensure consistency across your team."
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
              Get Your Team Organized Today
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Stop the chaos and start collaborating. Your customers (and team) will thank you.
            </p>
            
            <CTABlock config={{
              primary: 'Start Free Team Trial',
              secondary: 'Schedule Team Demo',
              socialProof: 'Join 5,000+ teams already using Ring4 shared inbox'
            }} />

            <p className="text-sm text-blue-200 mt-6">
              Free 14-day trial • No credit card required • Setup in 5 minutes
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}