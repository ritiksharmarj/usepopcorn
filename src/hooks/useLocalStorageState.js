import { useEffect, useState } from 'react';

export const useLocalStorageState = (initialState, keyName) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(keyName);

    if (storedValue) return JSON.parse(storedValue);
    else return initialState;
  });

  useEffect(() => {
    localStorage.setItem(keyName, JSON.stringify(value));
  }, [value, keyName]);

  return [value, setValue];
};
