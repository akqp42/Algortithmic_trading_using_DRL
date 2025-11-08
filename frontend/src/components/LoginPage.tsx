import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { XCircle } from "lucide-react@0.263.1";
import cryonixLogo from "figma:asset/76b1bb24cad881e747c400cc19260a706cb1f22d.png";

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLogin: (email: string) => void;
}

export function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?\":{}|<>]/.test(password);
    const notEmpty = password.length > 0;
    const hasAlphanumeric = (hasLowercase || hasUppercase) && hasNumber;
    
    return minLength && hasUppercase && hasAlphanumeric && hasSpecialChar && notEmpty;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters, contain alphanumeric characters, at least 1 uppercase letter, and 1 special character");
      return;
    }

    onLogin(email);
    onNavigate("dashboard");
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
          <CardTitle className="text-3xl text-primary title-stroke">Welcome Back</CardTitle>
          <CardDescription className="text-muted-foreground">
            Login to access your trading dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
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
              <p className="text-xs text-muted-foreground">
                Password must be at least 8 characters with 1 uppercase, numbers, and special character
              </p>
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() => onNavigate("home")}
                className="text-sm text-primary hover:text-secondary transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-all glow-primary"
            >
              Login
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => onNavigate("createAccount")}
                className="text-primary hover:text-secondary transition-colors"
              >
                Create Account
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}