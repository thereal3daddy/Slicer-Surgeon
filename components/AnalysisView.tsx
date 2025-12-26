
import React, { useState } from 'react';
import { AnalysisResult, FixStep } from '../types';
import { getDetailedProcedure } from '../services/geminiService';

interface AnalysisViewProps {
  result: AnalysisResult;
  imageUrl: string;
  grounding: any[];
  onReset: () => void;
}

const StepCard = ({ step, index, diagnosis }: { step: FixStep; index: number; diagnosis: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [details, setDetails] = useState<string[] | null>(null);

  const tierStyles = [
    {
      label: 'Priority 1: Immediate Action',
      border: 'border-mint-500/30',
      borderHover: 'group-hover:border-mint-500/50',
      borderActive: 'border-mint-500',
      text: 'text-mint-600 dark:text-mint-400',
      num: 'bg-mint-500/10 text-mint-600 dark:text-mint-400 border-mint-500/20',
      bg: 'bg-mint-500/5',
      btn: 'bg-mint-600 hover:bg-mint-500'
    },
    {
      label: 'Priority 2: Process Calibration',
      border: 'border-blue-500/30',
      borderHover: 'group-hover:border-blue-500/50',
      borderActive: 'border-blue-500',
      text: 'text-blue-600 dark:text-blue-400',
      num: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      bg: 'bg-blue-500/5',
      btn: 'bg-blue-600 hover:bg-blue-500'
    },
    {
      label: 'Priority 3: Hardware Maintenance',
      border: 'border-amber-500/30',
      borderHover: 'group-hover:border-amber-500/50',
      borderActive: 'border-amber-500',
      text: 'text-amber-600 dark:text-amber-400',
      num: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      bg: 'bg-amber-500/5',
      btn: 'bg-amber-600 hover:bg-amber-500'
    }
  ][index - 1] || {
    label: 'Technical Protocol',
    border: 'border-slate-300 dark:border-slate-800',
    borderHover: 'group-hover:border-slate-400 dark:group-hover:border-slate-700',
    borderActive: 'border-slate-900 dark:border-white',
    text: 'text-slate-600 dark:text-slate-400',
    num: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700',
    bg: 'bg-slate-50 dark:bg-slate-900/40',
    btn: 'bg-slate-900 dark:bg-white text-white dark:text-black'
  };

  const handleFetchDetails = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (details) return;
    setLoadingDetails(true);
    try {
      const proc = await getDetailedProcedure(step.title, diagnosis);
      setDetails(proc);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDetails(false);
    }
  };

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`group cursor-pointer border rounded-[2rem] transition-all duration-500 relative overflow-hidden ${isOpen
          ? `bg-slate-50 dark:bg-slate-900/80 ${tierStyles.borderActive} shadow-2xl`
          : `bg-white dark:bg-slate-950/40 ${tierStyles.border} ${tierStyles.borderHover}`
        }`}
    >
      {isOpen && <div className={`absolute inset-0 opacity-10 ${tierStyles.bg} pointer-events-none`} />}

      <div className="p-8 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className={`w-14 h-14 flex items-center justify-center rounded-2xl font-mono font-black text-2xl border transition-all duration-500 ${tierStyles.num} ${isOpen ? 'scale-110 shadow-lg' : ''}`}>
              {index}
            </div>
            <div>
              <div className={`text-[9px] font-mono font-bold uppercase tracking-[0.4em] mb-1.5 transition-colors ${tierStyles.text}`}>
                {tierStyles.label}
              </div>
              <h4 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic">{step.title}</h4>
            </div>
          </div>
          <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-500 ${isOpen ? 'rotate-180 bg-slate-900 dark:bg-white text-white dark:text-black' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-700 border border-black/5 dark:border-white/5'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>

        {isOpen && (
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/5 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="max-w-3xl">
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8 italic">"{step.summary}"</p>

              <div className="space-y-3 mb-10">
                {(details || step.guide).map((item, i) => (
                  <div key={i} className={`flex items-start space-x-4 p-5 rounded-2xl border transition-all duration-300 ${details ? 'bg-white dark:bg-black/40 border-slate-200 dark:border-white/10' : 'bg-transparent border-slate-100 dark:border-white/5'}`}>
                    <span className={`flex-shrink-0 w-6 h-6 rounded-lg text-[10px] font-black flex items-center justify-center ${details ? tierStyles.num : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'}`}>
                      {i + 1}
                    </span>
                    <span className={`text-base leading-relaxed ${details ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                {!details && (
                  <button
                    onClick={handleFetchDetails}
                    disabled={loadingDetails}
                    className={`flex items-center justify-center space-x-3 px-8 py-4 text-white rounded-xl transition-all font-black text-xs uppercase tracking-widest disabled:opacity-50 shadow-xl hover:-translate-y-1 active:translate-y-0 ${tierStyles.btn}`}
                  >
                    {loadingDetails ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    )}
                    <span>{loadingDetails ? 'Generating Guide...' : 'Show Step-by-Step Guide'}</span>
                  </button>
                )}

                {step.resourceLink && (
                  <a
                    href={step.resourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-slate-500 dark:text-slate-500 hover:text-mint-600 dark:hover:text-white font-bold text-xs uppercase tracking-widest transition-colors"
                  >
                    Learn More Online →
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const AnalysisView: React.FC<AnalysisViewProps> = ({ result, imageUrl, onReset }) => {
  if (!result.isPrintFailure) {
    return (
      <div className="text-center py-20 space-y-8 animate-in fade-in duration-700 max-w-lg mx-auto">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase">Recognition Failed</h2>
          <p className="text-slate-500">{result.rejectionMessage || "Could not identify a clear 3D print failure."}</p>
        </div>
        <button onClick={onReset} className="w-full py-4 bg-slate-900 dark:bg-slate-900 border border-slate-800 text-white font-black rounded-xl uppercase text-[10px] tracking-widest">Try Different Photo</button>
      </div>
    );
  }

  return (
    <div className="space-y-24 animate-in fade-in duration-1000 max-w-5xl mx-auto pb-24">
      {/* 1. THE DIAGNOSIS (SUMMARY) - Top Priority */}
      <section className="text-center space-y-8">
        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute -inset-1 bg-mint-500/10 rounded-[2.5rem] blur-2xl opacity-50"></div>
          <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border-[6px] border-slate-100 dark:border-slate-900 shadow-2xl">
            <img src={imageUrl} alt="Analysis Target" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-6">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black text-slate-900 dark:text-white italic">{Math.floor(result.confidenceScore)}%</span>
              <span className="text-[8px] font-mono uppercase text-slate-500 dark:text-slate-600 tracking-widest font-bold">Certainty</span>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
            <div className="text-left">
              <div className="text-[10px] font-mono font-bold text-mint-600 dark:text-mint-500 uppercase tracking-[0.4em]">Primary Diagnosis</div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">{result.diagnosis}</h2>
            </div>
          </div>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">{result.shortDescription}</p>
        </div>
      </section>

      {/* 2. RECOVERY STEPS (ACTION) - Most Important Feature */}
      <section className="space-y-12 relative px-4 sm:px-0">
        <div className="absolute -inset-x-12 -inset-y-16 bg-mint-600/5 blur-[120px] rounded-full pointer-events-none animate-pulse" />

        <div className="relative flex flex-col items-center space-y-3">
          <div className="h-1 w-12 bg-mint-500 rounded-full mb-2 shadow-[0_0_10px_rgba(56,232,148,0.5)]" />
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter text-center">
            3 Quick Fixes
          </h3>
          <p className="text-[11px] font-mono font-bold text-mint-600 dark:text-mint-400 uppercase tracking-[0.6em] text-center">Priority Protocol Sequence</p>
        </div>

        <div className="flex flex-col space-y-6 relative z-10 max-w-4xl mx-auto">
          <StepCard step={result.step1} index={1} diagnosis={result.diagnosis} />
          <StepCard step={result.step2} index={2} diagnosis={result.diagnosis} />
          <StepCard step={result.step3} index={3} diagnosis={result.diagnosis} />
        </div>
      </section>

      {/* 3. EVIDENCE & SYSTEM METADATA (CONTEXT) - Supporting Data */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-12">
        <div className="md:col-span-7 p-10 bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-900 rounded-[2.5rem] shadow-inner">
          <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-8">Visual Evidence Logs</h4>
          <ul className="space-y-6">
            {result.visualEvidence.map((e, i) => (
              <li key={i} className="text-base text-slate-600 dark:text-slate-400 flex items-start space-x-4">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-mint-500/40 flex-shrink-0" />
                <span className="leading-relaxed">{e}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-5 flex flex-col justify-between p-10 bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-900 rounded-[2.5rem] shadow-inner">
          <div className="space-y-8">
            <div className="space-y-2">
              <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Detected Platform</h4>
              <div className="p-4 bg-white dark:bg-black/40 rounded-2xl border border-slate-200 dark:border-white/5">
                <span className="text-xl font-black text-mint-600 dark:text-mint-400 uppercase italic tracking-tight">{result.printerGuess}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">External Knowledge</h4>
              <div className="space-y-2">
                {result.searchQueries.map((q, i) => (
                  <a
                    key={i}
                    href={`https://www.google.com/search?q=${encodeURIComponent(q)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-mint-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all border border-slate-200 dark:border-white/5 text-xs font-bold group"
                  >
                    <span>{q}</span>
                    <svg className="w-3 h-3 opacity-30 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={onReset}
            className="mt-12 w-full py-6 bg-slate-900 dark:bg-white text-white dark:text-black font-black text-xs uppercase tracking-[0.4em] rounded-2xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-2xl hover:-translate-y-1 active:translate-y-0"
          >
            Scan Another Photo
          </button>
        </div>
      </section>
    </div>
  );
};
