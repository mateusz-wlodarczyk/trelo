import { DataFile } from './types';

export const loadData = (data: DataFile) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
      reject('błąd');
    }, 1000);
  });
};
