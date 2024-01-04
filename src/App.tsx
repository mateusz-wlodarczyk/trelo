import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Error } from './pages/Error';
import { HomeLayout } from './pages/HomeLayout';

import './utils/style.css';
const App = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />} path='/' />
        <Route element={<Error />} path='*' />
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
