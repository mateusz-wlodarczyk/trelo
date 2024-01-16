import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';

import { ProtectedWrapper } from './components/ProtectedWrapper';
import { AuthProvider } from './context/contextSupabase';
import { Auth } from './pages/Auth';
import { Error } from './pages/Error';
import { HomeLayout } from './pages/HomeLayout';
import { Info } from './pages/Info';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { themeTextArea } from './style/SXstyle';
import { ROUTES } from './utils/constans';

import './style/style.css';

// const LazyHomeLayout = React.lazy(() => import('./pages/HomeLayout'));
// const LazyAuth = React.lazy(() => import('./pages/Auth'));
// const LazyInfo = React.lazy(() => import('./pages/Info'));
// const LazyError = React.lazy(() => import('./pages/Error'));
// const LazyLogin = React.lazy(() => import('./pages/Login'));
// const LazyRegister = React.lazy(() => import('./pages/Register'));

const App = () => (
  <>
    <AuthProvider>
      <ThemeProvider theme={themeTextArea}>
        <BrowserRouter>
          <Routes>
            <Route
              path={ROUTES.home}
              element={
                <ProtectedWrapper>
                  {/* <Suspense fallback={<div>Loading...</div>}>
                    <LazyHomeLayout />
                    <
                  </Suspense> */}
                  <HomeLayout />
                </ProtectedWrapper>
              }
            />
            <Route
              path={ROUTES.auth}
              element={
                <Auth />
                // <Suspense fallback={<div>Loading...</div>}>
                //   <LazyAuth />
                // </Suspense>
              }
            />
            <Route
              path={ROUTES.info}
              element={
                <Info />
                // <Suspense fallback={<div>Loading...</div>}>
                //   <LazyInfo />
                // </Suspense>
              }
            />
            <Route
              path={ROUTES.login}
              element={
                <Login />
                // <Suspense fallback={<div>Loading...</div>}>
                //   <LazyLogin />
                // </Suspense>
              }
            />

            <Route
              path={ROUTES.register}
              element={
                <Register />
                // <Suspense fallback={<div>Loading...</div>}>
                //   <LazyRegister />
                // </Suspense>
              }
            />

            <Route
              path={ROUTES.error}
              element={
                <Error />
                // <Suspense fallback={<div>Loading...</div>}>
                //   <LazyError />
                // </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  </>
);
export default App;
