import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false); // ✅ Keep guest mode
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      isGuest,
      setIsGuest,
      token,
      setToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);