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

export function generateSonicNovaConfig(businessInfo: BusinessInfo): SonicNovaConfig {
  const config: SonicNovaConfig = {
    agentName: `${businessInfo.name} Virtual Receptionist`,
    personality: "professional yet warm",
    voiceSettings: {
      tone: 'professional',
      speed: 'normal',
      gender: 'neutral'
    },
    knowledgeBase: {
      businessInfo: generateBusinessContext(businessInfo),
      services: businessInfo.services,
      policies: generatePolicies(businessInfo),
      faqs: businessInfo.faqs
    },
    systemPrompt: generateSystemPrompt(businessInfo),
    conversationStarters: generateConversationStarters(businessInfo),
    escalationRules: generateEscalationRules(businessInfo)
  }
  
  return config
}

function generateBusinessContext(info: BusinessInfo): string {
  return `
Business Name: ${info.name}
Description: ${info.description}

Operating Hours:
${Object.entries(info.hours).map(([day, hours]) => `- ${day}: ${hours}`).join('\n')}

Contact Information:
- Phone: ${info.contact.phone || 'Not available'}
- Email: ${info.contact.email || 'Not available'}
- Address: ${info.contact.address || 'Not available'}

What Makes Us Special:
${info.specialties?.map(s => `- ${s}`).join('\n') || '- Professional service\n- Experienced team'}

Our Values:
${info.values?.map(v => `- ${v}`).join('\n') || '- Customer satisfaction\n- Integrity\n- Excellence'}
  `.trim()
}

function generateSystemPrompt(info: BusinessInfo): string {
  return `You are a virtual receptionist for ${info.name}. Your role is to:

1. Answer incoming calls professionally and warmly
2. Provide accurate information about our services and business hours
3. Help callers understand what we offer and how we can help them
4. Schedule appointments or take messages when appropriate
5. Handle common questions based on our FAQ

Key behaviors:
- Always be helpful and patient
- If you don't know something, offer to take a message for someone who can help
- Keep responses concise but informative
- Show genuine interest in helping the caller
- Maintain a ${info.values.includes('professional') ? 'professional' : 'friendly'} tone throughout

Remember: You represent ${info.name}, and every interaction should reflect our commitment to ${info.values[0]?.toLowerCase() || 'excellent service'}.`
}

function generatePolicies(info: BusinessInfo): string[] {
  const policies = [
    `We are open ${info.hours["Monday-Friday"] || "during business hours"}`,
    "We provide free estimates for all services",
    "We stand behind our work with a satisfaction guarantee"
  ]
  
  if (info.services.some(s => s.toLowerCase().includes('emergency'))) {
    policies.push("24/7 emergency services available")
  }
  
  if (info.specialties.some(s => s.toLowerCase().includes('licensed'))) {
    policies.push("All work performed by licensed professionals")
  }
  
  return policies
}

function generateConversationStarters(info: BusinessInfo): string[] {
  return [
    `Thank you for calling ${info.name}! How can I help you today?`,
    `Good ${getTimeOfDay()}, you've reached ${info.name}. What can I assist you with?`,
    `Hello! This is ${info.name}. How may I help you?`,
    `Welcome to ${info.name}! Are you calling about our services or to schedule an appointment?`
  ]
}

function generateEscalationRules(_info: BusinessInfo): SonicNovaConfig['escalationRules'] {
  return [
    {
      keywords: ['emergency', 'urgent', 'immediately', 'right now'],
      action: 'Transfer to emergency line or take detailed message'
    },
    {
      keywords: ['complaint', 'unhappy', 'problem', 'issue'],
      action: 'Express empathy and offer to have a manager call back'
    },
    {
      keywords: ['price', 'cost', 'quote', 'estimate'],
      action: 'Provide general pricing if available, or schedule estimate'
    },
    {
      keywords: ['appointment', 'schedule', 'book', 'available'],
      action: 'Check availability and offer scheduling options'
    }
  ]
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