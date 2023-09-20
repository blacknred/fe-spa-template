import { act, renderHook, waitFor } from '@testing-library/react';
import { Mock } from 'vitest';
import { useQuery } from '../useQuery';

describe('useQuery hook', () => {
  const fetchSpy = vitest.spyOn(global, 'fetch');

  beforeEach(() => {
    fetchSpy.mockClear();
  });

  afterEach(() => {
    vitest.restoreAllMocks();
  });

  afterAll(() => {
    (global.fetch as Mock).mockRestore();
  });

  test('should return data', async () => {
    const data = [
      {
        userId: 1,
        id: 1,
        title: 'delectus aut autem',
        completed: false,
      },
    ];

    fetchSpy.mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(data),
      headers: new Map([['content-type', 'application/json']]),
    } as unknown as Response);

    const { result } = renderHook(() => useQuery(''));
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(result.current.data).toBe(data);
    expect(result.current.error).toBe(null);

    // refetch
    act(() => {
      void result.current.refetch();
    });
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  test('should return error', async () => {
    const error = 'Not allowed';
    fetchSpy.mockRejectedValue({
      ok: false,
      status: 403,
      headers: new Map([['content-type', 'text/plain']]),
      text: () => Promise.resolve(error),
    } as unknown as Response);

    const { result } = renderHook(() => useQuery(''));
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(error);
  });
});
