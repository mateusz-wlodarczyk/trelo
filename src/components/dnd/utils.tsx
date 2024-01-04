//in progress

import { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { ColumnsSlice } from '../../redux/columnsSlice';
import { RowsSlice } from '../../redux/rowsSlice';

export const NUMBER_OVER_ROW_INDEX = 1;
export const SENSOR_VALUE = 10;

export const getNewColumns = (
  columns: ColumnsSlice[],
  activeId: UniqueIdentifier,
  overId: UniqueIdentifier,
) => {
  const activeIndex = columns.findIndex((column) => column.id === activeId);
  const overIndex = columns.findIndex((column) => column.id === overId);

  return arrayMove(columns, activeIndex, overIndex);
};

export const getNewRows = (
  rows: RowsSlice[],
  activeId: UniqueIdentifier,
  overId: UniqueIdentifier,
) => {
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

    return arrayMove(newArray, activeIndex, overIndex - NUMBER_OVER_ROW_INDEX);
  } else {
    return arrayMove(rows, activeIndex, overIndex);
  }
};

export const getNewRowsOverColumns = (
  rows: RowsSlice[],
  activeId: UniqueIdentifier,
  overId: UniqueIdentifier,
) => {
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
