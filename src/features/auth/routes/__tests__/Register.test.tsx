// import { discussionGenerator } from '@/test/data-generators';
// import { render, screen, userEvent, waitFor, within } from '@/test/test-utils';
// import { formatDate } from '@/utils/format';

// import { Discussions } from '../Discussions';

// beforeAll(() => {
//   jest.spyOn(console, 'error').mockImplementation(() => {});
// });

// afterAll(() => {
//   (console.error as jest.Mock).mockRestore();
// });

// test('should create, render and delete discussions', async () => {
//   await render(<Discussions />);

//   const newDiscussion = discussionGenerator();

//   expect(await screen.findByText(/no entries/i)).toBeInTheDocument();

//   userEvent.click(screen.getByRole('button', { name: /create discussion/i }));

//   const drawer = screen.getByRole('dialog', {
//     name: /create discussion/i,
//   });

//   const titleField = within(drawer).getByText(/title/i);
//   const bodyField = within(drawer).getByText(/body/i);

//   userEvent.type(titleField, newDiscussion.title);
//   userEvent.type(bodyField, newDiscussion.body);

//   const submitButton = within(drawer).getByRole('button', {
//     name: /submit/i,
//   });

//   userEvent.click(submitButton);

//   await waitFor(() => expect(drawer).not.toBeInTheDocument());

//   const row = screen.getByRole('row', {
//     name: `${newDiscussion.title} ${formatDate(newDiscussion.createdAt)} View Delete Discussion`,
//   });

//   expect(
//     within(row).getByRole('cell', {
//       name: newDiscussion.title,
//     })
//   ).toBeInTheDocument();

//   userEvent.click(
//     within(row).getByRole('button', {
//       name: /delete discussion/i,
//     })
//   );

//   const confirmationDialog = screen.getByRole('dialog', {
//     name: /delete discussion/i,
//   });

//   const confirmationDeleteButton = within(confirmationDialog).getByRole('button', {
//     name: /delete discussion/i,
//   });

//   userEvent.click(confirmationDeleteButton);

//   await screen.findByText(/discussion deleted/i);

//   expect(
//     within(row).queryByRole('cell', {
//       name: newDiscussion.title,
//     })
//   ).not.toBeInTheDocument();
// });









import { userGenerator } from '@/mocks/data-generators';
import { render, screen, userEvent, waitFor } from '@/mocks/test-utils';

import { CreateUser } from '../CreateUser';

test('should register new user and call onSuccess cb which should navigate the user to the app', async () => {
  const newUser = userGenerator({});

  const onSuccess = jest.fn();

  await render(<RegisterForm onSuccess={onSuccess} />, { user: null });

  userEvent.type(screen.getByLabelText(/first name/i), newUser.firstName);
  userEvent.type(screen.getByLabelText(/last name/i), newUser.lastName);
  userEvent.type(screen.getByLabelText(/email address/i), newUser.email);
  userEvent.type(screen.getByLabelText(/password/i), newUser.password);
  userEvent.type(screen.getByLabelText(/team name/i), newUser.teamName);

  userEvent.click(screen.getByRole('button', { name: /register/i }));

  await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
});
