import React, { useCallback, useMemo, useState, type ReactNode } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useMutation, useQuery } from '@apollo/client/react';
import { LoginDocument, MeDocument, type LoginMutation, type LoginMutationVariables, type MeQuery, type MeQueryVariables, type User } from '../graphql/__generated__/graphql';
import { useErrors } from '../hooks/useErrors';
import { LOCALSTORAGE_USERTOKEN_KEY } from '../constants/constants';

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(localStorage.getItem(LOCALSTORAGE_USERTOKEN_KEY));

  const { onError } = useErrors();

  const { data: meData, loading: meLoading, error: meError } = useQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    {
      fetchPolicy: 'cache-first',
      skip: !userToken,
    },
  );

  const [loginMutation] = useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    { onError },
  );

  const user = useMemo<User | null>(() => {
    if (meData?.me) {
      return meData.me;
    }

    return null;
  }, [meData]);

  const isAuthenticated = useMemo<boolean>(() => {
    return userToken !== null && !!user;
  }, [user, userToken]);

  const login = useCallback((email: string, password: string, onLogin?: () => void) => {
    loginMutation({
      variables: {
        login: {
          email,
          password,
        },
      },
    }).then((result) => {
      if (result.data?.login) {
        localStorage.setItem(LOCALSTORAGE_USERTOKEN_KEY, result.data.login);
        setUserToken(result.data.login);
        onLogin?.();
      }
    });
  }, [loginMutation]);

  const logout = useCallback((onLogout?: () => void) => {
    localStorage.removeItem(LOCALSTORAGE_USERTOKEN_KEY);
    setUserToken(null);
    onLogout?.();
  }, []);

  if (meError) {
    logout();
  }

  return (
    <AuthContext.Provider value={{ userToken, user, userLoading: meLoading, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
