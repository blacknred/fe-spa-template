
import { createUser, mockCategory, render, screen, userEvent, waitFor, within } from '@/test/utils';
import { formatDate } from '@/utils';
import { Mock } from 'vitest';
import { Categories } from '../Categories';

beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  vitest.spyOn(console, 'error').mockImplementation(() => { });
});

afterAll(() => {
  (console.error as Mock).mockRestore();
});

describe('Categories', () => {
  test('should create, render and delete categories', async () => {
    const user = createUser();
    const category = mockCategory({ authorId: user.id });

    // render empty
    await render(<Categories />, { user });
    expect(await screen.findByText(/no entries/i)).toBeInTheDocument();

    // create
    void userEvent.click(screen.getByRole('button', { name: /create category/i }));
    const drawer = screen.getByRole('dialog', { name: /create category/i });
    const nameField = within(drawer).getByText(/name/i);
    const imageField = within(drawer).getByText(/image/i);
    void userEvent.type(nameField, category.name);
    void userEvent.type(imageField, category.image);

    const submitButton = within(drawer).getByRole('button', { name: /submit/i });
    void userEvent.click(submitButton);
    await waitFor(() => expect(drawer).not.toBeInTheDocument());

    const row = screen.getByRole('row', {
      name: `${category.name} ${formatDate(category.createdAt)}`,
    });

    expect(within(row).getByRole('cell', { name: category.name })).toBeInTheDocument();

    // delete
    void userEvent.click(await within(row).findByTestId('delete-category'));
    const confirmationDialog = screen.getByRole('dialog', { name: /delete category/i });
    const confirmationDeleteButton = within(confirmationDialog).getByRole('button', {
      name: /delete category/i,
    });

    void userEvent.click(confirmationDeleteButton);
    await screen.findByText(/category deleted/i);

    expect(within(row).queryByRole('cell', { name: category.name })).not.toBeInTheDocument();
  });
})