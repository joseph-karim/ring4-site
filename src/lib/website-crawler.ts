// Website crawler service using Crawl4AI concepts
// This simulates the Crawl4AI functionality for the demo

export interface BusinessInfo {
  name: string
  description: string
  services: string[]
  hours: {
    [key: string]: string
  }
  contact: {
    phone?: string
    email?: string
    address?: string
  }
  specialties: string[]
  values: string[]
  faqs: Array<{
    question: string
    answer: string
  }>
}

export async function crawlWebsite(url: string): Promise<BusinessInfo> {
  // In production, this would use Crawl4AI to actually crawl the website
  // For demo purposes, we'll simulate the crawling and extraction
  
  console.log(`Crawling website: ${url}`)
  
  // Simulate crawling delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Extract domain name for business name
  const domain = new URL(url).hostname.replace('www.', '')
  const businessName = domain.split('.')[0]
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
  
  // Generate mock business data based on common patterns
  const mockBusinessData: BusinessInfo = {
    name: businessName,
    description: `${businessName} is a trusted local business providing professional services to our community. We pride ourselves on quality, reliability, and customer satisfaction.`,
    services: [
      "Professional consultation",
      "Custom solutions",
      "Emergency services",
      "Maintenance programs",
      "Free estimates"
    ],
    hours: {
      "Monday-Friday": "9:00 AM - 6:00 PM",
      "Saturday": "10:00 AM - 4:00 PM",
      "Sunday": "Closed",
      "Holidays": "Closed"
    },
    contact: {
      phone: "(555) 123-4567",
      email: `info@${domain}`,
      address: "123 Main Street, Your City, State 12345"
    },
    specialties: [
      "Licensed and insured",
      "Over 10 years of experience",
      "Award-winning service",
      "Locally owned and operated"
    ],
    values: [
      "Customer-first approach",
      "Transparent pricing",
      "Quality workmanship",
      "Timely service"
    ],
    faqs: [
      {
        question: "Do you offer free estimates?",
        answer: "Yes, we provide free estimates for all our services. Simply call us or fill out our online form to schedule."
      },
      {
        question: "Are you licensed and insured?",
        answer: "Absolutely! We are fully licensed and insured for your peace of mind."
      },
      {
        question: "What areas do you serve?",
        answer: "We serve the greater metropolitan area and surrounding communities within a 50-mile radius."
      },
      {
        question: "Do you offer emergency services?",
        answer: "Yes, we offer 24/7 emergency services. Call our emergency hotline for immediate assistance."
      }
    ]
  }
  
  // Add some industry-specific customization based on keywords in domain
  if (domain.includes('plumb') || domain.includes('pipe')) {
    mockBusinessData.services = [
      "Drain cleaning",
      "Pipe repair and replacement",
      "Water heater installation",
      "Leak detection",
      "Emergency plumbing services"
    ]
    mockBusinessData.specialties.push("Certified master plumbers")
  } else if (domain.includes('law') || domain.includes('legal')) {
    mockBusinessData.services = [
      "Legal consultation",
      "Contract review",
      "Litigation support",
      "Business law",
      "Estate planning"
    ]
    mockBusinessData.specialties.push("Board certified attorneys")
  } else if (domain.includes('dental') || domain.includes('dentist')) {
    mockBusinessData.services = [
      "General dentistry",
      "Cosmetic procedures",
      "Teeth whitening",
      "Dental implants",
      "Emergency dental care"
    ]
    mockBusinessData.specialties.push("State-of-the-art dental technology")
  }
  
  return mockBusinessData
}

// Extract key information for AI training
export function extractKeyInsights(businessInfo: BusinessInfo) {
  return {
    businessName: businessInfo.name,
    primaryServices: businessInfo.services.slice(0, 3),
    uniqueSellingPoints: businessInfo.specialties.slice(0, 3),
    operatingHours: formatOperatingHours(businessInfo.hours),
    emergencyAvailability: businessInfo.services.some(s => 
      s.toLowerCase().includes('emergency')
    ),
    contactPreference: businessInfo.contact.phone ? 'phone' : 'email'
  }
}

function formatOperatingHours(hours: { [key: string]: string }): string {
  const weekdayHours = hours["Monday-Friday"] || "9 AM - 5 PM"
  const weekendHours = hours["Saturday"] || "Closed"
  return `Weekdays: ${weekdayHours}, Saturdays: ${weekendHours}`
}