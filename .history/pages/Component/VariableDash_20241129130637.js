import React, { createContext, useState } from 'react';

export const VariableDash.js = createContext();

export const AppProvider = ({ children }) => {
  const [userName, setUserName] = useState('Dodi Bahari');

  return (
    <VariableDash.js.Provider value={{ userName, setUserName }}>
      {children}
    </VariableDash.js.Provider>
  );
};
