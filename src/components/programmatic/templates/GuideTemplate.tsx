import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CTABlock from '../blocks/CTABlock'

interface GuideTemplateProps {
  data: {
    h1_text: string
    content_blocks: any
    cta_config: any
  }
}

export default function GuideTemplate({ data }: GuideTemplateProps) {
  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">{data.h1_text}</h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-center text-gray-600 mb-12">
            Step-by-step guidance to achieve your communication goals
          </p>
          <CTABlock config={data.cta_config} />
        </div>
      </section>
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Follow this comprehensive guide to set up and optimize your business phone system.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}