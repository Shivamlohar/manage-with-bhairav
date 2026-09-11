import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center gap-2 p-2 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
        isDark
          ? 'bg-slate-800/90 border-slate-700 text-amber-400 hover:bg-slate-700 shadow-sm'
          : 'bg-white border-slate-200 text-slate-700 hover:text-amber-600 hover:bg-slate-50 shadow-sm'
      } ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun 
          className={`w-4 h-4 transition-all duration-500 transform ${
            isDark 
              ? 'rotate-90 scale-0 opacity-0 absolute' 
              : 'rotate-0 scale-100 opacity-100 text-amber-500'
          }`} 
        />
        <Moon 
          className={`w-4 h-4 transition-all duration-500 transform ${
            isDark 
              ? 'rotate-0 scale-100 opacity-100 text-amber-400' 
              : '-rotate-90 scale-0 opacity-0 absolute'
          }`} 
        />
      </div>
      {showLabel && (
        <span className="text-xs font-semibold">
          {isDark ? 'Bright Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
};
