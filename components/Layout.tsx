
import React, { useState, useEffect } from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme ? savedTheme === 'dark' : true;
    setIsDark(initialTheme);
    if (initialTheme) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    if (newTheme) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 md:px-8 max-w-6xl mx-auto relative transition-colors duration-500 bg-white dark:bg-[#06090f] text-slate-900 dark:text-white">
      {/* Decorative Corner HUD Elements */}
      <div className="fixed top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-mint-500/20 pointer-events-none" />
      <div className="fixed top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-mint-500/20 pointer-events-none" />
      <div className="fixed bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-mint-500/20 pointer-events-none" />
      <div className="fixed bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-mint-500/20 pointer-events-none" />

      <header className="w-full text-center mb-16 relative">
        <div className="absolute top-0 right-0 flex items-center">
          <button
            onClick={toggleTheme}
            className="group flex items-center space-x-2 px-4 py-2 rounded-full border border-mint-500/20 bg-mint-500/5 hover:bg-mint-500/10 transition-all font-mono"
            title="Toggle Theme"
          >
            <span className="text-[10px] font-mono font-bold text-mint-500 uppercase tracking-widest hidden md:inline">
              {isDark ? 'Tech Dark' : 'High Contrast'}
            </span>
            <div className={`w-8 h-4 rounded-full relative transition-colors ${isDark ? 'bg-mint-900/40' : 'bg-mint-500'}`}>
              <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${isDark ? 'left-1' : 'left-5'}`} />
            </div>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative group/logo cursor-pointer transition-transform duration-500 hover:scale-110">
            <div className="absolute inset-0 bg-mint-400 blur-3xl opacity-20 rounded-full group-hover/logo:opacity-40 transition-opacity" />
            {/* SVG Logo Recreating the Layered Cross Aesthetic */}
            <svg className="w-24 h-24 logo-glow relative" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Nozzle part at bottom */}
              <path d="M45 80L50 90L55 80H45Z" fill="#38e894" />
              {/* Outer Layers (White-ish) */}
              <path d="M30 35H40V25H60V35H70V55H60V65H40V55H30V35Z" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" className="text-slate-200 dark:text-mint-500/30" />
              <path d="M35 40H45V30H55V40H65V50H55V60H45V50H35V40Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" className="text-slate-100 dark:text-mint-400/50" />
              {/* Middle Layers (Green) */}
              <path d="M40 45H50V35H50V45H60V55H50V65H50V55H40V45Z" fill="#38e894" fillOpacity="0.8" />
              {/* Inner core cross */}
              <rect x="46" y="38" width="8" height="24" rx="2" fill="currentColor" className="text-slate-200 dark:text-mint-400" />
              <rect x="38" y="46" width="24" height="8" rx="2" fill="currentColor" className="text-slate-200 dark:text-mint-400" />
            </svg>
          </div>
          <div className="space-y-1">
            <h1 className="text-5xl font-black tracking-[0.15em] text-slate-900 dark:text-white uppercase italic">Slicer Surgeon</h1>
            <div className="flex items-center justify-center space-x-3">
              <div className="h-px w-8 bg-mint-500/30" />
              <p className="text-mint-600 dark:text-mint-400 font-mono text-[10px] uppercase tracking-[0.4em] font-bold">Advanced Diagnostic Protocol v3.1</p>
              <div className="h-px w-8 bg-mint-500/30" />
            </div>
          </div>
        </div>
      </header>

      <main className="w-full relative z-10">
        {children}
      </main>

      <footer className="mt-24 py-12 text-center w-full border-t border-slate-200 dark:border-white/5">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-8 opacity-30 text-slate-900 dark:text-white">
            <div className="text-[10px] font-mono">LAT: 37.7749</div>
            <div className="text-[10px] font-mono">LNG: -122.4194</div>
            <div className="text-[10px] font-mono">SIGNAL: STABLE</div>
          </div>
          <p className="text-slate-500 dark:text-slate-600 text-[10px] font-mono uppercase tracking-widest">
            &copy; 2025 SLICER SURGEON LABS // AUTOMATED DIAGNOSTICS FOR FDM ADDITIVE MFG.
          </p>
        </div>

        <div className="max-w-2xl mx-auto px-4 mt-8">
          <p className="text-[10px] md:text-xs text-slate-400 dark:text-slate-500 leading-relaxed font-medium">
            Privacy & Data Usage: This application uses Google Gemini AI to analyze images.
            Uploaded images are processed in real-time and are not permanently stored on our servers.
            By using this tool, you agree to our processing of your uploads for the purpose of print diagnosis.
          </p>
        </div>
      </footer>
    </div>
  );
};
