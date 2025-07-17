import React, { useState, useEffect, useRef } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className = '',
  duration = 300,
  delay = 0
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Mark as mounted immediately
    setIsMounted(true);
    
    // Start fade-in after a small delay to ensure DOM is ready
    // but don't interfere with scroll restoration
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay + 50); // Small delay to let scroll restoration happen first

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [delay]);

  // Don't render anything until mounted to prevent flash
  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={`transition-opacity ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transitionDuration: `${duration}ms`,
        // Ensure the content is always in the document flow
        // so scroll restoration can work properly
        visibility: 'visible',
        position: 'relative'
      }}
    >
      {children}
    </div>
  );
};