// SEO utility functions for programmatic page generation

export interface SEOPageData {
  slug: string
  bucket: string
  templateType: string
  metaTitle: string
  metaDescription: string
  h1Text: string
  structuredData?: any
  contentBlocks?: any
  ctaConfig?: any
  internalLinks?: any
}

export interface LocationPageData {
  city: string
  state: string
  areaCode: string
  population?: number
  businessDensityScore?: number
  pickupRateIndex?: number
}

export interface CompetitorPageData {
  competitorName: string
  painPoints: string[]
  reviews: Array<{
    platform: string
    rating: number
    text: string
    reviewerRole?: string
  }>
}

export interface IndustryPageData {
  vertical: string
  personaName: string
  topPainPoints: string[]
  smsUseCases: string[]
  phoneUseCases: string[]
  avgCallVolume?: number
}

// Generate meta title (60 chars max)
export function generateMetaTitle(template: string, data: Record<string, any>): string {
  let title = template
  Object.entries(data).forEach(([key, value]) => {
    title = title.replace(`{{${key}}}`, String(value))
  })
  
  // Truncate if too long
  if (title.length > 60) {
    title = title.substring(0, 57) + '...'
  }
  
  return title
}

// Generate meta description (155 chars max)
export function generateMetaDescription(template: string, data: Record<string, any>): string {
  let description = template
  Object.entries(data).forEach(([key, value]) => {
    description = description.replace(`{{${key}}}`, String(value))
  })
  
  // Truncate if too long
  if (description.length > 155) {
    description = description.substring(0, 152) + '...'
  }
  
  return description
}

// Generate slug from text
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Meta title templates by page type
export const metaTitleTemplates = {
  'spam-fix': '{{action}} "Spam Likely" Caller ID - {{solution}} | Ring4',
  'location': 'Get a {{city}} {{areaCode}} Business Phone Number | Local {{state}} Number | Ring4',
  'comparison': 'Ring4 vs {{competitor}}: Which Business Phone Wins? (2024 Comparison)',
  'industry': 'Business Phone for {{industry}} | {{persona}} Phone System | Ring4',
  'feature': '{{feature}} for Business | {{benefit}} | Ring4',
  'guide': 'How to {{action}} | {{outcome}} Guide | Ring4',
  'tool': '{{tool}} - Free {{benefit}} Tool | Ring4'
}

// Meta description templates by page type
export const metaDescriptionTemplates = {
  'spam-fix': '{{problem}}? Use our free {{tool}} to {{solution}} and get a clean number instantly with Ring4.',
  'location': 'Get a local {{areaCode}} {{city}} phone number for your business. {{benefit1}}, {{benefit2}}, and {{stat}}.',
  'comparison': '{{competitor}} vs Ring4: Compare {{feature1}}, {{feature2}}, and {{feature3}}. See why businesses switch to Ring4.',
  'industry': 'Phone system built for {{industry}}. {{benefit1}}, {{benefit2}}, and {{feature}}. Trusted by {{trust}}.',
  'feature': '{{description}}. {{benefit1}} and {{benefit2}} with Ring4\'s {{feature}}.',
  'guide': 'Learn how to {{action}} with our step-by-step guide. {{outcome}} in {{timeframe}}.',
  'tool': 'Free {{tool}} to {{action}}. {{benefit}} and {{outcome}} instantly.'
}

// H1 templates by page type
export const h1Templates = {
  'spam-fix': '{{problem}}',
  'location': 'Get a trusted {{areaCode}} {{city}} business number',
  'comparison': '{{competitor}} vs Ring4: The {{adjective}} comparison',
  'industry': 'The phone system {{industry}} actually want',
  'feature': '{{feature}} that {{benefit}}',
  'guide': '{{action}}: The {{timeframe}} guide',
  'tool': '{{tool}}: {{action}} instantly'
}

