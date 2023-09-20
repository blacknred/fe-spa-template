// import { discussionGenerator } from '@/test/data-generators';
// import { render, screen, userEvent, waitFor, within } from '@/test/test-utils';
// import { formatDate } from '@/utils/format';

// import { Discussions } from '../Categories';

// beforeAll(() => {
//   jest.spyOn(console, 'error').mockImplementation(() => { });
// });

// afterAll(() => {
//   (console.error as jest.Mock).mockRestore();
// });

// describe('Categories', () => {
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
// }


// // import { renderWithQueryClient } from '@/utils/test-utils'
// // import { describe, it } from 'vitest'
// // import HLTVMatches from './'
// // import { server } from '@/mocks/server'
// // import { rest } from 'msw'

// // describe('HLTVMatches', () => {
// //   it('should render matches', async () => {
// //     const result = renderWithQueryClient(<HLTVMatches />)
// //     const team01 = await result.findByText(/00NATION/i)
// //     expect(team01).toBeInTheDocument()
// //   })
// //   it('should render loading state', async () => {
// //     const result = renderWithQueryClient(<HLTVMatches />)
// //     const loading = await result.findByText(/Loading/i)
// //     expect(loading).toBeInTheDocument()
// //   })
// //   it('should render error state', async () => {
// //     server.use(
// //       rest.get('https://csgo.raisiqueira.io/api/hltv/matches', (_, res, ctx) => {
// //         return res(ctx.status(500))
// //       }),
// //     )
// //     const result = renderWithQueryClient(<HLTVMatches />)
// //     const error = await result.findByText(/Error/i)
// //     expect(error).toBeInTheDocument()
// //   })
// // })
