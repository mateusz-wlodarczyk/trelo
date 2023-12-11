import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Error } from './pages/Error';
import { HomeLayout } from './pages/HomeLayout';

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
