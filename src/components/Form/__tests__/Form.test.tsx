import * as z from 'zod';

import { Button } from '@/components/Elements/Button';
import { rtlRender, screen, waitFor, userEvent } from '@/mocks/test-utils';

import { Form } from '../Form';
import { InputField } from '../InputField';

const testData = {
  title: 'Hello World',
};

const schema = z.object({
  title: z.string().min(1, 'Required'),
});

test('should render and submit a basic Form component', async () => {
  const handleSubmit = jest.fn();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  userEvent.type(screen.getByLabelText(/title/i), testData.title);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith(testData, expect.anything()));
});

test('should fail submission if validation fails', async () => {
  const handleSubmit = jest.fn();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  await screen.findByRole(/alert/i, { name: /required/i });

  expect(handleSubmit).toHaveBeenCalledTimes(0);
});
