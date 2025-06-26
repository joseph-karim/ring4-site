import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CTABlock from '../blocks/CTABlock'

interface FeatureTemplateProps {
  data: {
    h1_text: string
    content_blocks: any
    cta_config: any
  }
}

export default function FeatureTemplate({ data }: FeatureTemplateProps) {
  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">{data.h1_text}</h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-center text-gray-600 mb-12">
            {data.content_blocks?.description || 'Discover how this feature can transform your business communication'}
          </p>
          <CTABlock config={data.cta_config} />
        </div>
      </section>
      
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  This feature integrates seamlessly with your existing workflow to provide
                  enhanced communication capabilities for your team.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}