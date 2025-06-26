import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  type?: 'website' | 'article' | 'product'
  image?: string
  imageAlt?: string
  publishedTime?: string
  modifiedTime?: string
  author?: string
  keywords?: string[]
  noindex?: boolean
  structuredData?: object
  children?: React.ReactNode
}

const DEFAULT_TITLE = 'Ring4 | Branded Calls. Clean Reputation. Real Results.'
const DEFAULT_DESCRIPTION = 'Get a business phone number that builds trust. Ring4 provides branded caller ID, spam protection, and team messaging for modern businesses.'
const DEFAULT_IMAGE = 'https://ring4.com/og-image-default.png'
const SITE_NAME = 'Ring4'
const TWITTER_HANDLE = '@ring4'

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  type = 'website',
  image = DEFAULT_IMAGE,
  imageAlt,
  publishedTime,
  modifiedTime,
  author,
  keywords = [],
  noindex = false,
  structuredData,
  children
}: SEOProps) {
  const location = useLocation()
  const url = `https://ring4.com${location.pathname}`
  
  const fullTitle = title ? `${title} | Ring4` : DEFAULT_TITLE
  const canonicalUrl = canonical || url

  // Base structured data for organization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ring4',
    url: 'https://ring4.com',
    logo: 'https://ring4.com/Ring4-icon-logo.jpg',
    sameAs: [
      'https://twitter.com/ring4',
      'https://linkedin.com/company/ring4',
      'https://facebook.com/ring4'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-800-RING4-US',
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: 'English'
    }
  }

  // Combine organization schema with page-specific structured data
  const allStructuredData = structuredData 
    ? [organizationSchema, structuredData]
    : organizationSchema

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Keywords */}
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      
      {/* Author */}
      {author && <meta name="author" content={author} />}
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
      <meta property="og:site_name" content={SITE_NAME} />
      
      {/* Article specific */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      {imageAlt && <meta property="twitter:image:alt" content={imageAlt} />}
      <meta property="twitter:site" content={TWITTER_HANDLE} />
      <meta property="twitter:creator" content={TWITTER_HANDLE} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(allStructuredData)}
      </script>

      {/* Additional custom meta tags */}
      {children}
    </Helmet>
  )
}