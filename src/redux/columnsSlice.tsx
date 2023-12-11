import { createSlice } from '@reduxjs/toolkit';

const magicNumber_0 = 0;
const magicNumber_1 = 1;
const magicNumber_10 = 0;
export interface ColumnsSlice {
  id: number | string;
  title: string;
}

const initialState: ColumnsSlice[] = [
  // { id: 1, title: 'column1' },
  // { id: 2, title: 'column2' },
  // { id: 3, title: 'column3' },
  // { id: 4, title: 'column4' },
  // { id: 5, title: 'column5' },
  // { id: 6, title: 'column6' },
];

export const columnsSlice = createSlice({
  initialState,
  name: 'columns',
  reducers: {
    createNewColumn: (state, action) => {
      return [...state, { id: state.length + magicNumber_10, title: action.payload }];
    },
    removeOneColumn: (state, action) => {
      const newArray = state.filter((column) => column.id !== action.payload);
      return newArray;
    },
    updateColumnState: (_, action) => {
      return action.payload;
    },
    updateTitleColumn: (state, action) => {
      const newArray = state.map((column) => {
        if (column.id !== action.payload[magicNumber_0]) {
          return column;
        } else {
          return { ...column, title: action.payload[magicNumber_1] };
        }
      });
      return newArray;
    },

    // others?
  },
});

export const { createNewColumn, removeOneColumn, updateColumnState, updateTitleColumn } =
  columnsSlice.actions;

export default columnsSlice.reducer;
