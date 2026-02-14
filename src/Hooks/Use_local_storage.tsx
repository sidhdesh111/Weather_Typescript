import React, { useEffect, useState } from "react";

export function Use_local_storage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const item = window.localStorage.setItem(
        key,
        JSON.stringify(storedValue),
      );
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);

  return { storedValue, setStoredValue };
}
