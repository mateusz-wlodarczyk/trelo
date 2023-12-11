import React, { useEffect, useMemo, useState } from 'react';
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
import { arrayMove, SortableContext } from '@dnd-kit/sortable';

import { ColumnsSlice, createNewColumn, updateColumnState } from '../redux/columnsSlice';
import { RowsSlice, updateRowState } from '../redux/rowsSlice';
import { RootState } from '../redux/store';

import { ColumnContainer } from './dnd/ColumnContainer';
import { SingleRow } from './dnd/SingleRow';

// glowny blad z consoli: 97
// console.js:213 Warning: Cannot update a component (`TroloBoard`) while rendering a different component (`TroloBoard`). To locate the bad setState() call inside `TroloBoard`, follow the stack trace as described in
export const TroloBoard = () => {
  const dispatch = useDispatch();

  const columns = useSelector((state: RootState) => state.columns);
  const rows = useSelector((state: RootState) => state.rows);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 10 } }));

  const [columnsItems, setColumnsItems] = useState<ColumnsSlice[]>(columns);
  const [rowsItems, setRowsItems] = useState<RowsSlice[]>(rows);

  const [activeColumn, setActiveColumn] = useState<ColumnsSlice | null>(null);
  const [activeRow, setActiveRow] = useState<RowsSlice | null>(null);

  useEffect(() => {
    setColumnsItems(columns);
    setRowsItems(rows);
  }, [columns, rows]);

  const columnsId = useMemo(() => columns.map((column) => column.id), [columns]);

  const onDragStart = (event: DragStartEvent) => {
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

    setColumnsItems((columnsItems) => {
      const activeColumnIndex = columnsItems.findIndex((column) => column.id === activeId);
      const overColumnIndex = columnsItems.findIndex((column) => column.id === overId);
      dispatch(updateColumnState(arrayMove(columnsItems, activeColumnIndex, overColumnIndex)));
      return arrayMove(columnsItems, activeColumnIndex, overColumnIndex);
    });
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
      setRowsItems((rowsItems) => {
        const activeRowIndex = rowsItems.findIndex((row) => row.id === activeId);
        const overRowIndex = rowsItems.findIndex((row) => row.id === overId);
        console.log('srednio dziala, do sprawdzenia');
        //poprawic zapis
        return dispatch(updateRowState(arrayMove(rowsItems, activeRowIndex, overRowIndex)));
      });
    }

    const isOverColumn = over.data.current?.type === 'Column';

    if (isActiveRow && isOverColumn) {
      console.log('nie dziala');
    }
  };

  return (
    <div style={{ alignItems: 'center', display: 'flex', height: '90vh', margin: 'auto' }}>
      <DndContext
        sensors={sensors}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
      >
        <div style={{ alignItems: 'start', display: 'flex', gap: '5px' }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            <SortableContext items={columnsId}>
              {columnsItems.map((column: ColumnsSlice) => (
                <ColumnContainer
                  key={column.id}
                  column={column}
                  rows={rowsItems.filter((row) => row.columnId === column.id)}
                />
              ))}
            </SortableContext>
          </div>
          <>
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
                rows={rowsItems.filter((row) => row.columnId === activeColumn.id)}
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
