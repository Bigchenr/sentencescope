import type { AnalysisResult } from "../types";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("❌ 缺少 VITE_GEMINI_API_KEY 环境变量");
}

export async function analyzeSentence(sentence: string): Promise<AnalysisResult> {
  if (!API_KEY) {
    throw new Error("没有找到 VITE_GEMINI_API_KEY，请检查 .env.local 和 Vercel 环境变量配置。");
  }

  const url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
  API_KEY;


  const prompt = `
你是一位面向中国中学生和高中生的英语长难句分析老师。
请对下面这个英文句子做详细的语法分析，输出结构化信息：

"${sentence}"

请按照下面 JSON 结构返回（不要多余解释）：

{
  "mainStructure": "",  
  "clauses": [],
  "modifiers": [],
  "translation": ""
}
  `;

  const body = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return JSON.parse(data.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}");
  } catch (err) {
    console.error("Gemini 调用失败：", err);
    throw err;
  }
}
