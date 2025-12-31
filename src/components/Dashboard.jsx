import React from 'react';
import { 
  ShieldCheck, AlertTriangle, Info, CheckCircle, 
  Share2, LayoutDashboard, ExternalLink, ShieldAlert, Globe, Wallet 
} from 'lucide-react';
import { calculateHygiene } from '../utils/scoringEngine';

const Dashboard = ({ address, data, onNewScan }) => {
  const { finalScore, findings } = calculateHygiene(address, data);

  const scoreColor = finalScore > 70 ? 'text-hygiene-green' : finalScore > 40 ? 'text-hygiene-amber' : 'text-hygiene-red';
  const scoreBg = finalScore > 70 ? 'bg-hygiene-green/10' : finalScore > 40 ? 'bg-hygiene-amber/10' : 'bg-hygiene-red/10';

  return (
    <div className="flex min-h-screen bg-brand-dark">
      
      {/* Sidebar - Desktop */}
      <aside className="w-64 border-r border-brand-border p-6 flex flex-col hidden lg:flex">
        <div className="flex items-center gap-2 text-blue-500 font-bold text-xl mb-10">
          <ShieldCheck size={28} />
          <span>HYGIENE</span>
        </div>
        <nav className="space-y-2">
          <button className="w-full flex items-center gap-3 p-3 bg-blue-600/10 text-blue-500 rounded-xl font-medium">
            <LayoutDashboard size={20}/> Overview
          </button>
        </nav>
        <button 
          onClick={onNewScan}
          className="mt-auto bg-brand-card border border-brand-border hover:bg-slate-800 text-white p-3 rounded-xl transition text-sm font-bold"
        >
          New Scan
        </button>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Wallet Analysis</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-slate-500 font-mono text-xs break-all">{address}</span>
              <ExternalLink size={14} className="text-slate-500 hover:text-white cursor-pointer" />
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-2xl border border-brand-border">
            <Globe size={14} className="text-blue-400" />
            <span className="text-xs font-bold text-white uppercase tracking-tighter">
                {data?.networkName || 'Ethereum'} Mainnet
            </span>
          </div>
        </header>

        {/* 1. PORTFOLIO HERO SECTION */}
        <div className="mb-8 p-8 bg-gradient-to-br from-blue-600/20 to-purple-600/10 border border-blue-500/20 rounded-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
                <Wallet size={16} className="text-blue-400" />
                <p className="text-xs font-black text-blue-400 uppercase tracking-widest">Portfolio Balance</p>
            </div>
            <div className="flex items-baseline gap-3">
                <h2 className="text-6xl font-black text-white">
                {data?.ethBalance?.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
                </h2>
                <span className="text-2xl font-bold text-slate-400">{data?.networkName === 'MATIC' ? 'POL' : 'ETH'}</span>
            </div>
            <p className="mt-2 text-sm text-slate-400 font-medium">Native assets currently held in wallet</p>
          </div>
          {/* Decorative background glow */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all"></div>
        </div>

        {/* 2. SCORE AND STATS GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-12">
          
          {/* Hygiene Score Card */}
          <div className={`xl:col-span-1 border border-brand-border rounded-3xl p-10 flex flex-col items-center justify-center text-center ${scoreBg}`}>
             <span className="text-slate-400 uppercase text-[10px] font-black tracking-[0.2em] mb-2">Safety Score</span>
             <div className={`text-9xl font-black leading-none ${scoreColor}`}>
               {finalScore}
             </div>
             <p className={`mt-6 text-sm font-black uppercase tracking-widest ${scoreColor}`}>
               {finalScore > 70 ? 'Wallet is Secure' : finalScore > 40 ? 'Action Recommended' : 'Critical Danger'}
             </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatCard 
              title="Token Approvals" 
              value={data?.approvalCount || 0} 
              desc="Contracts with permission"
              icon={<ShieldAlert className={data?.approvalCount > 5 ? "text-hygiene-red" : "text-hygiene-green"}/>} 
            />
            <StatCard 
              title="Transactions" 
              value={data?.txCount || 0} 
              desc="On-chain activity"
              icon={<LayoutDashboard className="text-blue-400"/>} 
            />
            <StatCard 
              title="Account Type" 
              value={data?.isContract ? "Smart Contract" : "EOA Wallet"} 
              desc="Entity identification"
              icon={<Info className="text-purple-400"/>} 
            />
            <StatCard 
              title="Social Verification" 
              value="Unverified" 
              desc="ENS / Lens Status"
              icon={<CheckCircle className="text-slate-500"/>} 
            />
          </div>
        </div>

        {/* 3. IMPROVEMENT PLAN */}
        <div className="bg-brand-card border border-brand-border rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="text-blue-500" /> Security Findings
            </h3>
            <span className="text-slate-500 text-sm font-mono">{findings.length} Flagged Items</span>
          </div>

          <div className="space-y-4">
            {findings.length > 0 ? findings.map(f => (
              <div key={f.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-brand-dark/50 border border-brand-border rounded-2xl hover:border-slate-600 transition-all gap-4">
                <div className="flex items-start gap-4">
                  <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${f.severity === 'high' ? 'bg-hygiene-red animate-pulse' : 'bg-hygiene-amber'}`} />
                  <div>
                    <p className="font-bold text-white text-lg leading-tight">{f.label}</p>
                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-bold">{f.severity} Risk Detected</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 justify-between md:justify-end">
                  <div className="text-right">
                    <p className="text-sm font-black text-red-500">-{Math.abs(f.penalty)} PTS</p>
                  </div>
                  <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-5 py-2 rounded-xl text-xs font-bold transition-all">
                    REVOKE
                  </button>
                </div>
              </div>
            )) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-hygiene-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-hygiene-green" size={32} />
                </div>
                <p className="text-slate-400 font-medium italic">No critical security vulnerabilities found.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, desc, icon }) => (
  <div className="bg-brand-card border border-brand-border p-6 rounded-3xl hover:bg-white/5 transition-all group">
    <div className="mb-4 p-3 bg-brand-dark rounded-2xl w-fit group-hover:scale-110 transition-transform">{icon}</div>
    <div>
      <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">{title}</div>
      <div className="text-2xl font-black text-white">{value}</div>
      <div className="text-xs text-slate-600 mt-1 font-medium">{desc}</div>
    </div>
  </div>
);

export default Dashboard;