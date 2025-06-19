// Sonic Nova AI Agent Configuration Generator
// This creates the knowledge base and prompts for the voice agent

import { BusinessInfo } from './website-crawler'

export interface SonicNovaConfig {
  agentName: string
  personality: string
  voiceSettings: {
    tone: 'professional' | 'friendly' | 'casual'
    speed: 'slow' | 'normal' | 'fast'
    gender: 'male' | 'female' | 'neutral'
  }
  knowledgeBase: {
    businessInfo: string
    services: string[]
    policies: string[]
    faqs: Array<{
      question: string
      answer: string
    }>
  }
  systemPrompt: string
  conversationStarters: string[]
  escalationRules: {
    keywords: string[]
    action: string
  }[]
}

export function generateSonicNovaConfig(businessInfo: BusinessInfo, crawlMetadata?: any): SonicNovaConfig {
  // Check if using Ring4 defaults
  const isRing4Default = crawlMetadata?.extractionMethod === 'ring4-defaults'
  
  // Adapt voice settings based on business type and crawled content
  const voiceSettings = determineOptimalVoiceSettings(businessInfo)
  
  // Generate enhanced knowledge base from crawled data
  const knowledgeBase = generateEnhancedKnowledgeBase(businessInfo, crawlMetadata)
  
  // Generate system prompt - use Ring4 comprehensive defaults if skipped
  let systemPrompt: string
  if (isRing4Default) {
    // Import and use the comprehensive Ring4 default prompt
    const { createRing4DefaultSystemPrompt } = require('./ring4-default-agent')
    systemPrompt = createRing4DefaultSystemPrompt()
  } else {
    systemPrompt = generateAdvancedSystemPrompt(businessInfo, crawlMetadata)
  }
  
  const config: SonicNovaConfig = {
    agentName: businessInfo.name.includes('Ring4') ? businessInfo.name : `${businessInfo.name} AI Receptionist`,
    personality: determinePersonality(businessInfo),
    voiceSettings,
    knowledgeBase,
    systemPrompt,
    conversationStarters: generateSmartConversationStarters(businessInfo),
    escalationRules: generateIntelligentEscalationRules(businessInfo)
  }
  
  return config
}

// Determine optimal voice settings based on business type
function determineOptimalVoiceSettings(info: BusinessInfo): SonicNovaConfig['voiceSettings'] {
  const services = info.services.join(' ').toLowerCase()
  
  // Legal/Professional services
  if (services.includes('law') || services.includes('legal') || services.includes('attorney')) {
    return { tone: 'professional', speed: 'normal', gender: 'neutral' }
  }
  
  // Medical/Healthcare
  if (services.includes('medical') || services.includes('doctor') || services.includes('health')) {
    return { tone: 'professional', speed: 'normal', gender: 'female' }
  }
  
  // Real Estate
  if (services.includes('real estate') || services.includes('realtor') || services.includes('property')) {
    return { tone: 'friendly', speed: 'normal', gender: 'neutral' }
  }
  
  // Creative/Design services
  if (services.includes('design') || services.includes('creative') || services.includes('marketing')) {
    return { tone: 'friendly', speed: 'normal', gender: 'neutral' }
  }
  
  // Default professional
  return { tone: 'professional', speed: 'normal', gender: 'neutral' }
}

// Determine personality based on business values and content
function determinePersonality(info: BusinessInfo): string {
  const values = info.values.join(' ').toLowerCase()
  const description = info.description.toLowerCase()
  
  if (values.includes('friendly') || values.includes('personal')) {
    return "warm and approachable, yet professional"
  }
  
  if (values.includes('excellence') || values.includes('premium')) {
    return "polished and sophisticated"
  }
  
  if (description.includes('family') || description.includes('community')) {
    return "caring and personable"
  }
  
  return "professional yet warm and helpful"
}

// Generate enhanced knowledge base with crawled context
function generateEnhancedKnowledgeBase(info: BusinessInfo, crawlMetadata?: any): SonicNovaConfig['knowledgeBase'] {
  return {
    businessInfo: generateAdvancedBusinessContext(info, crawlMetadata),
    services: enhanceServicesWithContext(info.services, info.description),
    policies: generateSmartPolicies(info),
    faqs: enhanceFAQsWithBusinessIntelligence(info.faqs, info)
  }
}

function generateAdvancedBusinessContext(info: BusinessInfo, crawlMetadata?: any): string {
  const context = `
Business Name: ${info.name}
Description: ${info.description}

Operating Hours:
${Object.entries(info.hours).map(([day, hours]) => `- ${day}: ${hours}`).join('\n')}

Contact Information:
- Phone: ${info.contact.phone || 'Available on website'}
- Email: ${info.contact.email || 'Available on website'}
- Address: ${info.contact.address || 'See website for location details'}

Services We Offer:
${info.services.map(s => `- ${s}`).join('\n')}

What Makes Us Special:
${info.specialties?.map(s => `- ${s}`).join('\n') || '- Professional service\n- Experienced team'}

Our Values & Approach:
${info.values?.map(v => `- ${v}`).join('\n') || '- Customer satisfaction\n- Integrity\n- Excellence'}

${crawlMetadata?.extractionMethod === 'crawl4ai' ? 
  `\nAdditional Context:\n- Website analyzed using advanced AI crawling\n- ${crawlMetadata.pagesProcessed || 1} pages of content processed` : 
  ''
}
  `.trim()
  
  return context
}