// CTA templates by intent level
export const ctaTemplates = {
  'problem-aware': {
    primary: '{{diagnose}} Now →',
    secondary: 'Learn More',
    urgency: '{{urgencyMessage}}'
  },
  'solution-aware': {
    primary: 'See How {{solution}} Works →',
    secondary: 'Compare Options',
    urgency: null
  },
  'comparing': {
    primary: '{{action}} to Ring4 →',
    secondary: 'See Full Comparison',
    urgency: '{{socialProof}}'
  },
  'ready-to-buy': {
    primary: 'Start Free Trial →',
    secondary: 'Talk to Sales',
    urgency: '{{limitedOffer}}'
  }
}

// Generate internal links based on page type
export function generateInternalLinks(pageType: string, data: any): Array<{ text: string; url: string }> {
  const links: Array<{ text: string; url: string }> = []
  
  switch (pageType) {
    case 'location':
      links.push(
        { text: 'Check if your number is spam-flagged', url: '/fix-spam-likely' },
        { text: `Best phone system for ${data.city} businesses`, url: `/industries/local-business` },
        { text: 'Get branded caller ID', url: '/branded-caller-id' }
      )
      break
      
    case 'comparison':
      links.push(
        { text: 'Why calls show as spam', url: '/fix-spam-likely' },
        { text: 'Get a local business number', url: '/local-numbers' },
        { text: 'Team texting features', url: '/shared-inbox' }
      )
      break
      
    case 'industry':
      links.push(
        { text: `Get a local number for ${data.vertical}`, url: '/local-numbers' },
        { text: 'SMS templates for your industry', url: `/sms-templates/${data.vertical}` },
        { text: 'Calculate your ROI', url: `/roi-calculator/${data.vertical}` }
      )
      break
      
    default:
      links.push(
        { text: 'See all features', url: '/features' },
        { text: 'Compare with alternatives', url: '/compare' },
        { text: 'Start free trial', url: '/signup' }
      )
  }
  
  return links
}

// Generate FAQ data for structured data
export function generateFAQData(pageType: string, data: any): Array<{ question: string; answer: string }> {
  const faqs: Array<{ question: string; answer: string }> = []
  
  switch (pageType) {
    case 'spam-fix':
      faqs.push(
        {
          question: 'Why does my business number show "Spam Likely"?',
          answer: 'Carriers flag numbers that appear suspicious due to high call volume, incomplete caller ID data, or shared VoIP lines. Ring4 fixes this with branded caller ID and clean, carrier-verified numbers.'
        },
        {
          question: 'How quickly can I fix my spam-labeled number?',
          answer: 'With Ring4, you can get a clean business number instantly. Port your existing number or get a new local number in under 5 minutes.'
        }
      )
      break
      
    case 'location':
      faqs.push(
        {
          question: `Why do I need a local ${data.city} phone number?`,
          answer: `Local ${data.areaCode} numbers see ${data.pickupRateIndex || 73}% higher pickup rates than out-of-state numbers. Customers trust local businesses more.`
        },
        {
          question: `Can I get a ${data.areaCode} number if I'm not in ${data.city}?`,
          answer: `Yes! Ring4 lets you get a ${data.city} business number from anywhere. Perfect for remote teams or expanding into new markets.`
        }
      )
      break
      
    case 'comparison':
      faqs.push(
        {
          question: `Is Ring4 better than ${data.competitorName}?`,
          answer: `Ring4 offers instant SMS activation, branded caller ID, and live support - features ${data.competitorName} lacks. Plus, our numbers never get spam-flagged.`
        },
        {
          question: `Can I switch from ${data.competitorName} to Ring4?`,
          answer: `Yes! We'll help you port your number for free and get you set up in minutes. Most businesses complete the switch in under 24 hours.`
        }
      )
      break
  }
  
  return faqs
}

// Generate breadcrumb data
export function generateBreadcrumbs(path: string): Array<{ name: string; url: string }> {
  const parts = path.split('/').filter(Boolean)
  const breadcrumbs = [{ name: 'Home', url: '/' }]
  
  let currentPath = ''
  parts.forEach((part) => {
    currentPath += `/${part}`
    
    // Format the name
    let name = part
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    // Special handling for certain paths
    if (part === 'vs') name = 'Compare'
    if (part === 'local-number') name = 'Local Numbers'
    
    breadcrumbs.push({
      name,
      url: currentPath
    })
  })
  
  return breadcrumbs
}