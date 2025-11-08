import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { CheckCircle2, Shield } from "lucide-react@0.263.1";
import cryonixLogo from "figma:asset/76b1bb24cad881e747c400cc19260a706cb1f22d.png";

interface KYCPageProps {
  onNavigate: (page: string) => void;
  onKYCComplete: () => void;
}

export function KYCPage({ onNavigate, onKYCComplete }: KYCPageProps) {
  const [step, setStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [kycApproved, setKycApproved] = useState(false);

  const handleSendOTP = () => {
    if (mobileNumber.length >= 10) {
      setOtpSent(true);
      setStep(2);
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      setKycApproved(true);
      setStep(3);
      onKYCComplete();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 grid-background opacity-20 pointer-events-none"></div>

      <Card className="w-full max-w-md glassmorphism border-primary/30 glow-primary">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-6">
            <img src={cryonixLogo} alt="Cryonix - Trading on Autopilot" className="h-24 w-auto" />
          </div>
          <CardTitle className="text-3xl text-primary">KYC Verification</CardTitle>
          <CardDescription className="text-muted-foreground">
            Complete verification to activate your trading bot
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 1 ? "bg-primary border-primary text-primary-foreground" : "border-muted text-muted-foreground"}`}>
                1
              </div>
              <div className={`w-20 h-0.5 ${step >= 2 ? "bg-primary" : "bg-muted"}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 2 ? "bg-primary border-primary text-primary-foreground" : "border-muted text-muted-foreground"}`}>
                2
              </div>
              <div className={`w-20 h-0.5 ${step >= 3 ? "bg-primary" : "bg-muted"}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 3 ? "bg-secondary border-secondary text-secondary-foreground" : "border-muted text-muted-foreground"}`}>
                ✓
              </div>
            </div>
          </div>

          {/* Step 1: Mobile Number */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="bg-input-background border-primary/20 focus:border-primary transition-all"
                  required
                />
                <p className="text-xs text-muted-foreground">Enter your phone number for verification</p>
              </div>

              <Button
                onClick={handleSendOTP}
                disabled={mobileNumber.length < 10}
                className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-all glow-primary"
              >
                Send OTP
              </Button>
            </div>
          )}

          {/* Step 2: OTP Verification */}
          {step === 2 && (
            <div className="space-y-6">
              <Alert className="bg-primary/10 border-primary">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <AlertDescription className="text-primary">
                  OTP sent to {mobileNumber}
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="bg-input-background border-primary/20 focus:border-primary transition-all text-center tracking-widest text-2xl"
                  maxLength={6}
                  required
                />
                <p className="text-xs text-muted-foreground text-center">Enter the 6-digit code</p>
              </div>

              <Button
                onClick={handleVerifyOTP}
                disabled={otp.length !== 6}
                className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-all glow-primary"
              >
                Verify OTP
              </Button>

              <button
                onClick={() => setStep(1)}
                className="w-full text-sm text-primary hover:text-secondary transition-colors"
              >
                Change mobile number
              </button>
            </div>
          )}

          {/* Step 3: KYC Approved */}
          {step === 3 && kycApproved && (
            <div className="space-y-6 text-center">
              <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto glow-secondary">
                <CheckCircle2 className="w-12 h-12 text-secondary" />
              </div>

              <div>
                <h3 className="text-2xl mb-2 text-secondary">KYC Approved Successfully!</h3>
                <p className="text-muted-foreground">
                  Your account has been verified. You can now access all trading features.
                </p>
              </div>

              <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Verification Status:</span>
                  <span className="text-secondary">✅ Approved</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Mobile Number:</span>
                  <span>{mobileNumber}</span>
                </div>
              </div>

              <Button
                onClick={() => onNavigate("dashboard")}
                className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-all glow-primary"
              >
                Continue to Dashboard
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
