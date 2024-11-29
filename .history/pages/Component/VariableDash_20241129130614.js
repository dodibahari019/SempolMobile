import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userName, setUserName] = useState('Dodi Bahari');

  return (
    <AppContext.Provider value={{ userName, setUserName }}>
      {children}
    </AppContext.Provider>
  );
};
