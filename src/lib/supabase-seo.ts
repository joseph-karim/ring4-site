import { supabase } from './supabase'
import type { SEOPage, CompetitorReview, Location, Industry } from '@/types/seo-database'

// Use the existing Supabase client instead of creating a new one
export const supabaseSEO = supabase

// Helper functions for SEO operations
export async function getSEOPage(slug: string) {
  try {
    const { data, error } = await supabaseSEO
      .from('seo_pages' as any)
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single<SEOPage>()
    
    return { data, error }
  } catch (err) {
    // If the table doesn't exist, return null
    return { data: null, error: err }
  }
}

export async function getLocation(city: string) {
  try {
    const { data, error } = await supabaseSEO
      .from('locations' as any)
      .select('*')
      .eq('city', city)
      .single<Location>()
    
    return { data, error }
  } catch (err) {
    return { data: null, error: err }
  }
}

export async function getCompetitorReviews(competitorName: string) {
  try {
    const { data, error } = await supabaseSEO
      .from('competitor_reviews' as any)
      .select('*')
      .eq('competitor_name', competitorName)
      .limit(10)
    
    return { data: data as CompetitorReview[] | null, error }
  } catch (err) {
    return { data: null, error: err }
  }
}

export async function getIndustry(vertical: string) {
  try {
    const { data, error } = await supabaseSEO
      .from('industries' as any)
      .select('*')
      .eq('vertical', vertical)
      .single<Industry>()
    
    return { data, error }
  } catch (err) {
    return { data: null, error: err }
  }
}