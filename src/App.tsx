import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from '@emotion/react';

import { PopupProvider } from './_zestaw3/context/contextPopup';
import { HomePage } from './_zestaw3/pages/HomePage';
import { Settings } from './_zestaw3/pages/Settings';
import { ROUTES_ZESTAW3 } from './_zestaw3/utils/constans';
import { HomePageZestaw4 } from './_zestaw4/pages/homePageZestaw4';
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
      <PopupProvider>
        <ThemeProvider theme={themeTextArea}>
          <ChakraProvider>
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
                <Route
                  path={ROUTES_ZESTAW3.home}
                  element={
                    <HomePage />
                    // <Suspense fallback={<div>Loading...</div>}>
                    //   <LazyError />
                    // </Suspense>
                  }
                />{' '}
                <Route
                  path={ROUTES_ZESTAW3.settings}
                  element={
                    <Settings />
                    // <Suspense fallback={<div>Loading...</div>}>
                    //   <LazyError />
                    // </Suspense>
                  }
                />
                <Route
                  path={'/zestaw4'}
                  element={
                    <HomePageZestaw4 />
                    // <Suspense fallback={<div>Loading...</div>}>
                    //   <LazyError />
                    // </Suspense>
                  }
                />
              </Routes>
            </BrowserRouter>
          </ChakraProvider>
        </ThemeProvider>
      </PopupProvider>
    </AuthProvider>
  </>
);
export default App;
