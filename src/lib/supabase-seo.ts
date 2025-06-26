import { createClient } from '@supabase/supabase-js'
import type { SEOPage, CompetitorReview, Location, Industry } from '@/types/seo-database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Create a separate client for SEO operations
export const supabaseSEO = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions for SEO operations
export async function getSEOPage(slug: string) {
  const { data, error } = await supabaseSEO
    .from('seo_pages')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single<SEOPage>()
  
  return { data, error }
}

export async function getLocation(city: string) {
  const { data, error } = await supabaseSEO
    .from('locations')
    .select('*')
    .eq('city', city)
    .single<Location>()
  
  return { data, error }
}

export async function getCompetitorReviews(competitorName: string) {
  const { data, error } = await supabaseSEO
    .from('competitor_reviews')
    .select('*')
    .eq('competitor_name', competitorName)
    .limit(10)
  
  return { data: data as CompetitorReview[] | null, error }
}

export async function getIndustry(vertical: string) {
  const { data, error } = await supabaseSEO
    .from('industries')
    .select('*')
    .eq('vertical', vertical)
    .single<Industry>()
  
  return { data, error }
}