import React, { useState, useEffect } from 'react';
import { Server, Zap, AlertTriangle, RefreshCcw } from 'lucide-react';

const Error500 = () => {
  const [serverShake, setServerShake] = useState(false);
  const [sparkPosition, setSparkPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setServerShake(prev => !prev);
      setSparkPosition(prev => (prev + 1) % 3);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-red-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Server with electricity effect */}
        <div className="relative mb-8">
          <Server 
            className={`text-red-400 w-32 h-32 mx-auto transition-transform duration-100 ${
              serverShake ? 'translate-x-1' : '-translate-x-1'
            }`}
          />
          {[...Array(3)].map((_, i) => (
            <Zap
              key={i}
              className={`absolute text-yellow-400 w-6 h-6 transition-opacity duration-200 ${
                sparkPosition === i ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                top: `${20 + i * 20}%`,
                left: `${45 + (i % 2) * 10}%`
              }}
            />
          ))}
        </div>

        <h1 className="text-8xl font-bold text-red-500 mb-4">500</h1>
        <h2 className="text-3xl font-bold text-white mb-4">Server Error</h2>
        <p className="text-red-200 mb-8">
          Our servers are feeling under the weather. Our team has been notified and is working on a fix.
        </p>

        <div className="flex justify-center gap-6 mb-8">
          <AlertTriangle className="text-red-400 w-8 h-8 animate-pulse" />
          <RefreshCcw className="text-red-400 w-8 h-8 animate-spin" />
        </div>

        <button 
          onClick={() => window.location.reload()}
          className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-500 transition-colors duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Error500;