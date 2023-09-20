import { API_URL } from '@/config';

export const getAuth = () => fetch(API_URL + `/auth`);
