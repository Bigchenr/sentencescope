import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-brand-600 text-white p-1.5 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">SentenceScope</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold leading-none">AI Syntax Engine</p>
          </div>
        </div>
        <nav className="hidden md:flex gap-6">
           <a href="#" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Grammar</a>
           <a href="#" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Logic</a>
           <a href="#" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Exams</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;