import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { removeSingleRow, RowsSlice, updateSingleRow } from '../../redux/rowsSlice';

const ID_INDEX_IN_TEXT_INPUT = 0;
const VALUE_INDEX_IN_TEXT_INPUT = 1;
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
    return (
      <div
        ref={setNodeRef}
        style={{
          borderStyle: 'solid',
          height: '75px',
          opacity: '30%',
          transform: CSS.Transform.toString(transform),
          transition,
          width: '180px',
        }}
      />
    );
  }

  if (editRowMode) {
    return (
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{
          borderStyle: 'solid',
          height: '75px',
          transform: CSS.Transform.toString(transform),
          transition,
          width: '180px',
        }}
      >
        <textarea
          key={row.id}
          value={textInput[VALUE_INDEX_IN_TEXT_INPUT]}
          //poprawic onBlur
          onBlur={() => setEditRowMode((show) => !show)}
          onChange={handleOnChange}
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
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{
          borderStyle: 'solid',
          cursor: 'grab',
          height: '75px',
          transform: CSS.Transform.toString(transform),
          transition,
          width: '180px',
        }}
        onClick={() => setEditRowMode((show) => !show)}
      >
        <div>
          {!editRowMode && row.content}
          {!editRowMode && (
            <button
              onClick={() => {
                dispatch(removeSingleRow(row.id));
              }}
            >
              delete
            </button>
          )}
        </div>
      </div>
    </>
  );
};
