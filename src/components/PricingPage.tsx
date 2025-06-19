import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              No hidden fees. No setup costs. Just honest pricing that scales with your team.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Personal Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-2">Personal</h2>
                <p className="text-gray-600 mb-6">Perfect for privacy and personal use</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$15</span>
                  <span className="text-gray-500">/number/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Calling & texting</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Call recording</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Voicemail</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>iPhone and Android only</span>
                  </li>
                </ul>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => window.location.href = 'https://tally.so/r/mOkko8'}
                >
                  Start 7-Day Free Trial
                </Button>
              </div>
            </motion.div>

            {/* Business Plan - Featured */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-blue-500 relative"
            >
              <div className="bg-blue-500 text-white text-center py-2 text-sm font-medium">
                MOST POPULAR
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-2">Business</h2>
                <p className="text-gray-600 mb-6">Everything you need to grow your business</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$15</span>
                  <span className="text-gray-500">/user/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>1 free phone number</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Additional numbers $5/month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Shared & direct phone numbers</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>IVR automated greeting</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Team messaging</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Business texting & automation</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Website texting widget</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Business Caller ID</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Caller ID SPAM label monitoring</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-[#0055FF] hover:bg-[#003399]"
                  onClick={() => window.location.href = 'https://tally.so/r/mOkko8'}
                  data-gtm-click="cta-tally-form"
                  data-gtm-location="pricing-business"
                >
                  Start 7-Day Free Trial
                </Button>
              </div>
            </motion.div>

            {/* Annual Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-2">Annual</h2>
                <p className="text-gray-600 mb-6">Save 20% with annual billing</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$12</span>
                  <span className="text-gray-500">/user/month</span>
                  <div className="text-sm text-green-600 mt-1">Billed annually</div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Everything in Business plan</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>20% discount</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>12-month commitment</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => window.location.href = 'https://tally.so/r/mOkko8'}
                >
                  Start 7-Day Free Trial
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="font-semibold mb-2">Web + Desktop + Mobile Apps</h3>
                <p className="text-gray-600">Access from anywhere on any device</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="font-semibold mb-2">Business Texting</h3>
                <p className="text-gray-600">Professional SMS with automation</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="font-semibold mb-2">Remove SPAM Labels</h3>
                <p className="text-gray-600">Monitor and protect your reputation</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📞</span>
                </div>
                <h3 className="font-semibold mb-2">Toll-Free & Local Numbers</h3>
                <p className="text-gray-600">Get numbers in any area code</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌐</span>
                </div>
                <h3 className="font-semibold mb-2">VoIP + WiFi Calling</h3>
                <p className="text-gray-600">Call from anywhere with internet</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔗</span>
                </div>
                <h3 className="font-semibold mb-2">Website Text Widget</h3>
                <p className="text-gray-600">Convert visitors with instant chat</p>
              </div>
            </div>
          </motion.div>

          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Do I need to sign a contract?</h3>
                <p className="text-gray-600">No! Ring4 is month-to-month with no contracts. Cancel anytime.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Can I keep my existing number?</h3>
                <p className="text-gray-600">Yes! We offer free number porting. The process typically takes 3-5 business days.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Is there a setup fee?</h3>
                <p className="text-gray-600">No setup fees, no hidden charges, no surprise bills. What you see is what you pay.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">What's included in the free trial?</h3>
                <p className="text-gray-600">Full access to all features for 7 days. No credit card required to start.</p>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 text-center bg-blue-50 rounded-2xl p-12"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to transform your business communication?</h2>
            <p className="text-xl text-gray-600 mb-8">Join 700,000+ users who trust Ring4</p>
            <Button 
              size="lg"
              className="bg-[#0055FF] hover:bg-[#003399]"
              onClick={() => window.location.href = 'https://tally.so/r/mOkko8'}
              data-gtm-click="cta-tally-form"
              data-gtm-location="pricing-bottom"
            >
              Start Your 7-Day Free Trial
            </Button>
            <p className="text-sm text-gray-500 mt-4">30-Day Money Back Guarantee</p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}