import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useLazyQuery, useMutation } from '@apollo/client/react';
import { LoginDocument, MeDocument, type LoginMutation, type MeQuery, type User } from '../graphql/__generated__/graphql';

const LOCALSTORAGE_USERTOKEN_KEY = 'user_token';

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(localStorage.getItem(LOCALSTORAGE_USERTOKEN_KEY));
  const [user, setUser] = useState<User | null>(null);

  const [loginMutation] = useMutation<LoginMutation>(LoginDocument);
  const [meQuery] = useLazyQuery<MeQuery>(MeDocument, {
    fetchPolicy: 'network-only',
  });

  const isAuthenticated = useMemo<boolean>(() => {
    return userToken !== null;
  }, [userToken]);

  const login = useCallback((email: string, password: string, onLogin?: () => void) => {
    loginMutation({
      variables: {
        login: {
          email,
          password,
        },
      },
    }).then((loginResult) => {
      if (loginResult.data?.login) {
        localStorage.setItem(LOCALSTORAGE_USERTOKEN_KEY, loginResult.data.login);
        setUserToken(loginResult.data.login);

        if (onLogin) {
          onLogin();
        }
      }
    });
  }, [loginMutation]);

  const logout = useCallback((onLogout?: () => void) => {
    localStorage.removeItem(LOCALSTORAGE_USERTOKEN_KEY);
    setUserToken(null);
    setUser(null);

    if (onLogout) {
      onLogout();
    }
  }, []);

  useEffect(() => {
    if (!userToken) {
      return;
    }

    const abortController = new AbortController();

    meQuery({
      variables: {
        userToken,
      },
      context: {
        fetchOptions: {
          signal: abortController.signal,
        },
      },
    }).then(({ data: meData }) => {
      if (meData?.me) {
        setUser(meData.me);
      } else {
        logout();
      }
    }).catch(() => {
      if (abortController.signal.aborted) {
        return;
      }

      logout();
    });

    return () => {
      abortController.abort();
    };
  }, [logout, meQuery, userToken]);

  return (
    <AuthContext.Provider value={{ userToken, user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
