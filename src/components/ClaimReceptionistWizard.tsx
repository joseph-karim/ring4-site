import { useState, useEffect, useRef } from 'react'
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
  User,
  Mic,
  MicOff
} from 'lucide-react'
import { BusinessInfo } from '../lib/website-crawler'
import { generateSonicNovaConfig } from '../lib/sonic-nova-config'
import { saveAIReceptionist, saveDemoCallTranscript } from '../lib/ai-receptionist-storage'
import { createSmartDefaultVoiceAgent, formatUrl, validateUrl, FALLBACK_MESSAGES } from '../lib/default-voice-agent'
import { NovaSonicClient, TranscriptMessage, isNovaSonicAvailable } from '../lib/nova-sonic-client'
import { NovaSonicHttpClient } from '../lib/nova-sonic-http-client'

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
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([])
  const [isUsingFallback, setIsUsingFallback] = useState(false)
  const [fallbackMessage, setFallbackMessage] = useState<string>('')
  const [novaSonicClient, setNovaSonicClient] = useState<NovaSonicClient | NovaSonicHttpClient | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [voiceStatus, setVoiceStatus] = useState<string>('Initializing...')
  const [isNovaSonicSupported, setIsNovaSonicSupported] = useState(false)
  const callTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Progress calculation
  const stepOrder: WizardStep[] = ['intro', 'website', 'analyzing', 'preview', 'test-call', 'claim']
  const currentStepIndex = stepOrder.indexOf(currentStep)
  const progress = ((currentStepIndex + 1) / stepOrder.length) * 100

  // Check Nova Sonic support on component mount
  useEffect(() => {
    setIsNovaSonicSupported(isNovaSonicAvailable())
  }, [])

  // Cleanup Nova Sonic client on unmount
  useEffect(() => {
    return () => {
      if (novaSonicClient) {
        novaSonicClient.disconnect()
      }
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current)
      }
    }
  }, [novaSonicClient])

  const handleAnalyzeWebsite = async () => {
    if (!websiteUrl) return
    
    setCurrentStep('analyzing')
    setIsLoading(true)
    
    try {
      let info: BusinessInfo
      let fallbackType = 'GENERIC'
      let crawlMetadata: any = null
      
      // Format and validate URL first
      const formattedUrl = formatUrl(websiteUrl)
      if (!validateUrl(formattedUrl)) {
        console.warn('Invalid URL provided:', websiteUrl)
        setIsUsingFallback(true)
        fallbackType = 'INVALID_URL'
        info = createSmartDefaultVoiceAgent(websiteUrl)
      } else {
        // Use real Crawl4AI-based Netlify function for website crawling
        try {
          console.log(`🚀 Starting real crawl for: ${formattedUrl}`)
          
          const response = await fetch('/.netlify/functions/crawl-website-real', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: formattedUrl })
          })
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
          }
          
          const data = await response.json()
          
          if (!data.success || !data.businessInfo) {
            throw new Error('Crawling failed or returned invalid data')
          }
          
          info = data.businessInfo as BusinessInfo
          crawlMetadata = data.crawlMetadata
          
          // Check if fallback was used in the backend
          if (crawlMetadata?.usedFallback) {
            setIsUsingFallback(true)
            fallbackType = 'CRAWL_FAILED'
            console.log('✅ Crawling completed with fallback:', info.name)
          } else {
            console.log('✅ Successfully crawled website with Crawl4AI:', info.name)
          }
          
        } catch (crawlError) {
          console.warn('Crawl4AI function failed, using smart fallback:', crawlError)
          setIsUsingFallback(true)
          
          // Determine fallback type based on error
          if (crawlError instanceof Error) {
            if (crawlError.message.includes('timeout')) {
              fallbackType = 'TIMEOUT'
            } else if (crawlError.message.includes('network')) {
              fallbackType = 'NETWORK_ERROR'
            } else {
              fallbackType = 'CRAWL_FAILED'
            }
          }
          
          // Use smart default that adapts to business type
          info = createSmartDefaultVoiceAgent(formattedUrl)
        }
      }
      
      // Set fallback message if using fallback
      if (isUsingFallback) {
        setFallbackMessage(FALLBACK_MESSAGES[fallbackType as keyof typeof FALLBACK_MESSAGES])
      }
      
      setBusinessInfo(info)
      
      // Generate AI configuration with crawl metadata for enhanced context
      const config = generateSonicNovaConfig(info, crawlMetadata)
      setAiConfig(config)
      
      // Save to Supabase (with fallback flag)
      try {
        const savedReceptionist = await saveAIReceptionist({
          websiteUrl: formattedUrl,
          businessInfo: info,
          aiConfig: config,
          isUsingFallback,
          fallbackType
        })
        
        if (savedReceptionist) {
          setReceptionistId(savedReceptionist.id!)
        }
      } catch (saveError) {
        console.warn('Failed to save to Supabase, continuing with local data:', saveError)
      }
      
      // Wait a bit to show analyzing animation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setCurrentStep('preview')
    } catch (error) {
      console.error('Error analyzing website:', error)
      // Still proceed to preview with fallback data
      setIsUsingFallback(true)
      setFallbackMessage(FALLBACK_MESSAGES.GENERIC)
      
      const fallbackInfo = createSmartDefaultVoiceAgent(websiteUrl)
      setBusinessInfo(fallbackInfo)
      setAiConfig(generateSonicNovaConfig(fallbackInfo))
      
      setCurrentStep('preview')
    } finally {
      setIsLoading(false)
    }
  }

  const startTestCall = async () => {
    if (!isNovaSonicSupported) {
      setVoiceStatus('Voice features not supported in this browser')
      return
    }

    try {
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
      
      // Initialize Nova Sonic client if not already done
      if (!novaSonicClient) {
        // Always use WebSocket client now that we'll deploy the server properly
        const wsClient = new NovaSonicClient()
        
        wsClient.onStatus((status) => {
          setVoiceStatus(status)
        })
        
        wsClient.onTranscript((message) => {
          setTranscript(prev => [...prev, message])
        })
        
        // Initialize session with business context
        const sessionConfig = NovaSonicClient.createFromBusinessConfig(aiConfig)
        await wsClient.initializeSession(sessionConfig)
        
        setNovaSonicClient(wsClient)
      }
      
      // Start call timer
      callTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1)
      }, 1000)
      
      setVoiceStatus('Ready to speak - click the microphone button')
      
    } catch (error) {
      console.error('Error starting voice call:', error)
      setVoiceStatus('Error starting voice session')
      setCallStatus('ended')
    }
  }
  
  const toggleRecording = async () => {
    if (!novaSonicClient) return
    
    if (isRecording) {
      // Stop recording
      if (novaSonicClient instanceof NovaSonicClient) {
        novaSonicClient.stopRecording()
      }
      setIsRecording(false)
    } else {
      // Start recording
      if (novaSonicClient instanceof NovaSonicClient) {
        novaSonicClient.startRecording()
        setIsRecording(true)
      }
    }
  }
  
  const endCall = () => {
    if (novaSonicClient) {
      novaSonicClient.disconnect()
      setNovaSonicClient(null)
    }
    
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current)
      callTimerRef.current = null
    }
    
    setIsRecording(false)
    setCallStatus('ended')
    setVoiceStatus('Call ended')
    
    // Save transcript
    if (receptionistId && transcript.length > 0) {
      saveDemoCallTranscript({
        receptionistId,
        transcript: transcript.map(t => `${t.role}: ${t.content}`),
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
                      placeholder="your-business.com (we'll format it automatically)"
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
                {isUsingFallback 
                  ? "Smart business assistant - ready to handle your calls professionally"
                  : "Trained on your business and ready to handle calls professionally"
                }
              </p>
              {isUsingFallback && fallbackMessage && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-blue-800 text-sm">{fallbackMessage}</p>
                  <p className="text-blue-600 text-sm mt-2 font-medium">
                    {FALLBACK_MESSAGES.SETUP_HELP}
                  </p>
                </div>
              )}
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
                          <p className="font-semibold">Live Voice Call with Nova Sonic</p>
                          <p className="text-sm text-gray-600">
                            {callStatus === 'calling' ? 'In Progress' : 'Ended'} • {callDuration}s
                          </p>
                        </div>
                      </div>
                      {callStatus === 'calling' && (
                        <div className="flex items-center space-x-4">
                          <Button
                            onClick={toggleRecording}
                            className={`p-3 rounded-full ${
                              isRecording 
                                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                                : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                          >
                            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                          </Button>
                          <Button
                            onClick={endCall}
                            variant="outline"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            End Call
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800 font-medium">Status: {voiceStatus}</p>
                      {!isNovaSonicSupported && (
                        <p className="text-sm text-red-600 mt-1">
                          Voice features require a modern browser with microphone support.
                        </p>
                      )}
                    </div>

                    <ScrollArea className="h-96 w-full rounded-lg border bg-gray-50 p-4">
                      <div className="space-y-4">
                        {transcript.map((message, idx) => {
                          const isAI = message.role === 'assistant'
                          return (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}
                            >
                              <div className={`max-w-[80%] p-3 rounded-lg ${
                                isAI 
                                  ? 'bg-white text-gray-800 shadow-sm border-l-4 border-blue-500' 
                                  : 'bg-blue-600 text-white'
                              }`}>
                                <p className="text-xs font-medium mb-1 opacity-75">
                                  {isAI ? 'AI Receptionist' : 'You'}
                                </p>
                                <p className="text-sm">{message.content}</p>
                              </div>
                            </motion.div>
                          )
                        })}
                        {transcript.length === 0 && callStatus === 'calling' && (
                          <div className="text-center text-gray-500 py-8">
                            <Mic className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p>Click the microphone button and start speaking...</p>
                          </div>
                        )}
                      </div>
                    </ScrollArea>

                    {callStatus === 'ended' && transcript.length > 0 && (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-green-800 font-medium mb-2">
                          ✅ Live voice call completed successfully!
                        </p>
                        <p className="text-sm text-green-700">
                          Your AI receptionist used real voice AI technology powered by Amazon Nova Sonic to have a natural conversation.
                        </p>
                      </div>
                    )}
                    
                    {callStatus === 'ended' && transcript.length === 0 && (
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <p className="text-yellow-800 font-medium mb-2">
                          No conversation detected
                        </p>
                        <p className="text-sm text-yellow-700">
                          The call ended without recording any conversation. Try starting a new call and speaking into your microphone.
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