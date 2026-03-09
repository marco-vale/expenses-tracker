import { useCallback, useContext } from 'react';
import { ErrorsContext } from '../contexts/ErrorsContext';
import type { ErrorsContextData } from '../types/types';
import type { ErrorLike } from '@apollo/client';

/**
 * Custom hook to access the errors context.
 *
 * @returns {ErrorsContextData} The errors context data containing error state and methods

 * @throws {Error} Throws an error if the hook is used outside of an ErrorsProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { errors, addError, clearErrors } = useErrors();
 *   // Use error context methods and state
 * }
 * ```
 */
export const useErrors = () => {
  const context = useContext<ErrorsContextData | undefined>(ErrorsContext);
  if (!context) {
    throw new Error('useErrors must be used within an ErrorsProvider');
  }

  const { setErrors } = context;

  const onError = useCallback((error: ErrorLike) => {
    setErrors([error.message]);
  }, [setErrors]);

  return { ...context, onError };
};
