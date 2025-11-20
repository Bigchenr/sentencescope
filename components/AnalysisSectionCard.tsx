
import React from 'react';

interface AnalysisSectionCardProps {
  title: string;
  content: string;
  index: number;
}

const AnalysisSectionCard: React.FC<AnalysisSectionCardProps> = ({ title, content, index }) => {
  
  // Helper to detect if content is the visualization diagram (Section 5)
  const isDiagram = index === 5;

  const getIcon = (idx: number) => {
    const icons: Record<number, string> = {
      1: "📝", // Original
      2: "🏗️", // Main Grammar
      3: "🧩", // Components
      4: "🔗", // Logic Relation
      5: "🌳", // Syntax Tree
      6: "👶", // Simplified
      7: "🇨🇳", // Chinese
      8: "📏", // Difficulty
      9: "🎯", // Exam Points
      10: "📚", // Examples
      11: "✍️", // Quiz
    };
    return icons[idx] || "#";
  };

  // Render logic for the ASCII Tree (Section 5)
  if (isDiagram) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm text-lg">
            {getIcon(index)}
          </span>
          <h3 className="font-bold text-slate-800 text-lg">{title.replace(/[①-⑪]/g, '').trim()}</h3>
        </div>
        <div className="p-4 md:p-6 bg-slate-50">
          <div className="bg-slate-900 rounded-lg p-4 shadow-inner border border-slate-700 overflow-x-auto">
             <pre className="font-mono text-xs md:text-sm leading-relaxed text-emerald-400 whitespace-pre font-medium">
               {content.trim()}
             </pre>
          </div>
        </div>
      </div>
    );
  }

  // Render logic for standard text sections
  const formattedContent = content.split('\n').map((line, i) => {
    if (!line.trim()) return <br key={i} />;
    
    // Highlight 【...】 patterns
    const parts = line.split(/(【[^】]+】)/g);
    return (
      <div key={i} className="mb-1">
        {parts.map((part, j) => {
          if (part.startsWith('【') && part.endsWith('】')) {
             return <span key={j} className="font-bold text-brand-700 mr-2">{part}</span>;
          }
          return <span key={j}>{part}</span>;
        })}
      </div>
    );
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex items-center gap-3">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm text-lg">
          {getIcon(index)}
        </span>
        <h3 className="font-bold text-slate-800 text-lg">{title.replace(/[①-⑪]/g, '').trim()}</h3>
      </div>
      <div className="p-6 text-slate-700 leading-relaxed prose-content">
        {formattedContent}
      </div>
    </div>
  );
};

export default AnalysisSectionCard;