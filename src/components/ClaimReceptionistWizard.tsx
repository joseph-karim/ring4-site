import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { ScrollArea } from './ui/scroll-area'
import { Progress } from './ui/progress'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { 
  Phone, 
  Globe, 
  Sparkles, 
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  Brain,
  Loader2,
  Play,
  PhoneCall,
  User
} from 'lucide-react'
import { BusinessInfo } from '../lib/website-crawler'
import { generateSonicNovaConfig } from '../lib/sonic-nova-config'
import { saveAIReceptionist, saveDemoCallTranscript } from '../lib/ai-receptionist-storage'
import { supabase } from '../lib/supabase'

type WizardStep = 'intro' | 'website' | 'analyzing' | 'preview' | 'test-call' | 'claim'

export default function ClaimReceptionistWizard() {
  const [currentStep, setCurrentStep] = useState<WizardStep>('intro')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null)
  const [aiConfig, setAiConfig] = useState<any>(null)
  const [receptionistId, setReceptionistId] = useState<string | null>(null)
  const [_isLoading, setIsLoading] = useState(false)
  const [callStatus, setCallStatus] = useState<'idle' | 'countdown' | 'calling' | 'ended'>('idle')
  const [callCountdown, setCallCountdown] = useState(3)
  const [callDuration, setCallDuration] = useState(0)
  const [transcript, setTranscript] = useState<string[]>([])

  // Progress calculation
  const stepOrder: WizardStep[] = ['intro', 'website', 'analyzing', 'preview', 'test-call', 'claim']
  const currentStepIndex = stepOrder.indexOf(currentStep)
  const progress = ((currentStepIndex + 1) / stepOrder.length) * 100

  const handleAnalyzeWebsite = async () => {
    if (!websiteUrl) return
    
    setCurrentStep('analyzing')
    setIsLoading(true)
    
    try {
      let info: BusinessInfo
      
      // Try to use Supabase Edge Function to crawl website
      const { data, error } = await supabase.functions.invoke('crawl-website-simple', {
        body: { url: websiteUrl }
      })
      
      if (error) {
        console.warn('Edge function failed, using local mock:', error)
        // Fallback to local mock for development/demo
        const { crawlWebsite } = await import('../lib/website-crawler')
        info = await crawlWebsite(websiteUrl)
      } else {
        info = data.businessInfo as BusinessInfo
      }
      
      setBusinessInfo(info)
      
      // Generate AI configuration
      const config = generateSonicNovaConfig(info)
      setAiConfig(config)
      
      // Save to Supabase
      const savedReceptionist = await saveAIReceptionist({
        websiteUrl,
        businessInfo: info,
        aiConfig: config
      })
      
      if (savedReceptionist) {
        setReceptionistId(savedReceptionist.id!)
      }
      
      // Wait a bit to show analyzing animation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setCurrentStep('preview')
    } catch (error) {
      console.error('Error analyzing website:', error)
      // Still proceed to preview with mock data
      setCurrentStep('preview')
    } finally {
      setIsLoading(false)
    }
  }

  const startTestCall = async () => {
    setCallStatus('countdown')
    setCallCountdown(3)
    
    // Countdown
    for (let i = 3; i > 0; i--) {
      setCallCountdown(i)
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    
    setCallStatus('calling')
    setCallDuration(0)
    setTranscript([])
    
    // Simulate call progress
    const sampleTranscript = [
      { speaker: 'AI', text: `Good afternoon, thank you for calling ${businessInfo?.name || 'Sunrise Realty'}. This is Emma, how may I assist you today?` },
      { speaker: 'Caller', text: "Hi, I'm looking for information about homes in the area." },
      { speaker: 'AI', text: "I'd be happy to help you with that! Are you looking to buy or rent, and do you have a specific area in mind?" },
      { speaker: 'Caller', text: "I'm looking to buy, preferably in the downtown area." },
      { speaker: 'AI', text: "Excellent! Our agents specialize in downtown properties. Would you like me to schedule a consultation with one of our expert agents who can show you available properties in that area?" },
      { speaker: 'Caller', text: "Yes, that would be great." },
      { speaker: 'AI', text: "Perfect! I'll need just a few details. May I have your name and the best phone number to reach you?" },
      { speaker: 'Caller', text: "It's John Smith, and my number is 555-0123." },
      { speaker: 'AI', text: "Thank you, Mr. Smith. I've noted that you're interested in buying property in the downtown area. One of our agents will call you within the next 2 hours. Is there anything else I can help you with today?" },
      { speaker: 'Caller', text: "No, that's all. Thank you!" },
      { speaker: 'AI', text: "You're welcome! We look forward to helping you find your perfect home. Have a wonderful day!" }
    ]
    
    // Simulate transcript appearing over time
    for (let i = 0; i < sampleTranscript.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setTranscript(prev => [...prev, `${sampleTranscript[i].speaker}: ${sampleTranscript[i].text}`])
      setCallDuration(prev => prev + 2)
    }
    
    setCallStatus('ended')
    
    // Save transcript
    if (receptionistId) {
      await saveDemoCallTranscript({
        receptionistId,
        transcript,
        duration: callDuration
      })
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'intro':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto text-center space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto"
              >
                <PhoneCall className="w-12 h-12 text-blue-600" />
              </motion.div>
              <h1 className="text-4xl font-bold">Create Your AI Receptionist</h1>
              <p className="text-xl text-gray-600">
                Never miss another lead. Your AI receptionist answers every call, 
                captures key information, and texts you instantly.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm">24/7 Availability</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-sm">Smart Responses</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MessageSquare className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-sm">Instant Alerts</p>
              </div>
            </div>
            
            <Button 
              size="lg" 
              onClick={() => setCurrentStep('website')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        )

      case 'website':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-xl mx-auto space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Enter Your Website</h2>
              <p className="text-gray-600">
                We'll analyze your website to create a personalized AI receptionist
              </p>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="url"
                      placeholder="https://your-business-website.com"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      className="pl-10 h-12 text-lg"
                    />
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Tip:</strong> Your AI receptionist will learn about your services, 
                      hours, and specialties from your website.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep('intro')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button 
                onClick={handleAnalyzeWebsite}
                disabled={!websiteUrl}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Analyze Website <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )

      case 'analyzing':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-xl mx-auto text-center space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto"
              >
                <Sparkles className="w-12 h-12 text-blue-600" />
              </motion.div>
              <h2 className="text-3xl font-bold">Analyzing Your Website</h2>
              <p className="text-xl text-gray-600">
                Creating your personalized AI receptionist...
              </p>
            </div>
            
            <div className="space-y-4 max-w-sm mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-3"
              >
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Extracting business information</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center space-x-3"
              >
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Learning your services</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="flex items-center space-x-3"
              >
                <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
                <span>Training AI receptionist</span>
              </motion.div>
            </div>
          </motion.div>
        )

      case 'preview':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Meet Your AI Receptionist</h2>
              <p className="text-gray-600">
                Trained on your business and ready to handle calls professionally
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* AI Personality Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    AI Personality
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">Name</p>
                    <p className="text-gray-600">{aiConfig?.agentName || 'Emma'}</p>
                  </div>
                  <div>
                    <p className="font-medium">Voice</p>
                    <p className="text-gray-600">{aiConfig?.voiceSettings?.voiceId || 'Professional Female'}</p>
                  </div>
                  <div>
                    <p className="font-medium">Personality Traits</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Badge variant="secondary">Professional</Badge>
                      <Badge variant="secondary">Friendly</Badge>
                      <Badge variant="secondary">Helpful</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Knowledge Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Business Knowledge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="hours">
                      <AccordionTrigger>Business Hours</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1 text-sm">
                          {businessInfo && Object.entries(businessInfo.hours).map(([day, hours]) => (
                            <div key={day} className="flex justify-between">
                              <span className="capitalize">{day}:</span>
                              <span className="text-gray-600">{hours}</span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="services">
                      <AccordionTrigger>Services</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {businessInfo?.services.map((service, idx) => (
                            <li key={idx}>{service}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="contact">
                      <AccordionTrigger>Contact Info</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1 text-sm">
                          {businessInfo?.contact.phone && (
                            <p>Phone: {businessInfo.contact.phone}</p>
                          )}
                          {businessInfo?.contact.email && (
                            <p>Email: {businessInfo.contact.email}</p>
                          )}
                          {businessInfo?.contact.address && (
                            <p>Address: {businessInfo.contact.address}</p>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            {/* Sample Responses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Sample Responses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiConfig?.conversationStarters.slice(0, 3).map((starter: string, idx: number) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Opening greeting {idx + 1}:</p>
                      <p className="italic">"{starter}"</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep('website')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button 
                onClick={() => setCurrentStep('test-call')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Test Your AI <Phone className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )

      case 'test-call':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Test Your AI Receptionist</h2>
              <p className="text-gray-600">
                See how your AI handles a real customer inquiry
              </p>
            </div>
            
            <Card>
              <CardContent className="p-8">
                {callStatus === 'idle' && (
                  <div className="text-center space-y-6">
                    <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Phone className="w-16 h-16 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Ready to simulate a call?</h3>
                      <p className="text-gray-600">
                        We'll show you how your AI receptionist handles a typical customer inquiry
                      </p>
                    </div>
                    <Button 
                      size="lg" 
                      onClick={startTestCall}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Play className="mr-2 h-5 w-5" /> Start Demo Call
                    </Button>
                  </div>
                )}

                {callStatus === 'countdown' && (
                  <div className="text-center space-y-6">
                    <motion.div
                      key={callCountdown}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.5, opacity: 0 }}
                      className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto"
                    >
                      <span className="text-5xl font-bold text-blue-600">{callCountdown}</span>
                    </motion.div>
                    <p className="text-xl">Starting call...</p>
                  </div>
                )}

                {(callStatus === 'calling' || callStatus === 'ended') && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          callStatus === 'calling' ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          <Phone className={`w-6 h-6 ${
                            callStatus === 'calling' ? 'text-green-600' : 'text-gray-600'
                          }`} />
                        </div>
                        <div>
                          <p className="font-semibold">Demo Call</p>
                          <p className="text-sm text-gray-600">
                            {callStatus === 'calling' ? 'In Progress' : 'Ended'} • {callDuration}s
                          </p>
                        </div>
                      </div>
                      {callStatus === 'calling' && (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          <span className="text-sm text-gray-600">Recording</span>
                        </div>
                      )}
                    </div>

                    <ScrollArea className="h-96 w-full rounded-lg border bg-gray-50 p-4">
                      <div className="space-y-4">
                        {transcript.map((line, idx) => {
                          const isAI = line.startsWith('AI:')
                          return (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}
                            >
                              <div className={`max-w-[80%] p-3 rounded-lg ${
                                isAI 
                                  ? 'bg-white text-gray-800 shadow-sm' 
                                  : 'bg-blue-600 text-white'
                              }`}>
                                <p className="text-sm">{line.replace(/^(AI:|Caller:)\s*/, '')}</p>
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>
                    </ScrollArea>

                    {callStatus === 'ended' && (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-green-800 font-medium mb-2">
                          ✅ Call completed successfully!
                        </p>
                        <p className="text-sm text-green-700">
                          Your AI receptionist captured the lead information and would send you an instant text summary.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep('preview')}
                disabled={callStatus === 'calling' || callStatus === 'countdown'}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button 
                onClick={() => setCurrentStep('claim')}
                disabled={callStatus !== 'ended'}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Claim Your AI <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )

      case 'claim':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto text-center space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto"
              >
                <CheckCircle className="w-12 h-12 text-green-600" />
              </motion.div>
              <h2 className="text-4xl font-bold">Your AI Receptionist is Ready!</h2>
              <p className="text-xl text-gray-600">
                Claim your virtual receptionist now and never miss another opportunity
              </p>
            </div>
            
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">What's Included:</h3>
                  <ul className="text-left space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>24/7 AI receptionist trained on your business</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Instant text notifications for every lead</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Professional branded caller ID</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Free concierge setup and onboarding</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              <Button 
                size="lg" 
                className="w-full max-w-md bg-green-600 hover:bg-green-700"
                onClick={() => {
                  // Pass configuration to Tally form
                  const configData = btoa(JSON.stringify({
                    websiteUrl,
                    businessInfo,
                    aiConfig,
                    receptionistId
                  }))
                  window.open(`https://tally.so/r/mOkko8?config=${configData}`, '_blank')
                }}
              >
                Claim Your AI Receptionist Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <p className="text-sm text-gray-500">
                Free 14-day trial • No credit card required • Cancel anytime
              </p>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </div>
  )
}