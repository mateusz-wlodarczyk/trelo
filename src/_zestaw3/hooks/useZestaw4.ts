import { useEffect, useState } from 'react';

import { dataFile, initialLoadedData } from '../../_zestaw4/utils/data';
import { loadData } from '../../_zestaw4/utils/fetchData';
import { DataFile2, DataFileSingle, InitialLoadedData } from '../../_zestaw4/utils/types';

//redux

export const useZestaw4 = () => {
  const [loadedData, setLoadedData] = useState<InitialLoadedData | DataFile2 | null>(
    initialLoadedData,
  );
  const [foundInputState, setFoundInputState] = useState<DataFileSingle[] | null>([]);
  const [searchedValue, setSearchedValue] = useState('');
  const [showAll, setShowAll] = useState(true);
  useEffect(() => {
    // jak otypowac res?
    loadData(dataFile)
      .then((res) => {
        if (res !== undefined) setLoadedData(res);
      })
      .catch((err) => console.error(err));
  }, []);

  const searchText = (input: string) => {
    // console.log(loadedData.response.data);
    // const foundInput=[]
    const foundInput: DataFileSingle[] = [];
    loadedData !== null &&
      // response otypowac?
      loadedData.response.data.map((item) => {
        if (item.description.includes(input) === true) {
          //   [...foundInput, { ...item }];
          //   [...foundInput, item];
          foundInput.push(item);
        }
        // console.log(foundInput);
      });
    return foundInput;
  };

  const handleSearch = () => {
    setShowAll(false);
    const foundInput = searchText(searchedValue);
    setFoundInputState(foundInput);
    // console.log('click search');
  };

  const handleClearSearch = () => {
    setShowAll(true);
    setSearchedValue('');
    setFoundInputState([]);
  };

  return {
    foundInputState,
    handleClearSearch,
    handleSearch,
    loadedData,
    searchedValue,
    setSearchedValue,
    showAll,
  };
};
