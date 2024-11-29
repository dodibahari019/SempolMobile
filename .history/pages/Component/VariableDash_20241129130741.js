import React, { createContext, useState } from 'react';

export const VariableDash = createContext();

export const AppProvider = ({ children }) => {
  const [userName, setUserName] = useState('Dodi Bahari');
  const [userRole, setUserRole] = useState('Admin');
  const [appTheme, setAppTheme] = useState('light'); // Tema aplikasi
  const appVersion = '1.0.0'; // Variabel statis

  return (
    <VariableDash.Provider
      value={{
        userName,
        setUserName,
        userRole,
        setUserRole,
        appTheme,
        setAppTheme,
        appVersion,
      }}
    >
      {children}
    </VariableDash.Provider>
  );
};
