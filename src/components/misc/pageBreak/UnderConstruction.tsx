import React, { useState, useEffect } from 'react';
import { Cog, Wrench, HardHat, Hammer } from 'lucide-react';

const UnderConstruction = () => {
  const [rotation, setRotation] = useState(0);
  const [bounce, setBounce] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
      setBounce(prev => Math.sin(Date.now() / 500) * 10);
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      {/* Main content container */}
      <div className="relative max-w-2xl w-full text-center">
        {/* Animated gears */}
        <div className="absolute top-0 right-0 transform -translate-y-1/2">
          <Cog 
            className="text-yellow-400 w-16 h-16"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
          <Cog 
            className="text-yellow-400 w-12 h-12 absolute -left-6 top-8"
            style={{ transform: `rotate(-${rotation}deg)` }}
          />
        </div>

        {/* Main heading */}
        <div className="mb-8">
          <h1 
            className="text-4xl md:text-6xl font-bold text-yellow-400 mb-4"
            style={{ transform: `translateY(${bounce}px)` }}
          >
            🚧 Under Construction 🚧
          </h1>
          <p className="text-xl text-slate-300">We&apos;re building something awesome!</p>
        </div>

        {/* Animated construction elements */}
        <div className="flex justify-center gap-8 mb-8">
          <Hammer className="text-yellow-400 w-12 h-12 animate-bounce" />
          <Wrench className="text-yellow-400 w-12 h-12 animate-pulse" />
          <HardHat className="text-yellow-400 w-12 h-12 animate-bounce" />
        </div>

        {/* Interactive card */}
        <div 
          className={`bg-slate-800 p-6 rounded-lg shadow-lg transition-all duration-300 transform ${
            isHovered ? 'scale-105 bg-slate-700' : ''
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Work in Progress</h2>
          <p className="text-slate-300 mb-4">
            Our team of digital craftsmen is hard at work building this page.
            Check back soon to see what we&apos;re creating!
          </p>
          <div className="flex justify-center gap-4">
            <div className="h-2 w-24 bg-yellow-400 rounded animate-pulse"></div>
            <div className="h-2 w-24 bg-yellow-400 rounded animate-pulse delay-75"></div>
            <div className="h-2 w-24 bg-yellow-400 rounded animate-pulse delay-150"></div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-8">
          <div className="w-full bg-slate-700 rounded-full h-4">
            <div 
              className="bg-yellow-400 h-4 rounded-full transition-all duration-300"
              style={{ width: `${(rotation / 360) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;