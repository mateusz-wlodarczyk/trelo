import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';

import { ProtectedWrapper } from './components/ProtectedWrapper';
import { AuthProvider } from './context/contextSupabase';
import { Auth } from './pages/Auth';
import { Error } from './pages/Error';
import { HomeLayout } from './pages/HomeLayout';
import { Info } from './pages/Info';
import { themeTextArea } from './style/SXstyle';

import './style/style.css';

const App = () => (
  <>
    <AuthProvider>
      <ThemeProvider theme={themeTextArea}>
        <BrowserRouter>
          <Routes>
            <Route
              path='/home'
              element={
                <ProtectedWrapper>
                  <HomeLayout />
                </ProtectedWrapper>
              }
            />
            <Route element={<Auth />} path='/' />
            <Route element={<Info />} path='/info' />
            <Route element={<Error />} path='*' />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  </>
);

export default App;
