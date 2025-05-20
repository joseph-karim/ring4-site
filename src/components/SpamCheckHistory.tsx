import { useState, useEffect } from 'react'
import { formatPhoneNumber } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDistanceToNow } from 'date-fns'

interface SpamCheckHistoryProps {
  phoneNumber: string
}

export function SpamCheckHistory({ phoneNumber }: SpamCheckHistoryProps) {
  const [history, setHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Generate mock history data
  const generateMockHistory = (phoneNumber: string) => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(now);
    lastWeek.setDate(lastWeek.getDate() - 7);

    return [
      {
        id: '1',
        phone_number: `+1${phoneNumber.replace(/\D/g, '')}`,
        status: 'clean',
        risk_score: 15,
        carriers: [
          { name: 'Major Carriers', status: 'clean' }
        ],
        created_at: now.toISOString()
      },
      {
        id: '2',
        phone_number: `+1${phoneNumber.replace(/\D/g, '')}`,
        status: 'at-risk',
        risk_score: 45,
        carriers: [
          { name: 'Major Carriers', status: 'at-risk' }
        ],
        created_at: yesterday.toISOString()
      }
    ];
  };

  useEffect(() => {
    const fetchHistory = async () => {
      if (!phoneNumber) {
        setHistory([])
        setLoading(false)
        return
      }

      try {
        setLoading(true)

        // Use mock data instead of trying to fetch from Supabase
        // const historyData = await getPhoneNumberHistory(phoneNumber)
        const mockHistoryData = generateMockHistory(phoneNumber);

        // Simulate network delay
        setTimeout(() => {
          setHistory(mockHistoryData)
          setError(null)
          setLoading(false)
        }, 1000);
      } catch (err) {
        console.error('Error fetching spam check history:', err)
        setError('Failed to load history. Please try again.')
        setLoading(false)
      }
    }

    fetchHistory()
  }, [phoneNumber])

  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Spam Check History</CardTitle>
          <CardDescription>No history found for this number</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Spam Check History</h3>
      {history.map((check) => (
        <Card key={check.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">
                {formatPhoneNumber(check.phone_number)}
              </CardTitle>
              <Badge
                className={
                  check.status === 'clean'
                    ? 'bg-green-500'
                    : check.status === 'at-risk'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }
              >
                {check.status}
              </Badge>
            </div>
            <CardDescription>
              {formatDistanceToNow(new Date(check.created_at), { addSuffix: true })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Risk Score:</span>
                <span>{check.risk_score}/100</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Carriers:</span>
                <div className="flex space-x-2">
                  {check.carriers.map((carrier: any) => (
                    <Badge
                      key={carrier.name}
                      variant="outline"
                      className={
                        carrier.status === 'clean'
                          ? 'border-green-500 text-green-500'
                          : carrier.status === 'at-risk'
                          ? 'border-yellow-500 text-yellow-500'
                          : 'border-red-500 text-red-500'
                      }
                    >
                      {carrier.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
