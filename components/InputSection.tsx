import React, { useState } from 'react';
import Button from './Button';
import { EXAMPLE_SENTENCES } from '../constants';

interface InputSectionProps {
  onAnalyze: (sentence: string) => void;
  isAnalyzing: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, isAnalyzing }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAnalyze(input);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
        <div className="mb-4">
          <label htmlFor="sentence-input" className="block text-sm font-semibold text-slate-700 mb-2">
            Enter English Sentence
          </label>
          <textarea
            id="sentence-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., The success of this project depends on our ability to collaborate effectively..."
            className="w-full h-32 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all resize-none text-lg leading-relaxed"
            disabled={isAnalyzing}
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {EXAMPLE_SENTENCES.map((ex, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setInput(ex)}
                className="flex-shrink-0 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors truncate max-w-[200px]"
                title={ex}
              >
                Example {i + 1}
              </button>
            ))}
          </div>
          
          <Button 
            type="submit" 
            disabled={!input.trim() || isAnalyzing} 
            isLoading={isAnalyzing}
            className="w-full md:w-auto min-w-[120px]"
          >
            Analyze
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InputSection;