import { Button } from "./ui/button";
import { ArrowRight, Brain, Shield, TrendingUp, Zap, Lock, Activity } from "lucide-react@0.263.1";
import ayushSinghPhoto from "figma:asset/ccbef3f670d4778c841431e6c875ee05d35a626a.png";
import ayushKumarPhoto from "figma:asset/816783cb9a76417b9cf4f786be8d717a9ff32198.png";
import cryonixLogo from "figma:asset/76b1bb24cad881e747c400cc19260a706cb1f22d.png";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Animated Background */}
      <div className="absolute inset-0 grid-background opacity-30 pointer-events-none"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          ></div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className="flex flex-col items-center mb-8">
            <div className="glow-logo mb-4">
              <img src={cryonixLogo} alt="Cryonix - Trading on Autopilot" className="h-32 w-auto" />
            </div>
            <div className="relative inline-block">
              <div className="absolute inset-0 blur-3xl opacity-60" style={{ background: 'radial-gradient(ellipse at center, #FFD700 0%, rgba(255, 215, 0, 0.4) 40%, transparent 70%)', transform: 'scale(1.3)' }}></div>
              <h1 className="relative text-6xl md:text-7xl tracking-wider bg-gradient-to-r from-[#3E2723] via-[#CD7F32] to-[#8B4513] bg-clip-text text-transparent" style={{ fontWeight: 700, textShadow: '0 0 30px rgba(205, 127, 50, 0.5), 0 0 60px rgba(255, 215, 0, 0.3)', WebkitTextStroke: '2px #2C1810', textStroke: '2px #2C1810', paintOrder: 'stroke fill' }}>
                CRYONIX
              </h1>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-[#1a4d5c] via-[#8B6914] to-[#1a4d5c] bg-clip-text text-transparent title-stroke" style={{ textShadow: '0 0 30px rgba(139, 105, 20, 0.4), 0 0 60px rgba(205, 127, 50, 0.25)' }}>
            AI-Powered Crypto Portfolio<br />Optimization and Trading
          </h2>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Cryonix is the Netflix of Algo-Trading – automated trading on subscription, tailored for retail investors.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => onNavigate("createAccount")}
              size="lg"
              className="bg-gradient-to-r from-[#8B6914] via-[#CD7F32] to-[#8B6914] text-white hover:opacity-90 transition-all text-lg px-8 py-6"
              style={{ boxShadow: '0 0 20px rgba(205, 127, 50, 0.5), 0 0 40px rgba(139, 105, 20, 0.3)' }}
            >
              Get Started <ArrowRight className="ml-2" />
            </Button>
            <Button
              onClick={() => onNavigate("login")}
              size="lg"
              variant="outline"
              className="border-[#8B6914] text-[#8B6914] hover:bg-[#8B6914]/10 text-lg px-8 py-6"
            >
              Login
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20 max-w-3xl mx-auto">
            <div className="glassmorphism rounded-xl p-6 hover:border-primary/50 transition-all">
              <div className="text-4xl mb-2 text-secondary">57%</div>
              <div className="text-sm text-muted-foreground">Win Rate</div>
            </div>
            <div className="glassmorphism rounded-xl p-6 hover:border-primary/50 transition-all">
              <div className="text-4xl mb-2 text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Active Trading</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Cryonix Section */}
      <section id="about-section" className="relative py-20 px-6 bg-gradient-to-b from-transparent to-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 text-primary title-stroke">About Cryonix</h2>
            <p className="text-xl text-foreground max-w-4xl mx-auto leading-relaxed mb-8">
              To empower every retail investor with AI-driven trading tools that were once only available to hedge funds and institutions.
            </p>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Make automated trading accessible, affordable, and reliable for the B2C market by combining minimal brokerage, powerful AI trade bots, and transparent subscription models.
            </p>
          </div>



          {/* Co-Founders Section */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-3xl mb-12 text-center text-secondary subtitle-stroke">Meet Our Founders</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Co-Founder 1 */}
              <div className="glassmorphism rounded-2xl p-8 hover:border-primary/50 transition-all">
                <div className="flex flex-col items-center text-center">
                  <div className="w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-primary/30 glow-primary">
                    <img 
                      src={ayushSinghPhoto}
                      alt="Ayush Singh" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-2xl mb-2 text-primary subtitle-stroke">Ayush Singh</h4>
                  <p className="text-sm text-secondary mb-4">Co-Founder & AI Engineer</p>
                  <p className="text-muted-foreground">
                    Ayush Singh is an ambitious and forward-thinking AI, Machine Learning, and Data Science enthusiast driven by a passion for building intelligent, data-driven systems that solve real-world challenges. With deep expertise in scalable ML architectures, API integrations, and FinTech solutions, he combines technical precision with innovative problem-solving to bring automation and intelligence into the financial domain. His work reflects a vision of creating high-performance trading models and adaptive AI frameworks that redefine how data interacts with decision-making. A firm believer in continuous learning and deployment-driven innovation, Ayush blends creativity, analytics, and technology to push the boundaries of what AI can achieve in modern trading ecosystems.
                  </p>
                </div>
              </div>

              {/* Co-Founder 2 */}
              <div className="glassmorphism rounded-2xl p-8 hover:border-secondary/50 transition-all">
                <div className="flex flex-col items-center text-center">
                  <div className="w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-secondary/30 glow-secondary">
                    <img 
                      src={ayushKumarPhoto}
                      alt="Ayush Kumar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-2xl mb-2 text-secondary subtitle-stroke">Ayush Kumar</h4>
                  <p className="text-sm text-primary mb-4">Co-Founder & ML Architect</p>
                  <p className="text-muted-foreground">
                    Ayush Kumar is a visionary AI and Data Science innovator with a deep passion for creating intelligent, scalable solutions that drive efficiency and insight in FinTech and beyond. Specializing in machine learning systems, predictive analytics, and advanced algorithmic models, he combines technical expertise with a strategic mindset to design AI frameworks that transform raw data into actionable intelligence. Ayush is dedicated to leveraging cutting-edge technology to solve complex financial challenges, enhance automated trading performance, and push the boundaries of AI-driven decision-making. His work reflects a relentless commitment to innovation, precision, and impactful deployment of AI solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4 text-primary title-stroke">Our Technology</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine cutting-edge AI with real-time market analysis to deliver superior trading performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glassmorphism rounded-xl p-8 hover:border-primary/50 transition-all group">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-all">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl mb-3 text-primary subtitle-stroke">Deep RL Engine</h3>
              <p className="text-muted-foreground">
                Our proprietary AI learns from millions of trades, continuously adapting to market conditions for optimal performance.
              </p>
            </div>

            <div className="glassmorphism rounded-xl p-8 hover:border-secondary/50 transition-all group">
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/30 transition-all">
                <Shield className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl mb-3 text-secondary subtitle-stroke">Risk Management</h3>
              <p className="text-muted-foreground">
                Advanced algorithms protect your capital with intelligent stop-losses, position sizing, and portfolio diversification.
              </p>
            </div>

            <div className="glassmorphism rounded-xl p-8 hover:border-primary/50 transition-all group">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-all">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl mb-3 text-primary subtitle-stroke">Proven Results</h3>
              <p className="text-muted-foreground">
                Consistently outperform the market with a verified track record of 57% win rate and 2.86 Sharpe ratio.
              </p>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="mt-16 glassmorphism rounded-2xl p-12 border-2 border-primary/30">
            <h3 className="text-3xl mb-6 text-center text-primary subtitle-stroke">Why Choose Cryonix?</h3>
            <p className="text-center text-lg text-muted-foreground max-w-4xl mx-auto mb-6">
              At Cryonix, we democratize access to institutional-grade trading strategies. Our platform leverages the same technology used by top hedge funds, making it accessible to retail investors worldwide through transparent subscription models.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="flex items-center text-secondary">
                <Zap className="w-5 h-5 mr-2" />
                <span>Instant Execution</span>
              </div>
              <div className="flex items-center text-secondary">
                <Lock className="w-5 h-5 mr-2" />
                <span>Bank-Level Security</span>
              </div>
              <div className="flex items-center text-secondary">
                <Activity className="w-5 h-5 mr-2" />
                <span>Real-Time Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
