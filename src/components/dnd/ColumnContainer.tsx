import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { ColumnsSlice, removeOneColumn, updateTitleColumn } from '../../redux/columnsSlice';
import { createNewRow, removeRowsInRemovedColumn, RowsSlice } from '../../redux/rowsSlice';

const ID_INDEX_IN_TEXT_INPUT = 0;
const VALUE_INDEX_IN_TEXT_INPUT = 1;
type ArrayInput = string | number;

import { SingleRow } from './SingleRow';
export const ColumnContainer = ({ column, rows }: { column: ColumnsSlice; rows: RowsSlice[] }) => {
  const [textInput, setTextInput] = useState<ArrayInput[]>([ID_INDEX_IN_TEXT_INPUT, column.title]);
  const [editTitleMode, setEditTitleMode] = useState(false);
  const dispatch = useDispatch();
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    data: { column, type: 'Column' },
    disabled: editTitleMode,
    id: column.id,
  });

  const rowsId = useMemo(() => rows.map((row) => row.id), [rows]);

  const handleOnKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      setEditTitleMode((show) => !show);
      dispatch(updateTitleColumn(textInput));
    }

    if (e.key === 'Escape') {
      setEditTitleMode((show) => !show);
    }
  };

  const handleOnChange = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setTextInput([column.id, e.target.value]);
  };
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={{
          backgroundColor: 'gray',
          borderStyle: 'solid',
          display: 'flex',
          flexDirection: 'column',
          height: '500px',
          opacity: '60%',
          transform: CSS.Transform.toString(transform),
          transition,
          width: '200px',
        }}
      />
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={{
        backgroundColor: 'gray',
        borderStyle: 'solid',
        display: 'flex',
        flexDirection: 'column',
        height: '500px',
        transform: CSS.Transform.toString(transform),
        transition,
        width: '200px',
      }}
    >
      {/*  eslint-disable-next-line */}
      <div
        {...attributes}
        {...listeners}
        style={{
          alignItems: 'center',
          backgroundColor: 'black',
          color: 'white',
          cursor: 'grab',
          display: 'flex',
          height: '50px',
          justifyContent: 'space-between',
          width: '200px',
        }}
        onClick={() => {
          setEditTitleMode(true);
        }}
      >
        <div style={{ display: 'flex', gap: '4px' }}>
          {!editTitleMode && column.title}
          {editTitleMode && (
            <textarea
              value={textInput[VALUE_INDEX_IN_TEXT_INPUT]}
              onBlur={() => setEditTitleMode((show) => !show)}
              onChange={handleOnChange}
              onKeyDown={handleOnKey}

              //poprawic onBlur
            />
          )}
        </div>
        {!editTitleMode && (
          <button
            onClick={() => {
              dispatch(removeRowsInRemovedColumn(column.id));
              dispatch(removeOneColumn(column.id));
              setTextInput([]);
            }}
          >
            delete
          </button>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: '1', gap: '2px' }}>
        <SortableContext items={rowsId}>
          {rows.map((row) => (
            <SingleRow key={row.id} row={row} />
          ))}
        </SortableContext>
      </div>
      <button onClick={() => dispatch(createNewRow(column.id))}> +add task</button>
    </div>
  );
};
