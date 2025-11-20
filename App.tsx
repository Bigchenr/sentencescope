// src/App.tsx
import React, { useState } from "react";
import InputSection from "./components/InputSection";
import ResultDisplay from "./components/ResultDisplay";
import { analyzeSentence } from "./services/geminiService";
import type { AnalysisResult } from "./types";

const App: React.FC = () => {
  const [sentence, setSentence] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!sentence.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeSentence(sentence.trim());
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "分析失败，请稍后重试。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-start justify-center py-10">
      <div className="w-full max-w-5xl space-y-6">
        <InputSection
          value={sentence}
          onChange={setSentence}
          onAnalyze={handleAnalyze}
          loading={loading}
          error={error}
          setError={setError}
        />
        <ResultDisplay loading={loading} result={result} error={error} />
      </div>
    </div>
  );
};

export default App;
