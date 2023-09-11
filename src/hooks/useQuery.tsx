import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const FETCH_TIMEOUT = 10 * 1000;

/**
 * useQuery api hook
 *
 * @param {string=} uri
 * @param {object={}} query
 * @param {object={}} request options
 * @returns object
 */
export function useQuery<Data = unknown, Err = Error>(url: string, options?: RequestInit) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Err | null>(null);
  const [data, setData] = useState<Data | null>(null);
  const needUpdate = useRef<boolean>(true);

  const fetcher = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(FETCH_TIMEOUT),
        ...options || {}
      });
      if (!needUpdate) return;

      if (!res.ok) {
        if (res.body) {
          const type = res.headers.get('content-type');
          if (type === 'application/json') throw await res.json();
          if (type === 'text/plain') throw await res.text();
        }

        throw res.statusText;
      }

      if (res.body) {
        const type = res.headers.get('content-type');
        if (type === 'application/json') setData(await res.json() as Data);
        if (type === 'text/plain') setData(await res.text() as Data);
      }
    } catch (e: unknown) {
      console.error(e)
      if (!needUpdate) return;
      if (typeof e === 'string') toast.error(e)
      else setError(e as Err);
    } finally {
      setIsLoading(false);
    }
  }, [url, options])

  useEffect(() => {
    void fetcher();
    return () => {
      needUpdate.current = false;
    }
  }, [fetcher]);

  return { data, error, isLoading, refetch: fetcher } as const;
}
