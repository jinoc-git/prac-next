import { useEffect, useState } from 'react';

function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
) {
  const [debouncedCallback, setDebouncedCallback] = useState(callback);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCallback(callback);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);

  return debouncedCallback;
}

export default useDebounce;
