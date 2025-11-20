import { GoogleGenerativeAI } from "@google/generative-ai";
import type { AnalysisResult } from "../types";

const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);

export async function analyzeSentence(sentence: string): Promise<AnalysisResult> {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const result = await model.generateContent(`
      Analyze this English sentence and return a JSON object:
      ${sentence}
    `);

    const text = result.response.text();
    return JSON.parse(text);

  } catch (e) {
    console.error("Gemini request failed:", e);
    throw new Error("AI request failed");
  }
}
