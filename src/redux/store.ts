import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import columnsReducer from './columnsSlice.tsx';
import rowsReducer from './rowsSlice.tsx';
import zestaw4Reducer from './Zestaw4Slice.tsx';

const reducer = combineReducers({
  columns: columnsReducer,
  rows: rowsReducer,
  zestaw4: zestaw4Reducer,
});

const persistConfig = {
  key: 'columnsAndRows',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

// export const store = configureStore({ reducer });
export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
