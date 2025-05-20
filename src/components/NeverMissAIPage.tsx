import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

export default function NeverMissAIPage() {
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
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Stop Sending Clients to Voicemail.
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                NeverMiss AI is your always-on receptionist that answers missed calls, captures lead intent, and boosts conversion—even when you can't pick up.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Button
                  size="lg"
                  className="bg-[#0055FF] hover:bg-[#003399] text-white font-medium relative overflow-hidden group"
                >
                  <span className="relative z-10">🔊 Hear it in Action</span>
                  <span className="absolute inset-0 bg-[#003399] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#0055FF] text-[#0055FF] hover:bg-blue-50"
                  asChild
                >
                  <a href="#calculator">📈 Calculate Missed Revenue</a>
                </Button>
              </motion.div>
            </div>

            <motion.div
              className="relative flex justify-center md:justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="relative z-10 w-full max-w-md"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.4,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <div className="rounded-xl overflow-hidden shadow-2xl">
                  <div className="bg-white p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-2xl">🤖</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">NeverMiss AI</h3>
                        <p className="text-sm text-gray-500">Call Transcript</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <div className="flex items-start mb-2">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">
                            AI
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-gray-800">Hello! This is Ring4's AI assistant. I'm here because [Your Name] couldn't answer right now. How can I help you today?</p>
                          </div>
                        </div>

                        <div className="flex items-start mb-2">
                          <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">
                            C
                          </div>
                          <div className="bg-gray-200 p-3 rounded-lg">
                            <p className="text-gray-800">Hi, I'm calling about getting a quote for your services. I need help with a project that's due next week.</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">
                            AI
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-gray-800">I'd be happy to help with that quote. Could you share some details about your project so I can pass them along to [Your Name]? They'll get back to you as soon as possible.</p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="font-semibold mb-2">Call Summary</h4>
                        <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                          <p className="text-sm text-gray-700"><span className="font-medium">Lead Intent:</span> Requesting quote for urgent project</p>
                          <p className="text-sm text-gray-700"><span className="font-medium">Timeline:</span> Needed by next week</p>
                          <p className="text-sm text-gray-700"><span className="font-medium">Priority:</span> High (time-sensitive)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-100 rounded-full -z-10"></div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-100 rounded-full -z-10"></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section - The Silent Loss */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 md:py-28 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-red-900/30 px-4 py-1.5 rounded-full mb-4">
                <span className="text-red-400 text-lg mr-2">⚠️</span>
                <span className="font-semibold">THE SILENT LOSS</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Voicemail Is a Black Hole for Leads. NeverMiss Is the Fix.
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Every missed call is a potential client who may never call back.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Problem Column 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-red-900/30 rounded-full mb-6 mx-auto">
                  <span className="text-3xl">💸</span>
                </div>
                <h3 className="text-xl font-bold text-center mb-4">Missed Calls Are Expensive</h3>
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold text-red-400">$126k</span>
                  <span className="text-gray-400 text-sm">/year</span>
                </div>
                <p className="text-gray-300 text-center">
                  The average small business loses $126,000 in annual revenue from missed calls that never convert.
                </p>
              </motion.div>

              {/* Problem Column 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-red-900/30 rounded-full mb-6 mx-auto">
                  <span className="text-3xl">🔇</span>
                </div>
                <h3 className="text-xl font-bold text-center mb-4">Voicemail Doesn't Close Deals</h3>
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold text-red-400">87%</span>
                </div>
                <p className="text-gray-300 text-center">
                  87% of clients won't leave a voicemail when they call. They'll simply move on to the next option.
                </p>
              </motion.div>

              {/* Problem Column 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-red-900/30 rounded-full mb-6 mx-auto">
                  <span className="text-3xl">🚫</span>
                </div>
                <h3 className="text-xl font-bold text-center mb-4">Missed Calls = Lost Trust</h3>
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold text-red-400">46%</span>
                </div>
                <p className="text-gray-300 text-center">
                  46% of potential clients who can't reach you on the first try will never attempt to call back.
                </p>
              </motion.div>
            </div>

            {/* Comparison Flowchart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-800/30 rounded-xl p-8 border border-gray-700"
            >
              <h3 className="text-2xl font-bold mb-8 text-center">The Missed Call Journey</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Voicemail Path */}
                <div className="space-y-6">
                  <div className="bg-red-900/20 rounded-lg p-4 text-center">
                    <h4 className="font-bold mb-2">Traditional Voicemail</h4>
                  </div>
                  <div className="relative">
                    <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-red-900/30"></div>
                    <div className="relative z-10 bg-gray-800 rounded-lg p-4 mb-6 border border-red-900/30">
                      <p className="text-gray-300">Client calls when you're busy</p>
                    </div>
                    <div className="relative z-10 bg-gray-800 rounded-lg p-4 mb-6 border border-red-900/30">
                      <p className="text-gray-300">Sent to generic voicemail</p>
                    </div>
                    <div className="relative z-10 bg-gray-800 rounded-lg p-4 mb-6 border border-red-900/30">
                      <p className="text-gray-300">87% hang up without leaving a message</p>
                    </div>
                    <div className="relative z-10 bg-gray-800 rounded-lg p-4 border border-red-900/30">
                      <p className="text-gray-300">Client calls competitor instead</p>
                    </div>
                  </div>
                  <div className="bg-red-900/20 rounded-lg p-4 text-center">
                    <h4 className="font-bold">Result: Lost Business</h4>
                  </div>
                </div>

                {/* NeverMiss AI Path */}
                <div className="space-y-6">
                  <div className="bg-green-900/20 rounded-lg p-4 text-center">
                    <h4 className="font-bold mb-2">NeverMiss AI</h4>
                  </div>
                  <div className="relative">
                    <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-green-900/30"></div>
                    <div className="relative z-10 bg-gray-800 rounded-lg p-4 mb-6 border border-green-900/30">
                      <p className="text-gray-300">Client calls when you're busy</p>
                    </div>
                    <div className="relative z-10 bg-gray-800 rounded-lg p-4 mb-6 border border-green-900/30">
                      <p className="text-gray-300">NeverMiss AI answers conversationally</p>
                    </div>
                    <div className="relative z-10 bg-gray-800 rounded-lg p-4 mb-6 border border-green-900/30">
                      <p className="text-gray-300">Captures client needs and contact info</p>
                    </div>
                    <div className="relative z-10 bg-gray-800 rounded-lg p-4 border border-green-900/30">
                      <p className="text-gray-300">You receive detailed lead summary</p>
                    </div>
                  </div>
                  <div className="bg-green-900/20 rounded-lg p-4 text-center">
                    <h4 className="font-bold">Result: Captured Opportunity</h4>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Solution Overview Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-3">
              ✅ THE SOLUTION
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              How NeverMiss AI Saves the Call — and the Deal
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              An AI receptionist that sounds human, captures leads, and never takes a day off.
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
              <div className="flex-shrink-0 w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⏱️</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Answers After 3 Rings</h3>
                <p className="text-gray-600">
                  NeverMiss AI activates only when you can't answer, stepping in after 3 rings to ensure no call goes unanswered.
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
              <div className="flex-shrink-0 w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🗣️</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Sounds Human, Not Robotic</h3>
                <p className="text-gray-600">
                  Natural-sounding conversations that make callers feel heard and valued, not like they're talking to a machine.
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
              <div className="flex-shrink-0 w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📱</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Instant Summary Alerts</h3>
                <p className="text-gray-600">
                  Receive detailed call summaries with client needs, contact info, and priority level directly to your phone.
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
              <div className="flex-shrink-0 w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🌙</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Works After Hours</h3>
                <p className="text-gray-600">
                  Never miss a late-night or weekend opportunity. NeverMiss AI works 24/7, capturing leads while you're off the clock.
                </p>
              </div>
            </motion.div>

            {/* Feature 5 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex items-start gap-5"
            >
              <div className="flex-shrink-0 w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💻</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">No Extra Hardware</h3>
                <p className="text-gray-600">
                  Works with your existing phone system and Ring4 account. No new equipment or complex setup required.
                </p>
              </div>
            </motion.div>

            {/* Feature 6 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex items-start gap-5"
            >
              <div className="flex-shrink-0 w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Call Analytics</h3>
                <p className="text-gray-600">
                  Track call patterns, lead sources, and conversion rates to optimize your business and marketing strategy.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Phone UI Demo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-gray-50 rounded-xl p-8 shadow-lg border border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">See NeverMiss AI in Action</h3>
                <p className="text-gray-600 mb-6">
                  Watch how NeverMiss AI handles a real client call, captures their information, and delivers a detailed summary to your inbox.
                </p>
                <Button className="bg-[#0055FF] hover:bg-[#003399] text-white">
                  🔊 Hear a Demo Call
                </Button>
              </div>

              <div className="relative">
                <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200">
                  <div className="bg-blue-600 text-white p-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">NeverMiss AI</h4>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 text-lg">📞</span>
                      </div>
                      <div>
                        <p className="font-medium">Incoming Call</p>
                        <p className="text-xs text-gray-500">Just Now • (555) 123-4567</p>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg mb-3">
                      <h5 className="font-medium mb-1">Call Summary</h5>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li><span className="font-medium">Caller:</span> John Smith</li>
                        <li><span className="font-medium">Intent:</span> Requesting quote for website redesign</li>
                        <li><span className="font-medium">Budget:</span> $5,000-$7,000</li>
                        <li><span className="font-medium">Timeline:</span> Needs completion within 6 weeks</li>
                        <li><span className="font-medium">Priority:</span> <span className="text-red-600 font-medium">High</span></li>
                      </ul>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" size="sm" className="text-xs">
                        View Transcript
                      </Button>
                      <Button size="sm" className="bg-blue-600 text-white text-xs">
                        Call Back Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Missed Call Revenue Calculator */}
      <section className="py-16 md:py-24 bg-gray-50" id="calculator">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-3">
              💰 ROI CALCULATOR
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Are Missed Calls Costing You?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Calculate the potential revenue you're losing to missed calls and voicemail drop-offs.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Calculator Inputs */}
                <div className="p-8 bg-gradient-to-br from-blue-50 to-white">
                  <h3 className="text-xl font-bold mb-6">Your Business Metrics</h3>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        How many calls do you miss per week?
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          defaultValue={10}
                          min={1}
                          max={100}
                          className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <span className="text-gray-500">calls</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        What's your average revenue per client?
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500">$</span>
                        </div>
                        <input
                          type="number"
                          defaultValue={1500}
                          min={100}
                          className="w-full rounded-md border border-gray-300 py-2 pl-8 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        What percentage of missed calls could become clients?
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          defaultValue={30}
                          min={10}
                          max={70}
                          step={5}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 px-1 mt-1">
                          <span>10%</span>
                          <span>40%</span>
                          <span>70%</span>
                        </div>
                      </div>
                      <div className="text-center mt-2">
                        <span className="text-lg font-semibold text-blue-600">30%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Calculator Results */}
                <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                  <h3 className="text-xl font-bold mb-6">Your Potential Loss</h3>

                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-gray-300 mb-1">Monthly Revenue Loss</p>
                      <div className="text-4xl font-bold text-green-400">$18,000</div>
                      <p className="text-xs text-gray-400 mt-1">Based on your current metrics</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-300 mb-1">Annual Revenue Loss</p>
                      <div className="text-5xl font-bold text-red-400">$216,000</div>
                      <p className="text-xs text-gray-400 mt-1">Potential annual impact</p>
                    </div>

                    <div className="pt-4">
                      <div className="h-4 w-full bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-500 to-red-600 w-[85%]"></div>
                      </div>
                      <p className="text-sm text-gray-300 mt-2">
                        You're losing <span className="font-semibold">85%</span> of potential revenue from missed calls
                      </p>
                    </div>

                    <div className="pt-4">
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        🚀 Let NeverMiss Answer for You → Start Free
                      </Button>
                      <p className="text-xs text-center text-gray-400 mt-2">
                        14-day free trial, no credit card required
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-100"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-lg">💡</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Did you know?</h4>
                  <p className="text-gray-600">
                    NeverMiss AI typically pays for itself within the first 2-3 captured leads. Most businesses see positive ROI within the first month.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-3">
              💬 CUSTOMER STORIES
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Real Quotes From the Field
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from businesses who've stopped losing opportunities to missed calls.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-700 font-semibold">MJ</span>
                </div>
                <div>
                  <p className="font-medium">Mike Johnson</p>
                  <p className="text-sm text-gray-500">Home Services Founder</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "I missed a call for a $9,000 roofing job while I was on another job site. The client called my competitor next and I lost the deal. With NeverMiss AI, that would never happen again."
              </p>
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-700 font-semibold">SL</span>
                </div>
                <div>
                  <p className="font-medium">Sarah Lin</p>
                  <p className="text-sm text-gray-500">Agency Owner</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "My clients expect me to be available, but I can't be on call 24/7. NeverMiss AI is like having a backup that never sleeps. It's captured three high-value leads that called after hours in just the first month."
              </p>
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-700 font-semibold">DR</span>
                </div>
                <div>
                  <p className="font-medium">David Rodriguez</p>
                  <p className="text-sm text-gray-500">Freelance Consultant</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "I was paying $400/month for a virtual receptionist service that only worked during business hours. NeverMiss AI costs less, works 24/7, and actually captures more detailed information from callers."
              </p>
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Button className="bg-[#0055FF] hover:bg-[#003399] text-white">
              🔊 Hear it in Action
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Use Case Navigation Bar */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              More Ways to Stay Reachable With Ring4
            </h2>
          </motion.div>

          <div className="space-y-3 max-w-4xl mx-auto">
            {/* Card 1: Fix Spam-Labeled Calls */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md"
            >
              <a href="/spam-checker" className="block">
                <div className="p-4 flex items-center">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-blue-50 rounded-full mr-4">
                    <span className="text-xl">📞</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold">Fix Spam-Labeled Calls</h3>
                    <div className="flex flex-wrap items-center text-sm">
                      <span className="text-gray-500 mr-1">Problem:</span>
                      <span className="text-gray-700 mr-4">Your legitimate business calls get flagged as spam.</span>
                    </div>
                    <div className="flex flex-wrap items-center text-sm mt-1">
                      <span className="text-blue-600 mr-1">Solution:</span>
                      <span className="text-gray-700">Branded caller ID and reputation monitoring.</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </a>
            </motion.div>

            {/* Card 2: Separate Work From Life */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md"
            >
              <a href="/separate-work-line" className="block">
                <div className="p-4 flex items-center">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-purple-50 rounded-full mr-4">
                    <span className="text-xl">🧘‍♂️</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold">Separate Work From Life</h3>
                    <div className="flex flex-wrap items-center text-sm">
                      <span className="text-gray-500 mr-1">Problem:</span>
                      <span className="text-gray-700 mr-4">No boundaries between work and personal life.</span>
                    </div>
                    <div className="flex flex-wrap items-center text-sm mt-1">
                      <span className="text-purple-600 mr-1">Solution:</span>
                      <span className="text-gray-700">Dedicated business lines with scheduled availability.</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </a>
            </motion.div>

            {/* Card 3: Convert Website Visitors */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md"
            >
              <div className="p-4 flex items-center">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-green-50 rounded-full mr-4">
                  <span className="text-xl">💬</span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold">Convert Website Visitors via Text</h3>
                  <div className="flex flex-wrap items-center text-sm">
                    <span className="text-gray-500 mr-1">Problem:</span>
                    <span className="text-gray-700 mr-4">Website visitors leave without engaging.</span>
                  </div>
                  <div className="flex flex-wrap items-center text-sm mt-1">
                    <span className="text-green-600 mr-1">Solution:</span>
                    <span className="text-gray-700">One-click texting widgets for your website.</span>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <div className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                    Coming Soon
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 4: Expand Into New Regions */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md"
            >
              <div className="p-4 flex items-center">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-red-50 rounded-full mr-4">
                  <span className="text-xl">🌎</span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold">Expand Into New Regions with Local Numbers</h3>
                  <div className="flex flex-wrap items-center text-sm">
                    <span className="text-gray-500 mr-1">Problem:</span>
                    <span className="text-gray-700 mr-4">Customers prefer local area codes but you're not there.</span>
                  </div>
                  <div className="flex flex-wrap items-center text-sm mt-1">
                    <span className="text-red-600 mr-1">Solution:</span>
                    <span className="text-gray-700">Local numbers in any area code, managed from one place.</span>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <div className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                    Coming Soon
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Snapshot */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-3">
              💰 PRICING
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Fair Pricing, Aligned With Results
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              NeverMiss AI pays for itself by capturing leads that would otherwise be lost. Simple per-minute pricing means you only pay for what you use.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
            >
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6">
                <h3 className="text-2xl font-bold text-gray-900">Starter</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-extrabold text-gray-900">$49</span>
                  <span className="text-xl font-medium text-gray-500">/mo</span>
                </div>
                <p className="mt-2 text-gray-600">Perfect for solopreneurs and small teams</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">AI receptionist for 1 phone line</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">9¢ per minute of AI call time</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Instant call summaries</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">24/7 availability</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Basic call analytics</span>
                </div>
                <div className="pt-4">
                  <Button className="w-full bg-[#0055FF] hover:bg-[#003399] text-white">
                    Start Free Trial
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Growth Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 relative"
            >
              <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 rounded-bl-lg text-sm font-medium">
                Most Popular
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6">
                <h3 className="text-2xl font-bold text-gray-900">Growth</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-extrabold text-gray-900">$79</span>
                  <span className="text-xl font-medium text-gray-500">/mo</span>
                </div>
                <p className="mt-2 text-gray-600">For growing businesses with multiple lines</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">AI receptionist for up to 3 phone lines</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">9¢ per minute of AI call time</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Advanced call routing</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Detailed call logs and analytics</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Priority support</span>
                </div>
                <div className="pt-4">
                  <Button className="w-full bg-[#6D28D9] hover:bg-[#5B21B6] text-white">
                    Start Free Trial
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 max-w-3xl mx-auto bg-blue-50 rounded-lg p-6 border border-blue-100"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-600 text-2xl">🚀</span>
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-900">Automatic Upgrade After $3,000+ in Recovered Jobs</h4>
                <p className="text-gray-600">
                  When NeverMiss AI helps you recover more than $3,000 in business that would have been lost to missed calls, we'll automatically upgrade you to the next tier at no additional cost for 3 months.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Never Miss Another Opportunity
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-xl text-blue-100 max-w-2xl mx-auto"
              >
                Set up in minutes. Start capturing missed calls today.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-12"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">⏱️</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Quick Setup</h3>
                  <p className="text-sm text-blue-200">Ready in minutes, not days</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Sign up for NeverMiss AI</p>
                    <p className="text-sm text-blue-200">Takes less than 2 minutes</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Connect your Ring4 number</p>
                    <p className="text-sm text-blue-200">One-click integration</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Customize your AI settings</p>
                    <p className="text-sm text-blue-200">Personalize your virtual receptionist</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <div>
                    <p className="font-medium">Start capturing missed opportunities</p>
                    <p className="text-sm text-blue-200">Never lose another lead to voicemail</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                🔊 Hear it in Action
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-800 border-2">
                Start Free → Fix My Missed Calls
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 flex justify-center items-center space-x-6 text-blue-200 flex-wrap"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Human support</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Extra padding at the bottom */}
      <div className="h-8 bg-gradient-to-r from-blue-700 to-blue-900"></div>
    </div>
  )
}
