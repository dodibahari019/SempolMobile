import React, { createContext, useState } from 'react';

export const VariableDash = createContext();

export const AppProvider = ({ children }) => {
  const [userName, setUserName] = useState('Dodi Bahari');

  return (
    <VariableDash.Provider value={{ userName, setUserName }}>
      {children}
    </VariableDash.Provider>
  );
};
