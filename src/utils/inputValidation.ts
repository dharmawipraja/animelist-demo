import { getFromLocalStorage } from "./localStorage";
import { Collection } from '../types';
import { SetErrorFunction } from '../types';

export const isButtonDisabled = (value: unknown, nextValue: unknown): boolean => {
  return nextValue === value || !nextValue;
};

export const isUnique = (formName: string, name: string, setError: SetErrorFunction): void => {
  const collections: Collection[] = getFromLocalStorage<Collection[]>('collections') || [];
  const result = collections.findIndex(item => item.title === name);

  if (result < 0) {
   return;
  }

  setError(formName, {
    type: 'unique',
    message: 'This collection already exist'
  });
};

export const isAlphaNumeric = (formName: string, name: string, setError: SetErrorFunction): void => {
  const result = /^[a-z0-9\s]+$/i.test(name);

  if (!result) {
    setError(formName, {
      type: 'alphanumeric',
      message: `You can't use special characters`
    });
  }
};

export const validateCollectionNameForm = (formName: string, name: string, setError: SetErrorFunction): void => {
  setError(formName, {}); // Clear previous error for this form field

  // Check for uniqueness and alphanumeric in sequence.
  // If isUnique sets an error, it will be preserved unless isAlphaNumeric also sets one (which would overwrite it).
  // This behavior is consistent with the original code.
  isUnique(formName, name, setError);
  // Potentially check if an error is already set by isUnique if only one error message is desired.
  // For now, matching existing logic where isAlphaNumeric could overwrite isUnique's error.
  isAlphaNumeric(formName, name, setError);
};
