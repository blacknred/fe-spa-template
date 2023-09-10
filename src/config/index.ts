export const API_URL = import.meta.env.VITE_API_URL as string;
export const APP_TITLE = import.meta.env.VITE_APP_TITLE as string;
export const API_MOCKING = import.meta.env.VITE_API_MOCKING === 'true';
export const IS_DEV = import.meta.env.DEV;
export const IS_PROD = import.meta.env.PROD;
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
export const IS_TEST = import.meta.env.MODE === 'test' || ((window as any).Cypress as unknown);
