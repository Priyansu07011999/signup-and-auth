import React, { createContext, useState } from 'react';

const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token')
  const [token, setToken] = useState(initialToken);

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token)
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token')
  };

  return (
    <AuthContext.Provider
      value={{
        token: token,
        isLoggedIn: !!token,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
