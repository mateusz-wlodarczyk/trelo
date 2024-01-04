import React, { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { IoMdAdd } from 'react-icons/io';
import { MdOutlineCancel } from 'react-icons/md';
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
import { Button, TextField, ThemeProvider } from '@mui/material';

import { ColumnsSlice, updateColumnState } from '../redux/columnsSlice';
import { createNewColumn } from '../redux/columnsSlice';
import { RowsSlice, updateRowState } from '../redux/rowsSlice';
import { RootState } from '../redux/store';
import { sxButton, sxTextarea, themeTextArea } from '../utils/SXstyle';

import { ColumnContainer } from './dnd/ColumnContainer';
import { SingleRow } from './dnd/SingleRow';
import { getNewColumns, getNewRows, getNewRowsOverColumns, SENSOR_VALUE } from './dnd/utils';
const ACTIVE_LENGTH = 1;

export const TroloBoard = () => {
  const dispatch = useDispatch();

  const columns = useSelector((state: RootState) => state.columns);
  const rows = useSelector((state: RootState) => state.rows);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: SENSOR_VALUE } }),
  );

  const [activeColumn, setActiveColumn] = useState<ColumnsSlice | null>(null);
  const [activeRow, setActiveRow] = useState<RowsSlice | null>(null);
  const [addNewColumnMode, setAddNewColumnMode] = useState(false);
  const [addNewColumn, setAddNewColumn] = useState('');

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

  const handleOnChangeNewColumn = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setAddNewColumn(e.target.value);
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
    // nie brakuej diva?
    <DndContext
      sensors={sensors}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragStart={onDragStart}
    >
      <div className='container'>
        <div className='column-wrapper'>
          <SortableContext items={columnsId}>
            {columns.map((column: ColumnsSlice) => (
              <ColumnContainer
                key={column.id}
                column={column}
                rows={rows.filter((row) => row.columnId === column.id)}
              />
            ))}
          </SortableContext>
          <>
            {!addNewColumnMode && (
              <div className='column-new'>
                <Button sx={sxButton} onClick={() => setAddNewColumnMode((show) => !show)}>
                  + add column
                </Button>
              </div>
            )}
            {addNewColumnMode && (
              <div>
                <ThemeProvider theme={themeTextArea}>
                  <TextField
                    multiline
                    required
                    className=''
                    minRows={1}
                    sx={sxTextarea}
                    onChange={handleOnChangeNewColumn}
                  />
                </ThemeProvider>
                <div className=''>
                  <Button
                    onClick={() => {
                      if (addNewColumn.length > ACTIVE_LENGTH) {
                        dispatch(createNewColumn(addNewColumn));
                        setAddNewColumnMode((show) => !show);
                        setAddNewColumn('');
                      } else {
                        setAddNewColumnMode((show) => !show);
                        setAddNewColumn('');
                      }
                    }}
                  >
                    <IoMdAdd className='row-icons' />
                  </Button>
                  <Button
                    onClick={() => {
                      setAddNewColumnMode((show) => !show);
                      setAddNewColumn('');
                    }}
                  >
                    <MdOutlineCancel className='row-icons' />
                  </Button>
                </div>
              </div>
            )}
          </>{' '}
        </div>
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
  );
};
