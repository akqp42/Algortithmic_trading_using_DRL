export function CookiePolicyPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="absolute inset-0 grid-background opacity-30 pointer-events-none"></div>
      
      <div className="container mx-auto max-w-4xl relative">
        <h1 className="text-5xl mb-6 text-center bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
          Cookie Policy
        </h1>
        <p className="text-center text-muted-foreground mb-12">Last Updated: October 8, 2025</p>

        <div className="glassmorphism rounded-2xl p-8 space-y-8">
          <section>
            <h2 className="text-2xl mb-4 text-primary">1. What Are Cookies?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cookies are small text files that are placed on your device when you visit our website. They help 
              us provide you with a better experience by remembering your preferences, analyzing how you use our 
              platform, and improving our services. Cookies can be "persistent" (remaining on your device until 
              deleted) or "session" (deleted when you close your browser).
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">2. Types of Cookies We Use</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl mb-2 text-secondary">Essential Cookies</h3>
                <p className="text-muted-foreground leading-relaxed">
                  These cookies are necessary for the platform to function properly. They enable core functionality 
                  such as security, authentication, and accessibility. You cannot opt-out of essential cookies as 
                  they are required for the service to work.
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4 mt-2">
                  <li>Session management and user authentication</li>
                  <li>Security and fraud prevention</li>
                  <li>Load balancing and platform stability</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl mb-2 text-secondary">Functional Cookies</h3>
                <p className="text-muted-foreground leading-relaxed">
                  These cookies allow us to remember your preferences and provide enhanced features. They improve 
                  your user experience by personalizing content and settings.
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4 mt-2">
                  <li>Language and region preferences</li>
                  <li>Trading dashboard customization</li>
                  <li>Theme and display settings</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl mb-2 text-secondary">Analytics Cookies</h3>
                <p className="text-muted-foreground leading-relaxed">
                  These cookies help us understand how users interact with our platform. They collect information 
                  about page visits, traffic sources, and user behavior to help us improve our services.
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4 mt-2">
                  <li>Platform usage statistics</li>
                  <li>Feature engagement tracking</li>
                  <li>Performance monitoring</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl mb-2 text-secondary">Marketing Cookies</h3>
                <p className="text-muted-foreground leading-relaxed">
                  These cookies track your online activity to help us deliver more relevant advertising and measure 
                  the effectiveness of our marketing campaigns.
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4 mt-2">
                  <li>Targeted advertising</li>
                  <li>Retargeting campaigns</li>
                  <li>Social media integration</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">3. Third-Party Cookies</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may use third-party services that set their own cookies. These include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li><strong>Google Analytics:</strong> For website analytics and performance tracking</li>
              <li><strong>Payment Processors:</strong> For secure payment processing</li>
              <li><strong>Customer Support Tools:</strong> For chat and helpdesk functionality</li>
              <li><strong>Social Media Platforms:</strong> For social sharing and login features</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              These third parties have their own privacy policies and cookie practices. We recommend reviewing 
              their policies to understand how they use cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">4. Managing Cookie Preferences</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You have several options to manage cookies:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li><strong>Browser Settings:</strong> Most browsers allow you to refuse or delete cookies through their settings</li>
              <li><strong>Opt-Out Tools:</strong> Use browser extensions or industry opt-out tools</li>
              <li><strong>Platform Settings:</strong> Adjust your cookie preferences in your Cryonix account settings</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Please note that disabling certain cookies may affect the functionality of our platform and limit 
              your ability to use some features.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">5. Browser-Specific Instructions</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Here's how to manage cookies in popular browsers:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
              <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
              <li><strong>Edge:</strong> Settings → Cookies and site permissions → Manage cookies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">6. Do Not Track Signals</h2>
            <p className="text-muted-foreground leading-relaxed">
              Some browsers include a "Do Not Track" (DNT) feature that signals to websites that you do not want 
              your online activity tracked. Our platform currently does not respond to DNT signals, but we respect 
              your privacy choices made through cookie settings and our privacy controls.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">7. Updates to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in our practices or legal 
              requirements. We will notify you of significant changes by posting the updated policy on our website 
              and updating the "Last Updated" date at the top of this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">8. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about our use of cookies, please contact us at{' '}
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
