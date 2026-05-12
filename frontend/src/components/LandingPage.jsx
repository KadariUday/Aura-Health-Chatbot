import React from 'react';
import { Activity, Shield, Clock, BrainCircuit, ArrowRight, Sparkles, HeartPulse, Stethoscope } from 'lucide-react';

const LandingPage = ({ onLaunch }) => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans relative overflow-x-hidden text-slate-200">
      
      {/* Navbar */}
      <nav className="w-full px-6 sm:px-12 py-6 flex items-center justify-between relative z-20 backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Activity className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-['Outfit']">Aura Health</span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#about" className="hover:text-white transition-colors">How it works</a>
          <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
        </div>
        <button 
          onClick={onLaunch}
          className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold rounded-full transition-all backdrop-blur-md"
        >
          Enter Enclave
        </button>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 relative z-10 pt-20 pb-32">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-8 message-enter">
          <Sparkles size={16} />
          <span>Next-Generation Healthcare AI</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight max-w-4xl leading-tight font-['Outfit'] message-enter" style={{ animationDelay: '0.1s' }}>
          Your Personal Clinical <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
            Intelligence Engine
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 message-enter leading-relaxed" style={{ animationDelay: '0.2s' }}>
          Experience an advanced neural network designed to analyze symptoms, provide empathetic health guidance, and safely navigate your medical inquiries with zero-shot precision.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 message-enter" style={{ animationDelay: '0.3s' }}>
          <button 
            onClick={onLaunch}
            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full font-semibold text-lg flex items-center gap-3 transition-all shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:shadow-[0_0_45px_rgba(79,70,229,0.6)] transform hover:-translate-y-1"
          >
            Launch Assistant 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-full font-semibold text-lg transition-all backdrop-blur-md">
            View Capabilities
          </button>
        </div>
      </main>

      {/* Features Grid */}
      <section id="features" className="w-full max-w-6xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 backdrop-blur-md hover:bg-slate-800/50 transition-colors group">
            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform">
              <BrainCircuit className="text-blue-400" size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-['Outfit']">Deep NLP Analysis</h3>
            <p className="text-slate-400 leading-relaxed">
              Utilizes state-of-the-art transformer models to perform zero-shot intent classification and extract critical medical entities in real-time.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 backdrop-blur-md hover:bg-slate-800/50 transition-colors group">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <Shield className="text-emerald-400" size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-['Outfit']">Privacy First</h3>
            <p className="text-slate-400 leading-relaxed">
              Designed to run locally on your hardware. Your health data never leaves the enclave, ensuring 100% confidentiality.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 backdrop-blur-md hover:bg-slate-800/50 transition-colors group">
            <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20 group-hover:scale-110 transition-transform">
              <Stethoscope className="text-purple-400" size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-['Outfit']">Clinical Empathy</h3>
            <p className="text-slate-400 leading-relaxed">
              Responses are dynamically generated to be compassionate and informative, with built-in medical safety disclaimers.
            </p>
          </div>

        </div>
      </section>
      
      {/* Footer */}
      <footer className="w-full py-8 border-t border-white/5 text-center text-slate-500 text-sm relative z-10 backdrop-blur-md">
        <p>Aura Health AI © 2026. For educational and demonstrative purposes only.</p>
      </footer>

    </div>
  );
};

export default LandingPage;