function enhanceServicesWithContext(services: string[], description: string): string[] {
  // If we have detailed services from crawling, use them
  if (services.length > 3) {
    return services
  }
  
  // Otherwise, infer additional services from description
  const additionalServices = []
  const desc = description.toLowerCase()
  
  if (desc.includes('consultation')) additionalServices.push('Professional consultations')
  if (desc.includes('appointment')) additionalServices.push('Appointment scheduling')
  if (desc.includes('support')) additionalServices.push('Customer support')
  if (desc.includes('estimate')) additionalServices.push('Free estimates')
  
  return [...services, ...additionalServices].slice(0, 10)
}

function generateAdvancedSystemPrompt(info: BusinessInfo, crawlMetadata?: any): string {
  const extractionQuality = crawlMetadata?.extractionMethod === 'crawl4ai' ? 'comprehensive' : 'basic'
  
  return `You are the AI receptionist for ${info.name}. Your role is to provide exceptional customer service that reflects our business values and expertise.

CORE RESPONSIBILITIES:
1. Answer calls professionally with our signature ${determinePersonality(info)} approach
2. Provide accurate information about our services, hours, and policies
3. Qualify leads and understand caller needs thoroughly
4. Schedule appointments or route calls appropriately
5. Handle common questions using our comprehensive knowledge base

CONVERSATION GUIDELINES:
- Always greet callers warmly and identify yourself as ${info.name}'s AI receptionist
- Listen actively and ask clarifying questions to better help
- Keep responses helpful but concise (aim for 1-2 sentences)
- Show genuine interest in solving the caller's problem
- Use natural, conversational language while maintaining professionalism

BUSINESS EXPERTISE:
You have ${extractionQuality} knowledge of our business including:
- All services we offer: ${info.services.slice(0, 3).join(', ')}${info.services.length > 3 ? ' and more' : ''}
- Our operating hours and availability
- Our approach: ${info.values.slice(0, 2).join(' and ')}
- Common customer questions and detailed answers

ESCALATION PROTOCOLS:
- For technical questions beyond your knowledge, offer to connect with a specialist
- For complaints, express empathy and ensure management follow-up
- For emergencies, determine urgency and route accordingly
- Always get caller contact info before transferring

Remember: Every interaction should make the caller feel valued and confident they've reached the right business for their needs.`
}

// Generate smart conversation starters based on business type
function generateSmartConversationStarters(info: BusinessInfo): string[] {
  const businessType = determineBusinessType(info)
  
  const starters = [
    `Thank you for calling ${info.name}! How can I help you today?`,
    `Good ${getTimeOfDay()}, you've reached ${info.name}. What can I assist you with?`
  ]
  
  // Add business-specific starters
  if (businessType === 'real-estate') {
    starters.push(`Welcome to ${info.name}! Are you looking to buy, sell, or have questions about a property?`)
  } else if (businessType === 'medical') {
    starters.push(`Hello, this is ${info.name}. Are you calling to schedule an appointment or do you have a medical question?`)
  } else if (businessType === 'legal') {
    starters.push(`You've reached ${info.name}. Are you calling for a consultation or do you have legal questions?`)
  } else {
    starters.push(`Hello! This is ${info.name}. Are you calling about our services or to schedule an appointment?`)
  }
  
  return starters
}

// Generate intelligent escalation rules based on business type and services
function generateIntelligentEscalationRules(info: BusinessInfo): SonicNovaConfig['escalationRules'] {
  const rules = [
    {
      keywords: ['emergency', 'urgent', 'immediately', 'right now', 'asap'],
      action: 'Determine urgency level and route to appropriate emergency contact or take detailed message for immediate callback'
    },
    {
      keywords: ['complaint', 'unhappy', 'problem', 'issue', 'dissatisfied', 'angry'],
      action: 'Express genuine empathy, acknowledge the concern, and ensure management receives detailed information for prompt follow-up'
    },
    {
      keywords: ['price', 'cost', 'quote', 'estimate', 'billing', 'payment'],
      action: 'Provide general pricing information if available, or schedule consultation for detailed estimate'
    }
  ]
  
  // Add service-specific escalation rules
  if (info.services.some(s => s.toLowerCase().includes('appointment'))) {
    rules.push({
      keywords: ['appointment', 'schedule', 'book', 'available', 'calendar'],
      action: 'Access scheduling system or take preferred times for scheduling callback'
    })
  }
  
  return rules
}

