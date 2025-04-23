import { ThemeProvider } from './components/theme-provider'
import { useState } from 'react'
import HomePage from './components/HomePage'
import SpamCheckerPage from './components/SpamCheckerPage'
import { Button } from './components/ui/button'

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'spam-checker'>('home')

  return (
    <ThemeProvider defaultTheme="light" storageKey="ring4-theme">
      <div className="min-h-screen bg-background">
        {/* Simple Navigation */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="font-bold text-xl text-blue-600">Ring4</div>
            <div className="flex space-x-4">
              <Button 
                variant={currentPage === 'home' ? 'default' : 'ghost'} 
                onClick={() => setCurrentPage('home')}
              >
                Home
              </Button>
              <Button 
                variant={currentPage === 'spam-checker' ? 'default' : 'ghost'} 
                onClick={() => setCurrentPage('spam-checker')}
              >
                Spam Checker
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        {currentPage === 'home' ? (
          <HomePage />
        ) : (
          <SpamCheckerPage />
        )}
      </div>
    </ThemeProvider>
  )
}