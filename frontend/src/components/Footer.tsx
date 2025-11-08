import { Facebook, Twitter, Linkedin, Github, Mail } from "lucide-react@0.263.1";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import cryonixLogo from "figma:asset/76b1bb24cad881e747c400cc19260a706cb1f22d.png";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNavigation = (page: string) => {
    if (page === "about") {
      onNavigate("home");
      setTimeout(() => {
        const aboutSection = document.getElementById("about-section");
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      onNavigate(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-primary/20 bg-card/50 mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img src={cryonixLogo} alt="Cryonix - Trading on Autopilot" className="h-20 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground">
              The Netflix of Algo-Trading – automated trading on subscription, tailored for retail investors.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-primary">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => handleNavigation("about")} className="text-muted-foreground hover:text-primary transition-colors">About Us</button></li>
              <li><button onClick={() => handleNavigation("features")} className="text-muted-foreground hover:text-primary transition-colors">Features</button></li>
              <li><button onClick={() => handleNavigation("pricing")} className="text-muted-foreground hover:text-primary transition-colors">Pricing</button></li>
              <li><button onClick={() => handleNavigation("support")} className="text-muted-foreground hover:text-primary transition-colors">Support</button></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-primary">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => handleNavigation("privacy")} className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => handleNavigation("terms")} className="text-muted-foreground hover:text-primary transition-colors">Terms of Use</button></li>
              <li><button onClick={() => handleNavigation("cookies")} className="text-muted-foreground hover:text-primary transition-colors">Cookie Policy</button></li>
              <li><button onClick={() => handleNavigation("disclaimer")} className="text-muted-foreground hover:text-primary transition-colors">Disclaimer</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-primary">Contact</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-primary" />
                support@cryonix.com
              </p>
              <div className="flex space-x-4 pt-4">
                <a href="#" className="hover:text-primary transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/10 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Cryonix. All rights reserved. Trading involves risk. Please trade responsibly.</p>
        </div>
      </div>
    </footer>
  );
}
