import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { usePrevious } from '../usePrevious';

describe('usePrevious hook testing', () => {
  test('should return the previous value', () => {
    let y = { x: 8 };
    const { result, rerender } = renderHook(() => usePrevious(y));
    expect(result.current).toBe(null);

    act(() => {
      y = { x: 10 };
    });
    rerender(y);
    expect(result.current).toStrictEqual({ x: 8 });

    act(() => {
      y = { x: 11 };
    });
    rerender(y);
    expect(result.current).toBe({ x: 8 });
  });
});
