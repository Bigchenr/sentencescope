// src/services/geminiService.ts
import type { AnalysisResult } from "../types";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;

if (!API_KEY) {
  console.error("❌ 缺少 VITE_GEMINI_API_KEY 环境变量");
}

export async function analyzeSentence(sentence: string): Promise<AnalysisResult> {
  if (!API_KEY) {
    throw new Error("没有找到 VITE_GEMINI_API_KEY，请检查 .env.local 和 Vercel 环境变量配置。");
  }

  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" +
    API_KEY;

  const prompt = `
你是一个面向中国中学生和高中生的英语长难句分析老师。
请对下面这个英文句子做详细的语法分析，输出结构化信息：

"${sentence}"

请按照下面 JSON 结构返回（不要多余解释）：
{
  "mainStructure": "一句话概括这个句子的主干结构（中文）",
  "coreSentence": "提取出的英文主干",
  "grammarSteps": [
    "第1步：...（中文，讲主谓宾）",
    "第2步：...（中文，讲从属部分和逻辑关系）",
    "第3步：...（中文，讲考试角度的提示）"
  ],
  "examTips": [
    "提示1：...",
    "提示2：..."
  ]
}
`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Gemini 请求失败：${response.status} ${response.statusText} - ${text}`);
  }

  const data = await response.json();

  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ??
    data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join("\n");

  if (!text) {
    throw new Error("Gemini 没有返回可用内容");
  }

  // 尝试从模型的回复中解析 JSON
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) {
    throw new Error("无法在模型回复中找到 JSON 结构");
  }

  const parsed = JSON.parse(match[0]) as AnalysisResult;
  return parsed;
}
