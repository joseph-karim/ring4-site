// Industry-Specific AI Agent Configuration
// Provides pre-configured business templates for different industries

import { BusinessInfo } from './website-crawler'

export function createIndustrySpecificAgent(industry: string): BusinessInfo {
  switch (industry) {
    case 'real-estate':
      return createRealEstateAgent()
    case 'legal':
      return createLegalAgent()
    case 'medical':
      return createMedicalAgent()
    case 'business':
    default:
      return createBusinessAgent()
  }
}

function createRealEstateAgent(): BusinessInfo {
  return {
    name: "Your Real Estate Agency",
    description: "Full-service real estate agency helping clients buy, sell, and invest in properties. We provide expert market analysis, professional photography, and dedicated support throughout the entire transaction process.",
    services: [
      "Residential home sales",
      "Property buying assistance", 
      "Market analysis and pricing",
      "Property showings and tours",
      "Investment property consultation",
      "First-time buyer programs"
    ],
    hours: {
      "Monday": "9:00 AM - 7:00 PM",
      "Tuesday": "9:00 AM - 7:00 PM", 
      "Wednesday": "9:00 AM - 7:00 PM",
      "Thursday": "9:00 AM - 7:00 PM",
      "Friday": "9:00 AM - 7:00 PM",
      "Saturday": "10:00 AM - 6:00 PM",
      "Sunday": "12:00 PM - 5:00 PM"
    },
    contact: {
      phone: "Available during consultation",
      email: "info@youragency.com",
      address: "Visit our office for personalized service"
    },
    faqs: [
      {
        question: "What's my home worth?",
        answer: "I'd be happy to connect you with one of our agents for a free comparative market analysis. We'll provide you with a detailed report showing recent sales and current market conditions in your area."
      },
      {
        question: "How long does it take to sell a house?",
        answer: "The time to sell varies by market conditions and property type, but our homes typically sell 30% faster than the market average. We'll provide you with a realistic timeline during our consultation."
      },
      {
        question: "Do you help first-time buyers?",
        answer: "Absolutely! We specialize in helping first-time buyers navigate the process. We can connect you with preferred lenders and explain available programs that might help with down payments or closing costs."
      },
      {
        question: "What's your commission rate?",
        answer: "Our commission is competitive and includes comprehensive marketing, professional photography, and dedicated support. I'd be happy to have one of our agents discuss our full-service approach and commission structure with you."
      }
    ],
    specialties: [
      "Expert market knowledge",
      "Professional marketing and photography", 
      "Dedicated transaction support",
      "First-time buyer assistance"
    ],
    values: [
      "Client-focused service",
      "Market expertise",
      "Professional integrity",
      "Results-driven approach"
    ],
    primaryCTA: {
      text: "Schedule a consultation",
      action: "Connect the caller with an agent to schedule a free consultation or property evaluation"
    }
  }
}

function createLegalAgent(): BusinessInfo {
  return {
    name: "Your Law Firm",
    description: "Experienced legal professionals providing comprehensive legal services with personalized attention. We handle complex legal matters while ensuring clear communication and client-focused representation.",
    services: [
      "Personal injury law",
      "Estate planning and probate",
      "Business formation and contracts",
      "Real estate transactions",
      "Family law and divorce",
      "Criminal defense"
    ],
    hours: {
      "Monday": "8:00 AM - 6:00 PM",
      "Tuesday": "8:00 AM - 6:00 PM",
      "Wednesday": "8:00 AM - 6:00 PM", 
      "Thursday": "8:00 AM - 6:00 PM",
      "Friday": "8:00 AM - 5:00 PM",
      "Saturday": "By appointment",
      "Sunday": "Emergency consultations only"
    },
    contact: {
      phone: "Available during consultation",
      email: "contact@yourlawfirm.com",
      address: "Professional office location provided during consultation"
    },
    faqs: [
      {
        question: "Do you offer free consultations?",
        answer: "Yes, we provide free initial consultations for most practice areas. This allows us to understand your situation and explain how we can help, with no obligation."
      },
      {
        question: "How much do legal services cost?",
        answer: "Legal fees vary depending on the complexity of your case and type of service needed. We offer transparent pricing and will discuss all costs upfront during your consultation."
      },
      {
        question: "How long will my case take?",
        answer: "The timeline depends on the specific legal matter and circumstances involved. During our consultation, we'll provide you with a realistic timeframe based on our experience with similar cases."
      },
      {
        question: "Can you handle cases outside your local area?",
        answer: "We're licensed to practice in multiple jurisdictions and can often help with cases in different areas. Let me connect you with an attorney to discuss your specific situation."
      }
    ],
    specialties: [
      "Experienced legal representation",
      "Personalized client service",
      "Complex case handling", 
      "Clear communication"
    ],
    values: [
      "Client advocacy",
      "Professional integrity",
      "Legal excellence",
      "Transparent communication"
    ],
    primaryCTA: {
      text: "Schedule a consultation",
      action: "Connect the caller with an attorney for a free initial consultation to discuss their legal needs"
    }
  }
}

