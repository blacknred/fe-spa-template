
import { createUser, render, screen, within } from '@/test/utils';
import { formatDate } from '@/utils';
import { Mock } from 'vitest';
import { Users } from '../Users';

beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  vitest.spyOn(console, 'error').mockImplementation(() => { });
});

afterAll(() => {
  (console.error as Mock).mockRestore();
});

describe('Users', () => {
  test('should render users', async () => {
    const user = createUser();

    await render(<Users />, { user });

    const row = screen.getByRole('row', {
      name: `${user.name} ${formatDate(user.createdAt)}`,
    });

    expect(within(row).getByRole('cell', { name: user.name })).toBeInTheDocument();
  });
})