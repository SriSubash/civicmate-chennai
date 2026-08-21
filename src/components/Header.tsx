import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ language, onLanguageChange }) => {
  const isTa = language === 'ta';

  return (
    <header id="main-header" className="h-16 bg-blue-900 text-white flex items-center justify-between px-4 sm:px-8 shadow-md shrink-0 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-900 font-bold text-base shadow-xs shrink-0">
          C
        </div>
        <div className="flex items-baseline gap-2">
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
            CivicMate Chennai
          </h1>
          <span className="hidden md:inline text-xs text-blue-200/80 font-normal">
            {isTa ? 'சென்னை குறைதீர்வு வரைவு' : 'Civic Complaint Drafter'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <span className="hidden sm:inline text-xs bg-blue-800 px-3 py-1 rounded-full text-blue-100 font-medium">
          {isTa ? 'ஏஐ மாதிரி கருவி' : 'AI-Assisted Drafting Prototype'}
        </span>

        {/* Language switch button group */}
        <div className="flex bg-blue-800 rounded-md p-0.5 border border-blue-700/50">
          <button
            id="lang-btn-en"
            type="button"
            onClick={() => onLanguageChange('en')}
            className={`px-3 py-1 rounded-sm text-xs sm:text-sm font-medium transition-all ${
              language === 'en'
                ? 'bg-white text-blue-900 font-semibold shadow-xs'
                : 'text-white opacity-70 hover:opacity-100'
            }`}
          >
            English
          </button>
          <button
            id="lang-btn-ta"
            type="button"
            onClick={() => onLanguageChange('ta')}
            className={`px-3 py-1 rounded-sm text-xs sm:text-sm font-medium transition-all ${
              language === 'ta'
                ? 'bg-white text-blue-900 font-semibold shadow-xs'
                : 'text-white opacity-70 hover:opacity-100'
            }`}
          >
            தமிழ்
          </button>
        </div>
      </div>
    </header>
  );
};

