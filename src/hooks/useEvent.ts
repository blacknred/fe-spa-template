import { useEffect, experimental_useEffectEvent } from 'react';

/**
 * useEvent api hook
 *
 * @param {string} eventName
 * @param {Function} handler
 * @param {Element} dom element
 */
export function useEvent(
  eventName: keyof WindowEventMap,
  handler: (e: Event) => unknown,
  el = window,
) {
  const onHandle = experimental_useEffectEvent(handler);

  useEffect(() => {
    el.addEventListener(eventName, onHandle);
    return () => el.removeEventListener(eventName, onHandle);
  }, [el, eventName, onHandle]);
}

// function Position() {
//   const [position, setPosition] = useState(null);
//   useEvent("mousemove", (e: Event) => {
//     setPosition({ x: e.clientX, y: e.clientY });
//   });

//   return (
//     <div>
//       <p>Position: {JSON.stringify(position)}</p>
//     </div>
//   );
// }
