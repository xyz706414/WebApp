import React, { useEffect, useRef } from 'react';
import { useScrollRestoration } from '../hooks/useScrollRestoration';
import { PageTransition } from './PageTransition';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  preserveScroll?: boolean;
  scrollToTopOnMount?: boolean;
  transitionDuration?: number;
  transitionDelay?: number;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  className = '',
  preserveScroll = true,
  scrollToTopOnMount = false,
  transitionDuration = 400,
  transitionDelay = 0
}) => {
  const { shouldRestoreScroll } = useScrollRestoration();
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      
      // Handle initial scroll behavior
      if (scrollToTopOnMount && !shouldRestoreScroll) {
        // Delay scroll to top slightly to allow transition to start
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto'
          });
        }, 100); // Small delay to let transition begin
      }
    }
  }, [scrollToTopOnMount, shouldRestoreScroll]);

  return (
    <PageTransition 
      duration={transitionDuration}
      delay={transitionDelay}
      className={className}
    >
      {children}
    </PageTransition>
  );
};