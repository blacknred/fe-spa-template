import { useCallback, useState } from 'react';

/**
 * useAsyncTransition api hook
 *
 * @returns array
 */
export function useAsyncTransition() {
  const [isPending, setIsPending] = useState(false);

  const transition = useCallback((operation: Promise<unknown>) => {
    setIsPending(true);
    operation.then(() => setIsPending(false)).catch(() => setIsPending(false));
  }, []);

  return [isPending, transition] as const;
}
