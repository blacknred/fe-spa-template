import { Locale, Order } from '@/types';

export const defaultSearchParams = {
  limit: '5',
  offset: '0',
  'sort.field': 'createdAt',
  'sort.order': 'desc' as Order,
};

export const localeDescriptions = {
  [Locale.en]: 'English',
  [Locale.ru]: 'Русский',
};
