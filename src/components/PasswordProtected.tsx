import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Lock, Eye, EyeOff } from 'lucide-react'

interface PasswordProtectedProps {
  children: React.ReactNode
  storageKey?: string
}

export default function PasswordProtected({ children, storageKey = 'ring4-seo-auth' }: PasswordProtectedProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const correctPassword = 'ring4seo'

  useEffect(() => {
    // Check if already authenticated
    const stored = localStorage.getItem(storageKey)
    if (stored === correctPassword) {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [storageKey])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password === correctPassword) {
      setIsAuthenticated(true)
      localStorage.setItem(storageKey, password)
      setError('')
    } else {
      setError('Incorrect password')
      setPassword('')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem(storageKey)
    setPassword('')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle>Protected Content</CardTitle>
            <CardDescription>
              Enter the password to access Ring4 SEO templates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={error ? 'border-red-500' : ''}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
              
              <Button type="submit" className="w-full">
                Access Templates
              </Button>
            </form>
            
            <div className="mt-6 pt-6 border-t text-center">
              <p className="text-sm text-gray-600">
                These are internal SEO templates for Ring4 review purposes.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div>
      {/* Logout button for authenticated users */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="text-sm text-blue-700">
            🔒 SEO Template Preview Mode
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="text-blue-700 border-blue-300 hover:bg-blue-100"
          >
            Logout
          </Button>
        </div>
      </div>
      {children}
    </div>
  )
}