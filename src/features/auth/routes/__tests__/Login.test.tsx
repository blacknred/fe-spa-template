import { createUser, render, screen, userEvent, waitFor } from '@/test/utils';
import { CreateAuth } from '../../components/CreateAuth';

describe('Login', () => {
  test('should login new user and navigate the user to the app', async () => {
    const newUser = createUser();
    const onSuccess = vitest.fn();

    await render(<CreateAuth />, { user: null });

    void userEvent.type(screen.getByLabelText(/email address/i), newUser.email);
    void userEvent.type(screen.getByLabelText(/password/i), newUser.password);
    void userEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
  });
})