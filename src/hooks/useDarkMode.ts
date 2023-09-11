import { useCallback, useState } from 'react';

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

  const toggle = useCallback(
    () =>
      setIsDark((prev) => {
        if (!prev) el.classList.add('dark');
        else el.classList.remove('dark');
        localStorage.darkTheme = !prev;
        return !prev;
      }),
    [el],
  );

  return [isDark, toggle] as const;
};
