import { Brain, Zap, Shield, TrendingUp, Activity, Lock, Key, Award } from "lucide-react@0.263.1";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function FeaturesPage() {
  const features = [
    {
      icon: Brain,
      title: "Reinforcement Learning Engine",
      description:
        "Our proprietary Deep RL algorithm learns from millions of market scenarios, continuously improving its trading strategies through trial and error, just like a professional trader with years of experience.",
      color: "text-primary",
      bgColor: "bg-primary/20",
    },
    {
      icon: Zap,
      title: "Automated Trade Execution",
      description:
        "Execute trades in milliseconds with our high-frequency trading infrastructure. Never miss an opportunity with instant order placement and real-time market scanning.",
      color: "text-secondary",
      bgColor: "bg-secondary/20",
    },
    {
      icon: Activity,
      title: "24/7 Market Monitoring",
      description:
        "The bot never sleeps. It monitors global crypto markets around the clock, analyzing thousands of data points per second to identify profitable trading opportunities.",
      color: "text-primary",
      bgColor: "bg-primary/20",
    },
    {
      icon: Shield,
      title: "Risk Management Algorithms",
      description:
        "Advanced risk controls protect your capital with intelligent stop-losses, dynamic position sizing, and portfolio diversification across multiple cryptocurrencies.",
      color: "text-secondary",
      bgColor: "bg-secondary/20",
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics Dashboard",
      description:
        "Track every metric that matters with our comprehensive dashboard. Monitor performance, analyze trades, and get detailed insights into your portfolio's growth.",
      color: "text-primary",
      bgColor: "bg-primary/20",
    },
    {
      icon: Lock,
      title: "Secure Cloud Wallet Integration",
      description:
        "Your funds are protected with military-grade encryption and multi-signature security. We integrate with the most trusted crypto exchanges and wallets.",
      color: "text-secondary",
      bgColor: "bg-secondary/20",
    },
    {
      icon: Key,
      title: "User-Controlled API Keys",
      description:
        "Maintain complete control over your assets. Your API keys are encrypted and stored securely. You can revoke access at any time with a single click.",
      color: "text-primary",
      bgColor: "bg-primary/20",
    },
    {
      icon: Award,
      title: "High Sharpe Ratio (2.86) Performance",
      description:
        "Our model consistently delivers exceptional risk-adjusted returns with a verified Sharpe Ratio of 2.86, significantly outperforming traditional trading strategies.",
      color: "text-secondary",
      bgColor: "bg-secondary/20",
    },
  ];

  return (
    <div className="min-h-screen pt-24 px-6 pb-12">
      {/* Animated Background */}
      <div className="absolute inset-0 grid-background opacity-10 pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl mb-6 text-primary">Powerful Features</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the next generation of crypto trading with our AI-powered platform built on cutting-edge Deep
            Reinforcement Learning technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="glassmorphism border-primary/30 hover:border-primary/50 transition-all group"
              >
                <CardHeader>
                  <div
                    className={`w-14 h-14 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <CardTitle className={feature.color}>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Performance Highlights */}
        <Card className="glassmorphism border-2 border-primary/40 glow-primary">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-primary mb-2">Why Choose CryptoAI?</CardTitle>
            <CardDescription className="text-lg">
              Industry-leading performance backed by advanced AI technology
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-2 text-primary glow-text">2.86</div>
                <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
                <p className="text-xs text-muted-foreground mt-2">Best-in-class risk-adjusted returns</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-2 text-secondary glow-text">57%</div>
                <div className="text-sm text-muted-foreground">Win Rate</div>
                <p className="text-xs text-muted-foreground mt-2">Consistently profitable trades</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-2 text-primary glow-text">24/7</div>
                <div className="text-sm text-muted-foreground">Active Trading</div>
                <p className="text-xs text-muted-foreground mt-2">Never miss a market opportunity</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-2 text-secondary glow-text">5.8%</div>
                <div className="text-sm text-muted-foreground">Max Drawdown</div>
                <p className="text-xs text-muted-foreground mt-2">Superior capital protection</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
