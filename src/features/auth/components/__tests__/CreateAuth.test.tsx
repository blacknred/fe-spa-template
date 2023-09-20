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


// import React from 'react'
// import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
// import { CreateAuth } from '../CreateAuth';

// describe('LoginForm', () => {
//   it('should allow a user to log in', async () => {
//     render(<CreateAuth />)

//     await userEvent.type(screen.getByLabelText(/username/i), 'johnUser')

//     userEvent.click(screen.getByRole('button', { name: /submit/i }))

//     expect(await screen.findByText('f79e82e8-c34a-4dc7-a49e-9fadc0979fda')).toBeInTheDocument()
//     expect(await screen.findByText('John')).toBeInTheDocument()
//     expect(await screen.findByText('Maverick')).toBeInTheDocument()
//   })
// })