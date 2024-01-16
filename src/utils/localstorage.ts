export const saveToLocalStorage = () => {
  try {
    localStorage.setItem('local', 'persist:columnsAndRows');
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const getFromLocalStorage = () => {
  try {
    const savedStorage = localStorage.getItem('persist:columnsAndRows');
    return { isAccess: true, value: savedStorage };
  } catch (error) {
    console.log(error);
    return { isAccess: false };
  }
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
