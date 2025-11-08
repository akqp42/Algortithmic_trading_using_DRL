import { User, ChevronDown, LogOut, Settings, Trash2 } from "lucide-react@0.263.1";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import cryonixLogo from "figma:asset/76b1bb24cad881e747c400cc19260a706cb1f22d.png";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  userEmail?: string;
  onLogout: () => void;
}

export function Navigation({ currentPage, onNavigate, isLoggedIn, userEmail, onLogout }: NavigationProps) {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "features", label: "Features" },
    { id: "support", label: "Support" },
  ];

  const handleNavClick = (itemId: string) => {
    if (itemId === "about") {
      // If on home page, scroll to about section
      if (currentPage === "home") {
        const aboutSection = document.getElementById("about-section");
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        // Navigate to home page first
        onNavigate("home");
        // Then scroll after a short delay to allow page to render
        setTimeout(() => {
          const aboutSection = document.getElementById("about-section");
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
    } else {
      onNavigate(itemId);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-primary/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate("home")}>
            <img src={cryonixLogo} alt="Cryonix - Trading on Autopilot" className="h-12 w-auto" />
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-all hover:text-primary ${
                  currentPage === item.id ? "text-primary" : "text-foreground/80"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Side - Login/User */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                    <Avatar className="w-10 h-10 border-2 border-primary/50">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                      <AvatarFallback className="bg-primary/20 text-primary">U</AvatarFallback>
                    </Avatar>
                    <ChevronDown className="w-4 h-4 text-primary" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72 bg-card border-primary/20 p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="w-16 h-16 border-2 border-primary/50">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                      <AvatarFallback className="bg-primary/20 text-primary">U</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm text-muted-foreground">Username</p>
                      <p className="text-xs text-muted-foreground">crypto_trader</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4 p-3 rounded-lg bg-muted/50">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Email:</span>
                      <span>{userEmail || "user@example.com"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">KYC Status:</span>
                      <span className="text-secondary">✅ Approved</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Balance:</span>
                      <span className="text-primary">$12,450.00</span>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-primary/20" />
                  <DropdownMenuItem className="cursor-pointer hover:bg-primary/10">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Edit Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-destructive/10 text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-primary/20" />
                  <DropdownMenuItem onClick={onLogout} className="cursor-pointer hover:bg-primary/10">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => onNavigate("login")}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all glow-primary"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
