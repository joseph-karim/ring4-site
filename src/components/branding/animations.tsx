import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

export default function Animations() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Animation Guidelines</CardTitle>
          <CardDescription>
            Animation is a key component of the Ring4 brand experience, adding depth, responsiveness, and delight to user interactions. 
            When used consistently, animations reinforce brand personality while guiding users through the interface.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="scroll" className="w-full">
            <TabsList className="grid grid-cols-1 md:grid-cols-3 mb-6">
              <TabsTrigger value="scroll">Scroll Animations</TabsTrigger>
              <TabsTrigger value="hover">Hover & Micro-interactions</TabsTrigger>
              <TabsTrigger value="loading">Loading & Page Transitions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="scroll" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Scroll-Triggered Animations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-5">
                    <h4 className="font-medium mb-3">Fade In</h4>
                    <div className="bg-gray-100 p-6 rounded-md flex flex-col items-center">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="w-full h-32 bg-white border rounded-md shadow-sm flex items-center justify-center"
                      >
                        <p className="text-sm text-gray-500">Fade In Animation</p>
                      </motion.div>
                      <div className="mt-4 text-sm text-gray-500">
                        <p>Elements fade in as they enter the viewport</p>
                        <p className="text-xs mt-2">Implementation: Use AOS library with "fade-up" effect or Framer Motion's opacity animation</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-5">
                    <h4 className="font-medium mb-3">Staggered Reveal</h4>
                    <div className="bg-gray-100 p-6 rounded-md flex flex-col items-center">
                      <div className="w-full space-y-2">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="w-full h-10 bg-white border rounded-md shadow-sm flex items-center px-4"
                        >
                          Item 1
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="w-full h-10 bg-white border rounded-md shadow-sm flex items-center px-4"
                        >
                          Item 2
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          className="w-full h-10 bg-white border rounded-md shadow-sm flex items-center px-4"
                        >
                          Item 3
                        </motion.div>
                      </div>
                      <div className="mt-4 text-sm text-gray-500">
                        <p>Elements in a list or grid reveal sequentially</p>
                        <p className="text-xs mt-2">Implementation: Use staggered delays with Framer Motion or CSS animations</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 border rounded-lg p-5">
                  <h4 className="font-medium mb-3">Scroll Animation Guidelines</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-2">When to Use</h5>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Feature highlights and benefit sections</li>
                        <li>Testimonial and client logo sections</li>
                        <li>Statistical data and achievements</li>
                        <li>Call-to-action sections to draw attention</li>
                        <li>Dashboard widgets and data visualizations</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-2">Implementation Tips</h5>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Use the Intersection Observer API or libraries like AOS</li>
                        <li>Keep animations subtle and professional</li>
                        <li>Ensure animations complete quickly (300-700ms)</li>
                        <li>Consider reduced motion preferences</li>
                        <li>Test performance on mobile devices</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-blue-50 rounded-md text-sm">
                    <p className="font-medium text-blue-700">Technical Note:</p>
                    <p className="text-blue-600 mt-1">
                      For scroll animations, we recommend using Framer Motion with the useInView hook or the Animate on Scroll (AOS) library. 
                      For simpler cases, CSS-only solutions with Intersection Observer can be sufficient. Remember to implement the prefers-reduced-motion media query for accessibility.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="hover" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Hover Effects & Micro-interactions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-5">
                    <h4 className="font-medium mb-3">Button Hover States</h4>
                    <div className="p-6 rounded-md space-y-6">
                      <div className="flex flex-col items-center">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium transition-all duration-200 hover:bg-blue-700 hover:shadow-md">
                          Primary Button
                        </button>
                        <p className="text-sm text-gray-500 mt-3">Color darkens & subtle shadow appears on hover</p>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <button className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-md font-medium transition-all duration-200 hover:bg-blue-50">
                          Secondary Button
                        </button>
                        <p className="text-sm text-gray-500 mt-3">Background lightens on hover</p>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <button className="relative px-4 py-2 bg-blue-600 text-white rounded-md font-medium overflow-hidden group">
                          <span className="relative z-10">Animated Button</span>
                          <span className="absolute inset-0 bg-blue-800 translate-y-full group-hover:translate-y-0 transition-transform duration-200"></span>
                        </button>
                        <p className="text-sm text-gray-500 mt-3">Reveal animation on hover</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-5">
                    <h4 className="font-medium mb-3">Interactive Elements</h4>
                    <div className="p-6 rounded-md space-y-6">
                      <div className="flex flex-col items-center">
                        <div className="transition-transform duration-200 hover:scale-105 cursor-pointer">
                          <div className="w-48 h-32 bg-white rounded-lg shadow-md border p-4 flex items-center justify-center">
                            <span className="text-gray-500">Card Element</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-3">Subtle scale effect on hover</p>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="flex items-center space-x-2 cursor-pointer group">
                          <span className="text-blue-600 group-hover:underline">Learn more</span>
                          <span className="text-blue-600 transition-transform duration-200 group-hover:translate-x-1">→</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-3">Link with animated arrow indicator</p>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="relative w-48 h-32 bg-white rounded-lg shadow-md border p-4 flex items-center justify-center overflow-hidden cursor-pointer group">
                          <span className="text-gray-500 transition-opacity duration-200 group-hover:opacity-0">Feature Card</span>
                          <div className="absolute inset-0 bg-blue-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <span className="text-white font-medium">Learn More</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-3">Content overlay reveal on hover</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 border rounded-lg p-5">
                  <h4 className="font-medium mb-3">Micro-interaction Guidelines</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-2">Principles</h5>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Subtle but noticeable feedback for user actions</li>
                        <li>Consistent timing across similar interactions</li>
                        <li>Purpose-driven animations that guide the user</li>
                        <li>Smooth easing functions for natural movement</li>
                        <li>Brief durations (150-300ms) for micro-interactions</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-2">Key Micro-interactions</h5>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Form input focus states</li>
                        <li>Button hover and active states</li>
                        <li>Menu/dropdown expansions</li>
                        <li>Notification appearances</li>
                        <li>Toggle switches and form controls</li>
                        <li>Tooltips and informational overlays</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-blue-50 rounded-md text-sm">
                    <p className="font-medium text-blue-700">Implementation Note:</p>
                    <p className="text-blue-600 mt-1">
                      Most hover effects and micro-interactions can be implemented with CSS transitions and the :hover, :focus, :active pseudo-classes.
                      For more complex interactions, consider using Framer Motion or a lightweight animation library. Always test interactions on touch devices
                      where hover states aren't available.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="loading" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Loading States & Page Transitions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-5">
                    <h4 className="font-medium mb-3">Loading Indicators</h4>
                    <div className="p-6 rounded-md space-y-6">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        <p className="text-sm text-gray-500 mt-3">Primary Spinner</p>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-3">Secondary Loading Indicator</p>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md font-medium">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Loading...</span>
                        </button>
                        <p className="text-sm text-gray-500 mt-3">Button Loading State</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-5">
                    <h4 className="font-medium mb-3">Page & Content Transitions</h4>
                    <div className="p-6 rounded-md space-y-6">
                      <div className="flex flex-col items-center">
                        <div className="relative w-full h-36 border rounded-md overflow-hidden">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 bg-white flex items-center justify-center p-4"
                          >
                            <p className="text-gray-500">Page content fades in/out during transitions</p>
                          </motion.div>
                        </div>
                        <p className="text-sm text-gray-500 mt-3">Fade transition between pages</p>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="relative w-full h-36 border rounded-md overflow-hidden">
                          <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="absolute inset-0 bg-white flex items-center justify-center p-4"
                          >
                            <p className="text-gray-500">Content slides in from the right, out to the left</p>
                          </motion.div>
                        </div>
                        <p className="text-sm text-gray-500 mt-3">Slide transition for sequential content</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 border rounded-lg p-5">
                  <h4 className="font-medium mb-3">Loading & Transition Guidelines</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-2">When to Use Loading Indicators</h5>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Page loads and route changes (&gt;300ms)</li>
                        <li>Data fetching operations</li>
                        <li>Form submissions</li>
                        <li>Background processing tasks</li>
                        <li>Content that requires time to load</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-2">Page Transition Best Practices</h5>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Keep transitions brief (200-500ms)</li>
                        <li>Use consistent transitions throughout</li>
                        <li>Consider the direction of user flow (forward/backward)</li>
                        <li>Ensure transitions don't block critical user interactions</li>
                        <li>Test transition performance on lower-end devices</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-blue-50 rounded-md text-sm">
                    <p className="font-medium text-blue-700">Technical Implementation:</p>
                    <p className="text-blue-600 mt-1">
                      For loading indicators, we recommend using CSS animations for simple spinners and Tailwind's built-in animation utilities.
                      For page transitions, implement Framer Motion with its AnimatePresence component to handle entrance and exit animations.
                      Consider using skeleton loaders for content that takes longer to load to improve perceived performance.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Animation Principles & Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium mb-3">Ring4 Animation Principles</h4>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">1</div>
                    <div>
                      <p className="font-medium">Purposeful</p>
                      <p className="text-sm text-gray-600">Every animation should serve a purpose (guide attention, provide feedback, etc.)</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">2</div>
                    <div>
                      <p className="font-medium">Subtle</p>
                      <p className="text-sm text-gray-600">Animations should enhance without distracting from content or functionality</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">3</div>
                    <div>
                      <p className="font-medium">Consistent</p>
                      <p className="text-sm text-gray-600">Use a unified animation language throughout all interactions</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">4</div>
                    <div>
                      <p className="font-medium">Quick</p>
                      <p className="text-sm text-gray-600">Animations should be brief to maintain responsive feel</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">5</div>
                    <div>
                      <p className="font-medium">Professional</p>
                      <p className="text-sm text-gray-600">Animations should reflect Ring4's professional brand identity</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Performance Considerations</h4>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <h5 className="font-medium mb-2">Optimize for Performance</h5>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Animate only transform and opacity properties when possible</li>
                      <li>Use hardware acceleration with will-change for complex animations</li>
                      <li>Avoid animating many elements simultaneously</li>
                      <li>Implement staggered animations for multiple elements</li>
                      <li>Test animations on lower-end devices</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h5 className="font-medium mb-2">Accessibility Considerations</h5>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Honor reduced motion preferences</li>
                      <li>Ensure animations don't cause vestibular disorders</li>
                      <li>Don't rely solely on animation to convey information</li>
                      <li>Avoid rapid flashing or strobing effects</li>
                      <li>Test with screen readers and keyboard navigation</li>
                    </ul>
                    
                    <div className="mt-3 p-3 bg-gray-100 rounded text-xs">
                      <code>
                        {`@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 border-t pt-6">
              <h4 className="font-medium mb-3">Animation Libraries & Resources</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-md">
                  <h5 className="font-medium">Framer Motion</h5>
                  <p className="text-sm text-gray-600 mt-1">Recommended for complex animations, page transitions, and gesture-based interactions.</p>
                </div>
                <div className="p-4 border rounded-md">
                  <h5 className="font-medium">Animate On Scroll (AOS)</h5>
                  <p className="text-sm text-gray-600 mt-1">Ideal for scroll-triggered animations on marketing pages and feature highlights.</p>
                </div>
                <div className="p-4 border rounded-md">
                  <h5 className="font-medium">CSS Animations & Transitions</h5>
                  <p className="text-sm text-gray-600 mt-1">Perfect for simple hover states, micro-interactions, and performance-critical animations.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}