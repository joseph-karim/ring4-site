import type { BusinessInfo } from './website-crawler'

/**
 * URL formatting and validation utilities
 */
export function formatUrl(input: string): string {
  if (!input) return ''
  
  let url = input.trim()
  
  // Remove common prefixes that users might type
  url = url.replace(/^(https?:\/\/)?(www\.)?/, '')
  
  // Remove trailing slashes and paths for cleaner domain extraction
  url = url.split('/')[0]
  
  // Add https:// prefix
  url = `https://www.${url}`
  
  return url
}

export function validateUrl(url: string): boolean {
  try {
    const parsed = new URL(formatUrl(url))
    return parsed.protocol === 'https:' && parsed.hostname.includes('.')
  } catch {
    return false
  }
}

/**
 * Extract business name from URL for fallback scenarios
 */
export function extractBusinessNameFromUrl(url: string): string {
  try {
    const parsed = new URL(formatUrl(url))
    const hostname = parsed.hostname.replace(/^www\./, '')
    const domain = hostname.split('.')[0]
    
    // Convert domain to business name (capitalize first letter)
    return domain.charAt(0).toUpperCase() + domain.slice(1)
  } catch {
    return 'Your Business'
  }
}

/**
 * Default voice agent configuration for when webcrawling fails
 * This provides a professional, adaptable AI receptionist that can handle any business type
 */
export function createDefaultVoiceAgent(websiteUrl: string): BusinessInfo {
  const businessName = extractBusinessNameFromUrl(websiteUrl)
  
  return {
    name: businessName,
    description: `${businessName} is a professional business committed to providing excellent service to our customers. We pride ourselves on quality work, reliable communication, and customer satisfaction.`,
    services: [
      "Customer service and support",
      "Information and consultations", 
      "Appointment scheduling",
      "General inquiries",
      "Service bookings",
      "Follow-up support"
    ],
    hours: {
      "Monday-Friday": "9:00 AM - 6:00 PM",
      "Saturday": "10:00 AM - 4:00 PM", 
      "Sunday": "Closed"
    },
    contact: {
      phone: "Business phone number",
      email: "Business email address",
      address: "Business location"
    },
    specialties: [
      "Professional service delivery",
      "Customer-focused approach", 
      "Timely responses",
      "Quality workmanship",
      "Reliable communication"
    ],
    values: [
      "Customer satisfaction",
      "Professional excellence",
      "Honest communication",
      "Reliable service",
      "Continuous improvement"
    ],
    faqs: [
      {
        question: "What are your business hours?",
        answer: "We're open Monday through Friday from 9 AM to 6 PM, and Saturdays from 10 AM to 4 PM. We're closed on Sundays."
      },
      {
        question: "How can I schedule an appointment?",
        answer: "You can schedule an appointment by calling us directly, and we'll find a time that works best for you. We typically respond within a few hours during business hours."
      },
      {
        question: "Do you offer emergency services?",
        answer: "For urgent matters, please call us directly. While we may not offer 24/7 emergency services, we do our best to accommodate urgent requests when possible."
      },
      {
        question: "What services do you provide?",
        answer: "We provide professional services tailored to our customers' needs. Please call us to discuss your specific requirements and how we can help you."
      },
      {
        question: "How quickly do you respond to inquiries?",
        answer: "We typically respond to inquiries within a few hours during business hours. For urgent matters, please call us directly for the fastest response."
      },
      {
        question: "What makes your business different?",
        answer: "We focus on delivering quality service with a personal touch. Our commitment to customer satisfaction and professional excellence sets us apart."
      }
    ]
  }
}

/**
 * Enhanced voice agent with industry-specific adaptations
 * This function attempts to detect business type from URL and customize accordingly
 */
export function createSmartDefaultVoiceAgent(websiteUrl: string): BusinessInfo {
  const domain = websiteUrl.toLowerCase()
  
  // Detect potential business type from domain/URL
  let businessType = 'general'
  let customServices: string[] = []
  let customFaqs: Array<{question: string, answer: string}> = []
  
  if (domain.includes('real') || domain.includes('estate') || domain.includes('property')) {
    businessType = 'real-estate'
    customServices = [
      "Property listings and showings",
      "Buyer and seller representation", 
      "Market analysis and pricing",
      "Property consultations",
      "Investment property guidance"
    ]
    customFaqs = [
      {
        question: "Are you available for property showings?",
        answer: "Yes! I can help schedule property showings and connect you with our agent. What type of property are you looking for?"
      },
      {
        question: "What areas do you serve?",
        answer: "We serve the local market area. I can provide specific information about neighborhoods and current listings when you call."
      }
    ]
  } else if (domain.includes('law') || domain.includes('legal') || domain.includes('attorney')) {
    businessType = 'legal'
    customServices = [
      "Legal consultations",
      "Case evaluations", 
      "Legal representation",
      "Document preparation",
      "Legal advice and guidance"
    ]
    customFaqs = [
      {
        question: "Do you offer free consultations?",
        answer: "I can help you schedule a consultation to discuss your legal needs. Our attorney will review your case and explain our services."
      }
    ]
  } else if (domain.includes('medical') || domain.includes('doctor') || domain.includes('health')) {
    businessType = 'medical'
    customServices = [
      "Medical consultations",
      "Appointment scheduling",
      "Patient services",
      "Health assessments", 
      "Follow-up care"
    ]
    customFaqs = [
      {
        question: "How do I schedule an appointment?",
        answer: "I can help you schedule an appointment. What type of appointment are you looking to schedule?"
      }
    ]
  }
  
  const baseConfig = createDefaultVoiceAgent(websiteUrl)
  
  return {
    ...baseConfig,
    services: customServices.length > 0 ? [...customServices, ...baseConfig.services.slice(2)] : baseConfig.services,
    faqs: customFaqs.length > 0 ? [...customFaqs, ...baseConfig.faqs.slice(2)] : baseConfig.faqs,
    specialties: [
      ...baseConfig.specialties,
      ...(businessType === 'real-estate' ? ['Local market expertise', 'Property valuations'] : []),
      ...(businessType === 'legal' ? ['Legal expertise', 'Case management'] : []),
      ...(businessType === 'medical' ? ['Patient care', 'Medical expertise'] : [])
    ]
  }
}

/**
 * Fallback error messages for different failure scenarios
 */
export const FALLBACK_MESSAGES = {
  NETWORK_ERROR: "⚠️ I'm having trouble accessing your website right now, so I've created a general AI receptionist. A Ring4 specialist can help you set up a customized knowledge base from your website content.",
  INVALID_URL: "⚠️ The website URL seems to have an issue. I've created a general business AI receptionist. A Ring4 specialist can help you properly configure it with your specific business information.",
  CRAWL_FAILED: "⚠️ I couldn't analyze your website content automatically. I've set up a smart AI receptionist, but a Ring4 specialist can help customize it with your specific services and information.",
  TIMEOUT: "⚠️ Your website took too long to analyze. I've created a professional AI receptionist that's ready to use, and a Ring4 specialist can help optimize it with your website content.",
  GENERIC: "⚠️ I've created a general AI receptionist that works for any business. A Ring4 specialist can help you customize it with your specific business information and knowledge base.",
  
  SETUP_HELP: "📞 A Ring4 specialist will contact you during setup to help customize your AI receptionist with your specific business information, ensuring it represents your company perfectly."
}