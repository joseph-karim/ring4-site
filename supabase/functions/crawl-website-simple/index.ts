// Simplified Supabase Edge Function for crawling websites
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface CrawlRequest {
  url: string
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { url } = await req.json() as CrawlRequest

    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // For now, return mock data to test the integration
    // In production, this would use Crawl4AI or web scraping
    const businessInfo = {
      name: "Example Business",
      description: "This is a demo business extracted from " + url,
      type: url.includes('real') ? "Real Estate Agency" : "General Business",
      services: [
        "Service 1",
        "Service 2",
        "Service 3"
      ],
      hours: {
        monday: "9:00 AM - 5:00 PM",
        tuesday: "9:00 AM - 5:00 PM",
        wednesday: "9:00 AM - 5:00 PM",
        thursday: "9:00 AM - 5:00 PM",
        friday: "9:00 AM - 5:00 PM",
        saturday: "10:00 AM - 2:00 PM",
        sunday: "Closed"
      },
      contact: {
        phone: "(555) 123-4567",
        email: "info@example.com",
        address: "123 Main St, City, State 12345"
      },
      specialties: ["Specialty 1", "Specialty 2"],
      values: ["Customer First", "Integrity", "Excellence"],
      faqs: [
        {
          question: "What are your hours?",
          answer: "We're open Monday-Friday 9-5, Saturday 10-2"
        },
        {
          question: "How can I contact you?",
          answer: "Call us at (555) 123-4567 or email info@example.com"
        }
      ]
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        businessInfo
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})