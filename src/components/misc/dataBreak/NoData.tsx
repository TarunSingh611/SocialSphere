import React from 'react';
import { 
  BoxIcon, 
  Search, 
  FileQuestion, 
  FolderOpen, 
  RefreshCcw,
  Plus
} from 'lucide-react';

// Configuration for different states
const stateConfig = {
  empty: {
    icon: BoxIcon,
    title: 'No Data Found',
    description: 'There are no items to display at the moment.'
  },
  search: {
    icon: Search,
    title: 'No Results Found',
    description: 'Try adjusting your search or filters to find what you\'re looking for.'
  },
  endOfList: {
    icon: FolderOpen,
    title: 'End of List',
    description: 'You\'ve reached the end of the list. No more items to load.'
  },
  error: {
    icon: FileQuestion,
    title: 'Unable to Load Data',
    description: 'There was a problem loading the data. Please try again.'
  }
};

const NoData = ({ 
  type = 'empty',
  title = '',
  description = '',
  actionLabel = '',
  onAction = () => {},
  className = '',
  size = 'default', // 'small', 'default', 'large'
  animated = true
}) => {
  const config = stateConfig[type] || stateConfig.empty;
  const Icon = config.icon;

  // Size classes mapping
  const sizeClasses = {
    small: {
      wrapper: 'p-4',
      icon: 'w-8 h-8',
      title: 'text-lg',
      description: 'text-sm'
    },
    default: {
      wrapper: 'p-8',
      icon: 'w-16 h-16',
      title: 'text-xl',
      description: 'text-base'
    },
    large: {
      wrapper: 'p-12',
      icon: 'w-24 h-24',
      title: 'text-2xl',
      description: 'text-lg'
    }
  }[size];

  return (
    <div className={`flex flex-col items-center justify-center ${sizeClasses.wrapper} ${className}`}>
      {/* Icon with floating animation */}
      <div className={`relative mb-4 ${animated ? 'animate-bounce-slow' : ''}`}>
        <Icon className={`text-gray-400 ${sizeClasses.icon}`} />
        {type === 'empty' && animated && (
          <span className="absolute top-0 right-0 -mr-2 -mt-2">
            <Plus className="w-6 h-6 text-gray-400 animate-ping" />
          </span>
        )}
      </div>

      {/* Title with optional animation */}
      <h3 className={`font-semibold text-gray-700 mb-2 ${sizeClasses.title} ${
        animated ? 'animate-fade-in' : ''
      }`}>
        {title || config.title}
      </h3>

      {/* Description */}
      <p className={`text-gray-500 text-center max-w-sm mb-4 ${sizeClasses.description}`}>
        {description || config.description}
      </p>

      {/* Optional action button */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg
                     hover:bg-blue-600 transition-colors duration-200"
        >
          <RefreshCcw className="w-4 h-4" />
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default NoData;