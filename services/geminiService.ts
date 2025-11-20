import { GoogleAI } from "@google/genai";
import type { AnalysisResult } from "../types";

const client = new GoogleAI({
  apiKey: import.meta.env.GEMINI_API_KEY
});

export async function analyzeSentence(sentence: string): Promise<AnalysisResult> {
  try {
    const model = client.getGenerativeModel({
      model: "gemini-2.0-flash"
    });

    const result = await model.generateText({
      prompt: `Analyze this English sentence and return a JSON structure:\n${sentence}`
    });

    const text = result.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini request failed:", error);
    throw new Error("AI request failed.");
  }
}
