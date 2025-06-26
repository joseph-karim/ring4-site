import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import TallyModal from '@/components/TallyModal'
import { 
  MessageSquare, 
  TrendingUp,
  Clock,
  Users,
  CheckCircle,
  Zap,
  Code,
  ArrowRight,
  Copy,
  Monitor
} from 'lucide-react'
import FAQSection from '../blocks/FAQSection'
import CTABlock from '../blocks/CTABlock'

interface SMSWidgetTemplateProps {
  data: {
    h1_text: string
    content_blocks: any
    cta_config: any
    structured_data: any
  }
}

export default function SMSWidgetTemplate({ data }: SMSWidgetTemplateProps) {
  const stats = data.content_blocks?.stats || {}

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-50 to-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge variant="outline" className="mb-4">
              <MessageSquare className="w-4 h-4 mr-1" />
              SMS Widget
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {data.h1_text}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Convert website visitors into customers with instant SMS conversations. 
              Replace slow contact forms with real-time texting.
            </p>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="text-3xl font-bold text-purple-900">
                    {stats.conversion_increase || '400%'}
                  </div>
                  <p className="text-sm text-purple-700">Higher conversion vs forms</p>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-green-900">
                    {stats.response_time || '30 sec'}
                  </div>
                  <p className="text-sm text-green-700">Average response time</p>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-blue-900">
                    {stats.leads_per_month || '250+'}
                  </div>
                  <p className="text-sm text-blue-700">Extra leads per month</p>
                </CardContent>
              </Card>
            </div>

            <CTABlock config={data.cta_config} />
          </motion.div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              See It In Action
            </h2>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Demo Widget */}
              <div className="relative">
                <div className="bg-gray-100 rounded-lg p-8 min-h-[400px] relative overflow-hidden">
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-2xl font-bold mb-4">Your Website</h3>
                    <p className="text-gray-600 mb-6">
                      Welcome to our business! We provide excellent services...
                    </p>
                    
                    {/* Simulated Widget */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      className="fixed bottom-6 right-6 z-10"
                    >
                      <div className="bg-purple-600 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-purple-700 transition-colors">
                        <MessageSquare className="h-6 w-6" />
                      </div>
                    </motion.div>
                  </div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <MessageSquare className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Quick question about pricing...</p>
                      <p className="text-xs text-gray-500 mt-1">Just now</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Benefits */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-full flex-shrink-0">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Instant Connection</h3>
                    <p className="text-gray-600">
                      Visitors can text you directly from your website. No more missed opportunities 
                      from abandoned contact forms.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                    <Monitor className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Easy Integration</h3>
                    <p className="text-gray-600">
                      Add one line of code to your website. Works with any site builder: 
                      WordPress, Shopify, Squarespace, or custom sites.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Team Ready</h3>
                    <p className="text-gray-600">
                      Your whole team can respond to texts. Perfect for sales, support, 
                      and customer success teams.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Setup Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Set Up in 30 Seconds
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-purple-600">1</span>
                  </div>
                  <CardTitle>Get Your Widget Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Sign up for Ring4 and instantly get your personalized widget code.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-purple-600">2</span>
                  </div>
                  <CardTitle>Add to Your Website</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Paste one line of code before your closing &lt;/body&gt; tag. That's it!
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-purple-600">3</span>
                  </div>
                  <CardTitle>Start Converting</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Respond to texts from your Ring4 app. Turn visitors into customers instantly.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Code Example */}
            <Card className="bg-gray-900 text-green-400 font-mono">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Example Widget Code
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-800 rounded p-4 relative">
                  <pre className="text-sm overflow-x-auto">
{`<script>
  (function(r,i,n,g){
    r.RingWidget=r.RingWidget||{};
    r.RingWidget.config={
      number: '+1-555-RING4-US',
      position: 'bottom-right',
      color: '#6366f1'
    };
    var s=i.createElement('script');
    s.src='https://widget.ring4.com/embed.js';
    i.head.appendChild(s);
  })(window,document);
</script>`}
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2 text-xs"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Perfect For Every Business
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>E-commerce Stores</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Product questions and support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Order status updates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Cart abandonment recovery</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Personalized recommendations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Businesses</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Instant quote requests</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Appointment scheduling</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Emergency service requests</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Follow-up communications</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Real Estate</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Property inquiries</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Showing requests</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Market updates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Document sharing</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SaaS & Tech</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Demo requests</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Technical support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Onboarding assistance</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Feature feedback</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="bg-purple-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Calculate Your SMS Widget ROI
            </h2>

            <Card className="border-2 border-purple-200">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Current Situation</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Monthly website visitors</label>
                        <div className="text-2xl font-bold">10,000</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Contact form conversion</label>
                        <div className="text-2xl font-bold text-red-600">2%</div>
                        <Progress value={2} className="h-2 mt-2" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Monthly leads</label>
                        <div className="text-2xl font-bold">200</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4">With SMS Widget</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Monthly website visitors</label>
                        <div className="text-2xl font-bold">10,000</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">SMS widget conversion</label>
                        <div className="text-2xl font-bold text-green-600">8%</div>
                        <Progress value={80} className="h-2 mt-2 bg-green-100" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Monthly leads</label>
                        <div className="text-2xl font-bold text-green-600">800</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t text-center">
                  <div className="text-sm text-gray-600 mb-2">Extra leads per month</div>
                  <div className="text-4xl font-bold text-green-600 mb-4">+600 leads</div>
                  <div className="text-sm text-gray-600">
                    At $50 value per lead = <span className="font-bold text-green-600">$30,000/month</span> additional revenue potential
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
              SMS Widget FAQ
            </h2>
            
            <FAQSection faqs={[
              {
                question: "How does the SMS widget work?",
                answer: "The widget appears as a chat bubble on your website. When visitors click it, they can send you a text message directly. You receive the message in your Ring4 app and can respond immediately."
              },
              {
                question: "Do I need technical skills to install it?",
                answer: "No! Just copy and paste one line of code into your website. We provide step-by-step instructions for all major platforms including WordPress, Shopify, and Squarespace."
              },
              {
                question: "Can multiple team members respond to messages?",
                answer: "Yes! Your whole team can access the shared inbox and respond to website visitors. Perfect for sales, support, and customer success teams."
              },
              {
                question: "What happens if I'm not available to respond?",
                answer: "You can set up auto-reply messages and business hours. The widget can also show your availability status to set proper expectations with visitors."
              },
              {
                question: "Does it work on mobile websites?",
                answer: "Absolutely! The widget is fully responsive and works perfectly on mobile devices. Mobile visitors can text you just as easily as desktop users."
              },
              {
                question: "Can I customize how the widget looks?",
                answer: "Yes! You can customize colors, position, size, and the welcome message to match your brand. The widget seamlessly integrates with your website design."
              }
            ]} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-b from-purple-600 to-purple-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Start Converting Visitors Today
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Add the SMS widget to your website in 30 seconds and watch your conversion rates soar
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <TallyModal
                buttonText="Get Your Widget Code"
                buttonClassName="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-lg font-semibold inline-flex items-center gap-2"
              />
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-purple-600">
                See Live Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <p className="text-sm text-purple-200 mt-6">
              No credit card required • 14-day free trial • Setup in minutes
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}