// src/components/icons/ToothIcon.tsx
import React from 'react';

export const ToothIcon: React.FC<{ className?: string; size?: number }> = ({ 
  className = "", 
  size = 24 
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M4.2 4.2c-1.2 1.2-1.2 3.1 0 4.2C5 9.3 6.4 9.9 7.7 9.5c-.3 1.6-.5 3.3-.5 5 0 3.3 2.7 6 6 6s6-2.7 6-6c0-1.7-.2-3.4-.5-5 1.3.4 2.7-.2 3.5-1.1 1.2-1.1 1.2-3 0-4.2-1.1-1.2-3-1.2-4.2 0-.4.4-.7.9-.9 1.4C16.1 4.5 14.6 4 13 4c-1.6 0-3.1.5-4.1 1.6-.2-.5-.5-1-.9-1.4-1.2-1.2-3.1-1.2-4.2 0z"/>
    </svg>
  );
};