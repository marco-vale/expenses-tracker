import React, { useState, type ReactNode } from "react";
import { ErrorsContext } from '../contexts/ErrorsContext';

type ErrorsProviderProps = {
  children: ReactNode;
};

const ErrorsProvider: React.FC<ErrorsProviderProps> = ({ children }) => {
  const [errors, setErrors] = useState<string[]>([]);

  return (
    <ErrorsContext.Provider value={{ errors, setErrors }}>
      {children}
    </ErrorsContext.Provider>
  );
};

export default ErrorsProvider;
