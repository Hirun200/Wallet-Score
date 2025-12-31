import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoadingScreen from './components/LoadingScreen';
import Dashboard from './components/Dashboard';
import { getLiveWalletData } from './utils/blockchainService'; // Our new API service

function App() {
  const [view, setView] = useState('landing'); 
  const [walletAddress, setWalletAddress] = useState('');
  const [liveData, setLiveData] = useState(null);
  const [network, setNetwork] = useState('ETH_MAINNET');

  // The logic flow: Search -> Fetch -> Load -> Display
  const startScan = async (address) => {
    setWalletAddress(address);
    setView('loading');
    
    try {
      // 1. Fetch real data from Alchemy
      const data = await getLiveWalletData(address, network);
      
      if (data) {
        setLiveData(data);
        // Note: The view switch to 'dashboard' happens in the LoadingScreen's onFinished callback
      } else {
        throw new Error("No data returned");
      }
    } catch (err) {
      console.error("Scan failed:", err);
      alert("Failed to fetch blockchain data. Check your API key or address.");
      setView('landing');
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-slate-200">
      
      {/* 1. LANDING VIEW */}
      {view === 'landing' && (
        <>
          <nav className="p-6 flex justify-between items-center border-b border-brand-border">
            <div className="font-bold flex items-center gap-2 tracking-tighter">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">H</div>
              <span className="text-white">HYGIENE</span>
            </div>
            {/* Simple Network Selector */}
            <select 
              value={network} 
              onChange={(e) => setNetwork(e.target.value)}
              className="bg-brand-card border border-brand-border text-xs rounded-lg px-3 py-2 outline-none focus:border-blue-500"
            >
              <option value="ETH_MAINNET">Ethereum</option>
              <option value="MATIC_MAINNET">Polygon</option>
              <option value="BASE_MAINNET">Base</option>
            </select>
          </nav>
          <LandingPage onSearch={startScan} />
        </>
      )}
      
      {/* 2. LOADING VIEW */}
      {view === 'loading' && (
        <LoadingScreen onFinished={() => setView('dashboard')} />
      )}

      {/* 3. DASHBOARD VIEW */}
      {view === 'dashboard' && (
        <Dashboard 
          address={walletAddress} 
          data={liveData} // Passing the real API data here
          onNewScan={() => {
            setLiveData(null);
            setView('landing');
          }} 
        />
      )}

    </div>
  );
}

export default App;