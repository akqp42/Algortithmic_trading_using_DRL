import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import { CreateAccountPage } from "./components/CreateAccountPage";
import { KYCPage } from "./components/KYCPage";
import { DashboardPage } from "./components/DashboardPage";
import PortfolioPage from "./components/PortfolioPage"; 
import { FeaturesPage } from "./components/FeaturesPage";
import { SupportPage } from "./components/SupportPage";
import { PricingPage } from "./components/PricingPage";
import { TermsPage } from "./components/TermsPage";
import { PrivacyPage } from "./components/PrivacyPage";
import { CookiePolicyPage } from "./components/CookiePolicyPage";
import { DisclaimerPage } from "./components/DisclaimerPage";

type PageType = "home" | "about" | "features" | "support" | "login" | "createAccount" | "kyc" | "dashboard" | "portfolio" | "pricing" | "terms" | "privacy" | "cookies" | "disclaimer";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [kycApproved, setKycApproved] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as PageType);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogin = (email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    setKycApproved(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
    setKycApproved(false);
    setCurrentPage("home");
  };

  const handleKYCComplete = () => {
    setKycApproved(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "about":
        return <HomePage onNavigate={handleNavigate} />;
      case "features":
        return <FeaturesPage />;
      case "support":
        return <SupportPage />;
      case "pricing":
        return <PricingPage />;
      case "terms":
        return <TermsPage />;
      case "privacy":
        return <PrivacyPage />;
      case "cookies":
        return <CookiePolicyPage />;
      case "disclaimer":
        return <DisclaimerPage />;
      case "login":
        return <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      case "createAccount":
        return <CreateAccountPage onNavigate={handleNavigate} />;
      case "kyc":
        return <KYCPage onNavigate={handleNavigate} onKYCComplete={handleKYCComplete} />;
      case "dashboard":
        if (!isLoggedIn) {
          return <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
        }
        if (!kycApproved) {
          return <KYCPage onNavigate={handleNavigate} onKYCComplete={handleKYCComplete} />;
        }
        return <DashboardPage onNavigate={handleNavigate} kycApproved={kycApproved} />;
      case "portfolio":
        if (!isLoggedIn) {
          return <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
        }
        return <PortfolioPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        onLogout={handleLogout}
      />
      <main>{renderPage()}</main>
      {!["login", "createAccount", "kyc"].includes(currentPage) && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}
