// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { server } from '@/test/mock-server/server';
import { resetDb } from '@/test/mock-server/db';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

vi.mock('zustand'); // auto-mocking

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  resetDb();
});
