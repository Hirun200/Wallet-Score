import React, { useState } from 'react';
import { ShieldCheck, Search, Zap, Lock, Globe } from 'lucide-react';

const LandingPage = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input); // Passes the address back to App.jsx
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 text-blue-500 mb-6">
          <ShieldCheck size={64} strokeWidth={1.5} />
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">
          Wallet <span className="text-blue-500">Hygiene</span> Score
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
          The public safety scanner for Web3. Enter any address to see its 
          reputation score, active risks, and actionable safety tips.
        </p>
      </div>

      {/* Search Bar Area */}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative flex bg-brand-card border border-brand-border rounded-2xl p-2">
          <input 
            type="text"
            placeholder="Paste address (0x...) or ENS (.eth)"
            className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-lg text-white placeholder:text-slate-600"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2">
            <Search size={20} />
            Scan
          </button>
        </div>
      </form>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl w-full">
        <Feature icon={<Lock size={20}/>} title="Non-Custodial" desc="No wallet connection or signature ever required." />
        <Feature icon={<Globe size={20}/>} title="Public Data" desc="Scanning 100+ risk databases and onchain events." />
        <Feature icon={<Zap size={20}/>} title="Instant Audit" desc="Get a 0–100 hygiene score in under 5 seconds." />
      </div>
    </div>
  );
};

// Small helper component for the features
const Feature = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center text-center p-4">
    <div className="bg-slate-800/50 p-3 rounded-full text-blue-400 mb-4">{icon}</div>
    <h3 className="font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default LandingPage;