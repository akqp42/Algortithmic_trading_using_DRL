import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { CheckCircle2, XCircle, Info } from "lucide-react@0.263.1";
import cryonixLogo from "figma:asset/76b1bb24cad881e747c400cc19260a706cb1f22d.png";

interface CreateAccountPageProps {
  onNavigate: (page: string) => void;
}

export function CreateAccountPage({ onNavigate }: CreateAccountPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string) => {
    return email.endsWith(".com");
  };

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?\":{}|<>]/.test(password);
    const notEmpty = password.length > 0;
    const hasAlphanumeric = (hasLowercase || hasUppercase) && hasNumber;
    
    return {
      minLength,
      hasUppercase,
      hasAlphanumeric,
      hasSpecialChar,
      notEmpty,
      isValid: minLength && hasUppercase && hasAlphanumeric && hasSpecialChar && notEmpty,
    };
  };

  const passwordValidation = validatePassword(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Email must end with .com");
      return;
    }

    if (!passwordValidation.isValid) {
      setError("Password does not meet all requirements");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      onNavigate("login");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20 pb-12">
      {/* Animated Background */}
      <div className="absolute inset-0 grid-background opacity-20 pointer-events-none"></div>

      <Card className="w-full max-w-md glassmorphism border-primary/30 glow-primary">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-6">
            <img src={cryonixLogo} alt="Cryonix - Trading on Autopilot" className="h-24 w-auto" />
          </div>
          <CardTitle className="text-3xl text-primary title-stroke">Create Your Account</CardTitle>
          <CardDescription className="text-muted-foreground">
            Join thousands of traders using AI-powered trading
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <Alert className="bg-secondary/10 border-secondary">
              <CheckCircle2 className="h-4 w-4 text-secondary" />
              <AlertDescription className="text-secondary">
                Account created successfully! Redirecting to login...
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert className="bg-destructive/10 border-destructive">
                  <XCircle className="h-4 w-4 text-destructive" />
                  <AlertDescription className="text-destructive">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-input-background border-primary/20 focus:border-primary transition-all"
                  required
                />
                <p className="text-xs text-muted-foreground">Must end with .com</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-input-background border-primary/20 focus:border-primary transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-input-background border-primary/20 focus:border-primary transition-all"
                  required
                />
              </div>

              {/* Password Requirements */}
              <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                <div className="flex items-center text-sm">
                  <Info className="w-4 h-4 mr-2 text-primary" />
                  <span className="text-muted-foreground">Password Requirements:</span>
                </div>
                <div className="space-y-1 ml-6">
                  <div className={`text-xs flex items-center ${passwordValidation.minLength ? "text-secondary" : "text-muted-foreground"}`}>
                    {passwordValidation.minLength ? <CheckCircle2 className="w-3 h-3 mr-2" /> : <XCircle className="w-3 h-3 mr-2" />}
                    Minimum 8 characters
                  </div>
                  <div className={`text-xs flex items-center ${passwordValidation.hasAlphanumeric ? "text-secondary" : "text-muted-foreground"}`}>
                    {passwordValidation.hasAlphanumeric ? <CheckCircle2 className="w-3 h-3 mr-2" /> : <XCircle className="w-3 h-3 mr-2" />}
                    Alphanumeric (letters and numbers)
                  </div>
                  <div className={`text-xs flex items-center ${passwordValidation.hasUppercase ? "text-secondary" : "text-muted-foreground"}`}>
                    {passwordValidation.hasUppercase ? <CheckCircle2 className="w-3 h-3 mr-2" /> : <XCircle className="w-3 h-3 mr-2" />}
                    At least 1 uppercase letter
                  </div>
                  <div className={`text-xs flex items-center ${passwordValidation.hasSpecialChar ? "text-secondary" : "text-muted-foreground"}`}>
                    {passwordValidation.hasSpecialChar ? <CheckCircle2 className="w-3 h-3 mr-2" /> : <XCircle className="w-3 h-3 mr-2" />}
                    At least 1 special character
                  </div>
                  <div className={`text-xs flex items-center ${passwordValidation.notEmpty ? "text-secondary" : "text-muted-foreground"}`}>
                    {passwordValidation.notEmpty ? <CheckCircle2 className="w-3 h-3 mr-2" /> : <XCircle className="w-3 h-3 mr-2" />}
                    Not empty
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-all glow-primary"
              >
                Create Account
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => onNavigate("login")}
                  className="text-primary hover:text-secondary transition-colors"
                >
                  Login
                </button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}