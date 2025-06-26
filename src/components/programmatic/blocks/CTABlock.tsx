import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import TallyModal from '@/components/TallyModal'
import { Clock, Users } from 'lucide-react'

interface CTAConfig {
  primary: string
  secondary?: string
  style?: 'urgent' | 'standard' | 'minimal'
  urgency?: string
  socialProof?: string
}

interface CTABlockProps {
  config: CTAConfig
  className?: string
}

export default function CTABlock({ config, className = '' }: CTABlockProps) {
  const getButtonStyle = () => {
    switch (config.style) {
      case 'urgent':
        return 'bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-4'
      case 'minimal':
        return 'bg-gray-900 hover:bg-gray-800 text-white'
      default:
        return 'bg-[#0055FF] hover:bg-[#003399] text-white text-lg px-6 py-3'
    }
  }

  return (
    <motion.div 
      className={`space-y-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <TallyModal
          buttonText={config.primary}
          buttonClassName={`${getButtonStyle()} rounded-lg font-semibold inline-flex items-center gap-2`}
          modalOptions={{
            width: 500,
            overlay: true
          }}
        />
        
        {config.secondary && (
          <Button
            variant="outline"
            size="lg"
            className="text-gray-700 border-gray-300"
          >
            {config.secondary}
          </Button>
        )}
      </div>

      {config.urgency && (
        <motion.p 
          className="text-sm text-red-600 font-medium flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Clock className="h-4 w-4" />
          {config.urgency}
        </motion.p>
      )}

      {config.socialProof && (
        <motion.p 
          className="text-sm text-gray-600 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Users className="h-4 w-4" />
          {config.socialProof}
        </motion.p>
      )}
    </motion.div>
  )
}