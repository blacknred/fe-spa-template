import {
  createCategory,
  createProduct,
  createUser,
  render,
  screen,
  userEvent,
  waitFor,
  within,
} from '@/test/utils';
import { useParams as useMockParams } from 'react-router-dom';
import { Mock } from 'vitest';
import { Product } from '../Product';

vitest.mock('react-router-dom', () => ({
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  ...vitest.importActual('react-router-dom'),
  useParams: vitest.fn(),
}));

describe("Product", () => {
  test('should render and update product', async () => {
    const user = createUser();
    const category = createCategory({ authorId: user.id });
    const product = createProduct({ authorId: user.id, categoryId: category.id });

    (useMockParams as Mock).mockImplementation(() => ({
      id: product.id,
    }));

    await render(<Product />, { user });

    // render
    await screen.findByText(product.name);
    expect(screen.getByText(product.name)).toBeDefined();

    // update
    const updateText = '-Updated';
    const updateNumber = '11';

    void userEvent.click(screen.getByRole('button', { name: /update product/i }));

    const drawer = screen.getByRole('dialog', { name: /update product/i });
    const categoryField = within(drawer).getByText(/category/i);
    const titleField = within(drawer).getByText(/title/i);
    const descriptionField = within(drawer).getByText(/description/i);
    const priceField = within(drawer).getByText(/price/i);
    const quantityField = within(drawer).getByText(/quantity/i);
    const imageField = within(drawer).getByText(/image/i);
    void userEvent.selectOptions(categoryField, category.id.toString());
    void userEvent.type(titleField, updateText);
    void userEvent.type(descriptionField, updateText);
    void userEvent.type(priceField, updateNumber);
    void userEvent.type(quantityField, updateNumber);
    void userEvent.type(imageField, updateText);

    const submitButton = within(drawer).getByRole('button', { name: /submit/i });
    void userEvent.click(submitButton);

    await waitFor(() => expect(drawer).not.toBeDefined());

    await screen.findByText(product.name);
    expect(screen.getByText(`${product.name}${updateText}`)).toBeDefined();
    expect(screen.getByText(`${product.description}${updateText}`)).toBeDefined();
    expect(screen.getByText(`${product.preview}${updateText}`)).toBeDefined();
    expect(screen.getByText(`${product.price}${updateNumber}`)).toBeDefined();
    expect(screen.getByText(`${product.quantity}${updateNumber}`)).toBeDefined();
  });
})