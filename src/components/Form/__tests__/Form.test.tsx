import { Button } from '@/components/Elements/Button';
import { rtlRender, screen, userEvent, waitFor } from '@/test/utils';
import * as z from 'zod';
import { Form } from '../Form';
import { InputField } from '../InputField';

describe('Form element', () => {
  const testData = { title: 'Hello World' };
  const schema = z.object({
    title: z.string().min(1, 'Required'),
  });

  test('should render and submit a basic Form component', async () => {
    const handleSubmit = vitest.fn();

    rtlRender(
      <Form<typeof testData, typeof schema> onSubmit={handleSubmit} schema={schema} id="my-form">
        {({ register, formState }) => (
          <>
            <InputField
              label="Title"
              error={formState.errors['title']}
              registration={register('title')}
            />

            <Button name="submit" type="submit" className="w-full">
              Submit
            </Button>
          </>
        )}
      </Form>
    );

    void userEvent.type(screen.getByLabelText(/title/i), testData.title);
    void userEvent.click(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith(testData, expect.anything()));
  });

  test('should fail submission if validation fails', async () => {
    const handleSubmit = vitest.fn();

    rtlRender(
      <Form<typeof testData, typeof schema> onSubmit={handleSubmit} schema={schema} id="my-form">
        {({ register, formState }) => (
          <>
            <InputField
              label="Title"
              error={formState.errors['title']}
              registration={register('title')}
            />

            <Button name="submit" type="submit" className="w-full">
              Submit
            </Button>
          </>
        )}
      </Form>
    );

    void userEvent.click(screen.getByRole('button', { name: /submit/i }));
    await screen.findByRole('alert', { name: /required/i });
    expect(handleSubmit).toHaveBeenCalledTimes(0);
  });
})
