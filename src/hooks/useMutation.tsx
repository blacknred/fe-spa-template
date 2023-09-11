import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useIntl } from "react-intl";

/**
 * useMutation api hook
 *
 * @param {string} uri
 * @param {object={}} request options
 * @returns object
 */
export function useMutation<Data = unknown, Dto extends Record<string, unknown> = Record<string, unknown>, Err = unknown>(url: string, options?: RequestInit) {
  const intl = useIntl()
  const [isPending, setIsPending] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [errors, setErrors] = useState<Err | null>(null);
  const [data, setData] = useState<Data | null>(null);
  const aborter = useRef<AbortController | null>(null);

  const mutator = useCallback(async (dto?: Dto) => {
    aborter.current = new AbortController();
    setIsPending(true);
    setErrors(null);
    setData(null);

    try {
      const res = await fetch(url, {
        signal: aborter.current.signal,
        body: dto ? JSON.stringify(dto) : null,
        method: 'POST',
        ...options || {}
      });

      if (aborter.current?.signal.aborted) return;

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

      setIsDone(true);
      toast.success(intl.formatMessage({ id: 'ui.done' }))
    } catch (e: unknown) {
      console.error(e)

      if (aborter.current?.signal.aborted) return;
      if (typeof e === 'string') toast.error(e)
      else setErrors(e as Err);
    } finally {
      setIsPending(false);
    }
  }, [url, options, intl])

  useEffect(() => () => aborter.current?.abort(), []);

  return { data, errors, isPending, isDone, mutate: mutator, signal: aborter.current?.signal } as const;
}