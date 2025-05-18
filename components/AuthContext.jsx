import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [isPremium, setIsPremium] = useState(false);  // NEW state for premium users
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      isGuest,
      setIsGuest,
      isPremium,
      setIsPremium,
      token,
      setToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);