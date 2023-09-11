import {
  useRef,
  experimental_useEffectEvent,
  useEffect,
  useState,
} from 'react';

/**
 * useOnViewport api hook
 *
 * @param {Function} handler
 * @param {IntersectionObserverInit} IntersectionObserver options
 * @returns array
 */
export function useOnViewport(
  handler?: (v: boolean) => unknown,
  options: IntersectionObserverInit = {
    rootMargin: '0px 0px 0px 0px',
    threshold: [0, 1],
    root: null,
  },
) {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef(null);

  const onHandle: IntersectionObserverCallback = experimental_useEffectEvent(
    ([entry]) => {
      if (handler) handler(entry.isIntersecting);
      else setIntersecting(entry.isIntersecting);
    },
  );

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    if (!ref.current) return;
    const observer = new IntersectionObserver(onHandle, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options, onHandle]);

  return [ref, isIntersecting] as const;
}

// function OnViewport() {
//   const [myRef, isVisible] = useOnViewport();
//   return (
//     <div>
//       <p
//         style={{ position: "sticky", top: 50 }}
//       >{`On viewport: ${isVisible}`}</p>
//       <div style={{ height: 1000 }}></div>
//       <div ref={myRef} style={{ height: 300, background: "red" }} />
//     </div>
//   );
// }
