interface BaseStructuredData {
  '@context': string
  '@type': string
}

// Local Business Schema
export interface LocalBusinessSchema extends BaseStructuredData {
  '@type': 'LocalBusiness'
  name: string
  telephone: string
  address: {
    '@type': 'PostalAddress'
    streetAddress?: string
    addressLocality: string
    addressRegion: string
    postalCode?: string
    addressCountry: string
  }
  geo?: {
    '@type': 'GeoCoordinates'
    latitude: number
    longitude: number
  }
  url: string
  areaServed: string | string[]
  priceRange?: string
}

// Product Schema
export interface ProductSchema extends BaseStructuredData {
  '@type': 'Product'
  name: string
  image: string | string[]
  description: string
  brand: {
    '@type': 'Brand'
    name: string
  }
  offers: {
    '@type': 'Offer'
    priceCurrency: string
    price: string
    priceValidUntil?: string
    availability: string
    url: string
  }
  aggregateRating?: {
    '@type': 'AggregateRating'
    ratingValue: string
    reviewCount: string
  }
}

// FAQ Schema
export interface FAQSchema extends BaseStructuredData {
  '@type': 'FAQPage'
  mainEntity: Array<{
    '@type': 'Question'
    name: string
    acceptedAnswer: {
      '@type': 'Answer'
      text: string
    }
  }>
}

// How-To Schema
export interface HowToSchema extends BaseStructuredData {
  '@type': 'HowTo'
  name: string
  description: string
  image?: string
  totalTime?: string
  supply?: Array<{
    '@type': 'HowToSupply'
    name: string
  }>
  step: Array<{
    '@type': 'HowToStep'
    name: string
    text: string
    image?: string
    url?: string
  }>
}

// Comparison Table Schema
export interface ComparisonSchema extends BaseStructuredData {
  '@type': 'Table'
  about: string
  name: string
  description: string
  mainEntity?: {
    '@type': 'ItemList'
    itemListElement: Array<{
      '@type': 'ListItem'
      position: number
      name: string
      description: string
    }>
  }
}

// Service Schema
export interface ServiceSchema extends BaseStructuredData {
  '@type': 'Service'
  name: string
  description: string
  provider: {
    '@type': 'Organization'
    name: string
  }
  areaServed: string | string[]
  hasOfferCatalog?: {
    '@type': 'OfferCatalog'
    name: string
    itemListElement: Array<{
      '@type': 'Offer'
      itemOffered: {
        '@type': 'Service'
        name: string
        description: string
      }
    }>
  }
}

// Helper functions to create structured data
export const createLocalBusinessSchema = (data: Partial<LocalBusinessSchema>): LocalBusinessSchema => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Ring4',
  telephone: '+1-800-RING4-US',
  url: 'https://ring4.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'New York',
    addressRegion: 'NY',
    addressCountry: 'US'
  },
  areaServed: 'United States',
  ...data
})

export const createProductSchema = (data: Partial<ProductSchema>): ProductSchema => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Ring4 Business Phone',
  image: 'https://ring4.com/product-image.png',
  description: 'Professional business phone system with branded caller ID',
  brand: {
    '@type': 'Brand',
    name: 'Ring4'
  },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    price: '0',
    availability: 'https://schema.org/InStock',
    url: 'https://ring4.com/pricing'
  },
  ...data
})

export const createFAQSchema = (faqs: Array<{ question: string; answer: string }>): FAQSchema => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question' as const,
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer' as const,
      text: faq.answer
    }
  }))
})

export const createHowToSchema = (data: Partial<HowToSchema>): HowToSchema => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Get Started with Ring4',
  description: 'Step by step guide',
  step: [],
  ...data
})

export const createComparisonSchema = (data: Partial<ComparisonSchema>): ComparisonSchema => ({
  '@context': 'https://schema.org',
  '@type': 'Table',
  about: 'Business Phone Comparison',
  name: 'Ring4 vs Competitors',
  description: 'Compare business phone features',
  ...data
})

export const createServiceSchema = (data: Partial<ServiceSchema>): ServiceSchema => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Ring4 Business Phone Service',
  description: 'Professional phone system for businesses',
  provider: {
    '@type': 'Organization',
    name: 'Ring4'
  },
  areaServed: 'United States',
  ...data
})