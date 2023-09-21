// import { useParams as useMockParams } from 'react-router-dom';

// import {
//   render,
//   screen,
//   userEvent,
//   waitFor,
//   createDiscussion,
//   createUser,
//   within,
// } from '@/test/utils';

// import { Discussion } from '../Discussion';

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'), // keep the rest of the exports intact
//   useParams: jest.fn(),
// }));

// const renderDiscussion = async () => {
//   const fakeUser = await createUser();
//   const fakeDiscussion = await createDiscussion({ teamId: fakeUser.teamId });

//   (useMockParams as jest.Mock).mockImplementation(() => ({
//     discussionId: fakeDiscussion.id,
//   }));

//   const utils = await render(<Discussion />, {
//     user: fakeUser,
//   });

//   await screen.findByText(fakeDiscussion.title);

//   return {
//     ...utils,
//     fakeUser,
//     fakeDiscussion,
//   };
// };

// test('should render discussion', async () => {
//   const { fakeDiscussion } = await renderDiscussion();
//   expect(screen.getByText(fakeDiscussion.body)).toBeInTheDocument();
// });

// test('should update discussion', async () => {
//   const { fakeDiscussion } = await renderDiscussion();

//   const titleUpdate = '-Updated';
//   const bodyUpdate = '-Updated';

//   userEvent.click(screen.getByRole('button', { name: /update discussion/i }));

//   const drawer = screen.getByRole('dialog', {
//     name: /update discussion/i,
//   });

//   const titleField = within(drawer).getByText(/title/i);
//   const bodyField = within(drawer).getByText(/body/i);

//   userEvent.type(titleField, titleUpdate);
//   userEvent.type(bodyField, bodyUpdate);

//   const submitButton = within(drawer).getByRole('button', {
//     name: /submit/i,
//   });

//   userEvent.click(submitButton);

//   await waitFor(() => expect(drawer).not.toBeInTheDocument());

//   const newTitle = `${fakeDiscussion.title}${titleUpdate}`;
//   const newBody = `${fakeDiscussion.body}${bodyUpdate}`;

//   expect(screen.getByText(newTitle)).toBeInTheDocument();
//   expect(screen.getByText(newBody)).toBeInTheDocument();
// });

// test('should create and delete a comment on the discussion', async () => {
//   await renderDiscussion();

//   const comment = 'Hello World';

//   userEvent.click(screen.getByRole('button', { name: /create comment/i }));

//   const drawer = screen.getByRole('dialog', {
//     name: /create comment/i,
//   });

//   const bodyField = within(drawer).getByText(/body/i);

//   userEvent.type(bodyField, comment);

//   const submitButton = within(drawer).getByRole('button', {
//     name: /submit/i,
//   });

//   userEvent.click(submitButton);

//   await waitFor(() => expect(drawer).not.toBeInTheDocument());

//   const commentsList = screen.getByRole('list', {
//     name: 'comments',
//   });

//   const commentElements = within(commentsList).getAllByRole('listitem');

//   const commentElement = commentElements[0];

//   expect(commentElement).toBeInTheDocument();

//   const deleteCommentButton = within(commentElement).getByRole('button', {
//     name: /delete comment/i,
//     exact: false,
//   });

//   userEvent.click(deleteCommentButton);

//   const confirmationDialog = screen.getByRole('dialog', {
//     name: /delete comment/i,
//   });

//   const confirmationDeleteButton = within(confirmationDialog).getByRole('button', {
//     name: /delete/i,
//   });

//   userEvent.click(confirmationDeleteButton);

//   await screen.findByText(/comment deleted/i);

//   expect(within(commentsList).queryByText(comment)).not.toBeInTheDocument();
// });











// // import { createUser, render, screen, userEvent, waitFor } from '@/mocks/test-utils';

// import { CreateAuth } from '../CreateAuth';

// test('should login new user and call onSuccess cb which should navigate the user to the app', async () => {
//   const newUser = await createUser({ teamId: undefined });

//   const onSuccess = jest.fn();

//   await render(<LoginForm onSuccess={onSuccess} />, { user: null });

//   userEvent.type(screen.getByLabelText(/email address/i), newUser.email);
//   userEvent.type(screen.getByLabelText(/password/i), newUser.password);

//   userEvent.click(screen.getByRole('button', { name: /log in/i }));

//   await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
// });


// // import React from 'react'
// // import { render, screen } from '@testing-library/react'
// // import userEvent from '@testing-library/user-event'
// // import { CreateAuth } from '../CreateAuth';

// // describe('LoginForm', () => {
// //   it('should allow a user to log in', async () => {
// //     render(<CreateAuth />)

// //     await userEvent.type(screen.getByLabelText(/username/i), 'johnUser')

// //     userEvent.click(screen.getByRole('button', { name: /submit/i }))

// //     expect(await screen.findByText('f79e82e8-c34a-4dc7-a49e-9fadc0979fda')).toBeInTheDocument()
// //     expect(await screen.findByText('John')).toBeInTheDocument()
// //     expect(await screen.findByText('Maverick')).toBeInTheDocument()
// //   })
// // })