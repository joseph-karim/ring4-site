import { motion } from "framer-motion"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-6">Last updated: January 1, 2025</p>
              
              <p className="mb-6">
                These Terms of Service ("Terms") govern your use of Ring4's services, including our mobile applications, website, and all related services (collectively, the "Service") operated by Ring4, LLC ("Ring4", "we", "our", or "us").
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
              <p className="mb-6">
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Service</h2>
              <p className="mb-6">
                Ring4 provides cloud-based phone system services, including but not limited to voice calling, text messaging, team collaboration features, and related communication services. The Service is available through web browsers, desktop applications, and mobile applications.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">3. Account Registration</h2>
              <p className="mb-4">To use certain features of the Service, you must register for an account. You agree to:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain the security of your password and account</li>
                <li>Promptly update your account information</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Acceptable Use</h2>
              <p className="mb-4">You agree not to use the Service to:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Violate any laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Transmit spam, viruses, or harmful code</li>
                <li>Engage in any fraudulent or deceptive practices</li>
                <li>Harass, abuse, or harm others</li>
                <li>Attempt to gain unauthorized access to any systems</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Use the Service for any illegal or unauthorized purpose</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Payment Terms</h2>
              <p className="mb-4">For paid services:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>You agree to pay all fees according to your selected plan</li>
                <li>Fees are billed in advance on a monthly or annual basis</li>
                <li>All fees are non-refundable except as required by law</li>
                <li>We offer a 30-day money-back guarantee for new customers</li>
                <li>We reserve the right to change our fees with 30 days' notice</li>
                <li>You are responsible for all applicable taxes</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Intellectual Property</h2>
              <p className="mb-6">
                The Service and its original content, features, and functionality are owned by Ring4 and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our Service without our express written permission.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Privacy</h2>
              <p className="mb-6">
                Your use of the Service is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">8. Communications</h2>
              <p className="mb-6">
                By using our Service, you consent to receive electronic communications from us. These communications may include notices about your account, updates to the Service, and promotional information. You can opt out of promotional communications at any time.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">9. Termination</h2>
              <p className="mb-6">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including breach of these Terms. Upon termination, your right to use the Service will cease immediately. You may cancel your account at any time through your account settings or by contacting support.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">10. Disclaimers</h2>
              <p className="mb-6">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">11. Limitation of Liability</h2>
              <p className="mb-6">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, RING4 SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">12. Indemnification</h2>
              <p className="mb-6">
                You agree to indemnify and hold harmless Ring4 and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including reasonable attorneys' fees) arising from your use of the Service or violation of these Terms.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">13. Governing Law</h2>
              <p className="mb-6">
                These Terms shall be governed by and construed in accordance with the laws of the State of Colorado, United States, without regard to its conflict of law provisions.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">14. Changes to Terms</h2>
              <p className="mb-6">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">15. Contact Information</h2>
              <p className="mb-4">
                If you have any questions about these Terms, please contact us at:
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