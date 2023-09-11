import { act, renderHook } from '@testing-library/react';
import { useDisclosure } from '../useDisclosure';

describe('The useDisclosure hook', () => {
  const cbMock = jest.fn();
  beforeEach(() => cbMock.mockClear());

  describe('when the open function is called', () => {
    it('should open the state', () => {
      const { result } = renderHook(() => useDisclosure());

      expect(result.current.isOpen).toBe(false);
      act(() => result.current.open(cbMock));
      expect(result.current.isOpen).toBe(true);
      expect(cbMock).toBeCalled();
    });
  });

  describe('when the close function is called', () => {
    it('should close the state', () => {
      const { result } = renderHook(() => useDisclosure());

      act(() => result.current.open());
      act(() => result.current.close(cbMock));
      expect(result.current.isOpen).toBe(false);
      expect(cbMock).toBeCalled();
    });
  });

  describe('when the toggle function is called', () => {
    it('should toggle the state', () => {
      const { result } = renderHook(() => useDisclosure());

      act(() => result.current.toggle());
      expect(result.current.isOpen).toBe(true);
      act(() => result.current.toggle(cbMock));
      expect(result.current.isOpen).toBe(false);
      expect(cbMock).toBeCalled();
    });
  });
});
