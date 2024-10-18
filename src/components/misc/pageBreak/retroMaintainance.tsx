import React, { useState, useEffect } from 'react';
import { Monitor, Terminal, Power, Clock } from 'lucide-react';

const MaintenanceMode = () => {
  const [cursorVisible, setCursorVisible] = useState(true);
  const [loadingDots, setLoadingDots] = useState(0);
  const [powerPulse, setPowerPulse] = useState(false);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);

    const dotsInterval = setInterval(() => {
      setLoadingDots(prev => (prev + 1) % 4);
    }, 500);

    const powerInterval = setInterval(() => {
      setPowerPulse(prev => !prev);
    }, 2000);

    return () => {
      clearInterval(cursorInterval);
      clearInterval(dotsInterval);
      clearInterval(powerInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-green-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Retro monitor frame */}
        <div className="relative border-8 border-green-800 rounded-lg p-8 bg-black">
          <div className="absolute top-2 right-2">
            <Power 
              className={`w-6 h-6 ${
                powerPulse ? 'text-green-400' : 'text-green-800'
              }`}
            />
          </div>

          {/* Terminal content */}
          <div className="font-mono text-green-400">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-6 h-6" />
              <span>System Status</span>
            </div>

            <div className="mb-4">
              &gt; Initiating maintenance mode{'.'.repeat(loadingDots)}
            </div>

            <div className="mb-4">
             &gt; Estimated downtime: 
              <Clock className="inline w-4 h-4 mx-2" />
              2 hours
            </div>

            <div className="mb-4">
            &gt; Running system updates{'.'.repeat(loadingDots)}
            </div>

            <div>
            &gt; Please stand by{cursorVisible ? '_' : ' '}
            </div>
          </div>
        </div>

        {/* Monitor stand */}
        <div className="w-32 h-8 bg-green-800 mx-auto" />

        <div className="text-center mt-8">
          <p className="text-green-400 mb-4">
            We're performing scheduled maintenance to improve your experience.
          </p>
          <div className="inline-flex items-center gap-2 text-green-500">
            <Monitor className="w-4 h-4" />
            <span>System status: Maintenance in progress</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceMode;