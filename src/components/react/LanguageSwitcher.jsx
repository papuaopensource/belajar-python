import { useState, useRef, useEffect } from 'react';

const languages = {
  id: { name: 'Bahasa Indonesia' },
  en: { name: 'English' }
};

export default function LanguageSwitcher({ currentLang = 'id', currentPath = '/' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getLocalizedPath = (lang) => {
    if (lang === 'id') {
      // Remove /en prefix if exists
      return currentPath.replace(/^\/en/, '') || '/';
    } else {
      // Add /en prefix
      const cleanPath = currentPath.replace(/^\/en/, '') || '/';
      return `/en${cleanPath}`;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
        aria-label="Change language"
      >
        <span className="hidden sm:inline">{languages[currentLang].name}</span>
        <span className="sm:hidden">{currentLang.toUpperCase()}</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-lg z-50">
          <div className="py-1">
            {Object.entries(languages).map(([lang, info]) => (
              <a
                key={lang}
                href={getLocalizedPath(lang)}
                className={`flex items-center space-x-3 px-4 py-2 text-sm hover:bg-accent transition-colors ${
                  currentLang === lang 
                    ? 'bg-accent text-accent-foreground font-medium' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span>{info.name}</span>
                {currentLang === lang && (
                  <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}