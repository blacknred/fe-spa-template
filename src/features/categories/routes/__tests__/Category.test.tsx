import {
  createCategory,
  createUser,
  render,
  screen,
  userEvent,
  waitFor,
  within,
} from '@/test/utils';
import { useParams as useMockParams } from 'react-router-dom';
import { Mock } from 'vitest';
import { Category } from '../Category';

vitest.mock('react-router-dom', () => ({
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  ...vitest.importActual('react-router-dom'),
  useParams: vitest.fn(),
}));

describe("Category", () => {
  test('should render and update category', async () => {
    const user = createUser();
    const category = createCategory({ authorId: user.id });

    (useMockParams as Mock).mockImplementation(() => ({
      id: category.id,
    }));

    await render(<Category />, { user });

    // render
    await screen.findByText(category.name);
    expect(screen.getByText(category.name)).toBeDefined();

    // update
    const updateText = '-Updated';

    void userEvent.click(screen.getByRole('button', { name: /update category/i }));

    const drawer = screen.getByRole('dialog', { name: /update category/i });
    const nameField = within(drawer).getByText(/name/i);
    const imageField = within(drawer).getByText(/image/i);
    void userEvent.type(nameField, updateText);
    void userEvent.type(imageField, updateText);

    const submitButton = within(drawer).getByRole('button', { name: /submit/i });
    void userEvent.click(submitButton);

    await waitFor(() => expect(drawer).not.toBeDefined());

    await screen.findByText(category.name);
    expect(screen.getByText(`${category.name}${updateText}`)).toBeDefined();
    expect(screen.getByText(`${category.image}${updateText}`)).toBeDefined();
  });
})