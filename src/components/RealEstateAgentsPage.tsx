import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

export default function RealEstateAgentsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-12 md:py-20 px-4">
        {/* Background Animated Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-200 opacity-20"
              initial={{
                width: Math.random() * 300 + 100,
                height: Math.random() * 300 + 100,
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                opacity: 0.1,
              }}
              animate={{
                x: Math.random() * 10 - 5,
                y: Math.random() * 10 - 5,
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.5,
              }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                Real Estate Agents
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Your Calls Should Build Trust, Not Get Ignored
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Ring4 helps real estate agents and mortgage pros get their calls answered, stay in sync with their team, and never miss a lead. Even when they're with a client.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button asChild size="lg" className="bg-[#0055FF] hover:bg-[#003399] text-white">
                  <Link to="/spam-checker">🔍 Check My Number for Spam</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-[#0055FF] text-[#0055FF]">
                  <Link to="#">🚀 Start Free 7-Day Trial</Link>
                </Button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8 text-sm text-gray-500"
              >
                <span className="block mb-2">Includes Concierge Beta Access</span>
                <a href="https://www.g2.com/products/ring4/reviews" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-600 ml-2">4.7 out of 5 stars</span>
                  <img src="https://company.g2.com/hs-fs/hubfs/brand-guide/g2-logo.png?width=150&name=g2-logo.png" alt="G2 Logo" className="h-6 ml-2" />
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative flex justify-center md:justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="relative z-10 w-full"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.4,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <img
                  src="https://www.ring4.com/hubfs/The-Superior-Legal-Communications-Solution2.png"
                  alt="Real estate agent with Ring4"
                  className="rounded-lg shadow-xl max-w-full"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROBLEM Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              The Leads You're Losing (Silently)
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              You Can't Build Relationships If They Don't Answer
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-md"
              >
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="text-gray-700">If your number shows up as "Spam Likely," even warm leads ignore you</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="text-gray-700">87% of callers won't leave a voicemail</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-md"
              >
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="text-gray-700">Personal phones and Google Voice don't show who followed up</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="text-gray-700">Missing one call can mean missing one deal</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              The Communication Stack for People Who Close
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Show Up Like a Professional, Even When You're Not on the Line
            </p>
          </motion.div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                What You Get:
              </h3>
              <ul className="space-y-6 mb-8">
                <li className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">📞</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">Caller ID that shows your name</h4>
                    <p className="text-gray-600">Not a random number that gets ignored</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">🧼</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">Spam score check and cleanup</h4>
                    <p className="text-gray-600">Across major carriers so your calls get through</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">📲</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">Shared inbox</h4>
                    <p className="text-gray-600">So your team stays on the same page</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">🤖</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">NeverMiss AI answers</h4>
                    <p className="text-gray-600">When you can't and sends a call summary</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">🧑</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">Concierge setup</h4>
                    <p className="text-gray-600">To configure everything with zero hassle</p>
                  </div>
                </li>
              </ul>
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-gray-700 italic">
                  "You only get one chance to make a first impression. Make sure your first call feels like it matters."
                </p>
              </div>
            </div>

            <div className="order-1 md:order-2 relative">
              <motion.div
                className="relative mx-auto max-w-md"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://www.ring4.com/hs-fs/hubfs/Professional-Presence-From-Anywhere.png"
                  alt="Professional presence for real estate agents"
                  className="rounded-xl shadow-xl z-10 relative"
                />

                {/* Decorative elements */}
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-100 rounded-full -z-10"></div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-green-100 rounded-full -z-10"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* NEVERMISS AI Section */}
      <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Your Personal Backup When You Can't Pick Up
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              NeverMiss AI responds like a real person, asks the right questions, and delivers the summary so you never miss the context.
            </p>
          </motion.div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-5"
            >
              <div className="flex-shrink-0 w-14 h-14 bg-blue-900/30 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎙️</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Sounds like a human, not a robot</h3>
                <p className="text-blue-200">
                  Natural conversation that builds trust with potential clients instead of sending them to voicemail.
                </p>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-start gap-5"
            >
              <div className="flex-shrink-0 w-14 h-14 bg-blue-900/30 rounded-full flex items-center justify-center">
                <span className="text-2xl">⏱️</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Picks up after 3 rings when you're unavailable</h3>
                <p className="text-blue-200">
                  Only activates when you can't answer, ensuring no call goes unanswered while you're with clients.
                </p>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex items-start gap-5"
            >
              <div className="flex-shrink-0 w-14 h-14 bg-blue-900/30 rounded-full flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Sends full transcripts and lead summaries</h3>
                <p className="text-blue-200">
                  Get complete context of every conversation with actionable insights to follow up effectively.
                </p>
              </div>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-start gap-5"
            >
              <div className="flex-shrink-0 w-14 h-14 bg-blue-900/30 rounded-full flex items-center justify-center">
                <span className="text-2xl">🌙</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Works nights, weekends, and after-hours</h3>
                <p className="text-blue-200">
                  Never miss an opportunity, even when you're off the clock or spending time with family.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center">
                <span className="text-3xl">💬</span>
              </div>
              <div>
                <p className="text-xl italic text-blue-100 mb-4">
                  "It's like having someone I trust take care of the call until I can follow up."
                </p>
                <p className="text-blue-300">– Sarah, Independent Agent</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RISK REVERSAL Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Get Set Up in Minutes or Let Us Do It
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No Hardware. No Hassle. Just More Conversations.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-md text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎁</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Free 7-Day Trial</h3>
                <p className="text-gray-600">No credit card required to get started</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-md text-center"
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👨‍💼</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Concierge Setup</h3>
                <p className="text-gray-600">Optional $97 setup for caller ID + AI configuration</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-md text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔄</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Cancel Anytime</h3>
                <p className="text-gray-600">No long-term contracts or commitments</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12 bg-white p-8 rounded-lg shadow-md"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">💬</span>
                </div>
                <div>
                  <p className="text-xl italic text-gray-700 mb-2">
                    "This isn't about tools. It's about knowing I won't lose the call that makes my month."
                  </p>
                  <p className="text-gray-500">– Verified Loan Officer</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Be the Professional They Trust, Not the Missed Call They Ignore
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              The Call Can't Go Unanswered
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                <Link to="/spam-checker">🔍 Check My Caller ID</Link>
              </Button>
              <Button asChild size="lg" className="bg-blue-800 text-white border border-white hover:bg-blue-700">
                <Link to="#">📅 Book My Setup</Link>
              </Button>
            </div>
            <div className="mt-8 inline-block px-4 py-2 bg-blue-800/50 rounded-full text-sm font-medium">
              Includes early access to NeverMiss AI for qualified agents and solo pros
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}