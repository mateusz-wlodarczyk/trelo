import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

import columnsReducer from './columnsSlice.tsx';
import rowsReducer from './rowsSlice.tsx';

const reducer = combineReducers({
  columns: columnsReducer,
  rows: rowsReducer,
});
//active pozniej
const persistConfig = {
  key: 'columnsAndRows',
  storage,
};

// const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({ reducer });
// export const store = configureStore({
//   devTools: process.env.NODE_ENV !== 'production',
//   middleware: [thunk],
//   reducer: persistedReducer,
// });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
