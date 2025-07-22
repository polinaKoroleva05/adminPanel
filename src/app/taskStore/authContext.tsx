import React, { useState } from "react";

const AuthContext = React.createContext<{isAuth :boolean, setAuth:(value: boolean)=>void}>({isAuth: false, setAuth: ()=>{}});

export function useAuthContext() {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error('Use app context within provider!');
  return context;
}

export const useCreateAuthContext = function() {
  const [isAuth, setAuth] = useState<boolean>(false);
  return {
    isAuth,
    setAuth,
  };
}

export const AuthContextProvider = ({children}:{ children: React.ReactElement }) => {
  const context = useCreateAuthContext();
  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};