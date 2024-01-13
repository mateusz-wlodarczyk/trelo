import React from 'react';
import { Link } from 'react-router-dom';

import { useAuthContext } from '../context/contextSupabase';

export const ProtectedWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isLogin } = useAuthContext();
  if (isLogin) return <> {children}</>;
  return (
    <>
      <p>unauthorized access</p>
      please<Link to='/'>login/register</Link>
    </>
  );
};
