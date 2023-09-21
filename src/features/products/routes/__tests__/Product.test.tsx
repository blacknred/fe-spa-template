// import { useParams as useMockParams } from 'react-router-dom';

// import {
//   render,
//   screen,
//   userEvent,
//   waitFor,
//   mockProduct,
//   mockUser,
//   within,
//   getUser,
// } from '@/test/utils';

// import { Product } from '../Product';
// import { Role } from '@/features/users';
// import { Mock } from 'vitest';

// vitest.mock('react-router-dom', () => ({
//   // eslint-disable-next-line @typescript-eslint/no-misused-promises
//   ...vitest.importActual('react-router-dom'),
//   useParams: vitest.fn(),
// }));


// const renderProduct = async () => {
//   const user = getUser(Role.admin);
//   const product = await getProduct(1);

//   (useMockParams as Mock).mockImplementation(() => ({
//     id: product.id,
//   }));

//   const utils = await render(<Product />, { user });
//   await screen.findByText(fakeDiscussion.title);

//   return {
//     ...utils,
//     fakeUser,
//     fakeDiscussion,
//   };
// };

// describe("Product", () => {
//   test('should render product', async () => {
//     const { fakeDiscussion } = await renderDiscussion();
//     expect(screen.getByText(fakeDiscussion.body)).toBeInTheDocument();
//   });

//   test('should update discussion', async () => {
//     const { fakeDiscussion } = await renderDiscussion();

//     const titleUpdate = '-Updated';
//     const bodyUpdate = '-Updated';

//     userEvent.click(screen.getByRole('button', { name: /update product/i }));
//     const drawer = screen.getByRole('dialog', { name: /update product/i });

//     const titleField = within(drawer).getByText(/title/i);
//     const bodyField = within(drawer).getByText(/body/i);

//     userEvent.type(titleField, titleUpdate);
//     userEvent.type(bodyField, bodyUpdate);

//     const submitButton = within(drawer).getByRole('button', { name: /submit/i });

//     userEvent.click(submitButton);

//     await waitFor(() => expect(drawer).not.toBeInTheDocument());

//     const newTitle = `${fakeDiscussion.title}${titleUpdate}`;
//     const newBody = `${fakeDiscussion.body}${bodyUpdate}`;

//     expect(screen.getByText(newTitle)).toBeInTheDocument();
//     expect(screen.getByText(newBody)).toBeInTheDocument();
//   });

//   // test('should create and delete a comment on the discussion', async () => {
//   //   await renderDiscussion();

//   //   const comment = 'Hello World';

//   //   userEvent.click(screen.getByRole('button', { name: /create comment/i }));

//   //   const drawer = screen.getByRole('dialog', {
//   //     name: /create comment/i,
//   //   });

//   //   const bodyField = within(drawer).getByText(/body/i);

//   //   userEvent.type(bodyField, comment);

//   //   const submitButton = within(drawer).getByRole('button', {
//   //     name: /submit/i,
//   //   });

//   //   userEvent.click(submitButton);

//   //   await waitFor(() => expect(drawer).not.toBeInTheDocument());

//   //   const commentsList = screen.getByRole('list', {
//   //     name: 'comments',
//   //   });

//   //   const commentElements = within(commentsList).getAllByRole('listitem');

//   //   const commentElement = commentElements[0];

//   //   expect(commentElement).toBeInTheDocument();

//   //   const deleteCommentButton = within(commentElement).getByRole('button', {
//   //     name: /delete comment/i,
//   //     exact: false,
//   //   });

//   //   userEvent.click(deleteCommentButton);

//   //   const confirmationDialog = screen.getByRole('dialog', {
//   //     name: /delete comment/i,
//   //   });

//   //   const confirmationDeleteButton = within(confirmationDialog).getByRole('button', {
//   //     name: /delete/i,
//   //   });

//   //   userEvent.click(confirmationDeleteButton);

//   //   await screen.findByText(/comment deleted/i);

//   //   expect(within(commentsList).queryByText(comment)).not.toBeInTheDocument();
//   // });
// })
