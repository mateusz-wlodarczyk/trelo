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
import { arrayMove, SortableContext } from '@dnd-kit/sortable';

import { ColumnsSlice, createNewColumn, updateColumnState } from '../redux/columnsSlice';
import { RowsSlice, updateRowState } from '../redux/rowsSlice';
import { RootState } from '../redux/store';

import { ColumnContainer } from './dnd/ColumnContainer';
import { SingleRow } from './dnd/SingleRow';

export const TroloBoard = () => {
  const dispatch = useDispatch();

  const columns = useSelector((state: RootState) => state.columns);
  const rows = useSelector((state: RootState) => state.rows);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 10 } }));

  const [activeColumn, setActiveColumn] = useState<ColumnsSlice | null>(null);
  const [activeRow, setActiveRow] = useState<RowsSlice | null>(null);

  const columnsId = useMemo(() => columns.map((column) => column.id), [columns]);
  const numberOverRowIndex = 1;
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

    const getNewColumns = (columns: ColumnsSlice[]) => {
      const activeColumnIndex = columns.findIndex((column) => column.id === activeId);
      const overColumnIndex = columns.findIndex((column) => column.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    };

    const newColumnsItems = getNewColumns(columns);
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
      const getNewRows = (rows: RowsSlice[]) => {
        const activeIndex = rows.findIndex((row) => row.id === activeId);
        const overIndex = rows.findIndex((row) => row.id === overId);
        const rowWithActiveIndex = rows[activeIndex];
        const rowWithOverIndex = rows[overIndex];

        if (rowWithActiveIndex.columnId != rowWithOverIndex.columnId) {
          const newArray = rows.map((row) => {
            if (row.id === rowWithActiveIndex.id) {
              return { ...row, columnId: rowWithOverIndex.columnId };
            } else {
              return row;
            }
          });

          return arrayMove(newArray, activeIndex, overIndex - numberOverRowIndex);
        } else {
          return arrayMove(rows, activeIndex, overIndex);
        }
      };

      const newRowsItems = getNewRows(rows);

      dispatch(updateRowState(newRowsItems));
    }

    const isOverColumn = over.data.current?.type === 'Column';

    if (isActiveRow && isOverColumn) {
      const getNewRowsOverColumns = (rows: RowsSlice[]) => {
        const activeIndex = rows.findIndex((row) => row.id === activeId);
        const activeRow = rows[activeIndex];

        const newArray = rows.map((row) => {
          if (row.id === activeRow.id) {
            return { ...row, columnId: overId };
          } else {
            return row;
          }
        });

        return arrayMove(newArray, activeIndex, activeIndex);
      };
      const newRowsItems = getNewRowsOverColumns(rows);
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
