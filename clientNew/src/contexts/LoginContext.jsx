import { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

export const useLogin = () => {
  return useContext(LoginContext);
};

export const LoginProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState();
  const [user, setUser] = useState();

  return (
    <LoginContext.Provider value={{ login, setLogin, token, setToken, user, setUser }}>{children}</LoginContext.Provider>
  );
};
