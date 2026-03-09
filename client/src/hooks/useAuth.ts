import { useContext } from 'react';
import type { AuthContextData } from '../types/types';
import { AuthContext } from '../contexts/AuthContext';

/**
 * Custom hook to access the authentication context.
 *
 * @returns {AuthContextData} The authentication context data containing user authentication information and methods.
 *
 * @throws {Error} Throws an error if the hook is used outside of an AuthProvider.
 *
 * @example
 * ```tsx
 * const { user, login, logout } = useAuth();
 * ```
 */

export const useAuth = (): AuthContextData => {
  const context = useContext<AuthContextData | undefined>(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
