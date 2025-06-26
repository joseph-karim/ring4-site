import { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { getSEOPage, getLocation, getCompetitorReviews, getIndustry } from '@/lib/supabase-seo'
import { getMockSEOData } from '@/lib/seo-mock-data'
import SEO from '../seo/SEO'
import DiagnosticToolTemplate from './templates/DiagnosticToolTemplate'
import LocationTemplate from './templates/LocationTemplate'
import ComparisonTemplate from './templates/ComparisonTemplate'
import IndustryTemplate from './templates/IndustryTemplate'
import FeatureTemplate from './templates/FeatureTemplate'
import GuideTemplate from './templates/GuideTemplate'
import SMSWidgetTemplate from './templates/SMSWidgetTemplate'
import TeamInboxTemplate from './templates/TeamInboxTemplate'
import BrandedCallerIDTemplate from './templates/BrandedCallerIDTemplate'
import BusinessLaunchTemplate from './templates/BusinessLaunchTemplate'
import FollowUpStrategyTemplate from './templates/FollowUpStrategyTemplate'
import CallRoutingTemplate from './templates/CallRoutingTemplate'
import AreaCodeTemplate from './templates/AreaCodeTemplate'
import { Skeleton } from '../ui/skeleton'

// Map template types to components
const templateComponents = {
  diagnostic: DiagnosticToolTemplate,
  location: LocationTemplate,
  comparison: ComparisonTemplate,
  industry: IndustryTemplate,
  feature: FeatureTemplate,
  guide: GuideTemplate,
  'sms-widget': SMSWidgetTemplate,
  'team-inbox': TeamInboxTemplate,
  'branded-caller-id': BrandedCallerIDTemplate,
  'business-launch': BusinessLaunchTemplate,
  'follow-up-strategy': FollowUpStrategyTemplate,
  'call-routing': CallRoutingTemplate,
  'area-code': AreaCodeTemplate,
} as const

type TemplateType = keyof typeof templateComponents

interface ProgrammaticPageProps {
  bucket: string
}

export default function ProgrammaticPage({ bucket }: ProgrammaticPageProps) {
  const params = useParams()
  const [pageData, setPageData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPageData() {
      try {
        setLoading(true)
        setError(null)

        // Build slug based on bucket and params
        let slug = ''
        switch (bucket) {
          case 'spam-fix':
            slug = params.slug || 'fix-spam-likely'
            break
          case 'location':
            slug = `local-number-${params.city}`
            break
          case 'area-code':
            slug = `area-code-${params.areaCode}`
            break
          case 'comparison':
            slug = `ring4-vs-${params.competitor}`
            break
          case 'industry':
            slug = `phone-for-${params.industry}`
            break
          case 'feature':
            slug = params.feature || ''
            break
          case 'guide':
            slug = params.guide || ''
            break
          case 'sms-widget':
            slug = 'sms-widget'
            break
          case 'team-inbox':
            slug = 'team-inbox'
            break
          case 'branded-caller-id':
            slug = 'branded-caller-id'
            break
          case 'business-launch':
            slug = 'business-launch'
            break
          case 'follow-up-strategy':
            slug = 'follow-up-strategy'
            break
          case 'call-routing':
            slug = 'call-routing'
            break
          default:
            slug = params.slug || ''
        }

        // Fetch page data from Supabase, fallback to mock data
        let pageData
        const { data: supabaseData, error: pageError } = await getSEOPage(slug)

        if (pageError || !supabaseData) {
          // Try mock data for new templates
          pageData = getMockSEOData(slug)
          if (!pageData) {
            setError('Page not found')
            return
          }
        } else {
          pageData = supabaseData
        }

        // Fetch additional data based on bucket type
        let additionalData = {}

        if (bucket === 'location' && params.city) {
          const cityName = params.city.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')
          const { data: locationData } = await getLocation(cityName)
          
          additionalData = { location: locationData }
        }

        if (bucket === 'comparison' && params.competitor) {
          const competitorName = params.competitor.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')
          const { data: reviewsData } = await getCompetitorReviews(competitorName)
          
          additionalData = { reviews: reviewsData }
        }

        if (bucket === 'industry' && params.industry) {
          const industryName = params.industry.replace('-', ' ')
          const { data: industryData } = await getIndustry(industryName)
          
          additionalData = { industry: industryData }
        }

        setPageData({
          ...pageData,
          ...additionalData
        })
      } catch (err) {
        console.error('Error fetching page data:', err)
        setError('Failed to load page')
      } finally {
        setLoading(false)
      }
    }

    fetchPageData()
  }, [bucket, params])

  // Show loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-8" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  // Show error or redirect to 404
  if (error || !pageData) {
    return <Navigate to="/404" replace />
  }

  // Get the appropriate template component
  const TemplateComponent = templateComponents[pageData.template_type as TemplateType]
  
  if (!TemplateComponent) {
    console.error(`Unknown template type: ${pageData.template_type}`)
    return <Navigate to="/404" replace />
  }

  return (
    <>
      <SEO
        title={pageData.meta_title}
        description={pageData.meta_description}
        structuredData={pageData.structured_data}
      />
      <TemplateComponent data={pageData} />
    </>
  )
}