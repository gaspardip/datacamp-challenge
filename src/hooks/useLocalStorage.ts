import { useCallback, useEffect, useRef, useState } from 'react';

export function useLocalStorage(
  key: string,
  initialValue: string,
  delay = 300
) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ?? initialValue;
  });

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const setValueDebounced = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    setValue(newValue);


    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      localStorage.setItem(key, newValue);
    }, delay);
  }, [key, delay]);

  return [value, setValueDebounced] as const;
}
