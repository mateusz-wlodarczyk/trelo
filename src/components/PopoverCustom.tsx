import React from 'react';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { IconButton } from '@mui/material';

export const PopoverCustom = ({ clickDelete }) => {
  return (
    <div>
      <div style={{ margin: '0px', padding: '0px' }}>
        <IconButton sx={{ margin: '2px', padding: '2px' }} onClick={() => clickDelete()}>
          delete
          <MdOutlineDeleteOutline
            className='row-icons'
            style={{ color: 'black', margin: '0px', padding: '0px' }}
          />
        </IconButton>
      </div>
      <div>example 1</div>
      <div>example 2</div>
      <div>example 3</div>
      <div>example 4</div>
      <div>example 5</div>
    </div>
  );
};
