import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import TallyModal from './TallyModal'
import { Badge } from './ui/badge'
import { ScrollArea } from './ui/scroll-area'
import { Progress } from './ui/progress'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { 
  Phone, 
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
import { createSmartDefaultVoiceAgent } from '../lib/default-voice-agent'
import { DeepgramVoiceClient, TranscriptMessage, isVoiceAgentSupported } from '../lib/deepgram-voice-client'
import BusinessInfoEditor from './BusinessInfoEditor'

type WizardStep = 'intro' | 'website' | 'analyzing' | 'edit' | 'preview' | 'test-call' | 'claim'

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
  const [deepgramClient, setDeepgramClient] = useState<DeepgramVoiceClient | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [voiceStatus, setVoiceStatus] = useState<string>('Initializing...')
  const [isVoiceSupported, setIsVoiceSupported] = useState(false)
  const callTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Progress calculation
  const stepOrder: WizardStep[] = ['intro', 'website', 'analyzing', 'edit', 'preview', 'test-call', 'claim']
  const currentStepIndex = stepOrder.indexOf(currentStep)
  const progress = ((currentStepIndex + 1) / stepOrder.length) * 100

  // Check voice support on component mount
  useEffect(() => {
    setIsVoiceSupported(isVoiceAgentSupported())
  }, [])

  // Cleanup Deepgram client on unmount
  useEffect(() => {
    return () => {
      if (deepgramClient) {
        deepgramClient.disconnect()
      }
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current)
      }
    }
  }, [deepgramClient])

  const handleAnalyzeWebsite = async () => {
    if (!websiteUrl) return
    
    setCurrentStep('analyzing')
    setIsLoading(true)
    
    try {
      let info: BusinessInfo
      let crawlMetadata: any = null
      
      console.log('🎯 Creating industry-specific AI configuration for:', websiteUrl)
      setIsUsingFallback(false) // Using professional industry templates
      
      // Import the industry-specific agent configuration
      const { createIndustrySpecificAgent } = await import('../lib/industry-specific-agent')
      info = createIndustrySpecificAgent(websiteUrl)
      crawlMetadata = {
        industry: websiteUrl,
        extractionMethod: 'industry-template'
      }
      
      setBusinessInfo(info)
      
      // Generate AI configuration with industry metadata
      const config = generateSonicNovaConfig(info, crawlMetadata)
      setAiConfig(config)
      
      // Save to Supabase
      try {
        const savedReceptionist = await saveAIReceptionist({
          websiteUrl: `industry-${websiteUrl}`,
          businessInfo: info,
          aiConfig: config,
          isUsingFallback: false,
          fallbackType: undefined
        })
        
        if (savedReceptionist) {
          setReceptionistId(savedReceptionist.id!)
        }
      } catch (saveError) {
        console.warn('Failed to save to Supabase, continuing with local data:', saveError)
      }
      
      // Wait a bit to show analyzing animation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Go to edit step to allow customization of industry defaults
      setCurrentStep('edit')
    } catch (error) {
      console.error('Error creating industry configuration:', error)
      // Still proceed to preview with fallback data
      setIsUsingFallback(true)
      
      const fallbackInfo = createSmartDefaultVoiceAgent('business')
      setBusinessInfo(fallbackInfo)
      setAiConfig(generateSonicNovaConfig(fallbackInfo))
      
      setCurrentStep('preview')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveBusinessInfo = async (updatedInfo: BusinessInfo) => {
    setBusinessInfo(updatedInfo)
    
    // Regenerate AI configuration with updated info
    const config = generateSonicNovaConfig(updatedInfo)
    setAiConfig(config)
    
    // Update in Supabase if we have a receptionist ID
    if (receptionistId) {
      try {
        await saveAIReceptionist({
          websiteUrl: websiteUrl === 'skip' ? 'https://ring4.com' : websiteUrl,
          businessInfo: updatedInfo,
          aiConfig: config,
          isUsingFallback,
          fallbackType: isUsingFallback ? 'MANUAL_EDIT' : undefined
        })
      } catch (saveError) {
        console.warn('Failed to update in Supabase:', saveError)
      }
    }
    
    setCurrentStep('preview')
  }

  const startTestCall = async () => {
    if (!isVoiceSupported) {
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
      
      // Initialize Deepgram client if not already done
      if (!deepgramClient) {
        const client = new DeepgramVoiceClient()
        
        client.onStatus((status) => {
          setVoiceStatus(status)
        })
        
        client.onTranscript((message) => {
          setTranscript(prev => [...prev, message])
        })
        
        // Initialize session with full AI configuration from wizard
        const systemPrompt = aiConfig?.systemPrompt || `You are an AI receptionist for ${businessInfo?.name || 'this business'}. IMMEDIATELY greet callers when the call connects. Start with: "Thank you for calling ${businessInfo?.name || 'us'}, I am an AI receptionist, how can I help you today?" Be professional, friendly, and helpful.`
        
        // Use appropriate voice for the industry (users don't choose this)
        let voiceId = 'aura-2-asteria-en' // Professional female voice - works for all industries
        
        await client.initializeSession({
          systemPrompt,
          voiceId,
          businessInfo: {
            ...businessInfo,
            personality: aiConfig?.personality,
            knowledgeBase: aiConfig?.knowledgeBase,
            agentName: aiConfig?.agentName,
            conversationStarters: aiConfig?.conversationStarters,
            escalationRules: aiConfig?.escalationRules
          },
          greeting: `Thank you for calling ${businessInfo?.name || 'us'}, I am an AI receptionist, how can I help you today?`
        })
        
        setDeepgramClient(client)
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
    if (!deepgramClient) return
    
    if (isRecording) {
      // Stop recording
      deepgramClient.stopRecording()
      setIsRecording(false)
    } else {
      // Start recording
      deepgramClient.startRecording()
      setIsRecording(true)
    }
  }
  
  const endCall = () => {
    if (deepgramClient) {
      deepgramClient.disconnect()
      setDeepgramClient(null)
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
              <h2 className="text-3xl font-bold">Pick Your Industry</h2>
              <p className="text-gray-600">
                Select your industry to customize your AI receptionist with the right knowledge and tone
              </p>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setWebsiteUrl('real-estate');
                        handleAnalyzeWebsite();
                      }}
                      className="h-16 flex flex-col items-center justify-center"
                    >
                      <span className="font-medium">Real Estate</span>
                      <span className="text-xs text-gray-500">Agents & Brokers</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setWebsiteUrl('legal');
                        handleAnalyzeWebsite();
                      }}
                      className="h-16 flex flex-col items-center justify-center"
                    >
                      <span className="font-medium">Legal</span>
                      <span className="text-xs text-gray-500">Law Firms & Attorneys</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setWebsiteUrl('medical');
                        handleAnalyzeWebsite();
                      }}
                      className="h-16 flex flex-col items-center justify-center"
                    >
                      <span className="font-medium">Medical</span>
                      <span className="text-xs text-gray-500">Healthcare & Clinics</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setWebsiteUrl('business');
                        handleAnalyzeWebsite();
                      }}
                      className="h-16 flex flex-col items-center justify-center"
                    >
                      <span className="font-medium">Business</span>
                      <span className="text-xs text-gray-500">General Services</span>
                    </Button>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Professional Setup:</strong> We'll configure your AI with industry-specific 
                      knowledge, appropriate tone, and relevant conversation starters.
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

      case 'edit':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto"
          >
            {businessInfo && (
              <BusinessInfoEditor
                businessInfo={businessInfo}
                onChange={setBusinessInfo}
                onSave={() => handleSaveBusinessInfo(businessInfo)}
                onCancel={() => setCurrentStep('preview')}
              />
            )}
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
                Professional AI receptionist set up for your {websiteUrl === 'business' ? 'business' : websiteUrl.replace('-', ' ')} with industry-specific knowledge and tone
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <p className="text-green-800 text-sm font-medium">
                  ✨ Ready to Handle Your Calls
                </p>
                <p className="text-green-600 text-sm mt-1">
                  Your AI knows your services, hours, and common questions. It will sound professional 
                  and guide callers toward scheduling or getting the help they need.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* AI Overview Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Your AI Receptionist
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">Business</p>
                    <p className="text-gray-600">{businessInfo?.name || 'Your Business'}</p>
                  </div>
                  <div>
                    <p className="font-medium">Industry</p>
                    <p className="text-gray-600 capitalize">{websiteUrl === 'business' ? 'General Business' : websiteUrl.replace('-', ' ')}</p>
                  </div>
                  <div>
                    <p className="font-medium">Personality</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Badge variant="secondary">Professional</Badge>
                      <Badge variant="secondary">Helpful</Badge>
                      <Badge variant="secondary">Knowledgeable</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* What Your AI Knows */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    What Your AI Knows
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="hours">
                      <AccordionTrigger>Your Hours</AccordionTrigger>
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
                      <AccordionTrigger>Your Services</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {businessInfo?.services.map((service, idx) => (
                            <li key={idx}>{service}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="knowledge">
                      <AccordionTrigger>Your Knowledgebase</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 text-sm">
                          {businessInfo?.faqs.slice(0, 3).map((faq, idx) => (
                            <div key={idx} className="border-l-2 border-blue-200 pl-3">
                              <p className="font-medium">{faq.question}</p>
                              <p className="text-gray-600">{faq.answer}</p>
                            </div>
                          ))}
                          {businessInfo?.faqs && businessInfo.faqs.length > 3 && (
                            <p className="text-gray-500 italic">...and {businessInfo.faqs.length - 3} more questions</p>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            {/* Sample Conversations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  How Your AI Will Sound
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiConfig?.conversationStarters.slice(0, 3).map((starter: string, idx: number) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Example greeting:</p>
                      <p className="italic">"{starter}"</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep('edit')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Customize
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
                          <p className="font-semibold">Live Voice Call</p>
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
                      {!isVoiceSupported && (
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
                          Your Ring4 AI receptionist had a natural voice conversation just like a real person would.
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
              <TallyModal
                buttonText="Claim Your AI Receptionist Now"
                buttonClassName="w-full max-w-md h-11 px-8 py-2 text-base font-medium rounded-md bg-green-600 hover:bg-green-700 text-white inline-flex items-center justify-center gap-2"
                modalOptions={{
                  width: 500,
                  overlay: true
                }}
                hiddenFields={{
                  config: btoa(JSON.stringify({
                    websiteUrl,
                    businessInfo,
                    aiConfig,
                    receptionistId
                  }))
                }}
              />
              
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