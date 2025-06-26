// Mock data for SEO templates when Supabase is not available
export const mockSEOData = {
  'sms-widget': {
    id: '1',
    slug: 'sms-widget',
    bucket: 'sms-widget',
    template_type: 'sms-widget',
    meta_title: 'SMS Widget for Websites - Convert Visitors to Customers | Ring4',
    meta_description: 'Add an SMS widget to your website and convert 400% more visitors. Replace slow contact forms with instant texting. Get started in 30 seconds.',
    h1_text: 'Convert Website Visitors with SMS Widget',
    content_blocks: {
      stats: {
        conversion_increase: '400%',
        response_time: '30 sec',
        leads_per_month: '250+'
      },
      benefits: [],
      features: []
    },
    cta_config: {
      primary: 'Get SMS Widget',
      secondary: 'See Demo',
      socialProof: 'Join 5,000+ websites using Ring4 SMS widget'
    },
    structured_data: {},
    status: 'published'
  },
  'team-inbox': {
    id: '2',
    slug: 'team-inbox',
    bucket: 'team-inbox',
    template_type: 'team-inbox',
    meta_title: 'Shared Team Inbox for Business Texts - Collaborate Better | Ring4',
    meta_description: 'Stop the chaos of team texting. Get one shared inbox where your whole team can collaborate on customer conversations. Free 14-day trial.',
    h1_text: 'Unified Team Inbox for Business Texts',
    content_blocks: {
      pain_points: [],
      benefits: [],
      stats: {}
    },
    cta_config: {
      primary: 'Start Team Trial',
      secondary: 'See Demo',
      socialProof: 'Join 3,200+ teams using Ring4 shared inbox'
    },
    structured_data: {},
    status: 'published'
  },
  'branded-caller-id': {
    id: '3',
    slug: 'branded-caller-id',
    bucket: 'branded-caller-id',
    template_type: 'branded-caller-id',
    meta_title: 'Branded Caller ID - Display Your Business Name on Calls | Ring4',
    meta_description: 'Stop showing up as "Unknown Number". Get branded caller ID that displays your business name on every call. 84% higher answer rates.',
    h1_text: 'Get Branded Caller ID for Your Business',
    content_blocks: {
      benefits: [],
      trust_factors: [],
      stats: {}
    },
    cta_config: {
      primary: 'Get Branded Caller ID',
      secondary: 'See Demo',
      socialProof: 'Trusted by 25,000+ businesses worldwide'
    },
    structured_data: {},
    status: 'published'
  },
  'business-launch': {
    id: '4',
    slug: 'business-launch',
    bucket: 'business-launch',
    template_type: 'business-launch',
    meta_title: 'Business Phone System for Startups - Professional from Day 1 | Ring4',
    meta_description: 'Launch your business with a professional phone system. No contracts, no hardware, instant credibility. Perfect for startups and new businesses.',
    h1_text: 'Professional Phone System for New Businesses',
    content_blocks: {
      challenges: [],
      benefits: [],
      stats: {}
    },
    cta_config: {
      primary: 'Get Business Number',
      secondary: 'See Success Stories',
      socialProof: 'Join 15,000+ startups using Ring4'
    },
    structured_data: {},
    status: 'published'
  },
  'follow-up-strategy': {
    id: '5',
    slug: 'follow-up-strategy',
    bucket: 'follow-up-strategy',
    template_type: 'follow-up-strategy',
    meta_title: 'Customer Follow-Up Strategy - Convert More Prospects | Ring4',
    meta_description: 'Turn one-time customers into lifetime clients with systematic follow-up. Templates, automation, and tracking included. 300% higher conversion rates.',
    h1_text: 'Master Customer Follow-Up Strategy',
    content_blocks: {
      strategies: [],
      templates: [],
      stats: {}
    },
    cta_config: {
      primary: 'Get Follow-Up Templates',
      secondary: 'See Success Stories',
      socialProof: 'Join 8,500+ businesses using Ring4 for follow-up'
    },
    structured_data: {},
    status: 'published'
  },
  'call-routing': {
    id: '6',
    slug: 'call-routing',
    bucket: 'call-routing',
    template_type: 'call-routing',
    meta_title: 'Smart Call Routing & IVR System - Professional Phone Handling | Ring4',
    meta_description: 'Route calls like a Fortune 500 company. Smart IVR, time-based routing, and skill-based distribution. Setup in minutes, no hardware required.',
    h1_text: 'Smart Call Routing & IVR System',
    content_blocks: {
      routing_options: [],
      benefits: [],
      stats: {}
    },
    cta_config: {
      primary: 'Set Up Call Routing',
      secondary: 'See Demo',
      socialProof: 'Join 12,000+ businesses with professional call routing'
    },
    structured_data: {},
    status: 'published'
  }
}

export function getMockSEOData(slug: string) {
  return mockSEOData[slug as keyof typeof mockSEOData] || null
}