import { Role } from '@/features/users';
import { createUser, render, screen } from 'test/utils';
import { useEffect } from 'react';
import { Mock } from 'vitest';
import { useAuth } from '../auth';

function TestAuth() {
  const { profile, startSession, clearSession, checkRole } = useAuth();

  useEffect(() => {
    void startSession();
    return () => clearSession();
  }, [startSession, clearSession]);

  return (
    <div>
      <h2>{profile?.name}</h2>
      <h4>{checkRole([Role.admin])}</h4>
    </div>
  )
}

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

  test('should start and clear auth session', async () => {
    const user = createUser();

    await render(<TestAuth />)

    fetchSpy.mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(user),
      headers: new Map([['content-type', 'application/json']]),
    } as unknown as Response);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(await screen.findByText(user.name)).toBeInTheDocument()
    // const { result } = renderHook(() => useAuth());

    // expect(result.current.profile).toBe(null);
    // act(() => {
    //   void result.current.startSession();
    // });

    // expect(fetchSpy).toHaveBeenCalledTimes(1);
    // expect(result.current.profile).toContainEqual(user);
    // expect(() => result.current.checkRole([Role.admin])).toBe(true);

    // act(() => {
    //   result.current.clearSession();
    // });

    // expect(result.current.profile).toBe(null);
  });
});
