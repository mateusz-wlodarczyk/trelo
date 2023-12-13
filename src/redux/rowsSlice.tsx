import { createSlice } from '@reduxjs/toolkit';

const idPayload = 0;
const contentPaylod = 1;
export const startIdRows = 10000;

export interface RowsSlice {
  columnId: number;
  content: string;
  id: number;
}

const initialState: RowsSlice[] = [
  // { columnId: 1, content: 'rows1', id: 1 },
  // { columnId: 1, content: 'rows2', id: 2 },
  // { columnId: 2, content: 'rows3', id: 3 },
  // { columnId: 3, content: 'rows4', id: 4 },
  // { columnId: 6, content: 'rows5', id: 5 },
  // { columnId: 5, content: 'rows6', id: 6 },
  // { columnId: 4, content: 'rows7', id: 7 },
  // { columnId: 2, content: 'rows8', id: 8 },
];

export const rowsSlice = createSlice({
  initialState,
  name: 'rows',
  reducers: {
    createNewRow: (state, action) => {
      return [
        ...state,
        { columnId: action.payload, content: 'test', id: state.length + startIdRows },
      ];
    },
    removeRowsInRemovedColumn: (state, action) => {
      const newArray = state.filter((row) => row.columnId !== action.payload);
      return newArray;
    },
    removeSingleRow: (state, action) => {
      const newArray = state.filter((row) => row.id !== action.payload);
      return newArray;
    },

    updateRowState: (_, action) => {
      return action.payload;
    },
    updateSingleRow: (state, action) => {
      const newArray = state.map((row) => {
        if (row.id !== action.payload[idPayload]) {
          return row;
        } else {
          return { ...row, content: action.payload[contentPaylod] };
        }
      });

      return newArray;
    },

    // others??
  },
});

export const {
  createNewRow,
  removeRowsInRemovedColumn,
  removeSingleRow,
  updateRowState,
  updateSingleRow,
} = rowsSlice.actions;

export default rowsSlice.reducer;