function createMedicalAgent(): BusinessInfo {
  return {
    name: "Your Medical Practice", 
    description: "Comprehensive healthcare services with a focus on patient-centered care. Our experienced medical team provides thorough examinations, preventive care, and treatment plans tailored to each patient's needs.",
    services: [
      "General medical examinations",
      "Preventive health screenings",
      "Chronic disease management",
      "Urgent care services",
      "Health and wellness consultations",
      "Specialist referrals"
    ],
    hours: {
      "Monday": "8:00 AM - 5:00 PM",
      "Tuesday": "8:00 AM - 5:00 PM",
      "Wednesday": "8:00 AM - 5:00 PM",
      "Thursday": "8:00 AM - 5:00 PM", 
      "Friday": "8:00 AM - 4:00 PM",
      "Saturday": "9:00 AM - 1:00 PM",
      "Sunday": "Closed - Emergency services available"
    },
    contact: {
      phone: "Available during appointment scheduling",
      email: "appointments@yourpractice.com",
      address: "Medical facility address provided during scheduling"
    },
    faqs: [
      {
        question: "Do you accept my insurance?",
        answer: "We work with most major insurance providers. Please let me know your insurance carrier and I can verify your coverage and benefits before your appointment."
      },
      {
        question: "How soon can I get an appointment?",
        answer: "We typically have same-day or next-day appointments available for urgent concerns, and routine appointments within the week. Let me check our current availability for you."
      },
      {
        question: "What should I bring to my appointment?",
        answer: "Please bring your insurance card, a valid ID, current medications list, and any relevant medical records. We'll provide you with specific instructions when you schedule."
      },
      {
        question: "Do you handle emergencies?",
        answer: "For medical emergencies, please call 911. We do offer urgent care services during business hours and have an on-call service for after-hours medical questions."
      }
    ],
    specialties: [
      "Patient-centered care",
      "Comprehensive health services",
      "Preventive medicine",
      "Experienced medical team"
    ],
    values: [
      "Compassionate care",
      "Medical excellence", 
      "Patient advocacy",
      "Health and wellness focus"
    ],
    primaryCTA: {
      text: "Schedule an appointment",
      action: "Help the caller schedule an appointment with the appropriate provider based on their medical needs"
    }
  }
}

function createBusinessAgent(): BusinessInfo {
  return {
    name: "Your Business",
    description: "Professional service business dedicated to providing excellent customer service and high-quality solutions. We work closely with clients to understand their needs and deliver results that exceed expectations.",
    services: [
      "Professional consultations",
      "Custom service solutions",
      "Customer support and assistance",
      "Project planning and management",
      "Quality assurance and follow-up",
      "Emergency and priority services"
    ],
    hours: {
      "Monday": "9:00 AM - 6:00 PM",
      "Tuesday": "9:00 AM - 6:00 PM",
      "Wednesday": "9:00 AM - 6:00 PM",
      "Thursday": "9:00 AM - 6:00 PM",
      "Friday": "9:00 AM - 5:00 PM",
      "Saturday": "10:00 AM - 2:00 PM",
      "Sunday": "Closed - Emergency services available"
    },
    contact: {
      phone: "Available during consultation",
      email: "info@yourbusiness.com", 
      address: "Service area information provided during consultation"
    },
    faqs: [
      {
        question: "How do I get started?",
        answer: "The best way to get started is with a free consultation where we can understand your specific needs and recommend the right solution. Would you like me to schedule that for you?"
      },
      {
        question: "What are your rates?",
        answer: "Our pricing varies based on the scope and complexity of the project. We provide transparent estimates after understanding your requirements. Most consultations are free."
      },
      {
        question: "How long does a typical project take?",
        answer: "Project timelines vary depending on the specific requirements and scope. We'll provide you with a detailed timeline and keep you updated throughout the process."
      },
      {
        question: "Do you offer emergency services?", 
        answer: "Yes, we understand that urgent situations arise. We have emergency response services available and can often accommodate priority requests."
      }
    ],
    specialties: [
      "Custom solutions",
      "Quality service delivery",
      "Professional expertise",
      "Customer satisfaction focus"
    ],
    values: [
      "Customer success",
      "Quality excellence",
      "Professional integrity", 
      "Reliable service"
    ],
    primaryCTA: {
      text: "Schedule a consultation",
      action: "Connect the caller with a team member to schedule a consultation and discuss their specific needs"
    }
  }
}