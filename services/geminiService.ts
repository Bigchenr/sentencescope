import { GoogleGenerativeAI } from "@google/genai";
import type { AnalysisResult } from "../types";

const apiKey =
  import.meta.env.VITE_GEMINI_API_KEY ||
  import.meta.env.GEMINI_API_KEY || // 兜底一下
  "";

if (!apiKey) {
  console.warn(
    "⚠ 未检测到 VITE_GEMINI_API_KEY，请在 .env.local 和 Vercel 中配置。"
  );
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash", // 如果报错可以改成 "gemini-1.5-flash"
});

const SYSTEM_PROMPT = `
You are an expert English grammar tutor for Chinese middle and high school students.
You must analyze ONE English sentence and output JSON ONLY with this exact TypeScript shape:

{
  "original": string,
  "mainClause": string,
  "grammarCore": string,
  "components": [
    { "label": string, "content": string, "explanation": string }
  ],
  "logicRelations": string[],
  "syntaxTree": string,
  "simplifiedEnglish": string,
  "chineseExplanation": string,
  "difficulty": number,
  "examPoints": string[],
  "similarSentences": string[],
  "practiceQuestions": [
    {
      "type": "grammar" | "translation",
      "question": string,
      "options"?: string[],
      "answer"?: string,
      "explanation"?: string
    }
  ]
}

Requirements:
- Target user: Chinese exam students (中考/高考/四级水平).
- "mainClause": write ONLY the main clause of the sentence.
- "grammarCore": briefly describe the grammatical skeleton in English, e.g. "S + V + O + that-clause".
- "components": break down important phrases/clauses, each with a short Chinese explanation.
- "logicRelations": list relations like "原因-结果", "让步", "条件", "并列".
- "syntaxTree": draw an ASCII-style tree (text only, no markdown) showing hierarchy.
- "simplifiedEnglish": rewrite the sentence in easier English, preserving meaning.
- "chineseExplanation": explain the sentence in natural, exam-style Chinese.
- "difficulty": integer 1–5, for Chinese exam students.
- "examPoints": summarize fixed phrases, grammar patterns that are typical exam points.
- "similarSentences": 2–3 short example sentences of similar structure.
- "practiceQuestions": include at least 1 grammar choice question and 1 translation question, suitable for 高中/四级.

Very important:
- Respond with **valid JSON only**.
- Do NOT include any explanation outside JSON.
`;

export async function analyzeSentence(
  sentence: string
): Promise<AnalysisResult> {
  if (!apiKey) {
    throw new Error("未检测到 API Key，请先配置 VITE_GEMINI_API_KEY。");
  }

  const prompt = `${SYSTEM_PROMPT}\n\nNow analyze this sentence:\n"${sentence}"`;

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  const text = result.response.text().trim();

  // 有时模型会在 JSON 外面加说明，这里尝试只截取 JSON 部分
  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}");
  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error("模型没有返回有效的 JSON。");
  }

  const jsonText = text.slice(jsonStart, jsonEnd + 1);

  try {
    const parsed = JSON.parse(jsonText) as AnalysisResult;
    return parsed;
  } catch (e) {
    console.error("JSON parse error:", e, jsonText);
    throw new Error("解析模型返回内容时出错，请稍后重试。");
  }
}
