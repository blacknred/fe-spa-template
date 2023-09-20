import { act, renderHook } from '@testing-library/react';
import { useDisclosure } from '../useDisclosure';

describe('useDisclosure hook', () => {
  test('should open, close and toggle the state', () => {
    const { result } = renderHook(() => useDisclosure());
    expect(result.current.isOpen).toBe(false);

    // open
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);

    // close
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);

    // toggle
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(false);
  });
});