// Generate smart policies based on crawled business information
function generateSmartPolicies(info: BusinessInfo): string[] {
  const policies = [
    `We are open ${info.hours["Monday-Friday"] || "during business hours"}`,
    "We provide professional estimates for our services"
  ]
  
  // Add industry-specific policies
  const businessType = determineBusinessType(info)
  
  if (businessType === 'medical') {
    policies.push("We accept most major insurance plans")
    policies.push("24-hour cancellation notice required for appointments")
  } else if (businessType === 'legal') {
    policies.push("Initial consultations available")
    policies.push("All communications are confidential")
  } else if (businessType === 'real-estate') {
    policies.push("Free market analysis available")
    policies.push("Available for weekend showings")
  }
  
  if (info.services.some(s => s.toLowerCase().includes('emergency'))) {
    policies.push("Emergency services available 24/7")
  }
  
  policies.push("We stand behind our work with professional service guarantee")
  
  return policies
}

// Enhance FAQs with business intelligence
function enhanceFAQsWithBusinessIntelligence(faqs: Array<{question: string, answer: string}>, info: BusinessInfo): Array<{question: string, answer: string}> {
  const enhancedFaqs = [...faqs]
  
  // Add business-type specific FAQs if not already present
  const existingQuestions = faqs.map(faq => faq.question.toLowerCase())
  
  const businessType = determineBusinessType(info)
  
  if (businessType === 'real-estate' && !existingQuestions.some(q => q.includes('commission'))) {
    enhancedFaqs.push({
      question: "What is your commission rate?",
      answer: "Our commission rates are competitive and vary based on the type of service. I'd be happy to have one of our agents discuss our rates and services with you in detail."
    })
  }
  
  if (businessType === 'medical' && !existingQuestions.some(q => q.includes('insurance'))) {
    enhancedFaqs.push({
      question: "Do you accept my insurance?",
      answer: "We work with most major insurance providers. Please let me know your insurance carrier and I can verify coverage for you."
    })
  }
  
  if (!existingQuestions.some(q => q.includes('emergency'))) {
    enhancedFaqs.push({
      question: "Do you handle emergencies?",
      answer: info.services.some(s => s.toLowerCase().includes('emergency')) ?
        "Yes, we provide emergency services. Please let me know the nature of your emergency and I'll connect you with the appropriate person." :
        "For urgent matters, we can schedule priority appointments. Please describe your situation and I'll see how quickly we can help you."
    })
  }
  
  return enhancedFaqs
}

// Determine business type from services and description
function determineBusinessType(info: BusinessInfo): string {
  const content = (info.services.join(' ') + ' ' + info.description).toLowerCase()
  
  if (content.includes('real estate') || content.includes('realtor') || content.includes('property')) {
    return 'real-estate'
  }
  if (content.includes('medical') || content.includes('doctor') || content.includes('health')) {
    return 'medical'
  }
  if (content.includes('law') || content.includes('legal') || content.includes('attorney')) {
    return 'legal'
  }
  
  return 'general'
}


function getTimeOfDay(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'morning'
  if (hour < 17) return 'afternoon'
  return 'evening'
}

// Generate training examples for the AI
export function generateTrainingExamples(config: SonicNovaConfig): Array<{
  scenario: string
  customerQuery: string
  idealResponse: string
}> {
  return [
    {
      scenario: "Customer asking about business hours",
      customerQuery: "What time do you close today?",
      idealResponse: `We're open until ${extractClosingTime(config.knowledgeBase.businessInfo)}. Is there anything specific I can help you with today?`
    },
    {
      scenario: "Customer requesting service information",
      customerQuery: "Do you guys do emergency repairs?",
      idealResponse: config.knowledgeBase.services.some(s => s.toLowerCase().includes('emergency'))
        ? "Yes, we do offer emergency repair services! We have technicians available 24/7. Would you like me to connect you with our emergency team?"
        : "While we don't offer 24/7 emergency services, we can schedule priority appointments. What type of repair do you need?"
    },
    {
      scenario: "Customer asking for pricing",
      customerQuery: "How much do you charge for a consultation?",
      idealResponse: "We actually offer free consultations and estimates! I'd be happy to schedule one for you. What day works best for your schedule?"
    },
    {
      scenario: "Customer with a complaint",
      customerQuery: "I'm not happy with the service I received",
      idealResponse: "I'm really sorry to hear you've had a negative experience. Your satisfaction is very important to us. Let me take down your information and have our manager call you back as soon as possible to resolve this."
    }
  ]
}

function extractClosingTime(businessInfo: string): string {
  // Simple extraction - in production this would be more sophisticated
  const match = businessInfo.match(/(\d{1,2}:\d{2}\s*[AP]M)/g)
  return match && match.length > 1 ? match[1] : "6:00 PM"
}

// Export configuration as JSON for Sonic Nova
export function exportConfigAsJSON(config: SonicNovaConfig): string {
  return JSON.stringify(config, null, 2)
}

// Generate webhook configuration for real-time updates
export function generateWebhookConfig(businessId: string) {
  return {
    incomingCall: `/api/sonic-nova/incoming/${businessId}`,
    callCompleted: `/api/sonic-nova/completed/${businessId}`,
    transcriptUpdate: `/api/sonic-nova/transcript/${businessId}`,
    errorHandler: `/api/sonic-nova/error/${businessId}`
  }
}