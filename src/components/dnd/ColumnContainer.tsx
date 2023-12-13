import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { ColumnsSlice, removeOneColumn, updateTitleColumn } from '../../redux/columnsSlice';
import { createNewRow, removeRowsInRemovedColumn, RowsSlice } from '../../redux/rowsSlice';

import { SingleRow } from './SingleRow';
export const ColumnContainer = ({ column, rows }: { column: ColumnsSlice; rows: RowsSlice[] }) => {
  const idIndexInTextInput = 0;
  const valueIndexinTextInput = 1;
  type ArrayInput = string | number;
  const [textInput, setTextInput] = useState<ArrayInput[]>([idIndexInTextInput, column.title]);
  const dispatch = useDispatch();
  const [editTitleMode, setEditTitleMode] = useState(false);
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    data: { column, type: 'Column' },
    disabled: editTitleMode,
    id: column.id,
  });

  const rowsId = useMemo(() => rows.map((row) => row.id), [rows]);

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
              value={textInput[valueIndexinTextInput]}
              //poprawic onBlur
              onBlur={() => setEditTitleMode((show) => !show)}
              onChange={(e) => {
                setTextInput([column.id, e.target.value]);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setEditTitleMode((show) => !show);
                  dispatch(updateTitleColumn(textInput));
                  //czyscic setTextInput ?
                  // dorzucac wyjscie na Esc?
                }
              }}
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
