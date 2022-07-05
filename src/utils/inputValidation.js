import { getFromLocalStorage } from "./localStorage"

export const isButtonDisabled = (value, nextValue) => {
  return nextValue === value || !nextValue;
};

export const isUnique = (formName, name, setError) => {
  const collections = getFromLocalStorage('collections');
  const result = collections.findIndex(item => item.title === name)

  if (result < 0) {
   return;
  }

  setError(formName, {
    type: 'unique',
    message: 'This collection already exist'
  })
};

export const isAlphaNumeric = (formName, name, setError) => {
  const result = /^[a-z0-9]+$/i.test(name);

  if (!result) {
    setError(formName, {
      type: 'alphanumeric',
      message: `You can't use special characters`
    })
  }
};

export const validateCollectionNameForm = (formName, name, setError) => {
  setError(formName, {});
  
  isUnique(formName, name, setError);
  isAlphaNumeric(formName, name, setError);
};
