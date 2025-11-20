import React from "react";
import { SAMPLE_SENTENCES } from "../constants";
import { Button } from "./Button";

interface Props {
  value: string;
  onChange: (val: string) => void;
  onAnalyze: () => void;
  loading: boolean;
  setError: (msg: string | null) => void;
}

export const InputSection: React.FC<Props> = ({
  value,
  onChange,
  onAnalyze,
  loading,
  setError,
}) => {
  const handleExampleClick = (s: string) => {
    onChange(s);
    setError(null);
  };

  return (
    <div className="card">
      <h2>输入英文句子 / Input Sentence</h2>
      <textarea
        className="sentence-input"
        rows={6}
        placeholder="在这里输入你想分析的英文长难句……"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setError(null);
        }}
      />
      <div className="input-actions">
        <Button onClick={onAnalyze} disabled={loading}>
          {loading ? "正在分析…" : "开始分析"}
        </Button>
      </div>
      <div className="examples">
        <span className="examples-title">示例：</span>
        {SAMPLE_SENTENCES.map((s, idx) => (
          <button
            key={idx}
            type="button"
            className="example-chip"
            onClick={() => handleExampleClick(s)}
          >
            Example {idx + 1}
          </button>
        ))}
      </div>
      <p className="input-tip">
        💡 建议从课本、真题、外刊里挑句子，逐句精读，长期坚持就是你的「长难句语料库」。
      </p>
    </div>
  );
};
