import React, { useMemo, useRef, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';
import { MdOutlineCancel } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, IconButton, Popover, TextField, ThemeProvider, Typography } from '@mui/material';

import { ColumnsSlice, removeOneColumn, updateTitleColumn } from '../../redux/columnsSlice';
import { createNewRow, RowsSlice } from '../../redux/rowsSlice';
import { sxButton, sxTextarea, themeTextArea } from '../../utils/SXstyle';
import { PopoverCustom } from '../PopoverCustom';

import { SingleRow } from './SingleRow';

import '../../utils/style.css';

const ACTIVE_LENGTH = 1;
const ACTIVE_LENGTH_INDEX = 1;
const ID_INDEX_IN_TEXT_INPUT = 0;
const VALUE_INDEX_IN_TEXT_INPUT = 1;
const REF_INPUT = 10;
type ArrayInput = string | number;

export const ColumnContainer = ({ column, rows }: { column: ColumnsSlice; rows: RowsSlice[] }) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();

  const [textInput, setTextInput] = useState<ArrayInput[]>([ID_INDEX_IN_TEXT_INPUT, column.title]);
  const [newTask, setNewTask] = useState<ArrayInput[]>([ID_INDEX_IN_TEXT_INPUT, '']);

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

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleOnKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      setTextInputMode((show) => !show);
      dispatch(updateTitleColumn(textInput));
    }

    if (e.key === 'Escape') {
      setTextInputMode((show) => !show);
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
              <ThemeProvider theme={themeTextArea}>
                <TextField
                  autoFocus
                  multiline
                  required
                  minRows={1}
                  sx={sxTextarea}
                  value={textInput[VALUE_INDEX_IN_TEXT_INPUT]}
                  // onInput={handleInput}

                  onKeyDown={handleOnKey}
                  onBlur={() => setTextInputMode((show) => !show)}
                  //poprawic onBlur
                  onChange={handleOnChange}
                />
              </ThemeProvider>
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
                  open={open}
                  anchorOrigin={{
                    horizontal: 'left',
                    vertical: 'bottom',
                  }}
                  onClose={handleClosePopover}
                >
                  <Typography sx={{ p: 2 }}>
                    <PopoverCustom clickDelete={() => dispatch(removeOneColumn(column.id))} />
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
            {/* walidacja */}
            <ThemeProvider theme={themeTextArea}>
              <TextField
                multiline
                required
                minRows={1}
                sx={sxTextarea}
                onChange={handleOnChangeRow}
              />{' '}
            </ThemeProvider>
            <div>
              <Button
                onClick={() => {
                  if (newTask[ACTIVE_LENGTH_INDEX].length > ACTIVE_LENGTH) {
                    dispatch(createNewRow(newTask));
                    setAddNewTaskMode((show) => !show);
                    setNewTask([ID_INDEX_IN_TEXT_INPUT, '']);
                  } else {
                    setAddNewTaskMode((show) => !show);
                    setNewTask([ID_INDEX_IN_TEXT_INPUT, '']);
                  }
                }}
              >
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
