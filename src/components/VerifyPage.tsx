import { useState } from 'react'
import { motion } from 'framer-motion'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { LoaderCircle, Phone, CheckCircle, AlertCircle } from 'lucide-react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Badge } from '@/components/ui/badge'
import { formatPhoneNumber, formatToE164, sendVerificationCode, verifyCode } from '@/lib/verify'

// Define the phone number form schema
const phoneFormSchema = z.object({
  phoneNumber: z.string().min(10, {
    message: 'Phone number must be at least 10 digits',
  }),
})

// Define the verification code form schema
const verifyFormSchema = z.object({
  code: z.string().length(6, {
    message: 'Verification code must be 6 digits',
  }),
})

type PhoneFormValues = z.infer<typeof phoneFormSchema>
type VerifyFormValues = z.infer<typeof verifyFormSchema>



export default function VerifyPage() {
  const [step, setStep] = useState<'phone' | 'verify'>('phone')
  const [isLoading, setIsLoading] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const { toast } = useToast()

  // Initialize phone form
  const phoneForm = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: {
      phoneNumber: '',
    },
  })

  // Initialize verification code form
  const verifyForm = useForm<VerifyFormValues>({
    resolver: zodResolver(verifyFormSchema),
    defaultValues: {
      code: '',
    },
  })

  // Handle phone form submission
  const onPhoneSubmit = async (data: PhoneFormValues) => {
    setIsLoading(true)

    try {
      // Format phone number to E.164 format and save it
      const formattedNumber = formatToE164(data.phoneNumber)
      setPhoneNumber(formattedNumber)

      // Send verification code
      await sendVerificationCode(data.phoneNumber)

      // Move to verification step
      setStep('verify')
      toast({
        title: 'Verification code sent',
        description: 'Please check your phone for the verification code',
      })
    } catch (error) {
      console.error('Error sending verification code:', error)
      if (error instanceof Error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Handle verification code form submission
  const onVerifySubmit = async (data: VerifyFormValues) => {
    setIsLoading(true)

    try {
      // Verify the code
      const result = await verifyCode(phoneNumber, data.code)

      if (result.valid) {
        setVerificationStatus('success')
        toast({
          title: 'Verification successful',
          description: 'Your phone number has been verified',
        })
      } else {
        setVerificationStatus('error')
        toast({
          title: 'Verification failed',
          description: 'The code you entered is incorrect',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Error verifying code:', error)
      setVerificationStatus('error')
      if (error instanceof Error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        })
      }
    } finally {
      setIsLoading(false)
    }
  }



  // Handle resend verification code
  const handleResendCode = async () => {
    setIsLoading(true)

    try {
      // Resend verification code
      await sendVerificationCode(phoneNumber)

      toast({
        title: 'Verification code resent',
        description: 'Please check your phone for the new verification code',
      })
    } catch (error) {
      console.error('Error resending verification code:', error)
      if (error instanceof Error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Phone Verification</h1>
            <p className="text-gray-600 mt-2">
              Verify your phone number to secure your account
            </p>
          </div>

          {step === 'phone' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Enter Your Phone Number</CardTitle>
                  <CardDescription>
                    We'll send you a verification code via SMS
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...phoneForm}>
                    <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
                      <FormField
                        control={phoneForm.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  placeholder="(555) 123-4567"
                                  className="pl-10"
                                  {...field}
                                  onChange={(e) => {
                                    const formattedValue = formatPhoneNumber(e.target.value)
                                    field.onChange(formattedValue)
                                  }}
                                  disabled={isLoading}
                                />
                              </FormControl>
                              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <Phone className="h-4 w-4" />
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="relative">
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isLoading || !phoneForm.formState.isValid}
                        >
                          {isLoading ? (
                            <span className="flex items-center">
                              <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
                              Sending...
                            </span>
                          ) : (
                            <span>Send Verification Code</span>
                          )}
                        </Button>
                        <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-white">Coming Soon</Badge>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Enter Verification Code</CardTitle>
                  <CardDescription>
                    We sent a 6-digit code to {phoneNumber}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...verifyForm}>
                    <form onSubmit={verifyForm.handleSubmit(onVerifySubmit)} className="space-y-6">
                      <FormField
                        control={verifyForm.control}
                        name="code"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <InputOTP
                                maxLength={6}
                                {...field}
                                disabled={isLoading}
                              >
                                <InputOTPGroup>
                                  <InputOTPSlot index={0} />
                                  <InputOTPSlot index={1} />
                                  <InputOTPSlot index={2} />
                                  <InputOTPSlot index={3} />
                                  <InputOTPSlot index={4} />
                                  <InputOTPSlot index={5} />
                                </InputOTPGroup>
                              </InputOTP>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {verificationStatus === 'success' && (
                        <div className="flex items-center p-3 bg-green-50 text-green-700 rounded-md">
                          <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                          <span>Verification successful!</span>
                        </div>
                      )}

                      {verificationStatus === 'error' && (
                        <div className="flex items-center p-3 bg-red-50 text-red-700 rounded-md">
                          <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                          <span>Invalid verification code. Please try again.</span>
                        </div>
                      )}

                      <div className="space-y-3">
                        <div className="relative">
                          <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading || !verifyForm.formState.isValid}
                          >
                            {isLoading ? (
                              <span className="flex items-center">
                                <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
                                Verifying...
                              </span>
                            ) : (
                              <span>Verify Code</span>
                            )}
                          </Button>
                          <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-white">Coming Soon</Badge>
                        </div>

                        <div className="text-center">
                          <Button
                            type="button"
                            variant="link"
                            onClick={handleResendCode}
                            disabled={isLoading}
                          >
                            Didn't receive a code? Resend
                          </Button>
                        </div>

                        <div className="text-center">
                          <Button
                            type="button"
                            variant="link"
                            onClick={() => setStep('phone')}
                            disabled={isLoading}
                          >
                            Use a different phone number
                          </Button>
                        </div>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
