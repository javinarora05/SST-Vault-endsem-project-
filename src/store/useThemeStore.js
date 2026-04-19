
import { create } from 'zustand';


const getInitialDarkMode = () => {
  const stored = localStorage.getItem('sst-pulse-dark-mode');
  if (stored !== null) return stored === 'true';
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const useThemeStore = create(() => ({
  darkMode: true,

  toggleTheme: () => {},

  initTheme: () => {
    document.documentElement.classList.add('dark');
  },
}));

export default useThemeStore;
