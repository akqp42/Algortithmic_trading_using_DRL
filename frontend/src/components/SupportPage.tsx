import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Alert, AlertDescription } from "./ui/alert";
import { MessageCircle, Send, CheckCircle2 } from "lucide-react@0.263.1";

export function SupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setEmail("");
      setMessage("");
    }, 3000);
  };

  const faqs = [
    {
      question: "How does the AI trading bot work?",
      answer:
        "Our bot uses Deep Reinforcement Learning to analyze market data, identify patterns, and execute trades automatically. It learns from millions of historical trades and continuously adapts its strategy to market conditions.",
    },
    {
      question: "Is KYC verification mandatory?",
      answer:
        "Yes, KYC verification is required before you can deposit funds and activate the trading bot. This ensures compliance with financial regulations and protects your account security.",
    },
    {
      question: "How do I deposit funds?",
      answer:
        "After completing KYC verification, navigate to the Dashboard and use the Deposit Funds section. You can deposit via bank transfer, credit card, or cryptocurrency transfer from your wallet.",
    },
    {
      question: "What is the Sharpe Ratio and why does it matter?",
      answer:
        "The Sharpe Ratio measures risk-adjusted returns. Our 2.86 ratio means we deliver exceptional returns relative to the risk taken. A ratio above 2.0 is considered excellent in finance.",
    },
    {
      question: "Can I withdraw my funds at any time?",
      answer:
        "Yes, you have full control over your funds. You can pause the bot and withdraw your balance at any time. Withdrawals typically process within 24-48 hours.",
    },
    {
      question: "What cryptocurrencies does the bot trade?",
      answer:
        "The bot trades major cryptocurrencies including Bitcoin (BTC), Ethereum (ETH), Solana (SOL), Cardano (ADA), and XRP across multiple trading pairs with USDT.",
    },
    {
      question: "How secure is my data and funds?",
      answer:
        "We use bank-level encryption, multi-signature wallets, and secure API key storage. Your funds are stored in reputable exchanges with cold storage options. We never have direct access to withdraw your funds.",
    },
    {
      question: "What are the fees?",
      answer:
        "We charge a performance-based fee of 20% on profits only. If the bot doesn't make you money, you don't pay. There are no hidden fees or monthly subscriptions.",
    },
  ];

  return (
    <div className="min-h-screen pt-24 px-6 pb-12">
      {/* Animated Background */}
      <div className="absolute inset-0 grid-background opacity-10 pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl mb-6 text-primary">Support & Help Center</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions or get in touch with our support team
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FAQs */}
          <div>
            <Card className="glassmorphism border-primary/30">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Frequently Asked Questions</CardTitle>
                <CardDescription>Quick answers to common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-primary/20">
                      <AccordionTrigger className="text-left hover:text-primary transition-colors">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="glassmorphism border-primary/30">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Contact Us</CardTitle>
                <CardDescription>Send us a message and we'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <Alert className="bg-secondary/10 border-secondary">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    <AlertDescription className="text-secondary">
                      Thank you! Your message has been sent successfully. We'll respond within 24 hours.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-input-background border-primary/20 focus:border-primary"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-input-background border-primary/20 focus:border-primary"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="How can we help you?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="bg-input-background border-primary/20 focus:border-primary min-h-32"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 glow-primary"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Quick Contact Info */}
            <Card className="glassmorphism border-primary/30 mt-6">
              <CardHeader>
                <CardTitle className="text-primary">Other Ways to Reach Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Email Support</p>
                  <p className="text-primary">support@cryptoai.com</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Live Chat</p>
                  <p className="text-muted-foreground">Available 24/7 for premium members</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Response Time</p>
                  <p className="text-secondary">Average: 4 hours</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Live Chat Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center glow-primary hover:scale-110 transition-transform shadow-lg z-50"
      >
        <MessageCircle className="w-6 h-6 text-primary-foreground" />
      </button>

      {/* Simple Chat Window */}
      {showChat && (
        <div className="fixed bottom-24 right-6 w-80 glassmorphism border-primary/30 rounded-xl shadow-2xl z-50">
          <div className="bg-gradient-to-r from-primary to-secondary p-4 rounded-t-xl">
            <h3 className="text-primary-foreground">AI Chat Support</h3>
            <p className="text-xs text-primary-foreground/80">We're here to help!</p>
          </div>
          <div className="p-4">
            <p className="text-sm text-muted-foreground mb-4">
              Hello! How can I assist you with your trading bot today?
            </p>
            <Input
              placeholder="Type your message..."
              className="bg-input-background border-primary/20"
            />
            <Button className="w-full mt-3 bg-primary text-primary-foreground">Send</Button>
          </div>
        </div>
      )}
    </div>
  );
}
