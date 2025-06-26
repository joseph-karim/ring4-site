// SEO Database Types (manually defined until Supabase types are regenerated)

export interface SEOPage {
  id: string
  slug: string
  bucket: string
  template_type: string
  meta_title: string
  meta_description: string
  h1_text: string
  structured_data?: any
  content_blocks?: any
  cta_config?: any
  internal_links?: any
  status: 'draft' | 'published' | 'archived'
  created_at: string
  updated_at: string
}

export interface CompetitorReview {
  id: string
  competitor_name: string
  platform: string
  reviewer_role?: string
  star_rating?: number
  review_text?: string
  pain_points?: string[]
  review_date?: string
  is_verified: boolean
  created_at: string
}

export interface Location {
  id: string
  city: string
  state: string
  area_code: string
  population?: number
  business_density_score?: number
  pickup_rate_index?: number
  local_competitors?: any
  created_at: string
}

export interface Industry {
  id: string
  vertical: string
  persona_name: string
  top_pain_points?: string[]
  sms_use_cases?: string[]
  phone_use_cases?: string[]
  avg_call_volume?: number
  snippet_templates?: any
  created_at: string
}