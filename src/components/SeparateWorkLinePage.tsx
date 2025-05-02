import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, Clock, MessageSquare, Phone, Shield, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function SeparateWorkLinePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white py-12 md:py-20 px-4">
        {/* Background Animated Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-purple-200 opacity-20"
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
                Separate Work From Life — Without Missing a Thing.
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Clients texting on weekends? Ring4 gives you a second number — so you stay reachable when you want, and unplug when you need.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Button
                  size="lg"
                  className="bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-medium relative overflow-hidden group"
                >
                  <span className="relative z-10">Get My Business Line Now → Start Free</span>
                  <span className="absolute inset-0 bg-[#5B21B6] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
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
                  src="http://ring4.com/hubfs/The-Superior-Legal-Communications-Solution2.png"
                  alt="Separate work from life with Ring4"
                  className="rounded-lg shadow-xl max-w-full"
                />

                {/* Decorative elements */}
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-100 rounded-full -z-10"></div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-100 rounded-full -z-10"></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Block */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 md:py-28 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center bg-purple-900/30 px-4 py-1.5 rounded-full mb-4">
                <span className="text-purple-400 text-lg mr-2">⚠️</span>
                <span className="font-semibold">THE PROBLEM</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                You're Not Always on the Clock — So Why Does It Feel Like It?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                When your work and personal life share the same phone number, the boundaries disappear.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left Column - Problem Description */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
                >
                  <div className="flex items-start space-x-5">
                    <div className="flex-shrink-0 bg-purple-900/30 w-14 h-14 flex items-center justify-center rounded-full">
                      <span className="text-2xl">📱</span>
                    </div>
                    <div>
                      <p className="text-gray-300 text-lg italic mb-3">
                        "Saturday night. You're trying to relax. Your phone buzzes: 'Hey, quick question…'"
                      </p>
                      <p className="text-gray-400">
                        If you're using your personal number for work, there's no separation — and no off-switch. Every client text feels like you're back on the clock.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
                >
                  <div className="flex items-start space-x-5">
                    <div className="flex-shrink-0 bg-red-900/30 w-14 h-14 flex items-center justify-center rounded-full">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">
                        The Cost of Always Being Available
                      </h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start">
                          <span className="text-red-400 mr-2">•</span>
                          <span>Constant interruptions during personal time</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-400 mr-2">•</span>
                          <span>Increased stress and faster burnout</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-400 mr-2">•</span>
                          <span>Blurred professional boundaries with clients</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Visual */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative flex justify-center items-center">
                  <div className="relative z-10">
                    <div className="bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-red-500 pb-4">
                      <div className="bg-red-900 text-white px-4 py-2 text-center font-bold">
                        Weekend Interruptions
                      </div>
                      <div className="py-6 px-4 flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                          <span className="text-3xl">🏖️</span>
                        </div>
                        <div className="text-center text-white">
                          <p className="font-bold mb-2">Personal Time</p>
                          <div className="bg-gray-800 rounded-lg p-3 mb-3">
                            <div className="flex items-start mb-3">
                              <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mr-2 flex-shrink-0">
                                <span className="text-white font-bold">C</span>
                              </div>
                              <div className="bg-blue-100 rounded-lg p-2 text-left text-sm text-gray-800">
                                Hey, quick question about tomorrow's meeting...
                              </div>
                            </div>
                            <div className="flex items-start mb-3">
                              <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mr-2 flex-shrink-0">
                                <span className="text-white font-bold">C</span>
                              </div>
                              <div className="bg-blue-100 rounded-lg p-2 text-left text-sm text-gray-800">
                                Are you there? It's urgent.
                              </div>
                            </div>
                          </div>
                          <p className="text-red-400 text-sm">Saturday, 8:45 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-5 rounded-lg bg-gradient-to-r from-gray-800/80 to-gray-900/80 border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-3">You need boundaries. Not missed opportunities.</h3>
                  <p className="text-gray-300 mb-4">
                    The solution isn't ignoring clients. It's having a system that respects your time while keeping you connected.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution Block */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-3">
              ✅ PROVEN SOLUTION
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              What Ring4 Fixes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A smarter way to manage work communications without sacrificing your personal time.
            </p>
          </motion.div>

          {/* Feature 1: Dedicated Business Number */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center bg-purple-100 px-3 py-1 rounded-full text-purple-600 text-sm font-medium mb-4">
                <span className="mr-2">📱</span>
                <span>DEDICATED BUSINESS NUMBER</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                One Phone, Two Separate Lives.
              </h3>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Keep your personal number private and secure</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">No need to carry two phones or swap SIM cards</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Instantly know if a call is personal or business</span>
                </li>
              </ul>
              <Button className="bg-[#6D28D9] hover:bg-[#5B21B6] text-white">
                Get Your Business Line
              </Button>
            </div>

            <div className="order-1 md:order-2 relative">
              <motion.div
                className="relative mx-auto max-w-sm"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://www.ring4.com/hubfs/iphonex-2021.svg"
                  alt="Ring4 dedicated business line on iPhone"
                  className="w-full h-auto"
                />

                {/* Decorative elements */}
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-100 rounded-full -z-10"></div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-100 rounded-full -z-10"></div>
              </motion.div>
            </div>
          </motion.div>

          {/* Feature 2: Auto-Replies + Business Hours */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <motion.div
                className="relative mx-auto max-w-md"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://www.ring4.com/hs-fs/hubfs/Professional-Presence-From-Anywhere.png?width=1019&height=849&name=Professional-Presence-From-Anywhere.png"
                  alt="Professional presence from anywhere with Ring4"
                  className="rounded-lg shadow-xl w-full h-auto"
                />

                {/* Decorative elements */}
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-green-100 rounded-full -z-10"></div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-teal-100 rounded-full -z-10"></div>
              </motion.div>
            </div>

            <div>
              <div className="inline-flex items-center bg-green-100 px-3 py-1 rounded-full text-green-600 text-sm font-medium mb-4">
                <span className="mr-2">⏰</span>
                <span>BUSINESS HOURS CONTROL</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Set Boundaries Without Ghosting Clients.
              </h3>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Automatic after-hours responses set clear expectations</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Customize your schedule for different days of the week</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Messages are organized for easy follow-up during work hours</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Override settings for urgent situations when needed</span>
                </li>
              </ul>
              <Button className="bg-[#6D28D9] hover:bg-[#5B21B6] text-white">
                See How It Works
              </Button>
            </div>
          </motion.div>

          {/* Feature Summary */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
              >
                <div className="flex-shrink-0 bg-purple-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Dedicated Business Number</h3>
                <p className="text-gray-600">Separate work and personal lines on one phone</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
              >
                <div className="flex-shrink-0 bg-green-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Auto-Replies After Hours</h3>
                <p className="text-gray-600">Set expectations, even when offline</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
              >
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">No Extra Hardware Needed</h3>
                <p className="text-gray-600">Works instantly on your existing devices</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center bg-blue-100 px-3 py-1 rounded-full text-blue-600 text-sm font-medium mb-4">
                <span className="mr-2">🧠</span>
                <span>WHY IT MATTERS</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Reclaim Your Personal Time Without Losing Business
              </h2>

              <p className="text-lg text-gray-700 mb-8">
                When clients think they can text you 24/7, your time — and your focus — disappear.
              </p>

              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-semibold mb-4">With Ring4, you can:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Maintain client responsiveness (on your terms)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Set professional boundaries without sounding rude</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Avoid burnout from the blurred lines between work and life</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center space-x-2 text-gray-500 text-sm">
                <CheckCircle className="h-4 w-4 text-purple-500" />
                <span>14-day free trial</span>
                <span className="mx-2">•</span>
                <CheckCircle className="h-4 w-4 text-purple-500" />
                <span>No credit card required</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Work-Life Balance Impact</h3>
                    <p className="text-sm text-gray-500">Based on Ring4 customer data</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">After-hours interruptions</span>
                      <span className="text-sm font-medium text-green-600">-78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Client satisfaction</span>
                      <span className="text-sm font-medium text-blue-600">+42%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Personal time quality</span>
                      <span className="text-sm font-medium text-purple-600">+65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                        <span className="text-gray-500 text-lg">🎯</span>
                      </div>
                      <div>
                        <p className="font-medium">Overall Impact</p>
                        <p className="text-xs text-gray-500">Based on 500+ users</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">94%</div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    of users report better work-life balance within 30 days
                  </p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-100 rounded-full -z-10"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-100 rounded-full -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section - Reused from HomePage */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900">
              Hundreds of professionals have reclaimed their personal time with Ring4
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Solves the painful problem of business communication beautifully"
                </p>
                <p className="text-gray-700 mb-4">
                  "Getting started with Ring4 takes 2 minutes tops. Zero to fully functioning. It gives clients the impression that you're always on top of your game 24/7, even when you're offline."
                </p>
                <div>
                  <p className="font-medium">Verified User in Marketing</p>
                  <p className="text-sm text-gray-500">Small Business (50 or fewer emp.)</p>
                  <a href="https://www.g2.com/products/ring4/reviews/ring4-review-4755595" className="text-sm text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Read on G2</a>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "The easiest way to manage multiple phone lines in one place"
                </p>
                <p className="text-gray-700 mb-4">
                  "Ring4 is Google Voice on steroids. If you know how to use email, you know how to use Ring4. You can manage messages from all your phone lines in one place. It's very easy to use and they have a free plan to get you started."
                </p>
                <div>
                  <p className="font-medium">Zeke C.</p>
                  <p className="text-sm text-gray-500">CEO, Small Business (50 or fewer emp.)</p>
                  <a href="https://www.g2.com/products/ring4/reviews/ring4-review-4750627" className="text-sm text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Read on G2</a>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Smooth & Easy Setup"
                </p>
                <p className="text-gray-700 mb-4">
                  "Signing up was so simple, I use the business solution and moving from google voice and a brief trial with 8x8 express it was a no brainer. The support was and is superb I expect it to only improve."
                </p>
                <div>
                  <p className="font-medium">Christopher B.</p>
                  <p className="text-sm text-gray-500">Founder & CVO, Small Business (50 or fewer emp.)</p>
                  <a href="https://www.g2.com/products/ring4/reviews" className="text-sm text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Read on G2</a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Block */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-purple-700 to-purple-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Take Back Your Weekends. Set Boundaries Without Ghosting Clients.
                </h2>
                <p className="text-xl mb-8 text-purple-100">
                  You don't need a second phone. Just a smarter line.
                </p>
                <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-100">
                  Get My Business Line Now → Try Free
                </Button>

                <div className="mt-8 flex justify-center md:justify-start items-center space-x-2 text-purple-200 flex-wrap">
                  <CheckCircle className="h-5 w-5" />
                  <span>No credit card required</span>
                  <span className="mx-2">•</span>
                  <CheckCircle className="h-5 w-5" />
                  <span>14-day free trial</span>
                  <span className="mx-2">•</span>
                  <CheckCircle className="h-5 w-5" />
                  <span>Cancel anytime</span>
                </div>
              </div>

              <div className="hidden md:block">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Get Started in Minutes</h3>
                      <p className="text-sm text-purple-200">Quick setup, instant results</p>
                    </div>
                  </div>

                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-white font-bold text-sm">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Sign up for Ring4</p>
                        <p className="text-sm text-purple-200">Create your account in seconds</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-white font-bold text-sm">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Choose your business number</p>
                        <p className="text-sm text-purple-200">Select from available local numbers</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-white font-bold text-sm">3</span>
                      </div>
                      <div>
                        <p className="font-medium">Set your business hours</p>
                        <p className="text-sm text-purple-200">Configure when you're available</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-white font-bold text-sm">4</span>
                      </div>
                      <div>
                        <p className="font-medium">Start enjoying work-life balance</p>
                        <p className="text-sm text-purple-200">Reclaim your personal time</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ring4 Solutions: Use Cases Section - Reused from HomePage */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ring4 Solutions: Use Cases
            </h2>
          </motion.div>

          <div className="space-y-3 max-w-4xl mx-auto">
            {/* Card 1: Fix Spam-Labeled Calls */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md"
            >
              <Link to="/spam-checker" className="block">
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
              </Link>
            </motion.div>

            {/* Card 2: Separate Work & Personal - Current page, highlighted */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-purple-50 rounded-lg shadow-sm overflow-hidden hover:shadow-md border-l-4 border-l-purple-500"
            >
              <div className="p-4 flex items-center">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full mr-4">
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
                  <div className="flex items-center text-xs">
                    <span className="text-blue-700">Work</span>
                    <span className="mx-1 text-gray-400">|</span>
                    <span className="text-purple-700">Personal</span>
                  </div>
                </div>
              </div>
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

            {/* Card 4: Unify Team Texts */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md"
            >
              <div className="p-4 flex items-center">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-yellow-50 rounded-full mr-4">
                  <span className="text-xl">👥</span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold">Unify Team Texts in One Inbox</h3>
                  <div className="flex flex-wrap items-center text-sm">
                    <span className="text-gray-500 mr-1">Problem:</span>
                    <span className="text-gray-700 mr-4">Customer messages get lost between team members.</span>
                  </div>
                  <div className="flex flex-wrap items-center text-sm mt-1">
                    <span className="text-yellow-600 mr-1">Solution:</span>
                    <span className="text-gray-700">Shared inbox with assignment and collaboration tools.</span>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <div className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                    Coming Soon
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 5: Expand Into New Regions */}
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
