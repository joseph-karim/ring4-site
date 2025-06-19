import { ThemeProvider } from './components/theme-provider'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import HomePage from './components/HomePage'
import SpamCheckerPage from './components/SpamCheckerPage'
import SeparateWorkLinePage from './components/SeparateWorkLinePage'
import NeverMissAIPage from './components/NeverMissAIPage'
import RealEstateAgentsPage from './components/RealEstateAgentsPage'
import ClaimReceptionistWizard from './components/ClaimReceptionistWizard'
import PricingPage from './components/PricingPage'
import PrivacyPolicyPage from './components/PrivacyPolicyPage'
import TermsOfServicePage from './components/TermsOfServicePage'
import TallyModal from './components/TallyModal'

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
  const isNeverMissAI = location.pathname === '/nevermiss-ai';
  const isRealEstateAgents = location.pathname === '/real-estate-agents';
  const isPricing = location.pathname === '/pricing';


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
                variant={isPricing ? 'default' : 'ghost'}
                asChild
              >
                <Link to="/pricing">Pricing</Link>
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
                    <Link to="#" className="w-full flex items-center justify-between">
                      <span>Convert Website Visitors via Text</span>
                      <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full ml-2">Coming Soon</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="#" className="w-full flex items-center justify-between">
                      <span>Unify Team Texts in One Inbox</span>
                      <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full ml-2">Coming Soon</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="#" className="w-full flex items-center justify-between">
                      <span>Expand Into New Regions</span>
                      <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full ml-2">Coming Soon</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant={isSpamChecker ? 'default' : 'ghost'}
                asChild
              >
                <Link to="/spam-checker">Spam Checker</Link>
              </Button>

              <Button
                variant={isNeverMissAI ? 'default' : 'ghost'}
                asChild
              >
                <Link to="/nevermiss-ai">NeverMiss AI</Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={isRealEstateAgents ? 'default' : 'ghost'}
                    className="flex items-center gap-1"
                  >
                    Who We Serve <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/real-estate-agents" className="w-full">Real Estate Agents</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="#" className="w-full flex items-center justify-between">
                      <span>Legal Professionals</span>
                      <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full ml-2">Coming Soon</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="#" className="w-full flex items-center justify-between">
                      <span>Insurance Agents</span>
                      <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full ml-2">Coming Soon</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="#" className="w-full flex items-center justify-between">
                      <span>Financial Advisors</span>
                      <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full ml-2">Coming Soon</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <TallyModal
                buttonText="Get Started"
                buttonClassName="bg-[#0055FF] hover:bg-[#003399] text-white ml-4 h-10 px-4 py-2 rounded-md font-medium inline-flex items-center justify-center"
                modalOptions={{
                  width: 500,
                  overlay: true
                }}
              />

            </div>
          </div>
        </div>

        {/* Content */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/spam-checker" element={<SpamCheckerPage />} />
          <Route path="/separate-work-line" element={<SeparateWorkLinePage />} />
          <Route path="/nevermiss-ai" element={<NeverMissAIPage />} />
          <Route path="/real-estate-agents" element={<RealEstateAgentsPage />} />
          <Route path="/claim-receptionist" element={<ClaimReceptionistWizard />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        </Routes>
      </div>
      <Toaster />
    </ThemeProvider>
  )
}