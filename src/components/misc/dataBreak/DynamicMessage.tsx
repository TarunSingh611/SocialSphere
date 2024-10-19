import React, { useState, useEffect, useCallback } from 'react';
import { 
  CheckCircle, 
  AlertCircle, 
  Info, 
  AlertTriangle,
  X,
  ArrowRight,
  MessageCircle
} from 'lucide-react';

const MessageDisplay = ({
  type = 'info', // 'success', 'error', 'warning', 'info'
  title,
  message,
  action,
  onAction,
  dismissible = true,
  autoClose = false, // Can be false or number in milliseconds
  className = '',
  animate = true
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  const handleClose = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => setIsVisible(false), 300);
  }, []);

  useEffect(() => {
    // Only set timer if autoClose is a number greater than 0
    if (typeof autoClose === 'number' && autoClose > 0) {
      const timer = setTimeout(handleClose, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, handleClose]);

  if (!isVisible) return null;

  const config = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      iconColor: 'text-green-400'
    },
    error: {
      icon: AlertCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      iconColor: 'text-red-400'
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800',
      iconColor: 'text-yellow-400'
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-400'
    }
  }[type];

  const Icon = config.icon;

  return (
    <div 
      className={`
        ${config.bgColor} ${config.borderColor} ${config.textColor}
        border rounded-lg shadow-sm
        transition-all duration-300
        ${animate ? 'animate-slide-in-bottom' : ''}
        ${isLeaving ? 'opacity-0 translate-y-2' : 'opacity-100'}
        ${className}
      `}
    >
      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={`flex-shrink-0 ${config.iconColor}`}>
            <Icon className="w-5 h-5" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {title && (
              <h3 className="text-sm font-medium mb-1">
                {title}
              </h3>
            )}
            <div className="text-sm opacity-90">
              {message}
            </div>

            {/* Action button */}
            {action && onAction && (
              <button
                onClick={onAction}
                className={`
                  mt-3 text-sm font-medium inline-flex items-center gap-1
                  hover:opacity-80 transition-opacity
                `}
              >
                {action}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Close button */}
          {dismissible && (
            <button
              onClick={handleClose}
              className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageDisplay;