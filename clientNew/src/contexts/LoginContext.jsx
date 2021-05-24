import { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

export const useLogin = () => {
  return useContext(LoginContext);
};

export const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  return <LoginContext.Provider value={[loggedIn, setLoggedIn]}>{children}</LoginContext.Provider>;
};
