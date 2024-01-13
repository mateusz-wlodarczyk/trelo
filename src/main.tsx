import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';

import { store } from './redux/store.ts';

import './style/style.css';

const persistor = persistStore(store);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 0, staleTime: 60_000 },
    queryCache: new QueryCache(),
  },
});
const MainApp = React.lazy(() => import('./App.jsx'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Suspense fallback={<div>Loading...</div>}>
            <MainApp />
          </Suspense>
          {/* <App /> */}
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </QueryClientProvider>,
);
