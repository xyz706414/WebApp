import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface TransitionState {
  isLoading: boolean;
  progress: number;
  isTransitioning: boolean;
  previousPath: string | null;
}

class TransitionManager {
  private static instance: TransitionManager;
  private listeners: Set<(state: TransitionState) => void> = new Set();
  private state: TransitionState = {
    isLoading: false,
    progress: 0,
    isTransitioning: false,
    previousPath: null
  };
  private progressInterval: NodeJS.Timeout | null = null;
  private transitionTimeout: NodeJS.Timeout | null = null;

  static getInstance(): TransitionManager {
    if (!TransitionManager.instance) {
      TransitionManager.instance = new TransitionManager();
    }
    return TransitionManager.instance;
  }

  private constructor() {
    // Listen for browser navigation events
    window.addEventListener('beforeunload', () => {
      this.startTransition();
    });
  }

  subscribe(listener: (state: TransitionState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach(listener => listener({ ...this.state }));
  }

  private updateState(updates: Partial<TransitionState>): void {
    this.state = { ...this.state, ...updates };
    this.notify();
  }

  startTransition(targetPath?: string): void {
    if (this.state.isTransitioning) return;

    this.updateState({
      isLoading: true,
      progress: 0,
      isTransitioning: true,
      previousPath: this.state.previousPath
    });

    // Simulate realistic loading progress
    this.progressInterval = setInterval(() => {
      this.updateState({
        progress: Math.min(this.state.progress + Math.random() * 15 + 5, 85)
      });
    }, 100);

    // Auto-complete after reasonable time if not manually completed
    this.transitionTimeout = setTimeout(() => {
      this.completeTransition();
    }, 2000);
  }

  completeTransition(): void {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }

    if (this.transitionTimeout) {
      clearTimeout(this.transitionTimeout);
      this.transitionTimeout = null;
    }

    // Quick progress to 100%
    this.updateState({ progress: 100 });

    // Hide loading bar after brief delay
    setTimeout(() => {
      this.updateState({
        isLoading: false,
        progress: 0,
        isTransitioning: false
      });
    }, 200);
  }

  setProgress(progress: number): void {
    if (this.state.isTransitioning) {
      this.updateState({ progress: Math.min(progress, 100) });
    }
  }

  getState(): TransitionState {
    return { ...this.state };
  }
}

export const usePageTransition = () => {
  const location = useLocation();
  const transitionManager = TransitionManager.getInstance();
  const [state, setState] = useState<TransitionState>(transitionManager.getState());
  const previousLocationRef = useRef<string>('');
  const isInitialMount = useRef(true);

  useEffect(() => {
    const unsubscribe = transitionManager.subscribe(setState);
    return unsubscribe;
  }, []);

  useEffect(() => {
    const currentPath = location.pathname + location.search;
    
    // Don't trigger transition on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      previousLocationRef.current = currentPath;
      return;
    }

    // Only start transition if path actually changed
    if (previousLocationRef.current !== currentPath) {
      transitionManager.startTransition(currentPath);
      
      // Complete transition after a short delay to allow page to render
      const completeTimer = setTimeout(() => {
        transitionManager.completeTransition();
      }, 300);

      previousLocationRef.current = currentPath;

      return () => clearTimeout(completeTimer);
    }
  }, [location.pathname, location.search]);

  return {
    ...state,
    startTransition: (targetPath?: string) => transitionManager.startTransition(targetPath),
    completeTransition: () => transitionManager.completeTransition(),
    setProgress: (progress: number) => transitionManager.setProgress(progress)
  };
};