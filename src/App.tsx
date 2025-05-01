import { ThemeProvider } from './components/theme-provider'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import HomePage from './components/HomePage'
import SpamCheckerPage from './components/SpamCheckerPage'
import { Button } from './components/ui/button'
import { Toaster } from './components/ui/toaster'

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '';
  const isSpamChecker = location.pathname === '/spam-checker';

  return (
    <ThemeProvider defaultTheme="light" storageKey="ring4-theme">
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/">
              <img src="https://www.ring4.com/hubfs/Images/r4_logo.svg" alt="Ring4 Logo" className="h-8" />
            </Link>
            <div className="flex space-x-4">
              <Button
                variant={isHome ? 'default' : 'ghost'}
                asChild
              >
                <Link to="/">Home</Link>
              </Button>
              <Button
                variant={isSpamChecker ? 'default' : 'ghost'}
                asChild
              >
                <Link to="/spam-checker">Spam Checker</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/spam-checker" element={<SpamCheckerPage />} />
        </Routes>
      </div>
      <Toaster />
    </ThemeProvider>
  )
}