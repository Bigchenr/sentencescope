import React, { useState } from "react";
import { Header } from "./components/Header";
import { InputSection } from "./components/InputSection";
import { ResultDisplay } from "./components/ResultDisplay";
import { analyzeSentence } from "./services/geminiService";
import type { AnalysisResult } from "./types";
import "./index.css";

function App() {
  const [sentence, setSentence] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!sentence.trim()) {
      setError("先输入一句英文句子再分析哦。");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await analyzeSentence(sentence.trim());
      setResult(res);
    } catch (e: any) {
      console.error(e);
      setError(
        e?.message ??
          "分析时出了点小问题，请稍后再试，或者检查一下 API Key 是否配置正确。"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-root">
      <Header />
      <main className="app-main">
        <section className="app-left">
          <InputSection
            value={sentence}
            onChange={setSentence}
            onAnalyze={handleAnalyze}
            loading={loading}
            setError={setError}
          />
        </section>
        <section className="app-right">
          <ResultDisplay
            result={result}
            loading={loading}
            error={error}
          />
        </section>
      </main>
      <footer className="app-footer">
        <span>SentenceScope · 长难句分析助手 · Powered by Gemini</span>
      </footer>
    </div>
  );
}

export default App;
