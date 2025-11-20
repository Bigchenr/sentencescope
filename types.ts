export interface AnalysisComponent {
  label: string;      // 例如：主语、谓语、状语从句…
  content: string;    // 对应的英文部分
  explanation: string; // 中文说明
}

export interface PracticeQuestion {
  type: "grammar" | "translation";
  question: string;
  options?: string[];
  answer?: string;
  explanation?: string;
}

export interface AnalysisResult {
  original: string;
  mainClause: string;
  grammarCore: string;
  components: AnalysisComponent[];
  logicRelations: string[];
  syntaxTree: string;
  simplifiedEnglish: string;
  chineseExplanation: string;
  difficulty: number; // 1–5
  examPoints: string[];
  similarSentences: string[];
  practiceQuestions: PracticeQuestion[];
}
