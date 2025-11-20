import React from "react";
import type { AnalysisResult } from "../types";
import { AnalysisSectionCard } from "./AnalysisSectionCard";

interface Props {
  result: AnalysisResult | null;
  loading: boolean;
  error: string | null;
}

export const ResultDisplay: React.FC<Props> = ({
  result,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <div className="card">
        <p>正在调用 Gemini 分析句子，请稍候……</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card error-card">
        <p>{error}</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="card">
        <p>左侧输入句子并点击「开始分析」，这里会展示详细分析结果。</p>
      </div>
    );
  }

  const stars = "★".repeat(result.difficulty) + "☆".repeat(5 - result.difficulty);

  return (
    <div className="result-grid">
      <AnalysisSectionCard title="① 原句">
        <p className="mono">{result.original}</p>
      </AnalysisSectionCard>

      <AnalysisSectionCard title="② 语法主干">
        <p className="mono highlight">{result.mainClause}</p>
        <p className="muted">结构骨架：{result.grammarCore}</p>
      </AnalysisSectionCard>

      <AnalysisSectionCard title="③ 从属成分拆解">
        <ul className="list">
          {result.components.map((c, idx) => (
            <li key={idx}>
              <strong>{c.label}：</strong>
              <span className="mono">{c.content}</span>
              <div className="muted">{c.explanation}</div>
            </li>
          ))}
        </ul>
      </AnalysisSectionCard>

      <AnalysisSectionCard title="④ 逻辑关系分析">
        <ul className="list">
          {result.logicRelations.map((l, idx) => (
            <li key={idx}>{l}</li>
          ))}
        </ul>
      </AnalysisSectionCard>

      <AnalysisSectionCard title="⑤ 句法树可视化">
        <pre className="syntax-tree">{result.syntaxTree}</pre>
      </AnalysisSectionCard>

      <AnalysisSectionCard title="⑥ 英文简化版">
        <p className="mono">{result.simplifiedEnglish}</p>
      </AnalysisSectionCard>

      <AnalysisSectionCard title="⑦ 中文解释">
        <p>{result.chineseExplanation}</p>
      </AnalysisSectionCard>

      <AnalysisSectionCard title="⑧ 句子难度等级">
        <p>
          难度：<span className="stars">{stars}</span>{" "}
          <span className="muted">(1 = 入门，5 = 地狱长难句)</span>
        </p>
      </AnalysisSectionCard>

      <AnalysisSectionCard title="⑨ 考试高频考点总结">
        <ul className="list">
          {result.examPoints.map((p, idx) => (
            <li key={idx}>{p}</li>
          ))}
        </ul>
      </AnalysisSectionCard>

      <AnalysisSectionCard title="⑩ 同类型例句">
        <ul className="list">
          {result.similarSentences.map((s, idx) => (
            <li key={idx} className="mono">
              {s}
            </li>
          ))}
        </ul>
      </AnalysisSectionCard>

      <AnalysisSectionCard title="⑪ 仿真考试题（可用于课堂）">
        <ol className="list">
          {result.practiceQuestions.map((q, idx) => (
            <li key={idx}>
              <strong>
                [{q.type === "grammar" ? "语法选择" : "翻译"}]
              </strong>{" "}
              {q.question}
              {q.options && (
                <ul className="options">
                  {q.options.map((o, i) => (
                    <li key={i}>{o}</li>
                  ))}
                </ul>
              )}
              {q.answer && (
                <div className="muted">参考答案：{q.answer}</div>
              )}
              {q.explanation && (
                <div className="muted">解析：{q.explanation}</div>
              )}
            </li>
          ))}
        </ol>
      </AnalysisSectionCard>
    </div>
  );
};
