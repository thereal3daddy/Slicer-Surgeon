
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { AnalysisView } from './components/AnalysisView';
import { AppState } from './types';
import { analyzePrintFailure } from './services/geminiService';
import { Analytics } from "@vercel/analytics/next"

const App: React.FC = () => {
  const [state, setState] = useState<AppState & { grounding: any[] | null }>({
    image: null,
    analyzing: false,
    result: null,
    error: null,
    grounding: null,
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState(prev => ({ ...prev, image: reader.result as string, error: null, result: null, grounding: null }));
        startAnalysis(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = async (imageData: string) => {
    setState(prev => ({ ...prev, analyzing: true, error: null }));
    try {
      const { result, grounding } = await analyzePrintFailure(imageData);
      setState(prev => ({ ...prev, result, grounding, analyzing: false }));
    } catch (err: any) {
      setState(prev => ({ ...prev, error: err.message, analyzing: false }));
    }
  };

  const reset = () => {
    setState({
      image: null,
      analyzing: false,
      result: null,
      error: null,
      grounding: null,
    });
  };

  return (
    <Layout>
      {!state.image && !state.analyzing && (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-12 py-12">
          <div className="max-w-2xl text-center space-y-6">
            <div className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] font-mono">Ready to Help</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
              Detect <span className="text-blue-500">Problems</span>. <br />Fix <span className="text-blue-500">Prints</span>.
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              Upload a clear photo of your failed 3D print.
              Our system will analyze the image and give you a simple fix guide.
            </p>
          </div>

          <label className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-blue-500/10 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <div className="relative flex flex-col items-center justify-center w-72 h-72 md:w-96 md:h-96 rounded-[3rem] border border-blue-500/10 bg-slate-900/20 backdrop-blur-sm group-hover:border-blue-500/40 group-hover:bg-slate-900/40 transition-all duration-500 overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/30"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/30"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500/30"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/30"></div>

              <div className="p-6 bg-white/5 rounded-full mb-6 group-hover:bg-blue-600 group-hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-500">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                </svg>
              </div>
              <span className="text-white font-black text-sm uppercase tracking-[0.3em] font-mono group-hover:tracking-[0.5em] transition-all">Choose Photo</span>
              <span className="text-slate-600 text-[9px] mt-4 font-mono uppercase tracking-widest text-center px-4">Supports JPG, PNG, WEBP</span>
            </div>
            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
          </label>

          <div className="flex space-x-12 opacity-40">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono font-bold text-blue-400">01</span>
              <span className="text-[8px] font-mono uppercase tracking-widest">Identify</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono font-bold text-blue-400">02</span>
              <span className="text-[8px] font-mono uppercase tracking-widest">Explain</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono font-bold text-blue-400">03</span>
              <span className="text-[8px] font-mono uppercase tracking-widest">Repair</span>
            </div>
          </div>
        </div>
      )}

      {state.analyzing && (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-12">
          <div className="relative">
            <div className="absolute -inset-8 bg-blue-500/20 blur-[80px] rounded-full animate-pulse"></div>
            {state.image && (
              <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-500/20">
                <img src={state.image} className="w-full h-full object-cover opacity-30 grayscale blur-[2px]" alt="Analyzing" />
                <div className="absolute inset-0 bg-blue-500/10" />
                <div className="scanline"></div>
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 border-[6px] border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          </div>
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
              <h3 className="text-2xl font-black text-white uppercase tracking-[0.2em] italic">Scanning Print...</h3>
            </div>
            <div className="max-w-xs mx-auto">
              <p className="text-blue-400 font-mono text-[9px] uppercase tracking-widest leading-loose animate-pulse">
                &gt; Looking for errors...<br />
                &gt; Checking solution database...<br />
                &gt; Building your repair guide...
              </p>
            </div>
          </div>
        </div>
      )}

      {state.error && (
        <div className="bg-red-500/5 border border-red-500/20 rounded-[2.5rem] p-12 text-center max-w-lg mx-auto shadow-2xl">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-2xl font-black text-white mb-4 uppercase italic">Something Went Wrong</h3>
          <p className="text-red-200/50 mb-10 font-medium leading-relaxed">{state.error}</p>
          <button onClick={reset} className="w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all shadow-xl">Start Over</button>
        </div>
      )}

      {state.result && state.image && (
        <AnalysisView
          result={state.result}
          imageUrl={state.image}
          grounding={state.grounding || []}
          onReset={reset}
        />
      )}
    </Layout>
  );
};

export default App;
