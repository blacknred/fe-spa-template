import { useEffect, useRef } from 'react';

/**
 * usePrevious api hook
 *
 * @param {any} value
 * @returns any
 */
export function usePrevious<T = unknown>(value: T) {
  const prevValue = useRef<T | null>(null);

  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  return prevValue.current;
}

// function Counter() {
//   const [counter, setCounter] = useState(0);
//   const prevCounter = usePrevious(counter);

//   return (
//     <div>
//       <p>
//         Counter: {counter}; <code>previous: {prevCounter}</code>
//       </p>
//       <button onClick={() => setCounter(counter + 1)}>incr</button>
//     </div>
//   );
// }
