import React, { createContext, useState } from 'react';

export const VariableDash = createContext();

export const AppProvider = ({ children }) => {
  const [userName, setUserName] = useState('Dodi Bahari');
  const [userRole, setUserRole] = useState('Admin');
  const [appTheme, setAppTheme] = useState('light');

  return (
    <VariableDash.Provider
      value={{
        userName,
        setUserName,
        userRole,
        setUserRole,
        appTheme,
        setAppTheme,
      }}
    >
      {children}
    </VariableDash.Provider>
  );
};
