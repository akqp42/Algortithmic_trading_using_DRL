export function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="absolute inset-0 grid-background opacity-30 pointer-events-none"></div>
      
      <div className="container mx-auto max-w-4xl relative">
        <h1 className="text-5xl mb-6 text-center bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <p className="text-center text-muted-foreground mb-12">Last Updated: October 8, 2025</p>

        <div className="glassmorphism rounded-2xl p-8 space-y-8">
          <section>
            <h2 className="text-2xl mb-4 text-primary">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              At Cryonix, we are committed to protecting your privacy and ensuring the security of your personal 
              information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data 
              when you use our AI-powered algorithmic trading platform. We comply with applicable data protection 
              laws and regulations, including GDPR and other international privacy standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">2. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We collect several types of information to provide and improve our services:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li><strong>Account Information:</strong> Email address, password, username, and profile details</li>
              <li><strong>KYC Information:</strong> Government-issued ID, proof of address, phone number for identity verification</li>
              <li><strong>Financial Information:</strong> Trading account details, transaction history, wallet addresses</li>
              <li><strong>Usage Data:</strong> Platform interaction data, trading preferences, algorithm performance metrics</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, cookies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">3. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Your information is used for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Providing and maintaining our automated trading services</li>
              <li>Processing transactions and managing your subscription</li>
              <li>Complying with KYC/AML regulatory requirements</li>
              <li>Improving our AI algorithms and platform performance</li>
              <li>Sending important service updates and notifications</li>
              <li>Providing customer support and responding to inquiries</li>
              <li>Preventing fraud and ensuring platform security</li>
              <li>Analyzing usage patterns to enhance user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">4. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard security measures to protect your personal information, including 
              encryption, secure servers, firewalls, and regular security audits. Your trading data is encrypted 
              both in transit and at rest. We use multi-factor authentication and advanced access controls to 
              prevent unauthorized access. However, no method of transmission over the internet is 100% secure, 
              and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">5. Data Sharing and Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We do not sell your personal information. We may share your data only in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li><strong>Service Providers:</strong> Third-party vendors who assist in operating our platform</li>
              <li><strong>Regulatory Compliance:</strong> Government authorities when required by law</li>
              <li><strong>Legal Obligations:</strong> In response to valid legal processes or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              All third-party service providers are contractually obligated to maintain the confidentiality and 
              security of your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">6. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You have the following rights regarding your personal data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Update or correct inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your account and data</li>
              <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Restrict Processing:</strong> Limit how we use your information</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              To exercise these rights, please contact us at{' '}
              <a href="mailto:support@cryonix.com" className="text-primary hover:text-secondary transition-colors">
                support@cryonix.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">7. Cookies and Tracking</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use cookies and similar tracking technologies to enhance your experience on our platform. 
              Cookies help us remember your preferences, analyze platform usage, and provide personalized 
              content. You can control cookie settings through your browser, but disabling cookies may affect 
              platform functionality. For more details, please see our Cookie Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">8. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal information for as long as your account is active or as needed to provide 
              services. After account closure, we may retain certain data for legal, regulatory, or legitimate 
              business purposes, including fraud prevention and compliance with financial record-keeping requirements. 
              Typically, data is retained for 7 years after account closure to comply with financial regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">9. International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your information may be transferred to and processed in countries other than your country of 
              residence. We ensure that appropriate safeguards are in place to protect your data during 
              international transfers, in compliance with applicable data protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">10. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy periodically to reflect changes in our practices or legal 
              requirements. We will notify you of significant changes via email or platform notifications. 
              Your continued use of our services after such changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">11. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us at{' '}
              <a href="mailto:support@cryonix.com" className="text-primary hover:text-secondary transition-colors">
                support@cryonix.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
