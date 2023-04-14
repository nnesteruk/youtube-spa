import { useLayoutEffect, useState } from 'react';

// const isDarkTheme = window?.matchMedia()
// const defaultTheme = isDarkTheme ? 'dark' : 'light';
export const useTheme = () => {
  const [theme, setTheme] = useState('light');

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  });
  return { theme, setTheme };
};
