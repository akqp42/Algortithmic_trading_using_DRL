import { Button } from "./ui/button";
import { Check, Zap } from "lucide-react@0.263.1";

export function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for beginners exploring automated trading",
      features: [
        "Up to $5,000 trading capital",
        "Basic AI trading algorithms",
        "Real-time portfolio tracking",
        "Email support",
        "Standard execution speed",
        "Monthly performance reports"
      ],
      highlight: false
    },
    {
      name: "Professional",
      price: "$99",
      period: "/month",
      description: "For serious traders ready to scale",
      features: [
        "Up to $50,000 trading capital",
        "Advanced Deep RL algorithms",
        "Priority execution",
        "24/7 priority support",
        "Custom risk parameters",
        "Advanced analytics & insights",
        "API access",
        "Weekly performance reports"
      ],
      highlight: true
    },
    {
      name: "Enterprise",
      price: "$299",
      period: "/month",
      description: "Maximum performance for institutional traders",
      features: [
        "Unlimited trading capital",
        "Premium AI models with latest updates",
        "Ultra-fast execution",
        "Dedicated account manager",
        "Custom algorithm tuning",
        "White-label solutions",
        "Full API access & webhooks",
        "Daily performance reports",
        "Priority feature requests"
      ],
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="absolute inset-0 grid-background opacity-30 pointer-events-none"></div>
      
      <div className="container mx-auto relative">
        <div className="text-center mb-16">
          <h1 className="text-5xl mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Transparent Pricing Plans
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that fits your trading goals. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`glassmorphism rounded-2xl p-8 hover:border-primary/50 transition-all ${
                plan.highlight ? 'border-2 border-primary glow-primary scale-105' : ''
              }`}
            >
              {plan.highlight && (
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-1 rounded-full text-sm flex items-center">
                    <Zap className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <h3 className={`text-2xl mb-2 ${plan.highlight ? 'text-primary' : 'text-secondary'}`}>
                {plan.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-5xl">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className={`w-5 h-5 mr-3 flex-shrink-0 ${plan.highlight ? 'text-primary' : 'text-secondary'}`} />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.highlight
                    ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 glow-primary'
                    : 'border-primary text-primary hover:bg-primary/10'
                }`}
                variant={plan.highlight ? 'default' : 'outline'}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            All plans include a 14-day money-back guarantee. Need a custom plan?{' '}
            <a href="mailto:support@cryonix.com" className="text-primary hover:text-secondary transition-colors">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
