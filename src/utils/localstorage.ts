export const saveToLocalStorage = () => {
  const savedStorage = localStorage.setItem('local', 'persist:columnsAndRows');
  // console.log(savedStorage);
};
export const getFromLocalStorage = () => {
  const savedStorage = localStorage.getItem('persist:columnsAndRows');

  return savedStorage;
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
