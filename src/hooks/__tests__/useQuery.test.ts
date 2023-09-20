// import { renderHook, act, waitFor } from '@testing-library/react';
// import { useQuery } from '../useQuery';

// describe('useQuery hook testing', () => {
//   const fetchApi = vitest.fn();

//   beforeEach(() => {
//     fetchApi.mockClear();
//     vitest.useFakeTimers();
//   });

//   afterEach(() => {
//     vitest.useRealTimers();
//   });

//   it('should return initial state', () => {
//     const { result } = renderHook(() => useQuery(''), {});
//     expect(result.current.isLoading).toBe(true);
//     expect(result.current.data).toBe(null);
//     expect(result.current.error).toBe(null);
//   });

//   it('should fetch api and return data', () => {
//     const data = [
//       {
//         userId: 1,
//         id: 1,
//         title: 'delectus aut autem',
//         completed: false,
//       },
//       {
//         userId: 1,
//         id: 2,
//         title: 'quis ut nam facilis et officia qui',
//         completed: false,
//       },
//     ];

//     fetchApi.mockResolvedValue(data);

//     const { result } = renderHook(() => useQuery(''));
//     act(() => {
//       vitest.advanceTimersByTime(500)
//     });
//     expect(result.current.isLoading).toBe(true);
//     // waitFor(() => expect(result.current.isLoading).toBe(false));

//     expect(fetchApi).toHaveBeenCalledTimes(1);
//     expect(result.current.data).toBe(data);
//     expect(result.current.isLoading).toBe(false);
//     expect(result.current.error).toBe(null);

//     // expect(matches).toHaveLength(5)
//     // expect(matches?.filter((m) => m.live)).toHaveLength(3)
//   });

//   it('should fetch api and return error', () => {
//     const error = new Error('fetch error');
//     fetchApi.mockRejectedValue(error);

//     const { result } = renderHook(() => useFetch(''));
//     act(() => jest.advanceTimersByTime(500));
//     expect(result.current.isLoading).toBe(true);
//     // waitFor(() => expect(result.current.isLoading).toBe(false));

//     expect(fetchApi).toHaveBeenCalledTimes(1);
//     expect(result.current.data).toBe(null);
//     expect(result.current.isLoading).toBe(false);
//     expect(result.current.error).toBe(error);
//   });
// });
