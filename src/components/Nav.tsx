import React from 'react';
import { Button } from '@mui/material';

export const Nav = ({
  handleClearAll,
  handleLogoutUser,
  handleSaveLocalStorage,
}: {
  handleClearAll: () => void;
  handleLogoutUser: () => void;
  handleSaveLocalStorage: () => void;
}) => {
  return (
    <div>
      <Button onClick={handleLogoutUser}>logout</Button>
      <Button onClick={handleClearAll}>clear</Button>
      <Button onClick={handleSaveLocalStorage}>save</Button>
    </div>
  );
};
