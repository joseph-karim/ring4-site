import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export default function HomePage() {
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

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col space-y-6"
            >


              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Get Your Business Calls Answered, Not Ignored
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Look legit on every call. Ring4 helps solo pros and small teams connect faster with branded caller ID and a unified inbox.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <Button
                  size="lg"
                  className="bg-[#0055FF] hover:bg-[#003399] text-white font-medium relative overflow-hidden group"
                  asChild
                >
                  <Link to="/spam-checker">
                    <span className="relative z-10">Check My Number Now</span>
                    <span className="absolute inset-0 bg-[#003399] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-[#0055FF] text-[#0055FF] hover:bg-blue-50">
                  Get Started
                </Button>
              </motion.div>

              <motion.div
                className="pt-8 flex items-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <a href="https://www.g2.com/products/ring4/reviews" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-600">4.7 out of 5 stars</span>
                  <img src="https://company.g2.com/hs-fs/hubfs/brand-guide/g2-logo.png?width=150&name=g2-logo.png" alt="G2 Logo" className="h-6" />
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative flex justify-center md:justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Main Phone Display */}
              <motion.div
                className="relative z-10 w-full max-w-sm"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.4,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://www.ring4.com/hubfs/Ring4-panel-2-1.png"
                    alt="Ring4 Branded Calling Interface"
                    className="w-full h-auto"
                  />
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -left-8 top-20 bg-white p-3 rounded-lg shadow-lg"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-medium">Brand Verified</span>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -right-8 top-1/3 bg-white p-3 rounded-lg shadow-lg"
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-sm font-medium">97% Answer Rate</span>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -left-12 bottom-1/4 bg-white p-3 rounded-lg shadow-lg"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="text-sm font-medium">Team Collaboration</span>
                  </div>
                </motion.div>

                {/* Glowing ring effect */}
                <div className="absolute -inset-4 bg-blue-400/20 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '4s' }}></div>
              </motion.div>

              {/* Background decorative elements */}
              <motion.div
                className="absolute w-40 h-40 bg-blue-100 rounded-full -bottom-10 -left-10 -z-10"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
              ></motion.div>

              <motion.div
                className="absolute w-24 h-24 bg-blue-200 rounded-full top-20 right-10 -z-10"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
              ></motion.div>
            </motion.div>
          </div>


        </div>
      </section>

      {/* Deep Problem Section - IMPROVED WITH TWO COLUMNS */}
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
              <div className="inline-flex items-center bg-red-900/30 px-4 py-1.5 rounded-full mb-4">
                <span className="text-red-400 text-lg mr-2">🛑</span>
                <span className="font-semibold">URGENT PROBLEM</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Why Your Sales Calls Are Getting Ghosted
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Even the most trusted brands are being filtered, flagged, and ignored. Here's why:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left Column - Problems List */}
              <div className="space-y-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
                >
                  <div className="flex items-start space-x-5">
                    <div className="flex-shrink-0 bg-red-900/30 w-14 h-14 flex items-center justify-center rounded-full">
                      <span className="text-2xl">📉</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 flex items-center">
                        <span className="text-red-400 mr-2">1.</span>
                        <span>Spam Labels Kill Connection Rates</span>
                      </h3>
                      <p className="text-gray-300 mb-3">
                        <span className="font-bold text-white">Answer rates can drop by up to 80%</span> when a number is labeled as "Spam Likely."
                      </p>
                      <p className="text-gray-400 text-sm border-l-2 border-red-500 pl-4">
                        Your reps may be dialing all day, but if your number looks shady, no one picks up. Even hot leads won't take the risk.
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
                    <div className="flex-shrink-0 bg-yellow-900/30 w-14 h-14 flex items-center justify-center rounded-full">
                      <span className="text-2xl">❗</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 flex items-center">
                        <span className="text-yellow-400 mr-2">2.</span>
                        <span>False Positives Are Out of Control</span>
                      </h3>
                      <p className="text-gray-300 mb-3">
                        <span className="font-bold text-white">Legitimate businesses across industries</span>—restaurants, insurance, car dealers—are being mislabeled every day.
                      </p>
                      <p className="text-gray-400 text-sm border-l-2 border-yellow-500 pl-4">
                        Call analytics platforms and carriers use imperfect algorithms that often mistake real businesses for robocallers. It's the digital equivalent of being guilty until proven innocent.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
                >
                  <div className="flex items-start space-x-5">
                    <div className="flex-shrink-0 bg-blue-900/30 w-14 h-14 flex items-center justify-center rounded-full">
                      <span className="text-2xl">🛠️</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 flex items-center">
                        <span className="text-blue-400 mr-2">3.</span>
                        <span>Fixing It Is Frustratingly Complex</span>
                      </h3>
                      <p className="text-gray-300 mb-3">
                        <span className="font-bold text-white">Every carrier uses a different, opaque system</span> to remove spam tags—and you have no direct access to any of them.
                      </p>
                      <p className="text-gray-400 text-sm border-l-2 border-blue-500 pl-4">
                        Navigating regulations like STIR/SHAKEN, 10DLC, and CAN-SPAM isn't just confusing—it's a full-time job. Most companies simply give up and watch their connection rates wither.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Visual Comparison */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative flex justify-center items-center">
                  <div className="relative z-10">
                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                      {/* "Spam Likely" Call */}
                      <div className="bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-red-500 pb-4">
                        <div className="bg-red-900 text-white px-4 py-2 text-center font-bold">
                          Incoming Call
                        </div>
                        <div className="py-6 px-4 flex flex-col items-center">
                          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                          </div>
                          <div className="text-center mb-2">
                            <div className="text-red-500 font-bold text-xl mb-1">Spam Likely</div>
                            <div className="text-gray-400 text-sm">Unknown Number</div>
                          </div>
                          <div className="flex space-x-4 mt-4">
                            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                            <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Branded Call */}
                      <div className="bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-green-500 pb-4">
                        <div className="bg-green-800 text-white px-4 py-2 text-center font-bold">
                          Incoming Call
                        </div>
                        <div className="py-6 px-4 flex flex-col items-center">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-12 w-12 text-blue-700">
                              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-13.5h-6c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5h4.5v-2h-4V9h6v7.5h2V8c0-.83-.67-1.5-1.5-1.5z" />
                            </svg>
                          </div>
                          <div className="text-center mb-2">
                            <div className="text-white font-bold text-xl mb-1">Skyline Insurance</div>
                            <div className="text-green-400 text-sm">Verified Business</div>
                          </div>
                          <div className="flex space-x-4 mt-4">
                            <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                              </svg>
                            </div>
                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 bg-white/10 backdrop-blur-sm px-6 py-4 rounded-lg shadow-lg text-center mx-auto max-w-md">
                      <h3 className="font-bold text-xl md:text-2xl">
                        Same call. One gets answered. <span className="text-red-400">The other gets ignored.</span>
                      </h3>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <motion.div
                    className="absolute -z-10 rounded-full w-48 h-48 bg-gradient-to-r from-red-600/30 to-red-900/20 blur-2xl"
                    style={{ top: '10%', left: '15%' }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
                    transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
                  />

                  <motion.div
                    className="absolute -z-10 rounded-full w-64 h-64 bg-gradient-to-r from-green-600/20 to-blue-800/20 blur-3xl"
                    style={{ bottom: '10%', right: '15%' }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                  />
                </div>

                <div className="mt-8 p-5 rounded-lg bg-gradient-to-r from-gray-800/80 to-gray-900/80 border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-3">Think your number's safe?</h3>
                  <p className="text-gray-300 mb-3">
                    We scanned 100 SMBs this week. 34 were flagged by at least one major carrier.
                  </p>
                  <p className="text-gray-300 mb-4 font-medium">
                    → Don't assume. Check yours.
                  </p>
                  <Button
                    className="mt-2 bg-green-600 hover:bg-green-700 text-white"
                    asChild
                  >
                    <Link to="/spam-checker">
                      Check My Number
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-20 max-w-5xl mx-auto flex flex-wrap justify-between items-center gap-y-6 px-4 py-6 rounded-xl bg-white/5"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-blue-700 flex items-center justify-center">
                  <span className="text-2xl">📈</span>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">78%</div>
                  <div className="text-blue-300">Increase in answered calls</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-blue-700 flex items-center justify-center">
                  <span className="text-2xl">🛡️</span>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">100%</div>
                  <div className="text-blue-300">Brand name verification</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-blue-700 flex items-center justify-center">
                  <span className="text-2xl">⏱️</span>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">24 hrs</div>
                  <div className="text-blue-300">Implementation time</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Ring4 Solution Section */}
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
              The Ring4 Solution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A modern phone system designed to get your calls answered, keep your team aligned, and make your brand look world-class.
            </p>
          </motion.div>

          {/* Feature 1: Priority Inbox Notifications */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center bg-blue-100 px-3 py-1 rounded-full text-blue-600 text-sm font-medium mb-4">
                <span className="mr-2">🔔</span>
                <span>PRIORITY INBOX</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Know Which Conversations Deserve Your Attention, Instantly.
              </h3>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Prioritize urgent replies automatically</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Smart filtering surfaces the most important messages</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Keep your whole team in the loop on time-sensitive conversations</span>
                </li>
              </ul>
              <Button className="bg-[#0055FF] hover:bg-[#003399] text-white">
                Learn More
              </Button>
            </div>

            <div className="order-1 md:order-2 relative">
              <motion.div
                className="relative mx-auto max-w-sm"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                  <div className="bg-blue-600 text-white p-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-semibold">Priority Inbox</h4>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-300 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-md">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">🔥</span>
                          <span className="font-semibold text-red-600">Lead Replied</span>
                        </div>
                        <span className="text-xs bg-red-100 px-2 py-1 rounded-full text-red-600">Now</span>
                      </div>
                      <p className="text-sm mt-1 text-gray-600">John from Acme Corp: "Yes, I'd like to schedule a demo..."</p>
                    </div>
                    <div className="border-l-4 border-yellow-500 p-3 rounded-r-md">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">⏰</span>
                          <span className="font-semibold">Meeting Reminder</span>
                        </div>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">15m</span>
                      </div>
                      <p className="text-sm mt-1 text-gray-500">Video call with SkyTech team at 2:30 PM</p>
                    </div>
                    <div className="border-l-4 border-gray-300 p-3 rounded-r-md bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">📨</span>
                          <span className="font-semibold text-gray-400">Low Priority</span>
                        </div>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">2h</span>
                      </div>
                      <p className="text-sm mt-1 text-gray-400">Subscription renewal notice</p>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-100 rounded-full -z-10"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-yellow-100 rounded-full -z-10"></div>
              </motion.div>
            </div>
          </motion.div>

          {/* Feature 2: Reputation Monitoring + Branded Caller ID */}
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
                  src="https://www.ring4.com/hs-fs/hubfs/Screenshot%202024-11-06%20at%202.01.54%20PM.png?width=800&height=366&name=Screenshot%202024-11-06%20at%202.01.54%20PM.png"
                  alt="Spam vs. Branded Calls Comparison"
                  className="rounded-xl shadow-xl z-10 relative"
                />

                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-100 rounded-full -z-10"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-red-100 rounded-full -z-10"></div>
              </motion.div>
            </div>

            <div>
              <div className="inline-flex items-center bg-green-100 px-3 py-1 rounded-full text-green-600 text-sm font-medium mb-4">
                <span className="mr-2">📞</span>
                <span>BRANDED CALLER ID</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Look Like a Brand, Not a Robocall.
              </h3>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">See your real-time call reputation across carriers</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Register as a verified business to boost answer rates</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Show your name, not "Spam Likely," on every call</span>
                </li>
              </ul>
              <Button className="bg-[#0055FF] hover:bg-[#003399] text-white">
                See How It Works
              </Button>
            </div>
          </motion.div>

          {/* Feature 3: Website Text Chat */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center bg-indigo-100 px-3 py-1 rounded-full text-indigo-600 text-sm font-medium mb-4">
                <span className="mr-2">💬</span>
                <span>WEBSITE TEXT CHAT</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Don't Make Them Fill Out a Form. Just Let Them Text You.
              </h3>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Let customers chat with real humans in real time</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Skip the bots—build trust with personal responses</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Capture and convert leads before they bounce</span>
                </li>
              </ul>
              <Button className="bg-[#0055FF] hover:bg-[#003399] text-white">
                See It in Action
              </Button>
            </div>

            <div className="order-1 md:order-2 relative">
              <motion.div
                className="relative mx-auto max-w-md"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://www.ring4.com/hubfs/image-png-Nov-20-2024-11-28-42-2132-PM.png"
                  alt="Website Chat Widget"
                  className="rounded-xl shadow-xl z-10 relative"
                />

                {/* Decorative elements */}
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-100 rounded-full -z-10"></div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-teal-100 rounded-full -z-10"></div>
              </motion.div>
            </div>
          </motion.div>

          {/* Feature 4: Transparent Billing */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <motion.div
                className="relative mx-auto max-w-sm"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                  <div className="bg-green-600 text-white p-4">
                    <h4 className="text-lg font-semibold">Simple, Transparent Pricing</h4>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6 pb-6 border-b">
                      <span className="text-2xl font-bold">$29</span>
                      <span className="text-gray-500">per user / month</span>
                    </div>

                    <ul className="space-y-4">
                      <li className="flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <span className="text-gray-900">Unlimited Calls & Texts</span>
                          <div className="text-xs text-green-600 line-through">No hidden fees</div>
                        </div>
                      </li>
                      <li className="flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <span className="text-gray-900">Free Number Porting</span>
                          <div className="text-xs text-green-600 line-through">No setup fee</div>
                        </div>
                      </li>
                      <li className="flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <span className="text-gray-900">No Annual Contracts</span>
                          <div className="text-xs text-green-600 line-through">No cancellation fee</div>
                        </div>
                      </li>
                    </ul>

                    <div className="mt-8 pt-4 border-t">
                      <p className="text-center text-sm text-gray-500 mb-4">Try Risk-Free for 14 Days</p>
                      <Button className="w-full bg-[#0055FF] hover:bg-[#003399] text-white">
                        Get Started
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-green-100 rounded-full -z-10"></div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-100 rounded-full -z-10"></div>
              </motion.div>
            </div>

            <div>
              <div className="inline-flex items-center bg-emerald-100 px-3 py-1 rounded-full text-emerald-600 text-sm font-medium mb-4">
                <span className="mr-2">💸</span>
                <span>TRANSPARENT PRICING</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                You Pay for the Product. Not the Fine Print.
              </h3>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">No setup fees, hidden charges, or surprise bills</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Free number porting with every plan</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Clear monthly pricing—what you see is what you pay</span>
                </li>
              </ul>
              <Button className="bg-[#0055FF] hover:bg-[#003399] text-white">
                View Pricing
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ring4 Solutions: Use Cases Section */}
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
                    <span className="text-gray-700">Verified business caller ID increases answer rates by 70%.</span>
                  </div>
                </div>
                <div className="flex-shrink-0 flex items-center space-x-2 ml-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Separate Work & Personal */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md"
            >
              <div className="p-4 flex items-center">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-blue-50 rounded-full mr-4">
                  <span className="text-xl">🧘‍♂️</span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold">Separate Work & Personal</h3>
                  <div className="flex flex-wrap items-center text-sm">
                    <span className="text-gray-500 mr-1">Problem:</span>
                    <span className="text-gray-700 mr-4">No boundaries between work and personal life.</span>
                  </div>
                  <div className="flex flex-wrap items-center text-sm mt-1">
                    <span className="text-blue-600 mr-1">Solution:</span>
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

            {/* Card 3: Convert Site Visitors via SMS */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md"
            >
              <div className="p-4 flex items-center">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-blue-50 rounded-full mr-4">
                  <span className="text-xl">💬</span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold">Convert Site Visitors via SMS</h3>
                  <div className="flex flex-wrap items-center text-sm">
                    <span className="text-gray-500 mr-1">Problem:</span>
                    <span className="text-gray-700 mr-4">Website visitors leave before connecting.</span>
                  </div>
                  <div className="flex flex-wrap items-center text-sm mt-1">
                    <span className="text-blue-600 mr-1">Solution:</span>
                    <span className="text-gray-700">One-click texting converts browsers to buyers.</span>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <div className="bg-blue-50 rounded-full px-2 py-1 text-xs text-blue-700">Text Us</div>
                </div>
              </div>
            </motion.div>

            {/* Card 4: Unify Team Replies */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md"
            >
              <div className="p-4 flex items-center">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-blue-50 rounded-full mr-4">
                  <span className="text-xl">🤝</span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold">Unify Team Replies</h3>
                  <div className="flex flex-wrap items-center text-sm">
                    <span className="text-gray-500 mr-1">Problem:</span>
                    <span className="text-gray-700 mr-4">Disconnected communications create customer confusion.</span>
                  </div>
                  <div className="flex flex-wrap items-center text-sm mt-1">
                    <span className="text-blue-600 mr-1">Solution:</span>
                    <span className="text-gray-700">Shared inbox ensures consistent customer experience.</span>
                  </div>
                </div>
                <div className="flex-shrink-0 flex -space-x-2 ml-4">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs border-2 border-white">S</div>
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs border-2 border-white">J</div>
                  <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs border-2 border-white">M</div>
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
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-blue-50 rounded-full mr-4">
                  <span className="text-xl">🌍</span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold">Expand Into New Regions</h3>
                  <div className="flex flex-wrap items-center text-sm">
                    <span className="text-gray-500 mr-1">Problem:</span>
                    <span className="text-gray-700 mr-4">Breaking into new markets requires local presence.</span>
                  </div>
                  <div className="flex flex-wrap items-center text-sm mt-1">
                    <span className="text-blue-600 mr-1">Solution:</span>
                    <span className="text-gray-700">Instant local numbers anywhere your business grows.</span>
                  </div>
                </div>
                <div className="flex-shrink-0 flex items-center space-x-1 ml-4">
                  <span className="px-1.5 py-0.5 bg-blue-100 rounded text-xs text-blue-700">212</span>
                  <span className="px-1.5 py-0.5 bg-blue-100 rounded text-xs text-blue-700">415</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
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
              We've helped hundreds of teams escape the spam label, rebuild trust, and actually connect.
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
                  "Ring4 transformed our sales process. Our answer rates increased by 38% in the first month, and our team never misses important calls now."
                </p>
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Sales Director, TechSolutions Inc.</p>
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
                  "Having our brand displayed on outgoing calls made a huge difference. Customers recognize who's calling and actually pick up the phone."
                </p>
                <div>
                  <p className="font-medium">Michael Chen</p>
                  <p className="text-sm text-gray-500">Operations Manager, Growth Partners</p>
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
                  "The shared inbox and team messaging features have streamlined our communication. We've cut response times in half."
                </p>
                <div>
                  <p className="font-medium">Alex Reynolds</p>
                  <p className="text-sm text-gray-500">Customer Success Lead, Innovate AI</p>
                </div>
              </div>
            </div>

            <div className="py-8 border-t border-b border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <img src="https://placehold.co/200x80/ffffff/333333?text=Client+Logo" alt="Client Logo" className="h-10 w-auto mx-auto" />
                <img src="https://placehold.co/200x80/ffffff/333333?text=Client+Logo" alt="Client Logo" className="h-10 w-auto mx-auto" />
                <img src="https://placehold.co/200x80/ffffff/333333?text=Client+Logo" alt="Client Logo" className="h-10 w-auto mx-auto" />
                <img src="https://placehold.co/200x80/ffffff/333333?text=Client+Logo" alt="Client Logo" className="h-10 w-auto mx-auto" />
              </div>
            </div>

            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-6">No guesswork, no duct tape. Just clear connected calls and a clean reputation</h3>
              <Button size="lg" className="bg-[#0055FF] hover:bg-[#003399] text-white font-medium">
                Book a Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#001F5C] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">Ring4</h4>
              <p className="text-gray-300 mb-4">Transform your business communication with branded calling, intelligent routing, and team collaboration.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Use Cases</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">API Documentation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>© 2025 Ring4. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}