import { useState, useEffect } from "react";
import {
  Activity,
  Play,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface PortfolioPageProps {
  onNavigate: (page: string) => void;
}

export default function PortfolioPage({
  onNavigate,
}: PortfolioPageProps) {
  const [selectedCrypto, setSelectedCrypto] =
    useState("ADAJPY");
  const [timeRange, setTimeRange] = useState<any>(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [backtestResults, setBacktestResults] =
    useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingTimeRange, setLoadingTimeRange] =
    useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [liveStats, setLiveStats] = useState<any>(null);

  const cryptos = ["XRPJPY", "LINKJPY", "AVAXTRY", "ADAJPY"];

  // Helper function to convert datetime-local format to SQL format
  const toSQLDateTime = (datetimeLocal: string): string => {
    // Input: YYYY-MM-DDTHH:MM
    // Output: YYYY-MM-DD HH:MM:SS
    if (!datetimeLocal) return "";
    return datetimeLocal.replace("T", " ") + ":00";
  };

  // Helper function to convert SQL format to datetime-local format
  const toDateTimeLocal = (sqlDateTime: string): string => {
    // Input: YYYY-MM-DD HH:MM:SS
    // Output: YYYY-MM-DDTHH:MM
    if (!sqlDateTime) return "";
    return sqlDateTime.substring(0, 16).replace(" ", "T");
  };

  useEffect(() => {
    if (selectedCrypto) {
      fetchTimeRange();
    }
  }, [selectedCrypto]);

  // Test Flask connection on mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/health",
        );
        const data = await response.json();
        console.log("Flask server health check:", data);
      } catch (err) {
        console.error("Flask server not reachable:", err);
        setError(
          "Cannot connect to Flask server at localhost:5000. Please ensure it's running.",
        );
      }
    };
    testConnection();
  }, []);

  const fetchTimeRange = async () => {
    setLoadingTimeRange(true);
    setError("");
    setTimeRange(null);
    setBacktestResults(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/timerange",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ crypto: selectedCrypto }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch time range");
      }

      const data = await response.json();
      console.log("Time range received:", data);
      setTimeRange(data);

      // Ensure the timestamps are in the correct format: YYYY-MM-DD HH:MM:SS
      setStartTime(data.min_timestamp);
      setEndTime(data.max_timestamp);
      console.log(
        "Start/End times set:",
        data.min_timestamp,
        data.max_timestamp,
      );
    } catch (err: any) {
      setError(`Error loading time range: ${err.message}`);
    } finally {
      setLoadingTimeRange(false);
    }
  };

  const runBacktest = async () => {
    if (!startTime || !endTime) {
      setError("Please select start and end times");
      return;
    }

    // Validate datetime format (should be YYYY-MM-DD HH:MM:SS)
    const dateTimeRegex =
      /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    if (
      !dateTimeRegex.test(startTime) ||
      !dateTimeRegex.test(endTime)
    ) {
      setError(
        `Invalid datetime format. Expected: YYYY-MM-DD HH:MM:SS. Got: ${startTime} to ${endTime}`,
      );
      console.error("Invalid datetime format:", {
        startTime,
        endTime,
      });
      return;
    }

    setLoading(true);
    setError("");
    setBacktestResults(null);
    setCurrentStep(0);
    setTotalSteps(0);
    setIsComplete(false);
    setLiveStats(null);

    const requestPayload = {
      crypto: selectedCrypto,
      start_time: startTime,
      end_time: endTime,
    };

    console.log("Starting backtest with:", requestPayload);

    try {
      const response = await fetch(
        "http://localhost:5000/api/backtest/stream",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestPayload),
        },
      );

      console.log(
        "Response received:",
        response.status,
        response.ok,
      );

      if (!response.ok) {
        let errorMessage = "Backtest failed";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          errorMessage = `Server error: ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No response stream available");
      }

      console.log("Starting to read stream...");
      let buffer = "";
      let messageCount = 0;

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          console.log(
            "Stream finished. Total messages:",
            messageCount,
          );
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        // Split by double newline (SSE format)
        const events = buffer.split("\n\n");
        // Keep the last incomplete event in the buffer
        buffer = events.pop() || "";

        for (const event of events) {
          if (!event.trim()) continue;

          const lines = event.split("\n");
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const jsonStr = line.substring(6);
              try {
                const data = JSON.parse(jsonStr);
                messageCount++;
                console.log(
                  `Message ${messageCount}:`,
                  data.type,
                  data,
                );

                if (data.type === "init") {
                  console.log(
                    "Initializing with total steps:",
                    data.total_steps,
                  );
                  setTotalSteps(data.total_steps);
                } else if (data.type === "info") {
                  console.log("Info:", data.message);
                } else if (data.type === "step") {
                  setCurrentStep(data.step);
                  if (data.total_steps) {
                    setTotalSteps(data.total_steps);
                  }

                  setLiveStats({
                    initial_balance: data.initial_balance,
                    current_balance: data.portfolio_value,
                    current_pnl: data.pnl,
                    total_return: (
                      ((data.portfolio_value -
                        data.initial_balance) /
                        data.initial_balance) *
                      100
                    ).toFixed(2),
                  });

                  // Log every 100 steps
                  if (data.step % 100 === 0) {
                    console.log(
                      `Step ${data.step}/${data.total_steps}: PnL = ${data.pnl}`,
                    );
                  }
                } else if (data.type === "complete") {
                  console.log(
                    "Backtest complete!",
                    data.results,
                  );
                  setIsComplete(true);
                  setBacktestResults(data.results);
                } else if (data.type === "error") {
                  console.error("Server error:", data.message);
                  throw new Error(data.message);
                }
              } catch (e) {
                console.error(
                  "Error parsing SSE data:",
                  e,
                  "Raw line:",
                  line,
                );
              }
            }
          }
        }
      }
    } catch (err: any) {
      console.error("Backtest error:", err);
      setError(`Backtest failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getTimeRangeDuration = () => {
    if (!startTime || !endTime) return null;
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffMs = end.getTime() - start.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(
      (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    return {
      days: diffDays,
      hours: diffHours,
      total_ms: diffMs,
    };
  };

  const duration = getTimeRangeDuration();
  const progress =
    totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div
      className="min-h-screen pt-24 px-6 pb-12"
      style={{ backgroundColor: "#F5F5DC" }}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1
              className="text-4xl mb-2 bg-gradient-to-r from-[#3E2723] via-[#CD7F32] to-[#8B4513] bg-clip-text text-transparent"
              style={{
                textShadow:
                  "0 0 30px rgba(205, 127, 50, 0.4), 0 0 60px rgba(139, 69, 19, 0.3)",
              }}
            >
              Backtest Trading Bot
            </h1>
            <p className="text-[#1a4d5c]">
              Test your AI model on historical cryptocurrency
              data
            </p>
          </div>
        </div>

        {/* Select Cryptocurrency Card */}
        <div className="bg-white border border-[#8B6914]/30 rounded-lg shadow-lg mb-6">
          <div className="p-6 border-b border-[#8B6914]/20">
            <h2 className="text-2xl text-[#8B6914]">
              Select Cryptocurrency
            </h2>
            <p className="text-sm text-[#1a4d5c] mt-1">
              Choose a cryptocurrency to backtest
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {cryptos.map((crypto) => (
                <button
                  key={crypto}
                  onClick={() => setSelectedCrypto(crypto)}
                  disabled={loadingTimeRange || loading}
                  className={`h-16 text-lg rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    selectedCrypto === crypto
                      ? "bg-gradient-to-r from-[#8B6914] via-[#CD7F32] to-[#8B6914] text-white shadow-lg"
                      : "bg-white border-2 border-[#8B6914]/30 text-[#8B6914] hover:bg-[#8B6914]/5 hover:border-[#8B6914]/50"
                  }`}
                  style={
                    selectedCrypto === crypto
                      ? {
                          boxShadow:
                            "0 0 20px rgba(205, 127, 50, 0.5)",
                        }
                      : {}
                  }
                >
                  {crypto}
                </button>
              ))}
            </div>

            {loadingTimeRange && (
              <div className="mt-6 text-center p-4 bg-[#8B6914]/10 rounded-lg border border-[#8B6914]/20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B6914] mx-auto"></div>
                <p className="text-sm text-[#1a4d5c] mt-3">
                  Loading available time range...
                </p>
              </div>
            )}

            {timeRange && !loadingTimeRange && (
              <div className="mt-6 p-4 bg-[#8B6914]/10 rounded-lg border border-[#8B6914]/30">
                <p className="text-sm text-[#1a1a2e] mb-1">
                  📅 Available data range:
                </p>
                <p className="text-sm text-[#8B6914] font-mono">
                  {timeRange.min_timestamp} →{" "}
                  {timeRange.max_timestamp}
                </p>
                <p className="text-xs text-[#1a4d5c] mt-2">
                  Total data points:{" "}
                  <span className="text-[#8B6914]">
                    {timeRange.total_rows.toLocaleString()}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Select Time Period Card */}
        {timeRange && !loadingTimeRange && (
          <div className="bg-white border border-[#8B6914]/30 rounded-lg shadow-lg mb-6">
            <div className="p-6 border-b border-[#8B6914]/20">
              <h2 className="text-2xl text-[#8B6914]">
                Select Time Period
              </h2>
              <p className="text-sm text-[#1a4d5c] mt-1">
                Choose the testing period for backtesting
              </p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm mb-2 text-[#1a1a2e]">
                    Start Time
                  </label>
                  <input
                    type="datetime-local"
                    value={toDateTimeLocal(startTime)}
                    onChange={(e) => {
                      if (e.target.value) {
                        const sqlTime = toSQLDateTime(
                          e.target.value,
                        );
                        console.log(
                          "Start time changed to:",
                          sqlTime,
                        );
                        setStartTime(sqlTime);
                      }
                    }}
                    disabled={loading}
                    className="w-full px-4 py-3 bg-white border-2 border-[#8B6914]/30 rounded-lg text-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#8B6914] focus:border-transparent transition-all disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-[#1a1a2e]">
                    End Time
                  </label>
                  <input
                    type="datetime-local"
                    value={toDateTimeLocal(endTime)}
                    onChange={(e) => {
                      if (e.target.value) {
                        const sqlTime = toSQLDateTime(
                          e.target.value,
                        );
                        console.log(
                          "End time changed to:",
                          sqlTime,
                        );
                        setEndTime(sqlTime);
                      }
                    }}
                    disabled={loading}
                    className="w-full px-4 py-3 bg-white border-2 border-[#8B6914]/30 rounded-lg text-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#8B6914] focus:border-transparent transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              {duration && duration.total_ms > 0 && (
                <div className="mb-4 p-3 bg-amber-100 border border-amber-400/30 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-900 flex-1">
                      <p>
                        Selected range: {duration.days} days,{" "}
                        {duration.hours} hours
                      </p>
                      <p className="text-xs mt-1 text-amber-800">
                        Backtest will process {totalSteps > 0 ? totalSteps.toLocaleString() : ''} data points.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={runBacktest}
                disabled={loading || !startTime || !endTime}
                className="w-full bg-gradient-to-r from-[#8B6914] via-[#CD7F32] to-[#8B6914] text-white py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
                style={{
                  boxShadow: "0 0 20px rgba(205, 127, 50, 0.5)",
                }}
              >
                {loading ? (
                  <>
                    <Activity className="w-5 h-5 mr-2 animate-spin" />
                    Running Backtest... {currentStep}/
                    {totalSteps} steps
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Run Backtest
                  </>
                )}
              </button>

              {loading && (
                <div className="mt-4 space-y-3">
                  {totalSteps === 0 ? (
                    <div className="p-3 bg-blue-50 border border-blue-300 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-blue-600 animate-spin" />
                        <p className="text-sm text-blue-800">
                          Initializing backtest and loading data...
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between text-sm text-[#1a1a2e] mb-1">
                        <span>
                          Progress: {currentStep.toLocaleString()} / {totalSteps.toLocaleString()}{" "}
                          steps
                        </span>
                        <span>{progress.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#8B6914] to-[#CD7F32] h-3 rounded-full transition-all duration-300 shadow-lg"
                          style={{
                            width: `${progress}%`,
                            boxShadow:
                              "0 0 10px rgba(205, 127, 50, 0.5)",
                          }}
                        />
                      </div>
                      <div className="p-3 bg-amber-50 border border-amber-300 rounded-lg mt-2">
                        <p className="text-sm text-amber-900 flex items-center gap-2">
                          <Activity className="w-4 h-4 animate-spin" />
                          Processing backtest data...
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-300 rounded-lg shadow-lg mb-6 p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Live Stats Cards */}
        {(loading || isComplete) && liveStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border border-[#8B6914]/30 rounded-lg shadow-lg">
              <div className="p-4 border-b border-[#8B6914]/20">
                <p className="text-xs text-[#1a4d5c]">
                  Initial Balance
                </p>
              </div>
              <div className="p-4">
                <div className="text-2xl text-[#1a1a2e]">
                  ${liveStats.initial_balance.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#8B6914]/30 rounded-lg shadow-lg">
              <div className="p-4 border-b border-[#8B6914]/20">
                <p className="text-xs text-[#1a4d5c]">
                  Current Balance
                </p>
              </div>
              <div className="p-4">
                <div className="text-2xl text-[#00cc88]">
                  $
                  {liveStats.current_balance.toLocaleString(
                    undefined,
                    { maximumFractionDigits: 2 },
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#8B6914]/30 rounded-lg shadow-lg">
              <div className="p-4 border-b border-[#8B6914]/20">
                <p className="text-xs text-[#1a4d5c]">P&L</p>
              </div>
              <div className="p-4">
                <div
                  className={`text-2xl flex items-center gap-1 ${
                    parseFloat(liveStats.current_pnl) >= 0
                      ? "text-[#00cc88]"
                      : "text-red-600"
                  }`}
                >
                  {parseFloat(liveStats.current_pnl) >= 0 ? (
                    <TrendingUp className="w-5 h-5" />
                  ) : (
                    <TrendingDown className="w-5 h-5" />
                  )}
                  {parseFloat(liveStats.current_pnl) >= 0
                    ? "+"
                    : ""}
                  $
                  {Math.abs(
                    parseFloat(liveStats.current_pnl),
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#8B6914]/30 rounded-lg shadow-lg">
              <div className="p-4 border-b border-[#8B6914]/20">
                <p className="text-xs text-[#1a4d5c]">
                  Return %
                </p>
              </div>
              <div className="p-4">
                <div
                  className={`text-2xl ${
                    parseFloat(liveStats.total_return) >= 0
                      ? "text-[#00cc88]"
                      : "text-red-600"
                  }`}
                >
                  {parseFloat(liveStats.total_return) >= 0
                    ? "+"
                    : ""}
                  {liveStats.total_return}%
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Completion Message Only */}
        {isComplete && backtestResults && (
          <div className="bg-gradient-to-br from-white to-[#fafaf5] border border-[#00cc88]/30 rounded-lg shadow-lg">
            <div className="p-6">
              <h2 className="text-2xl text-[#00cc88] flex items-center gap-2 mb-4">
                <CheckCircle className="w-6 h-6" />
                Backtest Complete!
              </h2>
              <p className="text-[#1a4d5c]">
                Results have been saved to the following files:
              </p>
              <div className="mt-4 space-y-2 bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-mono text-[#8B6914]">
                  ✓ Metrics: {backtestResults.metrics_saved}
                </p>
                {backtestResults.trades_csv_saved && (
                  <p className="text-sm font-mono text-[#8B6914]">
                    ✓ Trades CSV: {backtestResults.trades_csv_saved}
                  </p>
                )}
                <p className="text-xs text-[#1a4d5c] mt-3">
                  Check your project's backtest_results folder for detailed analysis files.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}