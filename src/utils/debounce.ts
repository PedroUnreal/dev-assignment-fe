import { useRef, MutableRefObject } from 'react';

export function useDebounce(timeout = 500) {
  const timer: MutableRefObject<number | null> = useRef(null);

  return (func: (...args: any) => any) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = window.setTimeout(() => {
      func();
    }, timeout);
  };
}
