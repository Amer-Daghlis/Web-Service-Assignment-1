import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [levelColor, setLevelColor] = useState('#1976d2'); // default blue
  const [showHeader, setShowHeader] = useState(true);       // ✅ NEW state

  const changeColorByLevel = (level) => {
    const colors = {
      Easy: '#4caf50',
      Medium: '#ff9800',
      Hard: '#d32f2f'
    };
    setLevelColor(colors[level] || '#1976d2');
  };

  return (
    <ThemeContext.Provider
      value={{
        levelColor,
        changeColorByLevel,
        showHeader,        // ✅ expose it
        setShowHeader      // ✅ expose setter
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeColor = () => useContext(ThemeContext);
