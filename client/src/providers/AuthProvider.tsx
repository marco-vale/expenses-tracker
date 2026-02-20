import React, { useCallback, useMemo, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const LOCALSTORAGE_USERTOKEN_KEY = 'user_token';

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(localStorage.getItem(LOCALSTORAGE_USERTOKEN_KEY));
  const isAuthenticated = useMemo<boolean>(() => {
    return userToken !== null;
  }, [userToken]);

  const login = useCallback((userToken: string) => {
    localStorage.setItem(LOCALSTORAGE_USERTOKEN_KEY, userToken);
    setUserToken(userToken);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(LOCALSTORAGE_USERTOKEN_KEY);
    setUserToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
