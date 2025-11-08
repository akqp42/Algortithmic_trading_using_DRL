import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Alert, AlertDescription } from "./ui/alert";
import { Wallet, Activity, Settings, HelpCircle, CheckCircle2, Play, Pause } from "lucide-react@0.263.1";
import { Badge } from "./ui/badge";

interface DashboardPageProps {
  onNavigate: (page: string) => void;
  kycApproved: boolean;
}

export function DashboardPage({ onNavigate, kycApproved }: DashboardPageProps) {
  const [depositAmount, setDepositAmount] = useState("");
  const [allowTrading, setAllowTrading] = useState(false);
  const [balance, setBalance] = useState(12450);
  const [botStatus, setBotStatus] = useState<"inactive" | "active" | "running" | "stopped">("inactive");

  const handleDeposit = () => {
    if (depositAmount && kycApproved && parseFloat(depositAmount) > 0) {
      setBalance(balance + parseFloat(depositAmount));
      setDepositAmount("");
    }
  };

  const handleConfirm = () => {
    if (allowTrading && balance > 0) {
      setBotStatus("active");
      setTimeout(() => {
        onNavigate("portfolio");
      }, 1500);
    }
  };

  const toggleBot = () => {
    if (botStatus === "active" || botStatus === "stopped") {
      setBotStatus("running");
    } else if (botStatus === "running") {
      setBotStatus("stopped");
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6 pb-12">
      {/* Animated Background */}
      <div className="absolute inset-0 grid-background opacity-10 pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl mb-2 text-primary title-stroke">Trading Bot Dashboard</h1>
            <p className="text-muted-foreground">Manage your automated trading settings</p>
          </div>
          <Badge
            variant="outline"
            className={`px-4 py-2 ${
              botStatus === "running"
                ? "bg-secondary/20 border-secondary text-secondary"
                : botStatus === "active"
                ? "bg-primary/20 border-primary text-primary"
                : "bg-muted/20 border-muted text-muted-foreground"
            }`}
          >
            {botStatus === "running" ? (
              <>
                <Activity className="w-4 h-4 mr-2 animate-pulse" />
                Bot Running
              </>
            ) : botStatus === "active" ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Bot Active
              </>
            ) : (
              <>Bot {botStatus}</>
            )}
          </Badge>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-card/50 mb-6">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Activity className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="transactions" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Wallet className="w-4 h-4 mr-2" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Settings className="w-4 h-4 mr-2" />
              Bot Settings
            </TabsTrigger>
            <TabsTrigger value="help" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <HelpCircle className="w-4 h-4 mr-2" />
              Help
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Wallet Balance */}
              <Card className="glassmorphism border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center text-primary subtitle-stroke">
                    <Wallet className="w-5 h-5 mr-2" />
                    Wallet Balance
                  </CardTitle>
                  <CardDescription>Your available trading funds</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl mb-6 text-secondary">
                    ${balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>

                  {!kycApproved && (
                    <Alert className="bg-destructive/10 border-destructive mb-4">
                      <AlertDescription className="text-destructive">
                        ⚠️ KYC verification required to deposit funds
                      </AlertDescription>
                    </Alert>
                  )}

                  {kycApproved && (
                    <Alert className="bg-secondary/10 border-secondary mb-4">
                      <CheckCircle2 className="h-4 w-4 text-secondary" />
                      <AlertDescription className="text-secondary">
                        ✅ KYC Approved - Ready to deposit
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="deposit">Deposit Amount</Label>
                      <Input
                        id="deposit"
                        type="number"
                        placeholder="0.00"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        className="bg-input-background border-primary/20 focus:border-primary"
                        disabled={!kycApproved}
                      />
                    </div>
                    <Button
                      onClick={handleDeposit}
                      disabled={!kycApproved || !depositAmount || parseFloat(depositAmount) <= 0}
                      className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90"
                    >
                      Deposit Funds
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Bot Activation */}
              <Card className="glassmorphism border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center text-primary subtitle-stroke">
                    <Activity className="w-5 h-5 mr-2" />
                    Activate Trading Bot
                  </CardTitle>
                  <CardDescription>Enable automated trading</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <span className={botStatus === "running" ? "text-secondary" : "text-primary"}>
                        {botStatus.charAt(0).toUpperCase() + botStatus.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Available Balance:</span>
                      <span className="text-primary">${balance.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">KYC Status:</span>
                      <span className="text-secondary">{kycApproved ? "✅ Approved" : "⏳ Pending"}</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 border border-primary/30 rounded-lg">
                    <Checkbox
                      id="allow"
                      checked={allowTrading}
                      onCheckedChange={(checked) => setAllowTrading(checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor="allow" className="cursor-pointer">
                        I allow the bot to trade using my deposited funds
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        The bot will execute trades automatically based on AI signals
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={handleConfirm}
                    disabled={!allowTrading || balance === 0 || !kycApproved}
                    className="w-full bg-gradient-to-r from-secondary to-primary text-secondary-foreground hover:opacity-90 glow-secondary"
                  >
                    Confirm & Go to Portfolio
                  </Button>

                  {botStatus !== "inactive" && (
                    <Button
                      onClick={toggleBot}
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary/10"
                    >
                      {botStatus === "running" ? (
                        <>
                          <Pause className="w-4 h-4 mr-2" />
                          Pause Bot
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Start Bot
                        </>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions">
            <Card className="glassmorphism border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "Deposit", amount: 5000, date: "2025-10-08", status: "Completed" },
                    { type: "Deposit", amount: 7450, date: "2025-10-05", status: "Completed" },
                  ].map((tx, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-muted/20 rounded-lg">
                      <div>
                        <p className="text-sm">{tx.type}</p>
                        <p className="text-xs text-muted-foreground">{tx.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-secondary">+${tx.amount}</p>
                        <p className="text-xs text-muted-foreground">{tx.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="glassmorphism border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary">Bot Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Risk Level</Label>
                  <select className="w-full mt-2 p-2 bg-input-background border border-primary/20 rounded-md">
                    <option>Conservative</option>
                    <option>Moderate</option>
                    <option>Aggressive</option>
                  </select>
                </div>
                <div>
                  <Label>Max Daily Trades</Label>
                  <Input type="number" defaultValue="10" className="bg-input-background border-primary/20" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="help">
            <Card className="glassmorphism border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary">Help & Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Need help? Contact our support team at support@cryptoai.com
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
