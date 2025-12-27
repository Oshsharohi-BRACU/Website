import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import MainContent from './components/MainContent';
import CustomCursor from './components/CustomCursor';
import { AppState, Theme } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INTRO);
  const [theme, setTheme] = useState<Theme>(Theme.DARK); // Default to dark for cinematic feel

  useEffect(() => {
    // Apply theme to HTML element
    const root = window.document.documentElement;
    if (theme === Theme.DARK) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };

  const handleLandingComplete = () => {
    setAppState(AppState.MAIN);
  };

  return (
    <div className={`antialiased font-sans selection:bg-brand-red selection:text-white`}>
      <CustomCursor />
      
      {appState === AppState.INTRO && (
        <LandingPage onComplete={handleLandingComplete} />
      )}

      {appState === AppState.MAIN && (
        <MainContent toggleTheme={toggleTheme} isDark={theme === Theme.DARK} />
      )}
    </div>
  );
};

export default App;