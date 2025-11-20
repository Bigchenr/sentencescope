import React, { useMemo } from 'react';
import { AnalysisSection } from '../types';
import AnalysisSectionCard from './AnalysisSectionCard';

interface ResultDisplayProps {
  rawResult: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ rawResult }) => {
  
  const parsedSections = useMemo(() => {
    // Regex to split by the specific numbered markers used in the prompt
    // ①, ②, ... ⑪
    const markers = [
      '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '⑪'
    ];
    
    const sections: AnalysisSection[] = [];
    let currentText = rawResult;
    
    // Find indices of all markers
    const indices = markers.map(marker => ({
      marker,
      index: currentText.indexOf(marker)
    })).filter(item => item.index !== -1).sort((a, b) => a.index - b.index);

    for (let i = 0; i < indices.length; i++) {
      const current = indices[i];
      const next = indices[i + 1];
      
      const start = current.index;
      const end = next ? next.index : currentText.length;
      
      const fullSectionText = currentText.substring(start, end).trim();
      
      // Split title (first line usually) and content
      const firstLineEnd = fullSectionText.indexOf('\n');
      let title = '';
      let content = '';

      if (firstLineEnd !== -1) {
        title = fullSectionText.substring(0, firstLineEnd).trim();
        content = fullSectionText.substring(firstLineEnd).trim();
      } else {
        title = fullSectionText; // Fallback if no newline
      }

      // Clean up title if it contains the marker but no brackets (though prompt says 【...】)
      // The prompt asks for ①【Title】.
      
      sections.push({
        id: i + 1,
        title,
        content
      });
    }

    return sections;
  }, [rawResult]);

  if (parsedSections.length === 0) {
     // Fallback for when the AI output format is slightly off but still contains text
     return (
       <div className="bg-white rounded-xl shadow p-6 whitespace-pre-wrap font-sans text-slate-700">
         {rawResult}
       </div>
     );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-20 animate-fade-in">
       <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-800">Analysis Result</h2>
          <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Powered by Gemini 2.5 Flash
          </span>
       </div>
       
       <div className="grid grid-cols-1 gap-6">
         {parsedSections.map((section) => (
           <AnalysisSectionCard 
             key={section.id}
             index={section.id}
             title={section.title}
             content={section.content}
           />
         ))}
       </div>
    </div>
  );
};

export default ResultDisplay;