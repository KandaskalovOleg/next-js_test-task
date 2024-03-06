import React, { createContext, useState, useContext, ReactNode } from 'react';
import { LoaderContextProps  } from '../types/types';

interface LoaderProviderProps {
  children: ReactNode;
}

const LoaderContext = createContext<LoaderContextProps | null>(null);

export default function LoaderProvider({ children }: LoaderProviderProps) {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  return (
    <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = (): LoaderContextProps => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};
