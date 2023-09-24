import { useCallback, useEffect, useState } from 'react';

/**
 * useDarkMode api hook
 *
 * @param {HTMLElement} dom element
 * @returns array
 */
export const useDarkMode = (el = document.documentElement) => {
  const [isDark, setIsDark] = useState(() => {
    if (localStorage.darkTheme === 'true') return true;
    if ('theme' in localStorage) return false;
    if (matchMedia('(prefers-color-scheme: dark)').matches) return true;
    return false;
  });

  useEffect(() => {
    if (isDark) el.classList.add('dark');
    else el.classList.remove('dark');
    localStorage.darkTheme = isDark;
  }, [isDark, el]);

  const toggle = useCallback(() => setIsDark((prev) => !prev), []);

  return [isDark, toggle] as const;
};
