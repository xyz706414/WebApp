import React from 'react';
import { usePageTransition } from '../hooks/usePageTransition';

export const LoadingBar: React.FC = () => {
  const { isLoading, progress } = usePageTransition();

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1">
      <div 
        className="h-full bg-gradient-to-r from-coral-500 via-purple-500 to-mint-500 transition-all duration-300 ease-out shadow-lg"
        style={{ 
          width: `${progress}%`,
          boxShadow: '0 0 10px rgba(240, 116, 62, 0.5)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-coral-500 via-purple-500 to-mint-500 opacity-20 animate-pulse" />
    </div>
  );
};