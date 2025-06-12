// src/utils/localStorage.ts
export const saveToLocalStorage = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = <T>(key: string): T | null => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data) as T;
  }
  return null;
};