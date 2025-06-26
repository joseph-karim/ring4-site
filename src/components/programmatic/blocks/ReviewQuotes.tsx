import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Quote, Star } from 'lucide-react'

interface Review {
  platform: string
  reviewer_role?: string
  star_rating: number
  review_text: string
  pain_points?: string[]
}

interface ReviewQuotesProps {
  reviews: Review[]
}

export default function ReviewQuotes({ reviews }: ReviewQuotesProps) {
  const getStarColor = (rating: number) => {
    if (rating >= 4) return 'text-green-500'
    if (rating >= 3) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getPlatformBadgeColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'g2':
        return 'bg-orange-100 text-orange-800'
      case 'reddit':
        return 'bg-red-100 text-red-800'
      case 'trustpilot':
        return 'bg-green-100 text-green-800'
      case 'app store':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {reviews.slice(0, 4).map((review, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <Quote className="h-8 w-8 text-gray-300" />
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={getPlatformBadgeColor(review.platform)}>
                    {review.platform}
                  </Badge>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.star_rating
                            ? `fill-current ${getStarColor(review.star_rating)}`
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <blockquote className="text-gray-700 mb-4 italic">
                "{review.review_text}"
              </blockquote>

              {review.reviewer_role && (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    — {review.reviewer_role}
                  </p>
                  {review.pain_points && review.pain_points.length > 0 && (
                    <div className="flex gap-2">
                      {review.pain_points.slice(0, 2).map((pain, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {pain.replace('-', ' ')}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}