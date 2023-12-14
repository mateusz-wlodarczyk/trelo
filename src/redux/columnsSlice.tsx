import { createSlice } from '@reduxjs/toolkit';

const idPayload = 0;
const contentPaylod = 1;
const startIdColumns = 1;

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
      //wrzucic limit na liczbe kolumn (teoria)
      //create title: action.payload
      return [...state, { id: state.length + startIdColumns, title: action.payload }];
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
        if (column.id === action.payload[idPayload]) {
          return { ...column, title: action.payload[contentPaylod] };
        } else {
          return column;
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
