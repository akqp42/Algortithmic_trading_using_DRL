import { AlertTriangle } from "lucide-react@0.263.1";

export function DisclaimerPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="absolute inset-0 grid-background opacity-30 pointer-events-none"></div>
      
      <div className="container mx-auto max-w-4xl relative">
        <div className="flex items-center justify-center mb-6">
          <AlertTriangle className="w-12 h-12 text-primary mr-4" />
          <h1 className="text-5xl bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Disclaimer
          </h1>
        </div>
        <p className="text-center text-muted-foreground mb-12">Last Updated: October 8, 2025</p>

        <div className="glassmorphism rounded-2xl p-8 space-y-8">
          <section className="bg-destructive/10 border border-destructive/30 rounded-lg p-6">
            <h2 className="text-2xl mb-4 text-destructive flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2" />
              Important Notice
            </h2>
            <p className="text-foreground leading-relaxed">
              <strong>CRYPTOCURRENCY TRADING INVOLVES SUBSTANTIAL RISK OF LOSS AND IS NOT SUITABLE FOR ALL INVESTORS.</strong> 
              {' '}The high degree of leverage available in cryptocurrency markets can work against you as well as for you. 
              Before deciding to trade cryptocurrencies, you should carefully consider your investment objectives, level of 
              experience, and risk appetite.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">1. No Guarantee of Profits</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cryonix provides AI-powered algorithmic trading tools, but we make no guarantees or promises regarding 
              trading performance or profitability. Past performance is not indicative of future results. The performance 
              statistics, Sharpe ratios, win rates, and other metrics displayed on our platform are based on historical 
              backtesting and simulated results, which may not reflect actual trading outcomes. Actual results may differ 
              significantly from historical or simulated performance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">2. Investment Risk</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You acknowledge and accept the following risks associated with cryptocurrency trading:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li><strong>Market Risk:</strong> Cryptocurrency markets are highly volatile and can experience rapid price movements</li>
              <li><strong>Liquidity Risk:</strong> Some cryptocurrencies may have limited trading volume</li>
              <li><strong>Technology Risk:</strong> Technical failures, bugs, or cyber attacks may affect trading operations</li>
              <li><strong>Regulatory Risk:</strong> Changes in laws or regulations may impact cryptocurrency trading</li>
              <li><strong>Counterparty Risk:</strong> Exchange failures or insolvency may result in loss of funds</li>
              <li><strong>Algorithm Risk:</strong> AI algorithms may not perform as expected under all market conditions</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong>You should only trade with money you can afford to lose.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">3. Not Financial Advice</h2>
            <p className="text-muted-foreground leading-relaxed">
              The information, tools, and services provided by Cryonix do not constitute financial, investment, trading, 
              or other professional advice. Our platform is designed to assist with automated trading execution based on 
              algorithmic strategies, but you are solely responsible for making your own investment decisions. We strongly 
              recommend consulting with a qualified financial advisor before making any investment decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">4. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cryonix integrates with third-party cryptocurrency exchanges and service providers. We are not responsible 
              for the performance, reliability, or security of these third-party services. Any losses resulting from 
              third-party service failures, exchange outages, or security breaches are beyond our control. We recommend 
              conducting your own due diligence on all third-party platforms you choose to use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">5. System Performance</h2>
            <p className="text-muted-foreground leading-relaxed">
              While we strive to maintain 24/7 platform availability, we cannot guarantee uninterrupted service. System 
              maintenance, technical issues, or unforeseen circumstances may result in temporary service disruptions. 
              We are not liable for any trading losses that may occur due to platform downtime, delayed execution, or 
              system errors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">6. Accuracy of Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We make reasonable efforts to ensure that information on our platform is accurate and up-to-date, but we 
              do not warrant the completeness or accuracy of any information, data, or content. Market data, price feeds, 
              and trading signals may contain errors or delays. You should independently verify all information before 
              making trading decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">7. Regulatory Compliance</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cryptocurrency regulations vary by jurisdiction. It is your responsibility to ensure that your use of 
              Cryonix complies with all applicable laws and regulations in your country or region. We do not provide 
              legal or tax advice. Some jurisdictions may prohibit or restrict cryptocurrency trading. You are responsible 
              for determining whether our services are available and legal in your location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">8. Backtested Results</h2>
            <p className="text-muted-foreground leading-relaxed">
              Performance metrics based on backtested data are hypothetical and have inherent limitations. Backtested 
              results assume perfect execution, no slippage, and historical data that may not repeat in the future. 
              They do not account for the impact of real-time market conditions, liquidity constraints, or emotional 
              factors in actual trading. Hypothetical performance results have many inherent limitations and may not 
              reflect actual trading results.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">9. User Responsibility</h2>
            <p className="text-muted-foreground leading-relaxed">
              By using Cryonix, you accept full responsibility for your trading decisions and outcomes. You agree to 
              monitor your account regularly, set appropriate risk parameters, and maintain adequate capital reserves. 
              We recommend starting with small amounts and gradually increasing your trading capital as you become 
              familiar with our platform and the cryptocurrency markets.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">10. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the maximum extent permitted by law, Cryonix and its affiliates, directors, employees, and agents 
              shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages 
              arising from your use of our services, including but not limited to trading losses, lost profits, or 
              data loss. This limitation applies regardless of the legal theory upon which such claim is based.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">11. Changes to This Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify this Disclaimer at any time. Material changes will be communicated through 
              our platform or via email. Your continued use of Cryonix after such changes constitutes acceptance of the 
              updated disclaimer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl mb-4 text-primary">12. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Disclaimer, please contact us at{' '}
              <a href="mailto:support@cryonix.com" className="text-primary hover:text-secondary transition-colors">
                support@cryonix.com
              </a>
            </p>
          </section>

          <div className="mt-8 p-6 bg-primary/10 border border-primary/30 rounded-lg">
            <p className="text-center text-foreground">
              <strong>By using Cryonix, you acknowledge that you have read, understood, and agree to this Disclaimer.</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
