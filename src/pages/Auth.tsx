import { useState } from 'react';
import { Button } from '@mui/material';

import { Login } from '../components/Login';
import { Register } from '../components/Register';

export const Auth = () => {
  const [hasAccount, setHasAccount] = useState(true);
  return (
    <>
      {hasAccount && (
        <>
          <Login />
          <div>
            no account? <Button onClick={() => setHasAccount((show) => !show)}>register</Button>
          </div>
        </>
      )}

      {!hasAccount && (
        <>
          <Register />
          <div>
            has account? <Button onClick={() => setHasAccount((show) => !show)}>login</Button>
          </div>
        </>
      )}
    </>
  );
};
