import { Role } from '@/features/users';
import { getUser, render, screen } from '@/test/test-utils';
import { Authorization } from '../Authorization';

describe('The Contact component', () => {
  const protectedResource = 'This is very confidential data';
  const forbiddenMessage = 'You are unauthorized to view this resource';

  test('should view protected resource if user role is matching', async () => {
    const user = getUser(Role.admin);
    await render(<Authorization allowedRoles={[Role.admin]}>{protectedResource}</Authorization>, {
      user,
    });

    expect(screen.getByText(protectedResource)).toBeDefined();
  });

  test('should not view protected resource if user role does not match', async () => {
    const user = getUser(Role.customer);
    await render(
      <Authorization forbiddenFallback={<div>{forbiddenMessage}</div>} allowedRoles={[Role.admin]}>
        {protectedResource}
      </Authorization>,
      { user }
    );

    expect(screen.queryByText(protectedResource)).not.toBeDefined();
    expect(screen.getByText(forbiddenMessage)).toBeDefined();
  });

  test('should view protected resource if policy check passes', async () => {
    const user = getUser(Role.admin);
    await render(<Authorization check={() => true}>{protectedResource}</Authorization>, { user });

    expect(screen.getByText(protectedResource)).toBeDefined();
  });

  test('should not view protected resource if policy check fails and show fallback message instead', async () => {
    const user = getUser(Role.customer);
    await render(
      <Authorization forbiddenFallback={<div>{forbiddenMessage}</div>} check={() => false}>
        {protectedResource}
      </Authorization>,
      { user }
    );

    expect(screen.queryByText(protectedResource)).not.toBeDefined();
    expect(screen.getByText(forbiddenMessage)).toBeDefined();
  });
})
