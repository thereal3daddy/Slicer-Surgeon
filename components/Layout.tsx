
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 md:px-8 max-w-6xl mx-auto relative">
      {/* Decorative Corner HUD Elements */}
      <div className="fixed top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-blue-500/30 pointer-events-none" />
      <div className="fixed top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-blue-500/30 pointer-events-none" />
      <div className="fixed bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-blue-500/30 pointer-events-none" />
      <div className="fixed bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-blue-500/30 pointer-events-none" />

      <header className="w-full text-center mb-16 relative">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 rounded-full" />
            <svg className="w-16 h-16 text-blue-500 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div className="space-y-1">
            <h1 className="text-5xl font-black tracking-[0.15em] text-white uppercase italic">Slicer Surgeon</h1>
            <div className="flex items-center justify-center space-x-3">
              <div className="h-px w-8 bg-blue-500/30" />
              <p className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.4em] font-bold">Advanced Diagnostic Protocol v3.1</p>
              <div className="h-px w-8 bg-blue-500/30" />
            </div>
          </div>
        </div>
      </header>

      <main className="w-full relative z-10">
        {children}
      </main>

      <footer className="mt-24 py-12 text-center w-full border-t border-white/5 space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-8 opacity-30">
            <div className="text-[10px] font-mono">LAT: 37.7749</div>
            <div className="text-[10px] font-mono">LNG: -122.4194</div>
            <div className="text-[10px] font-mono">SIGNAL: STABLE</div>
          </div>
          <p className="text-slate-600 text-[10px] font-mono uppercase tracking-widest">
            &copy; 2025 SLICER SURGEON LABS // AUTOMATED DIAGNOSTICS FOR FDM ADDITIVE MFG.
          </p>
        </div>

        <div className="max-w-2xl mx-auto px-4">
          <p className="text-[10px] md:text-xs text-slate-500 leading-relaxed font-medium">
            Privacy & Data Usage: This application uses Google Gemini AI to analyze images.
            Uploaded images are processed in real-time and are not permanently stored on our servers.
            By using this tool, you agree to our processing of your uploads for the purpose of print diagnosis.
          </p>
        </div>
      </footer>
    </div>
  );
};
