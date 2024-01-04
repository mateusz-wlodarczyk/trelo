import { Provider, useDispatch, useSelector } from 'react-redux';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { createNewColumn } from './columnsSlice';
import { RootState, store } from './store';

describe('Tests for columns slice', () => {
  test('create new column should add a column', () => {
    //arrange
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );
    const { result } = renderHook(() => useDispatch(), { wrapper });
    const { result: columnSlice } = renderHook(
      () => useSelector((rootStore: RootState) => rootStore.columns),
      {
        wrapper,
      },
    );

    //act
    act(() => {
      result.current(createNewColumn('text'));
    });

    //assert
    expect(columnSlice.current).toEqual([{ id: 1, title: 'text' }]);
  });
});
