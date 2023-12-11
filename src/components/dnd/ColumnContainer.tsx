import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { ColumnsSlice, removeOneColumn, updateTitleColumn } from '../../redux/columnsSlice';
import { createNewRow, removeRowsInRemovedColumn, RowsSlice } from '../../redux/rowsSlice';

import { SingleRow } from './SingleRow';
export const ColumnContainer = ({ column, rows }: { column: ColumnsSlice; rows: RowsSlice[] }) => {
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
          width: '150px',
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
        width: '150px',
      }}
    >
      {/*  eslint-disable-line */}
      <div
        {...attributes}
        {...listeners}
        style={{
          alignItems: 'center',
          backgroundColor: 'black',
          color: 'white',
          cursor: 'grab',
          display: 'flex',
          height: '60px',
          justifyContent: 'space-between',
        }}
        onClick={() => {
          setEditTitleMode(true);
        }}
      >
        <div style={{ display: 'flex', gap: '4px' }}>
          {!editTitleMode && column.title}
          {editTitleMode && (
            <input
              value={column.title}
              onBlur={() => setEditTitleMode((show) => !show)}
              onChange={(e) => dispatch(updateTitleColumn([column.id, e.target.value]))}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return;
                setEditTitleMode(false);
              }}
            />
          )}
        </div>
        {!editTitleMode && (
          <button
            onClick={() => {
              dispatch(removeRowsInRemovedColumn(column.id));
              dispatch(removeOneColumn(column.id));
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
