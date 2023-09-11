import { useCallback, useState } from 'react';

/**
 * useDisclosure api hook
 *
 * @param {boolean=false} init value
 * @returns object
 */
export function useDisclosure(init = false) {
  const [isOpen, setIsOpen] = useState(init);

  const open = useCallback((cb?: () => void) => {
    setIsOpen(true);
    cb?.();
  }, []);

  const close = useCallback((cb?: () => void) => {
    setIsOpen(false);
    cb?.();
  }, []);

  const toggle = useCallback((cb?: () => void) => {
    setIsOpen((prev) => !prev);
    cb?.();
  }, []);

  return { isOpen, open, close, toggle } as const;
}
