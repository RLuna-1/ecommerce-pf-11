import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, login, setIsLoggedIn] = useState(false);

  // ...

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
