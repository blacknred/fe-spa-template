// import { discussionGenerator } from '@/test/data-generators';
import { createProduct, getUser, mockProduct, render, screen, userEvent, waitFor, within } from '@/test/test-utils';
import { Products } from '../Products';
import { Mock, vitest } from 'vitest';
import { Role } from '@/features/users';

beforeAll(() => {
  vitest.spyOn(console, 'error').mockImplementation(() => { });
});

afterAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  (console.error as Mock).mockRestore();
});

describe("Products", () => {
  test('should create, render and delete products', async () => {
    await render(<Products />, { user: getUser(Role.admin) });
    const product = mockProduct();

    // list products

    expect(await screen.findByText(/no entries/i)).toBeDefined();

    // create product

    void userEvent.click(screen.getByRole('button', { name: /create product/i }));
    const drawer = screen.getByRole('dialog', { name: /create product/i });

    const categoryField = within(drawer).getByText(/categoryId/i);
    const nameField = within(drawer).getByText(/name/i);
    const descriptionField = within(drawer).getByText(/description/i);
    const priceField = within(drawer).getByText(/price/i);
    const quantityField = within(drawer).getByText(/quantity/i);
    const previewField = within(drawer).getByText(/preview/i);

    void userEvent.type(categoryField, product.category_id.toString());
    void userEvent.type(nameField, product.name);
    void userEvent.type(descriptionField, product.description);
    void userEvent.type(priceField, product.price.toString());
    void userEvent.type(quantityField, product.quantity.toString());
    void userEvent.type(previewField, product.preview);

    const submitButton = within(drawer).getByRole('button', { name: /submit/i });
    void userEvent.click(submitButton);
    await waitFor(() => expect(drawer).not.toBeDefined());

    // const row = screen.getByRole('row', {
    //   name: `${product.name} ${formatDate(newDiscussion.createdAt)} View Delete Discussion`,
    // });
    // expect(within(row).getByRole('cell', { name: product.name })).toBeDefined();

    // delete product

    void userEvent.click(within(row).getByRole('button', { name: /delete product/i }));
    const confirmationDialog = screen.getByRole('dialog', { name: /delete product/i });
    const confirmationDeleteButton = within(confirmationDialog).getByRole('button', {
      name: /delete product/i,
    });

    void userEvent.click(confirmationDeleteButton);
    await screen.findByText(/product deleted/i);

    expect(
      within(row).queryByRole('cell', { name: newDiscussion.title })
    ).not.toBeDefined();
  });
});



