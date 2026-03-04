import { useState } from "react";
import axios from "axios";

interface IResult {
  summary: string;
  anomaly_detected: boolean;
  root_cause: string;
  suggested_fix: string;
  confidence_score: number;
}

type HealthStatus = "healthy" | "warning" | "anomaly";

function App() {
  const [service, setService] = useState("payment-service");
  const [timeRange, setTimeRange] = useState("last_15_minutes");
  const [result, setResult] = useState<IResult | null>(null);
  const [loading, setLoading] = useState(false);

  const [serviceHealth, setServiceHealth] = useState<Record<string, HealthStatus>>({
    "payment-service": "healthy",
    "auth-service": "healthy",
    "notification-service": "healthy",
  });

  const analyzeService = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3001/api/analyze",
        {
          service_name: service,
          time_range: timeRange,
        }
      );

      const analysis = response.data.analysis;

      setResult(analysis);

      // update health state
      setServiceHealth((prev) => ({
        ...prev,
        [service]: analysis.anomaly_detected ? "anomaly" : "healthy",
      }));
    } catch (error) {
      console.error("Analysis error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getHealthColor = (status: HealthStatus) => {
    switch (status) {
      case "healthy":
        return "bg-green-600";
      case "warning":
        return "bg-yellow-500";
      case "anomaly":
        return "bg-red-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-indigo-400">
          AI DevOps Copilot
        </h1>
        <p className="text-gray-400">
          Observability-driven root cause analysis using AI
        </p>
      </div>

      {/* SERVICE HEALTH OVERVIEW */}
      <div className="max-w-6xl mx-auto mb-8">
        <h2 className="text-lg font-semibold mb-3">Service Health</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(serviceHealth).map(([name, status]) => (
            <div
              key={name}
              className={`p-4 rounded-xl bg-gray-800 border ${
                service === name ? "border-indigo-500" : "border-gray-700"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">{name}</span>

                <span
                  className={`px-3 py-1 text-sm rounded ${getHealthColor(status)}`}
                >
                  {status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Control Panel */}
      <div className="max-w-6xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div>
            <label className="block text-sm mb-2">Service</label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            >
              <option value="payment-service">payment-service</option>
              <option value="auth-service">auth-service</option>
              <option value="notification-service">notification-service</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">Time Range</label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            >
              <option value="last_15_minutes">Last 15 Minutes</option>
              <option value="last_30_minutes">Last 30 Minutes</option>
              <option value="last_1_hour">Last 1 Hour</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={analyzeService}
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition rounded p-2 font-semibold"
            >
              Analyze Service
            </button>
          </div>

        </div>

        {loading && (
          <div className="mt-6 text-yellow-400">
            Running AI analysis...
          </div>
        )}
      </div>

      {/* Results */}
      {result && (
        <div className="max-w-6xl mx-auto mt-8 grid gap-4">

          <div className="bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">Summary</h2>
            <p>{result.summary}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow flex items-center justify-between">
            <h2 className="text-xl font-semibold">System Status</h2>

            {result.anomaly_detected ? (
              <span className="px-4 py-1 rounded bg-red-600">
                Anomaly Detected
              </span>
            ) : (
              <span className="px-4 py-1 rounded bg-green-600">
                System Healthy
              </span>
            )}
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">Root Cause</h2>
            <p>{result.root_cause}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">Suggested Fix</h2>
            <p>{result.suggested_fix}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">Confidence Score</h2>
            <p className="text-indigo-400 text-lg">
              {(result.confidence_score * 100).toFixed(1)}%
            </p>
          </div>

        </div>
      )}

    </div>
  );
}

export default App;