export function TermsPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="absolute inset-0 grid-background opacity-30 pointer-events-none"></div>
      
      <div className="container mx-auto max-w-4xl relative">
        <h1 className="text-5xl mb-6 text-center bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
          Terms of Use
        </h1>
        <p className="text-center text-muted-foreground mb-12">Last Updated: October 8, 2025</p>

        <div className="glassmorphism rounded-2xl p-8 space-y-8">
          <section>
            <h2 className="text-2xl mb-4 text-primary">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using Cryonix's services, you accept and agree to be bound by these Terms of Use. 
              If you do not agree to these terms, please do not use our platform. These terms govern your access 
              to and use of our AI-powered algorithmic trading services, including any content, functionality, 
              and services offered on or through our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">2. Service Description</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cryonix provides subscription-based automated cryptocurrency trading services powered by artificial 
              intelligence and deep reinforcement learning algorithms. Our platform is designed to assist retail 
              investors with portfolio optimization and automated trading execution. The service operates on a 
              subscription model with transparent pricing and no hidden fees.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">3. User Responsibilities</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              As a user of Cryonix, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Provide accurate and complete information during registration</li>
              <li>Maintain the security and confidentiality of your account credentials</li>
              <li>Comply with all applicable laws and regulations regarding cryptocurrency trading</li>
              <li>Not use the service for any illegal or unauthorized purpose</li>
              <li>Accept full responsibility for all trading activities conducted through your account</li>
              <li>Complete KYC verification as required by regulatory compliance</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">4. Trading Risks</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cryptocurrency trading involves substantial risk of loss. Past performance is not indicative of 
              future results. While our AI algorithms are designed to optimize trading performance, we cannot 
              guarantee profits or prevent losses. You acknowledge that you are solely responsible for your 
              trading decisions and outcomes. You should only trade with capital you can afford to lose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">5. Subscription and Payment</h2>
            <p className="text-muted-foreground leading-relaxed">
              Subscription fees are billed monthly in advance. You may cancel your subscription at any time, 
              effective at the end of the current billing period. We offer a 14-day money-back guarantee for 
              new subscribers. Refunds are processed within 7-10 business days. All fees are exclusive of 
              applicable taxes unless otherwise stated.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">6. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content, algorithms, software, trademarks, and intellectual property on the Cryonix platform 
              are owned by Cryonix or its licensors. You are granted a limited, non-exclusive, non-transferable 
              license to access and use the service for your personal trading activities only. You may not 
              reproduce, distribute, or create derivative works from our proprietary algorithms or content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">7. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cryonix and its affiliates shall not be liable for any indirect, incidental, special, or 
              consequential damages arising from your use of the service. Our total liability shall not exceed 
              the amount of subscription fees paid by you in the 12 months preceding the claim. This limitation 
              applies to all claims, whether based on warranty, contract, tort, or any other legal theory.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">8. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to suspend or terminate your account at any time for violation of these 
              terms, fraudulent activity, or any conduct we deem harmful to our platform or other users. 
              Upon termination, your right to use the service will immediately cease, and any outstanding 
              trades will be executed or cancelled according to your account settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">9. Modifications to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cryonix reserves the right to modify these Terms of Use at any time. We will notify users of 
              significant changes via email or platform notifications. Your continued use of the service 
              after such modifications constitutes your acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">10. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions regarding these Terms of Use, please contact us at{' '}
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
