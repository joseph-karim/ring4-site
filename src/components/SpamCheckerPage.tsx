import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { checkPhoneNumber } from '@/lib/spam-check'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Clock,
  LoaderCircle,
  Phone,
  Shield,
  ShieldCheck,
  ShieldX,
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Define the form schema using Zod
const formSchema = z.object({
  phoneNumber: z.string().min(10, {
    message: 'Phone number must be at least 10 digits',
  }),
})

// Define the lead capture form schema
const leadFormSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  company: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>
type LeadFormValues = z.infer<typeof leadFormSchema>

export default function SpamCheckerPage() {
  const [isChecking, setIsChecking] = useState(false)
  const [checkResult, setCheckResult] = useState<any>(null)
  const [showFullReport, setShowFullReport] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [leadCaptured, setLeadCaptured] = useState(false)

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: '',
    },
  })

  // Initialize lead capture form
  const leadForm = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
    },
  })

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsChecking(true)
    setFormSubmitted(true)
    setCheckResult(null)
    setShowFullReport(false)
    setLeadCaptured(false)
    
    try {
      // Format phone number to remove non-digits
      const formattedNumber = data.phoneNumber.replace(/\D/g, '')
      
      // Call the spam check service
      const result = await checkPhoneNumber(formattedNumber)
      setCheckResult(result)
    } catch (error) {
      console.error('Error checking phone number:', error)
      if (error instanceof Error) {
        form.setError('phoneNumber', { message: error.message })
      }
    } finally {
      setIsChecking(false)
    }
  }

  // Handle lead capture form submission
  const onLeadSubmit = (data: LeadFormValues) => {
    console.log('Lead captured:', data)
    setLeadCaptured(true)
    setShowFullReport(true)
  }

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'clean':
        return 'bg-green-500'
      case 'at-risk':
        return 'bg-yellow-500'
      case 'flagged':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  // Helper function to get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case 'clean':
        return 'Good Standing'
      case 'at-risk':
        return 'At Risk'
      case 'flagged':
        return 'Flagged as Spam'
      default:
        return 'Unknown'
    }
  }

  // Helper function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'clean':
        return <ShieldCheck className="h-6 w-6 text-green-500" />
      case 'at-risk':
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />
      case 'flagged':
        return <ShieldX className="h-6 w-6 text-red-500" />
      default:
        return <Shield className="h-6 w-6 text-gray-500" />
    }
  }

  // Function to render results based on status
  const renderResults = () => {
    if (!checkResult) return null

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8"
      >
        <Card>
          <CardHeader className={cn('text-white', getStatusColor(checkResult.status))}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(checkResult.status)}
                <div>
                  <CardTitle className="text-white">
                    {getStatusText(checkResult.status)}
                  </CardTitle>
                  <CardDescription className="text-white/80">
                    {checkResult.status === 'clean'
                      ? 'Your number appears safe for now'
                      : checkResult.status === 'at-risk'
                      ? 'Your number shows signs of potential spam risk'
                      : 'Your number is likely being flagged as spam'}
                  </CardDescription>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">
                  {checkResult.riskScore}%
                </div>
                <div className="text-sm">Risk Score</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm">Clean</span>
                <span className="text-sm">Flagged</span>
              </div>
              <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full transition-all duration-1000 ease-out rounded-full',
                    checkResult.status === 'clean' ? 'bg-green-500' : 
                    checkResult.status === 'at-risk' ? 'bg-yellow-500' : 'bg-red-500'
                  )}
                  style={{ width: `${checkResult.riskScore}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Quick Summary</h3>
              {checkResult.status === 'clean' ? (
                <p>
                  Your number appears to be in good standing with major carriers. However, spam labels can happen at any time. Protect your reputation with Ring4's proactive monitoring.
                </p>
              ) : checkResult.status === 'at-risk' ? (
                <p>
                  Your number is showing warning signs with some carriers. This could lead to your calls being screened or labeled as spam, resulting in up to 50% fewer answered calls.
                </p>
              ) : (
                <p>
                  Your number is currently being flagged as spam by major carriers. This means your calls are likely being blocked or ignored, resulting in up to 80% fewer answered calls.
                </p>
              )}

              {!showFullReport && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Lock className="h-5 w-5 mr-2 text-blue-600" />
                    <h3 className="font-medium">Get Your Full Report</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    See which carriers are flagging your number and get a personalized action plan to fix or prevent spam labels.
                  </p>

                  {!leadCaptured ? (
                    <Form {...leadForm}>
                      <form onSubmit={leadForm.handleSubmit(onLeadSubmit)} className="space-y-4">
                        <FormField
                          control={leadForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Your Name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={leadForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Work Email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={leadForm.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Company Name (Optional)" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full bg-blue-600">
                          Unlock Full Report
                        </Button>
                      </form>
                    </Form>
                  ) : (
                    <Button 
                      className="w-full bg-blue-600"
                      onClick={() => setShowFullReport(true)}
                    >
                      View Full Report
                    </Button>
                  )}
                </div>
              )}

              {showFullReport && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.4 }}
                >
                  <Tabs defaultValue="carriers">
                    <TabsList className="w-full mb-4">
                      <TabsTrigger value="carriers" className="flex-1">Carrier Status</TabsTrigger>
                      <TabsTrigger value="recommendations" className="flex-1">Fix It Now</TabsTrigger>
                      <TabsTrigger value="report" className="flex-1">Detailed Report</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="carriers" className="space-y-4">
                      <h3 className="font-semibold">Carrier Reputation Status</h3>
                      <div className="space-y-3">
                        {checkResult.carriers.map((carrier: any, index: number) => (
                          <div key={index} className="flex justify-between items-center p-3 rounded-lg border">
                            <div className="flex items-center">
                              <div className={cn("w-3 h-3 rounded-full mr-3", 
                                carrier.status === 'clean' ? 'bg-green-500' : 
                                carrier.status === 'at-risk' ? 'bg-yellow-500' : 'bg-red-500'
                              )}></div>
                              <span>{carrier.name}</span>
                            </div>
                            <span className="text-sm">
                              {carrier.status === 'clean' ? 'Good Standing' : 
                               carrier.status === 'at-risk' ? 'At Risk' : 'Flagged'}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-700">
                          <span className="font-medium">Pro Tip:</span> Carrier status can change frequently. With Ring4, you'll get real-time alerts when your number's status changes.
                        </p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="recommendations">
                      <div className="space-y-4">
                        <h3 className="font-semibold">Recommended Actions</h3>
                        <ul className="space-y-3">
                          {checkResult.recommendations.map((rec: string, index: number) => (
                            <li key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                              <div className="flex-shrink-0 bg-blue-100 rounded-full p-1 mr-3">
                                <CheckCircle className="h-5 w-5 text-blue-600" />
                              </div>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="p-5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white mt-6">
                          <h4 className="font-bold text-lg mb-2">Ring4 Can Fix This For You</h4>
                          <p className="mb-4 text-white/90">
                            Our team specializes in removing spam flags and implementing verified business caller ID across all carriers.
                          </p>
                          <div className="space-y-2">
                            <Button className="w-full bg-white text-blue-700 hover:bg-blue-50">
                              Start Free Trial
                            </Button>
                            <Button variant="outline" className="w-full border-white text-white hover:bg-blue-700">
                              Book a Demo
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="report">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">Detailed Report</h3>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </Button>
                        </div>
                        
                        <div className="p-4 rounded-lg border space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Phone Number:</span>
                            <span className="text-sm">{form.getValues().phoneNumber}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Scan Date:</span>
                            <span className="text-sm">{new Date().toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Risk Score:</span>
                            <span className="text-sm">{checkResult.riskScore}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Overall Status:</span>
                            <span className={cn(
                              'text-sm font-medium',
                              checkResult.status === 'clean' ? 'text-green-600' : 
                              checkResult.status === 'at-risk' ? 'text-yellow-600' : 
                              'text-red-600'
                            )}>
                              {getStatusText(checkResult.status)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-4 rounded-lg border">
                          <h4 className="font-medium mb-3">Business Impact</h4>
                          {checkResult.status === 'clean' ? (
                            <p className="text-sm text-gray-600">
                              Your current spam risk is low. However, without proper phone reputation management, businesses typically see a 30% drop in answer rates within 90 days of active calling campaigns.
                            </p>
                          ) : checkResult.status === 'at-risk' ? (
                            <p className="text-sm text-gray-600">
                              At your current risk level, you're likely experiencing a 30-50% decrease in answer rates compared to calls from trusted numbers. This directly impacts sales opportunities and revenue.
                            </p>
                          ) : (
                            <p className="text-sm text-gray-600">
                              With a flagged status, your calls are being screened or blocked by carriers, resulting in a 70-80% drop in answer rates. This is likely costing you significant sales opportunities and revenue.
                            </p>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {checkResult.status !== 'clean' && !leadCaptured && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-6 p-5 rounded-lg border border-red-300 bg-red-50"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 bg-red-100 rounded-full p-2">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-red-700 mb-1">Your Calls Are Being Filtered</h3>
                <p className="text-gray-700 mb-3">
                  With your current spam status, you could be losing up to 
                  <span className="font-bold"> {checkResult.status === 'at-risk' ? '50%' : '80%'} </span> 
                  of potential connections. This directly impacts your revenue pipeline.
                </p>
                <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setLeadCaptured(true)}>
                  Fix This Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}
        
        {checkResult.status === 'clean' && !leadCaptured && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-6 p-5 rounded-lg border border-green-300 bg-green-50"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
                <ShieldCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-green-700 mb-1">Your Number Looks Good</h3>
                <p className="text-gray-700 mb-3">
                  Your number is currently in good standing, but spam labels can happen any time. Proactive protection ensures your calls always get through.
                </p>
                <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => setLeadCaptured(true)}>
                  Keep It Protected
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    )
  }

  // Helper function for formatting
  const formatPhoneNumber = (value: string) => {
    if (!value) return value
    
    // Remove all non-digits
    const phoneNumber = value.replace(/\D/g, '')
    
    // Format as (XXX) XXX-XXXX
    if (phoneNumber.length <= 3) {
      return phoneNumber
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#001F5C] to-[#003399] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-1 bg-blue-800 text-blue-200 rounded-full text-sm font-medium mb-4">
                FREE SPAM CHECK TOOL
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Is Your Business Phone Number Flagged As Spam?
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Check your number's reputation in seconds. Protect your caller ID status and stop losing valuable connections.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-lg mx-auto"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="relative">
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <div className="flex space-x-2">
                            <div className="flex-1">
                              <FormControl>
                                <Input
                                  placeholder="(555) 123-4567"
                                  className="h-14 pl-12 text-black text-lg"
                                  {...field}
                                  onChange={(e) => {
                                    const formattedValue = formatPhoneNumber(e.target.value)
                                    field.onChange(formattedValue)
                                  }}
                                  disabled={isChecking}
                                />
                              </FormControl>
                            </div>
                            <Button 
                              type="submit" 
                              className="h-14 px-6 bg-[#0055FF]"
                              disabled={isChecking || !form.formState.isValid}
                            >
                              {isChecking ? (
                                <span className="flex items-center">
                                  <LoaderCircle className="animate-spin mr-2 h-5 w-5" /> 
                                  Checking...
                                </span>
                              ) : formSubmitted && checkResult ? (
                                <span className="flex items-center">
                                  Check Again
                                </span>
                              ) : (
                                <span className="flex items-center">
                                  Check Now <ArrowRight className="ml-2 h-5 w-5" />
                                </span>
                              )}
                            </Button>
                          </div>
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <Phone className="h-6 w-6" />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="text-blue-200 text-sm">
                    Only US-based numbers supported at the moment
                  </div>
                </form>
              </Form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex justify-center mt-8 space-x-6"
            >
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-300 mr-2" />
                <span className="text-blue-100 text-sm">Free & Instant</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-300 mr-2" />
                <span className="text-blue-100 text-sm">All Major Carriers</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-300 mr-2" />
                <span className="text-blue-100 text-sm">Trusted by 10,000+ Businesses</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Result Section */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <AnimatePresence>
            {isChecking && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-2xl mx-auto text-center"
              >
                <div className="mb-6 flex flex-col items-center">
                  <div className="relative w-20 h-20 mb-4">
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-blue-200"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                      <Phone className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Checking Your Number</h2>
                  <p className="text-gray-600 mb-6">
                    We're scanning known databases and spam detection algorithms to estimate your phone number's current health.
                  </p>
                  <Progress value={65} className="w-full max-w-md" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!isChecking && checkResult && renderResults()}
          
          {!isChecking && !checkResult && !formSubmitted && (
            <div className="max-w-5xl mx-auto mt-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader className="flex flex-row items-start space-x-3 pb-2">
                    <Shield className="h-6 w-6 text-red-500 mt-1" />
                    <div>
                      <CardTitle>Problem</CardTitle>
                      <CardDescription>
                        Your business number may be labeled as spam
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Your sales calls could be getting blocked or screened with a "Spam Likely" label, leading to 80% fewer answered calls.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-start space-x-3 pb-2">
                    <CheckCircle className="h-6 w-6 text-blue-500 mt-1" />
                    <div>
                      <CardTitle>Solution</CardTitle>
                      <CardDescription>
                        Check your number's status instantly
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Our free tool scans across major carriers and databases to determine if your business phone is being flagged or filtered.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-start space-x-3 pb-2">
                    <ArrowRight className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <CardTitle>Next Steps</CardTitle>
                      <CardDescription>
                        Fix spam labels with Ring4
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      If your number is flagged, we'll show you exactly how to fix it and implement branded caller ID to boost answer rates.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {leadCaptured && checkResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-lg border border-blue-100"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-blue-100 rounded-full p-3">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-xl">Next Steps</h3>
                  <p className="text-gray-600">Here's how to protect your number with Ring4</p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-4">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Start Your Free Trial</h4>
                    <p className="text-sm text-gray-600">
                      Begin with a 14-day free trial of Ring4's complete business phone system with spam protection.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-4">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Set Up Your Business Profile</h4>
                    <p className="text-sm text-gray-600">
                      Our team will help you register your business details with carriers to improve your reputation.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-4">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Activate Branded Caller ID</h4>
                    <p className="text-sm text-gray-600">
                      We'll implement our proprietary caller ID system so your business name appears on outgoing calls.
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Start Free Trial
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Book a Demo First
                  </Button>
                </div>
                <p className="text-sm text-center text-gray-500 mt-2">
                  No credit card required. Cancel anytime.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      {!checkResult && !isChecking && (
        <section className="py-10 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How The Spam Checker Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get an instant assessment of your business phone number's reputation across major carriers
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Phone className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Enter Your Number</h3>
                  <p className="text-gray-600">
                    Simply enter your business phone number in the tool above
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Get Your Results</h3>
                  <p className="text-gray-600">
                    We'll check your number against known carrier databases and spam detection systems
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                    <ChevronRight className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Take Action</h3>
                  <p className="text-gray-600">
                    Based on your results, we'll provide a personalized plan to improve your number's reputation
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">
                Learn more about spam labels and how Ring4 can help protect your business calls
              </p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader className="cursor-pointer">
                  <CardTitle className="text-lg">Why are my business calls being marked as spam?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Carriers use algorithms that look at call patterns, complaint rates, and other factors to identify potential spam. Unfortunately, these systems often incorrectly flag legitimate business numbers, especially if you make numerous outbound calls or have a newly activated number.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="cursor-pointer">
                  <CardTitle className="text-lg">How accurate is this spam check tool?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our tool provides a best-effort estimation based on available carrier data and known spam detection sources. While no tool can provide 100% accurate results across all regions and carriers, our check gives you a good indication of your number's reputation status.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="cursor-pointer">
                  <CardTitle className="text-lg">How can Ring4 fix my spam label issues?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Ring4 offers a comprehensive solution that includes business number registration with carriers, branded caller ID implementation, reputation monitoring, and ongoing protection. We'll work with carrier databases to reduce your spam score and ensure your calls show your business name instead of "Spam Likely."
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="cursor-pointer">
                  <CardTitle className="text-lg">How long does it take to fix a spam label?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    While results vary by carrier and the severity of the spam score, most Ring4 customers see significant improvements within 7-14 days. Complete remediation across all carriers typically takes 2-4 weeks.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-20 bg-gradient-to-b from-blue-600 to-[#003399] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Stop Losing Sales to Spam Labels?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of businesses who've protected their caller reputation and increased answer rates by up to 80% with Ring4.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                Book a Demo
              </Button>
            </div>
            <div className="mt-8 flex justify-center items-center space-x-2 text-blue-100">
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
        </div>
      </section>
    </div>
  )
}

// Extra components needed
const Lock = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
)

const Download = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
)