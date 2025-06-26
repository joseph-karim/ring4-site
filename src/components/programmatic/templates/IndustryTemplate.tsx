import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CTABlock from '../blocks/CTABlock'
import FAQSection from '../blocks/FAQSection'

interface IndustryTemplateProps {
  data: {
    h1_text: string
    content_blocks: any
    cta_config: any
    industry?: any
  }
}

export default function IndustryTemplate({ data }: IndustryTemplateProps) {
  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">{data.h1_text}</h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Built specifically for {data.industry?.persona_name || 'professionals'} like you
        </p>
        <CTABlock config={data.cta_config} />
      </section>
      
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why {data.industry?.vertical || 'Professionals'} Choose Ring4
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {data.industry?.top_pain_points?.map((pain: string, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">Pain Point #{index + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{pain}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            FAQs for {data.industry?.persona_name || 'Professionals'}
          </h2>
          <FAQSection faqs={[
            {
              question: `Why do ${data.industry?.persona_name || 'professionals'} need Ring4?`,
              answer: `Ring4 addresses the unique communication challenges faced by ${data.industry?.vertical || 'your industry'}, including ${data.industry?.top_pain_points?.[0] || 'managing client calls efficiently'}.`
            },
            {
              question: 'How quickly can I get started?',
              answer: 'You can have your new business line up and running in under 5 minutes. No technical setup required.'
            }
          ]} />
        </div>
      </section>
    </div>
  )
}