import React, { useMemo, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';
import { MdOutlineCancel } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, IconButton, Popover, TextField, Typography } from '@mui/material';

import { ColumnsSlice, removeOneColumn, updateTitleColumn } from '../../redux/columnsSlice';
import { createNewRow, removeRowsInRemovedColumn, RowsSlice } from '../../redux/rowsSlice';
import {} from '../../style/SXstyle';
import { sxButton, sxTextarea } from '../../style/SXstyle';
import {
  ACTIVE_LENGTH,
  ACTIVE_LENGTH_INDEX,
  ID_INDEX_IN_TEXT_INPUT,
  VALUE_INDEX_IN_TEXT_INPUT,
} from '../../utils/constans';
import { PopoverCustom } from '../PopoverCustom';

import { SingleRow } from './SingleRow';

type InputField = string | number;

export const ColumnContainer = ({ column, rows }: { column: ColumnsSlice; rows: RowsSlice[] }) => {
  const dispatch = useDispatch();

  const [textInput, setTextInput] = useState<InputField[]>([ID_INDEX_IN_TEXT_INPUT, column.title]);
  const [newTask, setNewTask] = useState<InputField[]>([ID_INDEX_IN_TEXT_INPUT, '']);

  const [textInputMode, setTextInputMode] = useState(false);
  const [addNewTaskMode, setAddNewTaskMode] = useState(false);

  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    data: { column, type: 'Column' },
    disabled: textInputMode,
    id: column.id,
  });

  const rowsId = useMemo(() => rows.map((row) => row.id), [rows]);
  const style = { transform: CSS.Transform.toString(transform), transition };
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClickPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);
  const id = isOpen ? 'simple-popover' : undefined;

  const handleOnKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      setTextInputMode((show) => !show);
      dispatch(updateTitleColumn(textInput));
    }

    if (e.key === 'Escape') {
      setTextInputMode((show) => !show);
    }
  };

  const handleRowIconAction = () => {
    if (newTask[ACTIVE_LENGTH_INDEX].length > ACTIVE_LENGTH) {
      dispatch(createNewRow(newTask));
      setAddNewTaskMode((show) => !show);
      setNewTask([ID_INDEX_IN_TEXT_INPUT, '']);
    } else {
      setAddNewTaskMode((show) => !show);
      setNewTask([ID_INDEX_IN_TEXT_INPUT, '']);
    }
  };

  const handleOnChange = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setTextInput([column.id, e.target.value]);
  };
  const handleOnChangeRow = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setNewTask([column.id, e.target.value]);
  };

  if (isDragging) {
    return <div className='column-dnd' ref={setNodeRef} style={style} />;
  }

  return (
    <div ref={setNodeRef} style={style}>
      <div {...attributes} {...listeners} className='column-container'>
        <div className='column-header'>
          {/*  eslint-disable-next-line */}
          <div
            onClick={() => {
              setTextInputMode(true);
              if (addNewTaskMode === true) setAddNewTaskMode((show) => !show);
            }}
          >
            {!textInputMode && <p className='column-textarea'>{column.title}</p>}

            {textInputMode && (
              <TextField
                autoFocus
                multiline
                required
                minRows={1}
                sx={sxTextarea}
                value={textInput[VALUE_INDEX_IN_TEXT_INPUT]}
                onChange={handleOnChange}
                // onInput={handleInput}
                onBlur={() => setTextInputMode((show) => !show)}
                //poprawic onBlur
                onKeyDown={handleOnKey}
              />
            )}
          </div>
          <div>
            {!textInputMode && (
              <>
                <IconButton sx={{ margin: '2px', padding: '2px' }} onClick={handleClickPopover}>
                  <BsThreeDots className='row-icons' />
                </IconButton>
                <Popover
                  anchorEl={anchorEl}
                  open={isOpen}
                  anchorOrigin={{
                    horizontal: 'left',
                    vertical: 'bottom',
                  }}
                  onClose={handleClosePopover}
                >
                  <Typography sx={{ p: 2 }}>
                    <PopoverCustom
                      clickDelete={() => {
                        dispatch(removeOneColumn(column.id));
                        dispatch(removeRowsInRemovedColumn(column.id));
                      }}
                    />
                  </Typography>
                </Popover>
              </>
            )}
          </div>
        </div>
        <div className='rows-wrapper'>
          <SortableContext items={rowsId}>
            {rows.map((row) => (
              <SingleRow key={row.id} row={row} />
            ))}
          </SortableContext>
        </div>
        {!addNewTaskMode && (
          <div className='column-btn-newRow'>
            <Button
              sx={sxButton}
              onClick={() => {
                setAddNewTaskMode((show) => !show);
                if (textInputMode === true) setTextInputMode((show) => !show);
              }}
            >
              +add task
            </Button>
          </div>
        )}
        {addNewTaskMode && (
          <div className='column-btn-newRow'>
            <TextField
              multiline
              required
              minRows={1}
              sx={sxTextarea}
              onChange={handleOnChangeRow}
            />{' '}
            <div>
              <Button onClick={handleRowIconAction}>
                <IoMdAdd className='row-icons' />
              </Button>
              <Button
                onClick={() => {
                  setAddNewTaskMode((show) => !show);
                  setNewTask([ID_INDEX_IN_TEXT_INPUT, '']);
                }}
              >
                <MdOutlineCancel className='row-icons' />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
