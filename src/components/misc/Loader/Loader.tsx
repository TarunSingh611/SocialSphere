import React from 'react';
import { Loader2, RefreshCw, Sparkles } from 'lucide-react';

// 1. Button Loaders
const ButtonLoader = ({ 
  loading, 
  children, 
  variant = 'primary', 
  size = 'default',
  disabled = false,
  className = '',
  onClick 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
    outline: "border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500"
  };

  const sizes = {
    small: "px-3 py-1.5 text-sm",
    default: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
          <span className="opacity-75">Loading...</span>
        </>
      ) : children}
    </button>
  );
};

// 2. Full Page Loader
const FullPageLoader = ({ message = "Loading..." }) => (
  <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
    <div className="relative">
      {/* Outer spinning circle */}
      <div className="absolute inset-0 border-4 border-t-blue-600 border-r-blue-600 border-transparent rounded-full animate-spin" />
      
      {/* Inner pulsing circle */}
      <div className="w-16 h-16 rounded-full bg-blue-100 animate-pulse flex items-center justify-center">
        <Sparkles className="w-8 h-8 text-blue-600" />
      </div>
    </div>
    
    <div className="mt-4 text-gray-700 font-medium">{message}</div>
    
    {/* Loading dots */}
    <div className="flex gap-1 mt-2">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  </div>
);

// 3. Skeleton Loaders
const Skeleton = ({ 
  variant = 'line',
  width,
  height,
  className = '',
  repeat = 1
}) => {
  const baseStyles = "animate-pulse bg-gray-200 rounded";
  
  const variants = {
    line: "h-4 rounded-md",
    circle: "rounded-full",
    rectangle: "rounded-md",
    card: "rounded-lg",
  };

  const elements = [...Array(repeat)].map((_, index) => (
    <div
      key={index}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${className}
      `}
      style={{
        width: width,
        height: height,
        ...(repeat > 1 && { marginBottom: '0.5rem' })
      }}
    />
  ));

  return <>{elements}</>;
};

// 4. Card Skeleton
const CardSkeleton = ({ count = 1 }) => (
  <div className="space-y-4">
    {[...Array(count)].map((_, i) => (
      <div key={i} className="border rounded-lg p-4 space-y-3">
        <div className="flex items-center space-x-3">
          <Skeleton variant="circle" width={40} height={40} />
          <div className="flex-1">
            <Skeleton variant="line" width="60%" height="auto" />
          </div>
        </div>
        <Skeleton variant="line" width="100%" height="auto"/>
        <Skeleton variant="line" width="80%" height="auto"/>
        <div className="flex justify-between">
          <Skeleton variant="rectangle" width={100} height={24} />
          <Skeleton variant="rectangle" width={60} height={24} />
        </div>
      </div>
    ))}
  </div>
);

// 5. Table Skeleton
const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <div className="border rounded-lg overflow-hidden">
    {/* Header */}
    <div className="bg-gray-50 p-4 border-b grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {[...Array(columns)].map((_, i) => (
        <Skeleton key={i} variant="line" width="80%" height="auto"/>
      ))}
    </div>
    
    {/* Rows */}
    {[...Array(rows)].map((_, rowIndex) => (
      <div 
        key={rowIndex}
        className="p-4 border-b grid gap-4"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {[...Array(columns)].map((_, colIndex) => (
          <Skeleton 
            key={colIndex} 
            variant="line"
            width={`${Math.random() * 40 + 40}%`}
            height="auto"
          />
        ))}
      </div>
    ))}
  </div>
);

// 6. Inline Loader
const InlineLoader = ({ size = 'default', color = 'blue' }) => {
  const sizes = {
    small: 'w-4 h-4',
    default: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  const colors = {
    blue: 'text-blue-600',
    gray: 'text-gray-600',
    green: 'text-green-600',
    red: 'text-red-600'
  };

  return (
    <div className="inline-flex items-center gap-2">
      <RefreshCw className={`${sizes[size]} ${colors[color]} animate-spin`} />
      <span className={`text-${color}-600 text-sm`}>Loading...</span>
    </div>
  );
};

// Export Components
export {
  ButtonLoader,
  FullPageLoader,
  Skeleton,
  CardSkeleton,
  TableSkeleton,
  InlineLoader
};