import { Button } from '@/components/Elements/Button';
import { rtlRender, screen, userEvent, waitFor } from 'test/utils';
import * as z from 'zod';
import { Form } from '../Form';
import { InputField } from '../InputField';
import { Mock } from 'vitest';

const TestForm = ({ onSubmit, data }: { onSubmit: Mock, data: { title: string } }) => {
  const schema = z.object({
    title: z.string().min(1, 'Required'),
  });

  return (
    <Form<typeof data, typeof schema> onSubmit={onSubmit} schema={schema} id="my-form">
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
};

describe('Form element', () => {
  const testData = { title: 'Hello World' };

  test('should render and submit', async () => {
    const handleSubmit = vitest.fn();
    rtlRender(<TestForm onSubmit={handleSubmit} data={testData} />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    void userEvent.type(screen.getByLabelText(/title/i), testData.title);
    void userEvent.click(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith(testData, expect.anything()));
  });

  test('should fail submission if validation fails', async () => {
    const handleSubmit = vitest.fn();
    rtlRender(<TestForm onSubmit={handleSubmit} data={testData} />);

    void userEvent.click(screen.getByRole('button', { name: /submit/i }));
    await screen.findByRole('alert', { name: /required/i });
    expect(handleSubmit).toHaveBeenCalledTimes(0);
  });
})
