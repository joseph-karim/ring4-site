import { motion } from "framer-motion"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-6">Last updated: June 2, 2021</p>
              
              <p className="mb-6">
                Ring4, LLC ("Ring4", "we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application, website, and related services.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Personal Information</h3>
              <p className="mb-4">
                We collect information you provide directly to us, such as when you create an account, subscribe to our service, or contact us for support. This may include:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Name and contact information</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Payment information</li>
                <li>Communications you send to us</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">App Data</h3>
              <p className="mb-4">
                When you use our services, we automatically collect certain information, including:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Device information (type, operating system, unique identifiers)</li>
                <li>Log information (IP address, browser type, access times)</li>
                <li>Usage data (features used, interactions with the app)</li>
                <li>Location information (if you permit us to collect it)</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, investigate, and prevent fraudulent transactions</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Information Sharing</h2>
              <p className="mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information in the following situations:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>With service providers who perform services on our behalf</li>
                <li>To comply with legal obligations or respond to lawful requests</li>
                <li>To protect our rights, privacy, safety, or property</li>
                <li>In connection with a merger, sale, or acquisition of all or a portion of our company</li>
                <li>With your consent or at your direction</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Security</h2>
              <p className="mb-6">
                We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no security system is impenetrable, and we cannot guarantee the security of our systems 100%.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Your Choices</h2>
              <p className="mb-4">You have certain choices regarding your information:</p>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Account Information:</strong> You can update or correct your account information at any time</li>
                <li><strong>Communications:</strong> You can opt out of promotional communications</li>
                <li><strong>Location Information:</strong> You can disable location services through your device settings</li>
                <li><strong>Cookies:</strong> You can manage cookie preferences through your browser settings</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Children's Privacy</h2>
              <p className="mb-6">
                Our services are not directed to children under 13, and we do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will take steps to delete such information.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Policy</h2>
              <p className="mb-6">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="mb-2"><strong>Ring4, LLC</strong></p>
                <p className="mb-2">Email: support@ring4.com</p>
                <p className="mb-2">Address: 1550 Larimer St, Suite 649</p>
                <p>Denver, CO 80202</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}