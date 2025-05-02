import { ThemeProvider } from './components/theme-provider'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import HomePage from './components/HomePage'
import SpamCheckerPage from './components/SpamCheckerPage'
import SeparateWorkLinePage from './components/SeparateWorkLinePage'
import { Button } from './components/ui/button'
import { Toaster } from './components/ui/toaster'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

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

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1">
                    Use Cases <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/spam-checker" className="w-full">Fix Spam-Labeled Calls</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/separate-work-line" className="w-full">Separate Work From Life</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="#" className="w-full">Convert Site Visitors via SMS</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="#" className="w-full">Unify Team Replies</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="#" className="w-full">Expand Into New Regions</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

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
          <Route path="/separate-work-line" element={<SeparateWorkLinePage />} />
        </Routes>
      </div>
      <Toaster />
    </ThemeProvider>
  )
}