import React, { useCallback, useMemo, useState, type ReactNode } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useMutation, useQuery } from '@apollo/client/react';
import { LoginDocument, MeDocument, type LoginMutation, type LoginMutationVariables, type MeQuery, type User } from '../graphql/__generated__/graphql';
import { useErrors } from '../hooks/useErrors';

const LOCALSTORAGE_USERTOKEN_KEY = 'user_token';

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(localStorage.getItem(LOCALSTORAGE_USERTOKEN_KEY));

  const { onError } = useErrors();

  const { data: meData } = useQuery<MeQuery>(
    MeDocument,
    {
      variables: {
        userToken,
      },
      fetchPolicy: 'network-only',
      skip: !userToken,
    },
  );

  const [loginMutation] = useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    { onError },
  );

  const isAuthenticated = useMemo<boolean>(() => {
    return userToken !== null;
  }, [userToken]);

  const user = useMemo<User | null>(() => {
    if (meData?.me) {
      return meData.me;
    }

    return null;
  }, [meData]);

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
        onLogin?.();
      }
    });
  }, [loginMutation]);

  const logout = useCallback((onLogout?: () => void) => {
    localStorage.removeItem(LOCALSTORAGE_USERTOKEN_KEY);
    setUserToken(null);
    onLogout?.();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
