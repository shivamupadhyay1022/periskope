'use client';

import React, { createContext, useContext, useState } from 'react';

interface UIContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const UIContext = createContext<UIContextType>({
  isSidebarOpen: true,
  toggleSidebar: () => {},
  theme: 'light',
  setTheme: () => {},
});

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <UIContext.Provider value={{ isSidebarOpen, toggleSidebar, theme, setTheme }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
