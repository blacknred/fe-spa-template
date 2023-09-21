import { CreateUser } from '@/features/users';
import { mockUser, render, screen, userEvent, waitFor } from '@/test/utils';

describe('Register', () => {
  test('should register new user and call onSuccess', async () => {
    const newUser = mockUser();
    const onSuccess = vitest.fn();

    await render(<CreateUser onSuccess={onSuccess} />, { user: null });

    void userEvent.type(screen.getByLabelText(/name/i), newUser.name);
    void userEvent.type(screen.getByLabelText(/email/i), newUser.email);
    void userEvent.type(screen.getByLabelText(/password/i), newUser.password);
    void userEvent.click(screen.getByRole('button', { name: /register/i }));
    await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
  });
})