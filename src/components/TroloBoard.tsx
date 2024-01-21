import React from 'react';
import { createPortal } from 'react-dom';
import { IoMdAdd } from 'react-icons/io';
import { MdOutlineCancel } from 'react-icons/md';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { Button, TextField } from '@mui/material';

import { useAuthContext } from '../context/contextSupabase';
import { useTroloBoard } from '../hooks/useTroloBoard';
import { ColumnsSlice } from '../redux/columnsSlice';
import { sxButton, sxTextarea } from '../style/SXstyle';
import { saveLocalStorage } from '../utils/supabase';

import { ColumnContainer } from './dnd/ColumnContainer';
import { SingleRow } from './dnd/SingleRow';
import { Nav } from './Nav';

export const TroloBoard = () => {
  const {
    activeColumn,
    activeRow,
    addNewColumnMode,
    columns,
    columnsId,
    handleCancelButtonClick,
    handleClearAll,
    handleClumnNewClick,
    handleCreateNewColumn,
    handleOnChangeNewColumn,
    onDragEnd,
    onDragOver,
    onDragStart,
    rows,
    sensors,
  } = useTroloBoard();
  const { loggedUser, logoutUser } = useAuthContext();
  // otypowac loggedUser
  const handleSaveLocalStorage = () => {
    // console.log(loggedUser.user.id);
    saveLocalStorage(loggedUser.user.id);
  };
  const handleLogoutUser = () => {
    logoutUser();
  };
  return (
    <>
      <Nav
        handleClearAll={handleClearAll}
        handleLogoutUser={handleLogoutUser}
        handleSaveLocalStorage={handleSaveLocalStorage}
      />
      <DndContext
        sensors={sensors}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
      >
        <div className='container'>
          <div className='column-wrapper'>
            <SortableContext items={columnsId}>
              {columns.map((column: ColumnsSlice) => (
                <ColumnContainer
                  key={column.id}
                  column={column}
                  rows={rows.filter((row) => row.columnId === column.id)}
                />
              ))}
            </SortableContext>
            <>
              {!addNewColumnMode && (
                <div className='column-new'>
                  <Button sx={sxButton} onClick={handleClumnNewClick}>
                    + add column
                  </Button>
                </div>
              )}
              {addNewColumnMode && (
                <div>
                  {/* <ThemeProvider theme={themeTextArea}> */}
                  <TextField
                    multiline
                    required
                    className=''
                    minRows={1}
                    sx={sxTextarea}
                    onChange={handleOnChangeNewColumn}
                  />
                  {/* </ThemeProvider> */}
                  <div className=''>
                    <Button onClick={handleCreateNewColumn}>
                      <IoMdAdd className='row-icons' />
                    </Button>
                    <Button onClick={handleCancelButtonClick}>
                      <MdOutlineCancel className='row-icons' />
                    </Button>
                  </div>
                </div>
              )}
            </>{' '}
          </div>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                rows={rows.filter((row) => row.columnId === activeColumn.id)}
              />
            )}
            {activeRow && <SingleRow row={activeRow} />}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </>
  );
};
