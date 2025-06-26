import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { checkPhoneNumber } from '@/lib/spam-check'
import {
  Phone,
  Loader2,
  ShieldCheck,
  ShieldX,
  AlertTriangle,
  ArrowRight
} from 'lucide-react'
import TallyModal from '@/components/TallyModal'

const formSchema = z.object({
  phoneNumber: z.string().min(10, {
    message: 'Phone number must be at least 10 digits',
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function SpamCheckerTool() {
  const [isChecking, setIsChecking] = useState(false)
  const [checkResult, setCheckResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: '',
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsChecking(true)
    setShowResult(false)

    try {
      const formattedNumber = data.phoneNumber.replace(/\D/g, '')
      const result = await checkPhoneNumber(formattedNumber)
      setCheckResult(result)
      setShowResult(true)
    } catch (error) {
      console.error('Error checking phone number:', error)
      form.setError('phoneNumber', { 
        message: 'Failed to check number. Please try again.' 
      })
    } finally {
      setIsChecking(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'clean':
        return <ShieldCheck className="h-8 w-8 text-green-500" />
      case 'at-risk':
        return <AlertTriangle className="h-8 w-8 text-yellow-500" />
      case 'flagged':
        return <ShieldX className="h-8 w-8 text-red-500" />
      default:
        return <Phone className="h-8 w-8 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'clean':
        return 'bg-green-500'
      case 'at-risk':
        return 'bg-yellow-500'
      case 'flagged':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Free Spam Reputation Check
          </CardTitle>
          <CardDescription>
            Enter your business phone number to see how it appears to recipients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          {...field}
                          placeholder="(555) 123-4567"
                          className="pl-10 text-lg"
                          disabled={isChecking}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isChecking}
              >
                {isChecking ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    Check Number
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <AnimatePresence>
        {showResult && checkResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={`border-2 ${
              checkResult.status === 'clean' ? 'border-green-200' :
              checkResult.status === 'at-risk' ? 'border-yellow-200' :
              'border-red-200'
            }`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(checkResult.status)}
                    <div>
                      <CardTitle>
                        {checkResult.status === 'clean' ? 'Good News!' :
                         checkResult.status === 'at-risk' ? 'Warning' :
                         'Action Required'}
                      </CardTitle>
                      <CardDescription>
                        Your number reputation analysis
                      </CardDescription>
                    </div>
                  </div>
                  <Badge 
                    variant={checkResult.status === 'clean' ? 'default' : 'destructive'}
                    className={getStatusColor(checkResult.status)}
                  >
                    {checkResult.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Risk Score */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Risk Score</span>
                    <span className="text-sm font-bold">{checkResult.riskScore}/100</span>
                  </div>
                  <Progress 
                    value={checkResult.riskScore} 
                    className={`h-3 ${
                      checkResult.riskScore < 30 ? 'bg-green-100' :
                      checkResult.riskScore < 70 ? 'bg-yellow-100' :
                      'bg-red-100'
                    }`}
                  />
                </div>

                {/* Carrier Status */}
                <div>
                  <h4 className="font-medium mb-3">Carrier Reports</h4>
                  <div className="space-y-2">
                    {checkResult.carriers.map((carrier: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{carrier.name}</span>
                        <Badge 
                          variant={carrier.status === 'clean' ? 'outline' : 'destructive'}
                          className="text-xs"
                        >
                          {carrier.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h4 className="font-medium mb-3">Recommendations</h4>
                  <ul className="space-y-2">
                    {checkResult.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA based on status */}
                <div className="pt-4 border-t">
                  {checkResult.status === 'clean' ? (
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-3">
                        Your number is in good standing, but protect it with Ring4's advanced features
                      </p>
                      <TallyModal
                        buttonText="Protect My Number"
                        buttonClassName="bg-green-600 hover:bg-green-700 text-white"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-3">
                        {checkResult.status === 'at-risk' 
                          ? "Your number is at risk. Fix it before it gets worse."
                          : "Your number is hurting your business. Fix it now."}
                      </p>
                      <TallyModal
                        buttonText="Fix My Number Now"
                        buttonClassName="bg-red-600 hover:bg-red-700 text-white w-full"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}