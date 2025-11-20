import React, { useState } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import ResultDisplay from './components/ResultDisplay';
import { analyzeSentence } from './services/geminiService';
import { LoadingState } from './types';

const App: React.FC = () => {
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleAnalyze = async (sentence: string) => {
    setStatus(LoadingState.LOADING);
    setErrorMsg('');
    setResult('');

    try {
      const analysis = await analyzeSentence(sentence);
      setResult(analysis);
      setStatus(LoadingState.SUCCESS);
    } catch (error: any) {
      console.error(error);
      setStatus(LoadingState.ERROR);
      setErrorMsg(error.message || "Failed to analyze sentence. Please check your API key and try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex flex-col items-center gap-8">
        
        {/* Hero Text */}
        <div className="text-center max-w-2xl mx-auto mt-4 md:mt-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Master English Syntax <br/>
            <span className="text-brand-600">One Sentence at a Time</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Paste any complex English sentence below. Our AI breaks down grammar, logic, and structure instantly for students.
          </p>
        </div>

        {/* Input Section */}
        <InputSection 
          onAnalyze={handleAnalyze} 
          isAnalyzing={status === LoadingState.LOADING} 
        />

        {/* Output Section */}
        <div className="w-full transition-all duration-500 ease-in-out">
          {status === LoadingState.ERROR && (
            <div className="max-w-4xl mx-auto bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-medium">
                    {errorMsg}
                  </p>
                </div>
              </div>
            </div>
          )}

          {status === LoadingState.SUCCESS && result && (
            <ResultDisplay rawResult={result} />
          )}
          
          {status === LoadingState.IDLE && (
            <div className="text-center mt-12 opacity-60">
              <div className="inline-block p-6 rounded-full bg-slate-100 mb-4">
                <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <p className="text-slate-500 font-medium">Ready to analyze</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;