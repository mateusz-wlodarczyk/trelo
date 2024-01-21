import { createSlice } from '@reduxjs/toolkit';

import { DataFile2 } from '../_zestaw4/utils/types';

export type InitialLoadedData = { error: boolean; name: string };
//zwiekszenie typow
const initialState: InitialLoadedData | DataFile2 = { error: true, name: 'wrong' };
export const zestaw4Slice = createSlice({
  initialState,
  name: 'zestaw4',
  reducers: {
    //load async? initialstate - json
    loadAllREDUX: (state, action) => {
      console.log(state, action);
      return [...state];
    },
    searchInputREDUX: (state, action) => {
      console.log(state, action);
      return [...state];
    },
  },
});

export const { searchInputREDUX } = zestaw4Slice.actions;

export default zestaw4Slice.reducer;
