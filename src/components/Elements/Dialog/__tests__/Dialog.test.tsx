import { rtlRender, screen, userEvent, waitFor } from '@/test/utils';
import { useState } from 'react';
import { Button } from '../../Button';
import { Dialog } from '../Dialog';

const openText = 'Open Dialog';
const submitText = 'Submit Dialog';
const titleText = 'Dialog Title';
const cancelText = 'Cancel';
const contentText = 'Hello From Dialog';

const TestDialog = () => {
  const [isDone, setIsDone] = useState(false);

  return (
    <Dialog
      isDone={isDone}
      title={titleText}
      cancelButtonText={cancelText}
      triggerButton={<Button size="sm">{openText}</Button>}
      confirmButton={<Button size="sm" onClick={() => setIsDone(prev => !prev)}>{submitText}</Button>}
    >
      {contentText}
    </Dialog>
  );
};


describe('Dialog component', () => {
  test('should open, close on user actions', async () => {
    rtlRender(<TestDialog />);
    expect(screen.queryByText(titleText)).not.toBeInTheDocument();

    // open
    void userEvent.click(screen.getByRole('button', { name: openText }));
    expect(screen.getByText(titleText)).toBeInTheDocument();

    // close directly
    void userEvent.click(screen.getByRole('button', { name: cancelText }));
    await waitFor(() => expect(screen.queryByText(titleText)).not.toBeInTheDocument());

    // close indirectly
    void userEvent.click(screen.getByRole('button', { name: openText }));
    expect(screen.getByText(titleText)).toBeInTheDocument();
    void userEvent.click(screen.getByRole('button', { name: submitText }));
    await waitFor(() => expect(screen.queryByText(titleText)).not.toBeInTheDocument());
  });
})

