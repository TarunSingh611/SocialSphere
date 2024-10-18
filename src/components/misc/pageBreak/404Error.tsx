import React, { useState, useEffect } from 'react';
import { Rocket, Star, Compass, MoonStar } from 'lucide-react';

const Error404 = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => ({
        x: Math.sin(Date.now() / 1000) * 20,
        y: Math.cos(Date.now() / 1000) * 20
      }));
      setRotation(prev => (prev + 1) % 360);
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-indigo-950 flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="relative max-w-2xl w-full text-center">
        {/* Floating stars background */}
        <div className="absolute inset-0 z-0">
          {[...Array(20)].map((_, i) => (
            <Star
              key={i}
              className="text-white opacity-30 absolute animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                transform: `scale(${0.5 + Math.random() * 0.5})`
              }}
            />
          ))}
        </div>

        {/* Animated moonstar as a cosmic object */}
        <div className="absolute right-12 top-12">
          <MoonStar 
            className="text-indigo-400 w-16 h-16 animate-pulse"
            style={{ animationDuration: '3s' }}
          />
        </div>

        {/* Floating astronaut/rocket */}
        <div 
          className="relative z-10 mb-8"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`
          }}
        >
          <h1 className="text-8xl font-bold text-white mb-4">404</h1>
          <Rocket 
            className="text-white w-24 h-24 mx-auto"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
        </div>

        <h2 className="text-3xl font-bold text-white mb-4">Lost in Space</h2>
        <p className="text-indigo-200 mb-8">
          Houston, we have a problem! The page you're looking for has drifted into deep space.
        </p>

        {/* Navigation elements */}
        <div className="flex justify-center gap-6 mb-8">
          <div className="relative">
            <Star className="text-indigo-400 w-8 h-8 animate-spin" />
            <Star className="text-indigo-400 w-4 h-4 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <Compass className="text-indigo-400 w-8 h-8 animate-pulse" />
          <div className="relative">
            <Star className="text-indigo-400 w-8 h-8 animate-spin" style={{ animationDirection: 'reverse' }} />
            <Star className="text-indigo-400 w-4 h-4 absolute -bottom-1 -left-1 animate-pulse" />
          </div>
        </div>

        {/* Navigation button */}
        <button 
          onClick={() => window.history.back()}
          className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-500 transition-colors duration-300 group"
        >
          <span className="flex items-center gap-2">
            Return to Earth
            <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>

        {/* Additional floating stars */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between p-8 opacity-50">
          <Star className="animate-pulse w-4 h-4" style={{ animationDelay: '0.5s' }} />
          <Star className="animate-pulse w-4 h-4" style={{ animationDelay: '1s' }} />
          <Star className="animate-pulse w-4 h-4" style={{ animationDelay: '1.5s' }} />
        </div>
      </div>
    </div>
  );
};

export default Error404;