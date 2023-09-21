import { Locale, Order } from '@/types';
import { format, parseISO } from 'date-fns';

export const defaultSearchParams = {
  limit: '10',
  offset: '0',
  'sort.field': 'createdAt',
  'sort.order': 'desc' as Order,
};

export const localeDescriptions = {
  [Locale.en]: 'English',
  [Locale.ru]: 'Русский',
};

export function formatDate(date: string) {
  return format(parseISO(date), 'yyyy-LL-dd');
}
