import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import {
  getNewColumns,
  getNewRows,
  getNewRowsOverColumns,
  SENSOR_VALUE,
} from '../components/dnd/utils';
import {
  ColumnsSlice,
  createNewColumn,
  removeAllColumn,
  updateColumnState,
} from '../redux/columnsSlice';
import { removeAllRow, RowsSlice, updateRowState } from '../redux/rowsSlice';
import { RootState } from '../redux/store';
import { ACTIVE_LENGTH } from '../utils/constans';
import { clearLocalStorage } from '../utils/localstorage';

export const useTroloBoard = () => {
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
  const validateDragging = (event: DragEndEvent | DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;
    return { active, over };
  };
  const onDragStart = (event: DragStartEvent) => {
    if (!event.active.data.current) {
      return;
    }
    const { column, row, type } = event.active.data.current;
    if (type === 'Column') {
      setActiveColumn(column);
      return;
    }

    if (type === 'Row') {
      setActiveRow(row);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveRow(null);
    const validData = validateDragging(event);
    if (validData) {
      const newColumnsItems = getNewColumns(columns, validData.active.id, validData.over.id);
      dispatch(updateColumnState(newColumnsItems));
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const validData = validateDragging(event);
    if (validData) {
      const isActiveRow = validData.active.data.current?.type === 'Row';
      const isOverRow = validData.over.data.current?.type === 'Row';

      if (!isActiveRow) return;

      if (isActiveRow && isOverRow) {
        const newRowsItems = getNewRows(rows, validData.active.id, validData.over.id);
        dispatch(updateRowState(newRowsItems));
      }

      const isOverColumn = validData.over.data.current?.type === 'Column';

      if (isActiveRow && isOverColumn) {
        const newRowsItems = getNewRowsOverColumns(rows, validData.active.id, validData.over.id);
        dispatch(updateRowState(newRowsItems));
      }
    } else return;
  };

  const handleClearAll = () => {
    dispatch(removeAllColumn());
    dispatch(removeAllRow());
    clearLocalStorage();
  };

  const handleClearColumnModeAndInput = () => {
    setAddNewColumnMode((show) => !show);
    setAddNewColumn('');
  };
  // value blad?
  const handleOnChangeNewColumn = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setAddNewColumn(e.target.value);
  };
  const handleClumnNewClick = () => setAddNewColumnMode((show) => !show);

  const handleCreateNewColumn = () => {
    if (addNewColumn.length > ACTIVE_LENGTH) {
      dispatch(createNewColumn(addNewColumn));
      handleClearColumnModeAndInput();
    } else {
      handleClearColumnModeAndInput();
    }
  };

  const handleCancelButtonClick = () => {
    handleClearColumnModeAndInput();
  };

  return {
    activeColumn,
    activeRow,
    addNewColumnMode,
    columns,
    columnsId,
    handleCancelButtonClick,
    handleClearAll,
    handleClumnNewClick,
    handleCreateNewColumn,
    handleOnChangeNewColumn,
    onDragEnd,
    onDragOver,
    onDragStart,
    rows,
    sensors,
  };
};
