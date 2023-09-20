import { API_URL } from '@/config';

export const updateAuth = () => void fetch(API_URL + `/auth`, { method: 'PATCH' });
