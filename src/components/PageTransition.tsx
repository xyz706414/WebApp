import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { usePageTransition } from '../hooks/usePageTransition';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const { isTransitioning } = usePageTransition();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState<'idle' | 'exiting' | 'entering'>('idle');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('exiting');
    }
  }, [location, displayLocation]);

  useEffect(() => {
    if (transitionStage === 'exiting') {
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('entering');
      }, 150); // Half of transition duration

      return () => clearTimeout(timer);
    } else if (transitionStage === 'entering') {
      const timer = setTimeout(() => {
        setTransitionStage('idle');
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [transitionStage, location]);

  const getTransitionClasses = () => {
    switch (transitionStage) {
      case 'exiting':
        return 'opacity-0 transform translate-y-2 scale-[0.98]';
      case 'entering':
        return 'opacity-0 transform translate-y-2 scale-[0.98]';
      case 'idle':
      default:
        return 'opacity-100 transform translate-y-0 scale-100';
    }
  };

  return (
    <div 
      className={`transition-all duration-300 ease-in-out ${getTransitionClasses()}`}
      key={displayLocation.pathname}
    >
      {children}
    </div>
  );
};