import {
  createUser,
  render,
  screen
} from '@/test/utils';
import { useParams as useMockParams } from 'react-router-dom';
import { Mock } from 'vitest';
import { User } from '../User';

vitest.mock('react-router-dom', () => ({
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  ...vitest.importActual('react-router-dom'),
  useParams: vitest.fn(),
}));

describe("User", () => {
  test('should render user', async () => {
    const user = createUser();

    (useMockParams as Mock).mockImplementation(() => ({
      id: user.id,
    }));

    await render(<User />, { user });

    // render
    await screen.findByText(user.name);
    expect(screen.getByText(user.name)).toBeDefined();
  });
})