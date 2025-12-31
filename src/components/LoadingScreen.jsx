import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, Shield } from 'lucide-react';

const LoadingScreen = ({ onFinished }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    "Connecting to Ethereum Node...",
    "Fetching Token Approvals...",
    "Checking Flagged Databases...",
    "Scanning Bridge History...",
    "Calculating Hygiene Score..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        setTimeout(onFinished, 1000); 
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full max-w-lg mx-auto p-6">
      <div className="w-full bg-brand-card border border-brand-border rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-10">
          <Shield size={60} className="text-blue-500 animate-pulse" />
          <h2 className="text-2xl font-bold mt-4 text-white">Security Audit</h2>
        </div>
        
        <div className="space-y-5">
          {steps.map((step, index) => (
            <div key={index} className={`flex items-center gap-4 transition-all duration-500 ${index > currentStep ? 'opacity-20' : 'opacity-100'}`}>
              {index < currentStep ? <CheckCircle2 size={22} className="text-hygiene-green" /> : <Loader2 size={22} className="text-blue-500 animate-spin" />}
              <span className="text-lg">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// THIS IS THE LINE YOU ARE LIKELY MISSING:
export default LoadingScreen;