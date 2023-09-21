import { Role } from '@/features/users';
import { act, createUser, renderHook } from '@/test/utils';
import { Mock } from 'vitest';
import { useAuth } from '../auth';

describe('useAuth hook', () => {
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

  test('should start and clear auth session', () => {
    const user = createUser();

    fetchSpy.mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(user),
      headers: new Map([['content-type', 'application/json']]),
    } as unknown as Response);

    const { result } = renderHook(() => useAuth());

    expect(result.current.profile).toBe(null);
    act(() => {
      void result.current.startSession();
    });

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(result.current.profile).toContainEqual(user);
    expect(() => result.current.checkRole([Role.admin])).toBe(true);

    act(() => {
      result.current.clearSession();
    });

    expect(result.current.profile).toBe(null);
  });
});
