import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { removeSingleRow, RowsSlice, updateSingleRow } from '../../redux/rowsSlice';

export const SingleRow = ({ row }: { row: RowsSlice }) => {
  const idIndexInTextInput = 0;
  const valueIndexinTextInput = 1;
  type ArrayInput = string | number;
  const dispatch = useDispatch();
  const [textInput, setTextInput] = useState<ArrayInput[]>([idIndexInTextInput, row.content]);
  const [editRowMode, setEditRowMode] = useState(false);
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    data: { row, type: 'Row' },
    disabled: editRowMode,
    id: row.id,
  });

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
          value={textInput[valueIndexinTextInput]}
          //poprawic onBlur
          onBlur={() => setEditRowMode((show) => !show)}
          onChange={(e) => setTextInput([row.id, e.target.value])}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setEditRowMode((show) => !show);
              dispatch(updateSingleRow(textInput));
              setTextInput([]);
              //czyscic setTextInput ?
              // dorzucac wyjscie na Esc?
            }
          }}
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
