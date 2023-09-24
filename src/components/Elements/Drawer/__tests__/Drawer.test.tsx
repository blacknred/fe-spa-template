import { rtlRender, screen, userEvent, waitFor } from 'test/utils';
import { useState } from 'react';
import { Button } from '../../Button';
import { Drawer } from '../Drawer';
const openText = 'Open Drawer';
const submitText = 'Submit Drawer';
const titleText = 'Drawer Title';
const cancelText = 'Cancel';
const contentText = 'Hello From Drawer';

const TestDrawer = () => {
  const [isDone, setIsDone] = useState(false);

  return (
    <Drawer
      isDone={isDone}
      title={titleText}
      cancelButtonText={cancelText}
      triggerButton={<Button size="sm">{openText}</Button>}
      submitButton={<Button size="sm" onClick={() => setIsDone(prev => !prev)}>{submitText}</Button>}
    >
      {contentText}
    </Drawer>
  );
};

describe('Drawer element', () => {
  test('should open, close on user actions', async () => {
    rtlRender(<TestDrawer />);
    expect(screen.queryByText(titleText)).toBeInTheDocument()

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
