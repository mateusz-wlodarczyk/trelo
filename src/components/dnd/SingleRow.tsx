import React, { useState } from 'react';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IconButton, TextField } from '@mui/material';

import { removeSingleRow, RowsSlice, updateSingleRow } from '../../redux/rowsSlice';
import { sxTextarea } from '../../style/SXstyle';
import { ID_INDEX_IN_TEXT_INPUT, VALUE_INDEX_IN_TEXT_INPUT } from '../../utils/constans';

type ArrayInput = string | number;

export const SingleRow = ({ row }: { row: RowsSlice }) => {
  const dispatch = useDispatch();
  const [textInput, setTextInput] = useState<ArrayInput[]>([ID_INDEX_IN_TEXT_INPUT, row.content]);
  const [editRowMode, setEditRowMode] = useState(false);
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    data: { row, type: 'Row' },
    disabled: editRowMode,
    id: row.id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const handleOnKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      setEditRowMode((show) => !show);
      dispatch(updateSingleRow(textInput));
    }
    if (e.key === 'Escape') {
      setEditRowMode((show) => !show);
    }
  };

  const handleOnChange = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setTextInput([row.id, e.target.value]);
  };

  if (isDragging) {
    return <div className='row-dragging' ref={setNodeRef} style={style} />;
  }

  if (editRowMode) {
    return (
      <div className='row-single' ref={setNodeRef} {...listeners} {...attributes} style={style}>
        <TextField
          key={row.id}
          multiline
          required
          minRows={1}
          sx={sxTextarea}
          value={textInput[VALUE_INDEX_IN_TEXT_INPUT]}
          onBlur={() => setEditRowMode((show) => !show)}
          onChange={handleOnChange}
          //poprawic onBlur
          onKeyDown={handleOnKey}
        />
      </div>
    );
  }

  return (
    <>
      {/*  eslint-disable-next-line */}
      <div
        key={row.id}
        className='row-single'
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        onClick={() => setEditRowMode((show) => !show)}
      >
        <div className='row-btn-container'>
          {!editRowMode && <p>{row.content}</p>}
          {!editRowMode && (
            <div style={{ margin: '0px', padding: '0px' }}>
              <IconButton
                sx={{ margin: '2px', padding: '2px' }}
                onClick={() => {
                  dispatch(removeSingleRow(row.id));
                }}
              >
                <MdOutlineDeleteOutline
                  className='row-icons'
                  style={{ color: 'white', margin: '0px', padding: '0px' }}
                />
              </IconButton>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
