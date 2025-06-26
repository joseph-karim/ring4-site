-- Create SEO Pages Master Table
CREATE TABLE IF NOT EXISTS public.seo_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    bucket TEXT NOT NULL,
    template_type TEXT NOT NULL,
    meta_title TEXT NOT NULL,
    meta_description TEXT NOT NULL,
    h1_text TEXT NOT NULL,
    structured_data JSONB,
    content_blocks JSONB,
    cta_config JSONB,
    internal_links JSONB,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create Competitor Reviews Table
CREATE TABLE IF NOT EXISTS public.competitor_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    competitor_name TEXT NOT NULL,
    platform TEXT NOT NULL,
    reviewer_role TEXT,
    star_rating INTEGER CHECK (star_rating >= 1 AND star_rating <= 5),
    review_text TEXT,
    pain_points TEXT[],
    review_date DATE,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create Location Data Table
CREATE TABLE IF NOT EXISTS public.locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    area_code TEXT NOT NULL,
    population INTEGER,
    business_density_score INTEGER CHECK (business_density_score >= 0 AND business_density_score <= 100),
    pickup_rate_index INTEGER CHECK (pickup_rate_index >= 0 AND pickup_rate_index <= 100),
    local_competitors JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(city, state)
);

-- Create Industry Data Table
CREATE TABLE IF NOT EXISTS public.industries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vertical TEXT NOT NULL UNIQUE,
    persona_name TEXT NOT NULL,
    top_pain_points TEXT[],
    sms_use_cases TEXT[],
    phone_use_cases TEXT[],
    avg_call_volume INTEGER,
    snippet_templates JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_seo_pages_slug ON public.seo_pages (slug);
CREATE INDEX IF NOT EXISTS idx_seo_pages_bucket ON public.seo_pages (bucket);
CREATE INDEX IF NOT EXISTS idx_seo_pages_status ON public.seo_pages (status);
CREATE INDEX IF NOT EXISTS idx_competitor_reviews_competitor ON public.competitor_reviews (competitor_name);
CREATE INDEX IF NOT EXISTS idx_competitor_reviews_platform ON public.competitor_reviews (platform);
CREATE INDEX IF NOT EXISTS idx_locations_area_code ON public.locations (area_code);
CREATE INDEX IF NOT EXISTS idx_locations_city_state ON public.locations (city, state);
CREATE INDEX IF NOT EXISTS idx_industries_vertical ON public.industries (vertical);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_seo_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_seo_pages_updated_at
BEFORE UPDATE ON public.seo_pages
FOR EACH ROW
EXECUTE FUNCTION public.update_seo_updated_at_column();

-- Add Row Level Security (RLS) policies
ALTER TABLE public.seo_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitor_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industries ENABLE ROW LEVEL SECURITY;

-- Create policies for seo_pages
CREATE POLICY "Allow public read access to published seo_pages"
ON public.seo_pages
FOR SELECT
USING (status = 'published');

CREATE POLICY "Allow authenticated users to manage seo_pages"
ON public.seo_pages
FOR ALL
TO authenticated
USING (true);

-- Create policies for competitor_reviews
CREATE POLICY "Allow public read access to competitor_reviews"
ON public.competitor_reviews
FOR SELECT
USING (true);

CREATE POLICY "Allow authenticated users to manage competitor_reviews"
ON public.competitor_reviews
FOR ALL
TO authenticated
USING (true);

-- Create policies for locations
CREATE POLICY "Allow public read access to locations"
ON public.locations
FOR SELECT
USING (true);

CREATE POLICY "Allow authenticated users to manage locations"
ON public.locations
FOR ALL
TO authenticated
USING (true);

-- Create policies for industries
CREATE POLICY "Allow public read access to industries"
ON public.industries
FOR SELECT
USING (true);

CREATE POLICY "Allow authenticated users to manage industries"
ON public.industries
FOR ALL
TO authenticated
USING (true);