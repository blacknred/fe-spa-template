
import { createCategory, createUser, mockProduct, render, screen, userEvent, waitFor, within } from '@/test/utils';
import { formatDate } from '@/utils';
import { Mock } from 'vitest';
import { Products } from '../Products';

beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  vitest.spyOn(console, 'error').mockImplementation(() => { });
});

afterAll(() => {
  (console.error as Mock).mockRestore();
});

describe('Products', () => {
  test('should create, render and delete products', async () => {
    const user = createUser();
    const category = createCategory({ authorId: user.id });
    const product = mockProduct({ categoryId: category.id });

    // render empty
    await render(<Products />, { user });
    expect(await screen.findByText(/no entries/i)).toBeInTheDocument();

    // create
    void userEvent.click(screen.getByRole('button', { name: /create product/i }));
    const drawer = screen.getByRole('dialog', { name: /create product/i });

    const categoryField = within(drawer).getByText(/category/i);
    const titleField = within(drawer).getByText(/title/i);
    const descriptionField = within(drawer).getByText(/description/i);
    const priceField = within(drawer).getByText(/price/i);
    const quantityField = within(drawer).getByText(/quantity/i);
    const imageField = within(drawer).getByText(/image/i);
    void userEvent.selectOptions(categoryField, product.categoryId.toString());
    void userEvent.type(titleField, product.name);
    void userEvent.type(descriptionField, product.description);
    void userEvent.type(priceField, product.price.toString());
    void userEvent.type(quantityField, product.quantity.toString());
    void userEvent.type(imageField, product.preview);

    const submitButton = within(drawer).getByRole('button', { name: /submit/i });
    void userEvent.click(submitButton);
    await waitFor(() => expect(drawer).not.toBeInTheDocument());

    const row = screen.getByRole('row', {
      name: `${product.name} ${formatDate(category.createdAt)}`,
    });

    expect(within(row).getByRole('cell', { name: product.name })).toBeInTheDocument();

    // delete
    void userEvent.click(await within(row).findByTestId('delete-product'));
    const confirmationDialog = screen.getByRole('dialog', { name: /delete product/i });
    const confirmationDeleteButton = within(confirmationDialog).getByRole('button', {
      name: /delete product/i,
    });

    void userEvent.click(confirmationDeleteButton);
    await screen.findByText(/product deleted/i);

    expect(within(row).queryByRole('cell', { name: product.name })).not.toBeInTheDocument();
  });
})




