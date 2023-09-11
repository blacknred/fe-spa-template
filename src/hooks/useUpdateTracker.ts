import { useEffect, useRef } from 'react';

type Changes<T extends Record<string, unknown>> = Record<
  keyof T,
  { from: unknown; to: unknown }
>;

/**
 * useUpdateTracker api hook
 *
 * @param {any} props
 * @param {string='Component'} name
 */
export function useUpdateTracker<T extends Record<string, unknown>>(
  props: T,
  name = 'Component',
) {
  const prevProps = useRef<T | null>(null);

  useEffect(() => {
    if (prevProps?.current !== null) {
      // accumulate all changed props
      const keys: (keyof T)[] = Object.keys({
        ...prevProps.current,
        ...props,
      });

      const changes = keys.reduce((all, key) => {
        if (prevProps.current && prevProps.current[key] !== props[key]) {
          all[key] = {
            from: prevProps.current[key],
            to: props[key],
          };
        }
        return all;
      }, {} as Changes<T>);

      if (!Object.keys(changes).length) return;

      // console actual changes
      console.group('[tracked updates]');
      console.log(name, changes);
      console.groupEnd();
    }

    // set previous props
    prevProps.current = props;
  });
}
