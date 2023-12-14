import React, { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';

import { ColumnsSlice, createNewColumn, updateColumnState } from '../redux/columnsSlice';
import { RowsSlice, updateRowState } from '../redux/rowsSlice';
import { RootState } from '../redux/store';

import { ColumnContainer } from './dnd/ColumnContainer';
import { SingleRow } from './dnd/SingleRow';
import { getNewColumns, getNewRows, getNewRowsOverColumns, SENSOR_VALUE } from './dnd/utils';

export const TroloBoard = () => {
  const dispatch = useDispatch();

  const columns = useSelector((state: RootState) => state.columns);
  const rows = useSelector((state: RootState) => state.rows);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: SENSOR_VALUE } }),
  );

  const [activeColumn, setActiveColumn] = useState<ColumnsSlice | null>(null);
  const [activeRow, setActiveRow] = useState<RowsSlice | null>(null);

  const columnsId = useMemo(() => columns.map((column) => column.id), [columns]);

  const onDragStart = (event: DragStartEvent) => {
    setActiveColumn(null);
    setActiveRow(null);

    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === 'Row') {
      setActiveRow(event.active.data.current.row);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveRow(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const newColumnsItems = getNewColumns(columns, activeId, overId);
    dispatch(updateColumnState(newColumnsItems));
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveRow = active.data.current?.type === 'Row';
    const isOverRow = over.data.current?.type === 'Row';

    if (!isActiveRow) return;

    if (isActiveRow && isOverRow) {
      const newRowsItems = getNewRows(rows, activeId, overId);
      dispatch(updateRowState(newRowsItems));
    }

    const isOverColumn = over.data.current?.type === 'Column';

    if (isActiveRow && isOverColumn) {
      const newRowsItems = getNewRowsOverColumns(rows, activeId, overId);
      dispatch(updateRowState(newRowsItems));
    }
  };
  return (
    <div style={{ display: 'flex', height: '90vh', margin: 'auto' }}>
      <DndContext
        sensors={sensors}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
      >
        <div style={{ alignItems: 'start', display: 'flex', gap: '5px' }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            <SortableContext items={columnsId}>
              {columns.map((column: ColumnsSlice) => (
                <ColumnContainer
                  key={column.id}
                  column={column}
                  rows={rows.filter((row) => row.columnId === column.id)}
                />
              ))}
            </SortableContext>
          </div>
          <>
            {/* //ogarnac test_column */}
            <button style={{ border: 2 }} onClick={() => dispatch(createNewColumn('test_column'))}>
              + add column
            </button>
          </>
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
    </div>
  );
};
