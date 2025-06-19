import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { ScrollArea } from './ui/scroll-area'
import TallyModal from './TallyModal'
import { 
  Phone, 
  Mic, 
  Globe, 
  Sparkles, 
  CheckCircle,
  ArrowRight,
  Building,
  Clock,
  MessageSquare,
  Brain,
  FileText,
  Settings
} from 'lucide-react'
import { BusinessInfo } from '../lib/website-crawler'
import { generateSonicNovaConfig, generateTrainingExamples, exportConfigAsJSON } from '../lib/sonic-nova-config'
import { saveAIReceptionist, saveDemoCallTranscript } from '../lib/ai-receptionist-storage'
import { supabase } from '../lib/supabase'

export default function ClaimReceptionistPage() {
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showDemo, setShowDemo] = useState(false)
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null)
  const [aiConfig, setAiConfig] = useState<any>(null)
  const [receptionistId, setReceptionistId] = useState<string | null>(null)
  
  const handleStartDemo = async () => {
    if (!websiteUrl) return
    
    setIsAnalyzing(true)
    
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
      
      setShowDemo(true)
    } catch (error) {
      console.error('Error analyzing website:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Claim Your AI Receptionist in 60 Seconds
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Watch as we create a personalized voice agent that knows your business, 
              answers like your best employee, and never misses a call.
            </p>
          </motion.div>

          {/* Demo Flow */}
          <div className="max-w-4xl mx-auto">
            {!showDemo ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl">Let's personalize your AI receptionist</CardTitle>
                    <CardDescription className="text-lg">
                      Enter your website URL and we'll instantly train your AI on your business
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          type="url"
                          placeholder="https://yourbusiness.com"
                          value={websiteUrl}
                          onChange={(e) => setWebsiteUrl(e.target.value)}
                          className="pl-10 h-14 text-lg"
                          disabled={isAnalyzing}
                        />
                      </div>

                      <Button 
                        onClick={handleStartDemo}
                        disabled={!websiteUrl || isAnalyzing}
                        size="lg"
                        className="w-full h-14 text-lg bg-[#0055FF] hover:bg-[#003399]"
                      >
                        {isAnalyzing ? (
                          <>
                            <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
                            Analyzing Your Business...
                          </>
                        ) : (
                          <>
                            Create My AI Receptionist
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>

                      {/* What happens next */}
                      <div className="border-t pt-6">
                        <h3 className="font-semibold mb-4">Here's what happens next:</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <span className="text-gray-700">We'll scan your website to understand your business</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <span className="text-gray-700">Your AI learns your services, hours, and unique value</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <span className="text-gray-700">Test it live with a real phone call</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <DemoExperience 
                  websiteUrl={websiteUrl} 
                  businessInfo={businessInfo}
                  aiConfig={aiConfig}
                  receptionistId={receptionistId}
                />
              </motion.div>
            )}
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>Setup in 60 seconds</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>Works with your existing number</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                <span>24/7 availability</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

// Demo Experience Component
function DemoExperience({ 
  websiteUrl, 
  businessInfo,
  aiConfig,
  receptionistId 
}: { 
  websiteUrl: string
  businessInfo: BusinessInfo | null
  aiConfig: any
  receptionistId: string | null
}) {
  const [callStatus, setCallStatus] = useState<'ready' | 'calling' | 'connected' | 'ended'>('ready')
  const [transcript, setTranscript] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState('demo')
  const [trainingExamples, setTrainingExamples] = useState<any[]>([])
  
  useEffect(() => {
    if (aiConfig) {
      const examples = generateTrainingExamples(aiConfig)
      setTrainingExamples(examples)
    }
  }, [aiConfig])

  const handleTestCall = () => {
    setCallStatus('calling')
    
    // Simulate call connection
    setTimeout(() => {
      setCallStatus('connected')
      
      // Generate dynamic conversation based on business info
      const messages = businessInfo ? [
        `AI: Thank you for calling ${businessInfo.name}! How can I help you today?`,
        "Caller: What are your business hours?",
        `AI: ${businessInfo.hours["Monday-Friday"] ? `We're open Monday through Friday ${businessInfo.hours["Monday-Friday"]}` : "We're open Monday through Friday from 9 AM to 6 PM"}, and ${businessInfo.hours["Saturday"] || "Saturdays from 10 AM to 4 PM"}. Is there anything else I can help you with?`,
        "Caller: Do you offer emergency services?",
        businessInfo.services.some(s => s.toLowerCase().includes('emergency')) 
          ? "AI: Yes, we do offer 24/7 emergency services. For urgent matters outside business hours, we have an on-call team ready to assist you."
          : "AI: While we don't offer 24/7 emergency services, we can schedule priority appointments for urgent matters. Would you like me to help you with that?"
      ] : [
        "AI: Thank you for calling! How can I help you today?",
        "Caller: What are your business hours?",
        "AI: We're open Monday through Friday from 9 AM to 6 PM, and Saturdays from 10 AM to 4 PM. Is there anything else I can help you with?",
        "Caller: Do you offer emergency services?",
        "AI: Yes, we do offer 24/7 emergency services. For urgent matters outside business hours, we have an on-call team ready to assist you."
      ]
      
      messages.forEach((msg, index) => {
        setTimeout(() => {
          setTranscript(prev => [...prev, msg])
        }, index * 2000)
      })
      
      setTimeout(async () => {
        setCallStatus('ended')
        
        // Save call transcript to Supabase
        if (receptionistId && transcript.length > 0) {
          await saveDemoCallTranscript({
            receptionistId,
            transcript,
            duration: messages.length * 2
          })
        }
      }, messages.length * 2000)
    }, 2000)
  }


  return (
    <div className="space-y-8">
      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-50 border border-green-200 rounded-lg p-6"
      >
        <div className="flex items-center space-x-3">
          <CheckCircle className="h-8 w-8 text-green-500" />
          <div>
            <h3 className="font-semibold text-green-900">Your AI Receptionist is Ready!</h3>
            <p className="text-green-700">We've analyzed {websiteUrl} and trained your AI assistant</p>
          </div>
        </div>
      </motion.div>

      {/* Tabbed Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="demo">Test Call</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          <TabsTrigger value="config">AI Configuration</TabsTrigger>
        </TabsList>
        
        {/* Demo Tab */}
        <TabsContent value="demo">
          <Card>
            <CardHeader>
              <CardTitle>Test Your AI Receptionist</CardTitle>
              <CardDescription>
                Click below to simulate a customer call and see how your AI handles it
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Call Button */}
                <div className="text-center">
                  {callStatus === 'ready' && (
                    <Button
                      onClick={handleTestCall}
                      size="lg"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      Start Test Call
                    </Button>
                  )}
                  
                  {callStatus === 'calling' && (
                    <div className="flex items-center justify-center space-x-3">
                      <Phone className="h-6 w-6 text-blue-500 animate-pulse" />
                      <span className="text-lg">Connecting...</span>
                    </div>
                  )}
                  
                  {callStatus === 'connected' && (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-lg font-semibold">Call Connected</span>
                      <Mic className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </div>

                {/* Transcript */}
                {transcript.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2 max-h-64 overflow-y-auto">
                    {transcript.map((line, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`p-2 rounded ${
                          line.startsWith('AI:') 
                            ? 'bg-blue-100 text-blue-900' 
                            : 'bg-gray-200 text-gray-900'
                        }`}
                      >
                        {line}
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* CTA */}
                {callStatus === 'ended' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                  >
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h3 className="font-semibold text-lg mb-2">Ready to go live?</h3>
                      <p className="text-gray-700 mb-4">
                        Your AI receptionist can start taking real calls in minutes
                      </p>
                      <TallyModal
                        buttonText="Claim Your AI Receptionist"
                        buttonClassName="h-11 px-8 py-2 text-base font-medium rounded-md bg-[#0055FF] hover:bg-[#003399] text-white inline-flex items-center justify-center gap-2"
                        modalOptions={{
                          width: 500,
                          overlay: true
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Knowledge Base Tab */}
        <TabsContent value="knowledge">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Knowledge Base
              </CardTitle>
              <CardDescription>
                Information your AI assistant has learned about {businessInfo?.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                {businessInfo && (
                  <div className="space-y-6">
                    {/* Business Overview */}
                    <div>
                      <h3 className="font-semibold mb-2">Business Overview</h3>
                      <p className="text-sm text-gray-600">{businessInfo.description}</p>
                    </div>
                    
                    {/* Services */}
                    <div>
                      <h3 className="font-semibold mb-2">Services Offered</h3>
                      <div className="space-y-1">
                        {businessInfo.services.map((service, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Hours */}
                    <div>
                      <h3 className="font-semibold mb-2">Business Hours</h3>
                      <div className="space-y-1">
                        {Object.entries(businessInfo.hours).map(([day, hours]) => (
                          <div key={day} className="flex justify-between text-sm">
                            <span className="font-medium">{day}:</span>
                            <span className="text-gray-600">{hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* FAQs */}
                    <div>
                      <h3 className="font-semibold mb-2">Frequently Asked Questions</h3>
                      <div className="space-y-3">
                        {businessInfo.faqs.map((faq, idx) => (
                          <div key={idx} className="space-y-1">
                            <p className="text-sm font-medium">{faq.question}</p>
                            <p className="text-sm text-gray-600">{faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Configuration Tab */}
        <TabsContent value="config">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                AI Configuration
              </CardTitle>
              <CardDescription>
                Voice settings and conversation examples
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Voice Settings */}
                <div>
                  <h3 className="font-semibold mb-3">Voice Settings</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Tone</p>
                      <Badge variant="secondary">{aiConfig?.voiceSettings?.tone || 'Professional'}</Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Speed</p>
                      <Badge variant="secondary">{aiConfig?.voiceSettings?.speed || 'Normal'}</Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Gender</p>
                      <Badge variant="secondary">{aiConfig?.voiceSettings?.gender || 'Neutral'}</Badge>
                    </div>
                  </div>
                </div>
                
                {/* Training Examples */}
                <div>
                  <h3 className="font-semibold mb-3">Training Examples</h3>
                  <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                    <div className="space-y-4">
                      {trainingExamples.map((example, idx) => (
                        <div key={idx} className="space-y-2 pb-4 border-b last:border-0">
                          <p className="text-sm font-medium text-blue-600">{example.scenario}</p>
                          <div className="pl-4 space-y-1">
                            <p className="text-sm"><span className="font-medium">Customer:</span> "{example.customerQuery}"</p>
                            <p className="text-sm"><span className="font-medium">AI Response:</span> "{example.idealResponse}"</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                
                {/* Export Config */}
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      const configJson = exportConfigAsJSON(aiConfig)
                      console.log('AI Configuration:', configJson)
                      // In production, this would download or save the config
                    }}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Export Configuration
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Features Learned */}
      <Card>
        <CardHeader>
          <CardTitle>What Your AI Learned</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3">
              <Building className="h-5 w-5 text-blue-500 mt-1" />
              <div>
                <h4 className="font-semibold">Your Business</h4>
                <p className="text-sm text-gray-600">Services, specialties, and unique value</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-blue-500 mt-1" />
              <div>
                <h4 className="font-semibold">Operating Hours</h4>
                <p className="text-sm text-gray-600">When you're open and availability</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MessageSquare className="h-5 w-5 text-blue-500 mt-1" />
              <div>
                <h4 className="font-semibold">Your Tone</h4>
                <p className="text-sm text-gray-600">Professional, friendly communication style</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}